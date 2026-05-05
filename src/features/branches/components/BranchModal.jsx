import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useBranchStore } from "../../users/store/adminStore"; // Ajustar ruta luego
import { useSaveBranch } from "../hooks/useSaveBranch";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const BranchModal = ({ isOpen, onClose, branch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { saveBranch } = useSaveBranch();
  // FALTA: Que loading exista en el store
  const loading = useBranchStore((state) => state.loading); 

  useEffect(() => {
    if (isOpen) {
      if (branch) {
        reset({
          name: branch.name,
          Email: branch.Email,
          address: branch.address,
          zone: branch.zone,
          city: branch.city,
          Category: branch.Category,
          phone: branch.phone,
          OpenedAt: branch.OpenedAt,
          ClosedAt: branch.ClosedAt,
        });
      } else {
        reset({
          name: "",
          Email: "",
          address: "",
          zone: "",
          city: "Guatemala",
          Category: "Fast Food",
          phone: "",
          OpenedAt: "06:00",
          ClosedAt: "18:00",
        });
      }
    }
  }, [isOpen, branch, reset]);

  const onSubmit = async (data) => {
    try {
      await saveBranch(data, branch?._id);
      showSuccess(
        branch ? "Sucursal actualizada exitosamente" : "Sucursal creada exitosamente"
      );
      reset();
      onClose();
    } catch (error) {
      console.log(error.response?.data);
      showError("Error al guardar la sucursal");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            {branch ? "Editar" : "Nueva"} <span className="text-kinal-red">Sucursal</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Nombre</label>
            <input 
              {...register("name", { required: true })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Email</label>
            <input 
              type="email" 
              {...register("Email", { required: true })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" 
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Dirección</label>
            <input 
              {...register("address", { required: true })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Zona</label>
            <input 
              type="number" 
              {...register("zone", { required: true })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Ciudad</label>
            <input 
              {...register("city", { required: true })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Categoría</label>
            <select 
              {...register("Category", { required: true })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white"
            >
              <option value="Fast Food">Fast Food</option>
              <option value="Familiar">Familiar</option>
              <option value="Gourmet">Gourmet</option>
              <option value="Buffet">Buffet</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Teléfono</label>
            <input 
              type="number" 
              {...register("phone", { required: true })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Hora Apertura</label>
            <input 
              type="time" 
              {...register("OpenedAt", { required: true })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Hora Cierre</label>
            <input 
              type="time" 
              {...register("ClosedAt", { required: true })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" 
            />
          </div>

          <div className="col-span-2 pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={() => { reset(); onClose(); }} 
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-kinal-orange text-white font-black py-3 rounded-xl shadow-lg hover:bg-orange-600 transition-all uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? "Guardando..." : branch ? "Guardar Cambios" : "Crear Sucursal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};