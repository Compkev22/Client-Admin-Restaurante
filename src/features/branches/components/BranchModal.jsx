// features/branches/components/BranchModal.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBranchStore } from "../../users/store/adminStore";
import { useSaveBranch } from "../hooks/useSaveBranch";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { BranchImageUpload } from "./BranchImageUpload";
import { BranchFormFields } from "./BranchFormFields";

export const BranchModal = ({ isOpen, onClose, branch }) => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const { saveBranch } = useSaveBranch();
  const loading = useBranchStore((state) => state.loading);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    if (branch) {
      reset({ name: branch.name, Email: branch.Email, address: branch.address, zone: branch.zone, city: branch.city, Category: branch.Category, phone: branch.phone, OpenedAt: branch.OpenedAt, ClosedAt: branch.ClosedAt });
      setPreview(branch.Photos?.[0]?.ImageURL || null);
    } else {
      reset({ name: "", Email: "", address: "", zone: "", city: "Guatemala", Category: "Fast Food", phone: "", OpenedAt: "06:00", ClosedAt: "18:00" });
      setPreview(null);
    }
  }, [isOpen, branch, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "photo" && value.photo?.length > 0)
        setPreview(URL.createObjectURL(value.photo[0]));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleClose = () => { reset(); setPreview(null); onClose(); };

  const onSubmit = async (data) => {
    try {
      await saveBranch(data, branch?._id);
      showSuccess(branch ? "Sucursal actualizada" : "Sucursal creada");
      handleClose();
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
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <BranchImageUpload preview={preview} register={register} />
          <BranchFormFields register={register} errors={errors} />
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="flex-1 bg-kinal-orange text-white font-black py-3 rounded-xl shadow-lg hover:bg-orange-600 transition-all uppercase tracking-widest disabled:opacity-50">
              {loading ? "Guardando..." : branch ? "Guardar Cambios" : "Crear Sucursal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};