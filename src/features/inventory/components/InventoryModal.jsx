import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveInventory } from "../hook/useSaveInventory.js";
import { useInventoryStore, useBranchStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { InventoryFormFields } from "./InventoryFormFields.jsx";

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
      reset({ name: "", description: "", stock: 0, unitCost: "", branchId: "" });
    }
  }, [isOpen, item, reset, getBranches]);

  const onSubmit = async (data) => {
    try {
      await saveInventory(data, item?._id);
      showSuccess(item ? "Insumo actualizado" : "Insumo creado exitosamente");
      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Error al procesar el insumo";
      showError(msg);
    }
  };

  const handleClose = () => {
    if (isDirty) {
      showConfirmToast({
        title: "Cerrar Editor",
        message: "Tienes cambios sin guardar. ¿Deseas salir de todos modos?",
        onConfirm: () => { reset(); onClose(); },
      });
    } else {
      reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[92vh]">

        <div className="px-6 md:px-8 py-5 md:py-6 bg-kinal-red rounded-t-3xl flex justify-between items-center shrink-0">
          <h2 className="text-lg md:text-xl font-black uppercase italic text-white">
            {item ? "Editar Insumo" : "Nuevo Insumo"}
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xl transition-colors"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-6 md:px-8 py-6 md:py-8 flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InventoryFormFields register={register} errors={errors} branches={branches} />

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-all"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none px-8 py-3 bg-kinal-red text-white rounded-2xl font-black shadow-lg shadow-red-200 hover:scale-105 transition-all disabled:opacity-50 flex justify-center items-center"
              >
                {loading ? <Spinner small /> : item ? "ACTUALIZAR" : "GUARDAR INSUMO"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};