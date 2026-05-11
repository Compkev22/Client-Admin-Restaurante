// features/inventory/components/InventoryModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveInventory } from "../hook/useSaveInventory.js";
import { useInventoryStore, useBranchStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { InventoryFormFields } from "./InventoryFormFields.jsx";

export const InventoryModal = ({ isOpen, onClose, item }) => {
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm();
  const { saveInventory } = useSaveInventory();
  const loading = useInventoryStore((state) => state.loading);
  const { branches, getBranches } = useBranchStore();

  useEffect(() => {
    if (!isOpen) return;
    getBranches();
    if (item) {
      reset({
        name: item.name,
        description: item.description,
        stock: item.stock,
        unitCost: item.unitCost,
        branchId: item.branchId?._id || item.branchId,
      });
    } else {
      reset({ name: "", description: "", stock: 0, unitCost: 0, branchId: "" });
    }
  }, [isOpen, item, reset, getBranches]);

  const onSubmit = async (data) => {
    try {
      await saveInventory(data, item?._id);
      showSuccess(item ? "Insumo actualizado" : "Insumo creado exitosamente");
      onClose();
    } catch {
      showError("Error al procesar el insumo");
    }
  };

  const handleClose = () => {
    if (isDirty) {
      showConfirmToast({ title: "Cerrar Editor", message: "Tienes cambios sin guardar. ¿Deseas salir de todos modos?", onConfirm: () => { reset(); onClose(); } });
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
          <InventoryFormFields register={register} errors={errors} branches={branches} />
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleClose} className="px-6 py-3 bg-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-all">
              CANCELAR
            </button>
            <button type="submit" disabled={loading} className="px-8 py-3 bg-kinal-red text-white rounded-2xl font-black shadow-lg shadow-red-200 hover:scale-105 transition-all disabled:opacity-50">
              {loading ? <Spinner small /> : item ? "ACTUALIZAR" : "GUARDAR INSUMO"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};