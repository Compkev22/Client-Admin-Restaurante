import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveInventory } from "../hook/useSaveInventory.js";
import { useInventoryStore, useBranchStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const InventoryModal = ({ isOpen, onClose, item }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  const { saveInventory } = useSaveInventory();
  const loading = useInventoryStore((state) => state.loading);
  const { branches, getBranches } = useBranchStore();

  // Cargar sucursales y datos del item
  useEffect(() => {
    if (isOpen) {
      getBranches(); // Refrescar lista de sucursales
      if (item) {
        reset({
          name: item.name,
          description: item.description,
          stock: item.stock,
          unitCost: item.unitCost,
          // Manejamos si branchId viene como objeto (populate) o como string
          branchId: item.branchId?._id || item.branchId,
        });
      } else {
        reset({
          name: "",
          description: "",
          stock: 0,
          unitCost: 0,
          branchId: "",
        });
      }
    }
  }, [isOpen, item, reset, getBranches]);

  const onSubmit = async (data) => {
    try {
      await saveInventory(data, item?._id);
      showSuccess(item ? "Insumo actualizado" : "Insumo creado exitosamente");
      onClose();
    } catch (error) {
      showError("Error al procesar el insumo");
    }
  };

  const handleClose = () => {
    if (isDirty) {
      showConfirmToast({
        title: "Cerrar Editor",
        message: "Tienes cambios sin guardar. ¿Deseas salir de todos modos?",
        onConfirm: () => {
          reset();
          onClose();
        },
      });
    } else {
      reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-6 text-white bg-kinal-red">
          <h2 className="text-xl font-black uppercase italic">
            {item ? "Editar Insumo" : "Nuevo Insumo"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <div className="grid grid-cols-1 gap-4">
            
            {/* Selector de Sucursal */}
            <div className="flex flex-col">
              <label className="text-xs font-black uppercase text-gray-400 mb-1">Sucursal a la que pertenece</label>
              <select
                {...register("branchId", { required: "La sucursal es obligatoria" })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-bold text-gray-700 bg-white"
              >
                <option value="">Selecciona una sucursal...</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
              {errors.branchId && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.branchId.message}</p>}
            </div>

            {/* Nombre */}
            <div className="flex flex-col">
              <label className="text-xs font-black uppercase text-gray-400 mb-1">Nombre del Insumo</label>
              <input
                {...register("name", { required: "El nombre es obligatorio" })}
                placeholder="EJ: Pechuga de Pollo"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-bold"
              />
              {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name.message}</p>}
            </div>

            {/* Descripción */}
            <div className="flex flex-col">
              <label className="text-xs font-black uppercase text-gray-400 mb-1">Descripción / Presentación</label>
              <textarea
                {...register("description", { required: "La descripción es obligatoria" })}
                placeholder="EJ: Caja de 40 lbs"
                rows="2"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-medium resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Stock */}
              <div className="flex flex-col">
                <label className="text-xs font-black uppercase text-gray-400 mb-1">Stock Actual</label>
                <input
                  type="number"
                  {...register("stock", { required: "Obligatorio", min: 0 })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold"
                />
              </div>

              {/* Costo Unitario */}
              <div className="flex flex-col">
                <label className="text-xs font-black uppercase text-gray-400 mb-1">Costo Unit. (Q)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("unitCost", { required: "Obligatorio", min: 0 })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-all"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-kinal-red text-white rounded-2xl font-black shadow-lg shadow-red-200 hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? <Spinner small /> : item ? "ACTUALIZAR" : "GUARDAR INSUMO"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};