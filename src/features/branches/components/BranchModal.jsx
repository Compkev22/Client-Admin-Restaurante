import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBranchStore } from "../../users/store/adminStore";
import { useSaveBranch } from "../hooks/useSaveBranch";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const BranchModal = ({ isOpen, onClose, branch }) => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const { saveBranch } = useSaveBranch();
  const loading = useBranchStore((state) => state.loading);

  const [preview, setPreview] = useState(null);

  // 1. Cargar datos al abrir el modal
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
        // Mostrar imagen actual de Cloudinary si existe
        if (branch.Photos && branch.Photos.length > 0 && branch.Photos[0].ImageURL) {
           setPreview(branch.Photos[0].ImageURL);
        } else {
           setPreview(null);
        }
      } else {
        reset({
          name: "", Email: "", address: "", zone: "", city: "Guatemala",
          Category: "Fast Food", phone: "", OpenedAt: "06:00", ClosedAt: "18:00",
        });
        setPreview(null);
      }
    }
  }, [isOpen, branch, reset]);

  // 2. Escuchar cuando el usuario selecciona una foto nueva para la vista previa
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "photo" && value.photo && value.photo.length > 0) {
        setPreview(URL.createObjectURL(value.photo[0]));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    try {
      await saveBranch(data, branch?._id);
      showSuccess(branch ? "Sucursal actualizada" : "Sucursal creada");
      reset();
      setPreview(null);
      onClose();
    } catch (error) {
      console.log(error.response?.data);
      showError("Error al guardar la sucursal");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            {branch ? "Editar" : "Nueva"} <span className="text-kinal-red">Sucursal</span>
          </h2>
          <button onClick={() => { reset(); setPreview(null); onClose(); }} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* FOTO - VISTA PREVIA */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="w-32 h-32 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
              {preview ? (
                <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm font-medium text-center px-2">Sin imagen</span>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*"
              {...register("photo")} 
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-orange-50 file:text-kinal-orange hover:file:bg-orange-100 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ... LOS DEMÁS INPUTS SE MANTIENEN IGUAL ... */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Nombre</label>
              <input {...register("name", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Email</label>
              <input type="email" {...register("Email", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Dirección</label>
              <input {...register("address", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Zona</label>
              <input type="number" {...register("zone", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Ciudad</label>
              <input {...register("city", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Categoría</label>
              <select {...register("Category", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
                <option value="Fast Food">Fast Food</option>
                <option value="Familiar">Familiar</option>
                <option value="Gourmet">Gourmet</option>
                <option value="Buffet">Buffet</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Teléfono</label>
              <input type="number" {...register("phone", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Apertura</label>
              <input type="time" {...register("OpenedAt", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Cierre</label>
              <input type="time" {...register("ClosedAt", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => { reset(); setPreview(null); onClose(); }} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="flex-1 bg-kinal-orange text-white font-black py-3 rounded-xl shadow-lg hover:bg-orange-600 transition-all uppercase tracking-widest disabled:opacity-50">
              {loading ? "Guardando..." : branch ? "Guardar Cambios" : "Crear Sucursal"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};