// features/reservations/components/ReservationModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveReservation } from "../hook/useSaveReservation.js";
import { useReservationStore, useBranchStore, useUserStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { ReservationFormFields } from "./ReservationFormFields.jsx";

export const ReservationModal = ({ isOpen, onClose, item }) => {
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm();
  const { saveReservation } = useSaveReservation();
  const loading = useReservationStore((state) => state.loading);
  const { branches, getBranches } = useBranchStore();
  const { users, getUsers } = useUserStore();

  useEffect(() => {
    if (!isOpen) return;
    getBranches();
    getUsers();
    if (item) {
      const formattedDate = item.date ? new Date(item.date).toISOString().split("T")[0] : "";
      reset({
        branchId: item.branchId?._id || item.branchId,
        clientId: item.clientId?._id || item.clientId,
        date: formattedDate,
        time: item.time,
        numberOfPersons: item.numberOfPersons,
        notes: item.notes || "",
        status: item.status,
        statusRes: item.statusRes,
      });
    } else {
      reset({ branchId: "", clientId: "", date: "", time: "", numberOfPersons: 1, notes: "", status: "Pendiente", statusRes: "ACTIVADO" });
    }
  }, [isOpen, item, reset, getBranches, getUsers]);

  const onSubmit = async (data) => {
    try {
      const response = await saveReservation(data, item?._id);
      const mesaMsg = !item && response?.assignedTable
        ? ` - Mesa #${response.assignedTable.number} asignada`
        : "";
      showSuccess(`${item ? "Actualizada" : "Creada"} con éxito${mesaMsg}`);
      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Error al procesar la reservación";
      showError(msg);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* Cabecera fija */}
        <div className="flex justify-between items-center px-6 md:px-8 pt-6 md:pt-8 pb-4 shrink-0 border-b border-gray-100">
          <h2 className="text-xl md:text-2xl font-black italic text-gray-800 uppercase">
            {item ? "Editar" : "Nueva"}{" "}
            <span className="text-kinal-red">Reservación</span>
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 font-bold text-xl transition-colors"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Cuerpo con scroll */}
        <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="reservation-form">
            <ReservationFormFields
              register={register}
              errors={errors}
              branches={branches}
              users={users}
              isEditing={!!item}
            />
          </form>
        </div>

        {/* Footer fijo */}
        <div className="shrink-0 px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors uppercase"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="reservation-form"
            disabled={loading}
            className="flex-[2] bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest flex justify-center items-center"
          >
            {loading ? <Spinner small /> : item ? "Actualizar" : "Guardar Reservación"}
          </button>
        </div>
      </div>
    </div>
  );
};