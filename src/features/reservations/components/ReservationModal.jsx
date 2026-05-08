import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveReservation } from "../hook/useSaveReservation.js";
import { useReservationStore, useBranchStore, useUserStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const ReservationModal = ({ isOpen, onClose, item }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  const { saveReservation } = useSaveReservation();
  const loading = useReservationStore((state) => state.loading);
  
  // Traemos datos reales para los selectores
  const { branches, getBranches } = useBranchStore();
  const { users, getUsers } = useUserStore();

  useEffect(() => {
    if (isOpen) {
      getBranches();
      getUsers();
      if (item) {
        // Formatear fecha para el input type="date" (YYYY-MM-DD)
        const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0] : "";
        reset({
          branchId: item.branchId?._id || item.branchId,
          clientId: item.clientId?._id || item.clientId,
          date: formattedDate,
          time: item.time,
          numberOfPersons: item.numberOfPersons,
          notes: item.notes,
          status: item.status,
          statusRes: item.statusRes
        });
      } else {
        reset({
          branchId: "",
          clientId: "",
          date: "",
          time: "",
          numberOfPersons: 1,
          notes: "",
          status: "Pendiente",
          statusRes: "ACTIVADO"
        });
      }
    }
  }, [isOpen, item, reset, getBranches, getUsers]);

  const onSubmit = async (data) => {
    try {
      const response = await saveReservation(data, item?._id);
      
      // Si es creación, el backend nos dice qué mesa asignó
      const mesaMsg = !item && response?.assignedTable 
        ? ` - Mesa #${response.assignedTable.number} asignada` 
        : "";

      showSuccess(`${item ? "Actualizada" : "Creada"} con éxito${mesaMsg}`);
      onClose();
    } catch (error) {
      // El error ya lo maneja el store/toast, pero aquí detenemos el flujo
    }
  };

  const handleClose = () => {
    if (isDirty) {
      showConfirmToast({
        title: "Cambios sin guardar",
        message: "¿Deseas cerrar el formulario?",
        onConfirm: () => { reset(); onClose(); },
      });
    } else {
      reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            {item ? "Editar" : "Nueva"} <span className="text-kinal-red">Reservación</span>
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
            {/* Sucursal */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase text-gray-400">Sucursal</label>
              <select 
                {...register("branchId", { required: "Obligatorio" })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none bg-white font-bold"
              >
                <option value="">Selecciona...</option>
                {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
              </select>
            </div>

            {/* Cliente */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase text-gray-400">Cliente</label>
              <select 
                {...register("clientId", { required: "Obligatorio" })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none bg-white font-bold"
              >
                <option value="">Selecciona cliente...</option>
                {users.filter(u => u.role === 'CLIENT').map(c => (
                  <option key={c._id} value={c._id}>{c.UserName} {c.UserSurname}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase text-gray-400">Fecha</label>
              <input 
                type="date" 
                {...register("date", { required: true })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold" 
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase text-gray-400">Hora</label>
              <input 
                type="time" 
                {...register("time", { required: true })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase text-gray-400">Personas</label>
              <input 
                type="number" 
                {...register("numberOfPersons", { required: true, min: 1 })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase text-gray-400">Notas</label>
            <textarea 
              {...register("notes")}
              rows="2" 
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none resize-none font-medium" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase text-gray-400">Estado</label>
              <select {...register("status")} className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none bg-white font-bold">
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
            {item && (
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-gray-400">Estatus Lógico</label>
                    <select {...register("statusRes")} className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none bg-white font-bold">
                        <option value="ACTIVADO">Activado</option>
                        <option value="DESACTIVADO">Desactivado</option>
                    </select>
                </div>
            )}
          </div>

          <div className="pt-4 flex gap-3 border-t border-gray-100 mt-6">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-3 bg-gray-100 rounded-xl font-bold text-gray-500">
              CANCELAR
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-[2] bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:scale-[1.02] transition-all uppercase"
            >
              {loading ? <Spinner small /> : item ? "ACTUALIZAR" : "GUARDAR RESERVACIÓN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};