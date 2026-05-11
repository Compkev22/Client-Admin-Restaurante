// features/services/components/ServiceModal.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAdditionalServicesStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { ServiceImagePreview } from "./ServiceImagePreview.jsx";
import { ServiceFormFields } from "./ServiceFormFields.jsx";

export const ServiceModal = ({ isOpen, onClose, serviceData = null }) => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const loading = useAdditionalServicesStore((state) => state.loading);
  const createAdditionalService = useAdditionalServicesStore((state) => state.createAdditionalService);
  const updateAdditionalService = useAdditionalServicesStore((state) => state.updateAdditionalService);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    if (serviceData) {
      reset({ Name: serviceData.Name || "", Description: serviceData.Description || "", AdditionalPrice: serviceData.AdditionalPrice || "", status: serviceData.status || "ACTIVE", image: null });
      setPreview(serviceData.image?.url || null);
    } else {
      reset({ Name: "", Description: "", AdditionalPrice: "", status: "ACTIVE", image: null });
      setPreview(null);
    }
  }, [isOpen, serviceData, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image" && value.image?.length > 0)
        setPreview(URL.createObjectURL(value.image[0]));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleClose = () => { reset(); setPreview(null); onClose(); };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data.Name);
      formData.append("Description", data.Description);
      formData.append("AdditionalPrice", Number(data.AdditionalPrice));
      formData.append("status", data.status);
      if (data.image?.[0]) formData.append("image", data.image[0]);

      const ok = serviceData
        ? await updateAdditionalService(serviceData._id, formData)
        : await createAdditionalService(formData);

      if (!ok) { showError("Error al guardar el servicio"); return; }
      showSuccess(serviceData ? "Servicio actualizado correctamente" : "Servicio creado correctamente");
      handleClose();
    } catch (error) {
      showError("Error al guardar el servicio");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn px-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic text-gray-800 uppercase">
              {serviceData ? "Editar" : "Nuevo"} <span className="text-kinal-red">Servicio</span>
            </h2>
            <p className="text-sm font-bold text-gray-400">Agrega valor extra a las reservaciones.</p>
          </div>
          <button type="button" onClick={handleClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl transition-colors">×</button>
        </div>
        <form className="p-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <ServiceImagePreview preview={preview} register={register} />
          <ServiceFormFields register={register} errors={errors} />
          <div className="pt-4 flex flex-col-reverse sm:flex-row items-center gap-3 mt-2 border-t border-gray-50">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="flex-1 sm:flex-2 flex justify-center items-center bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest disabled:opacity-60">
              {loading ? <Spinner small /> : serviceData ? "Actualizar Servicio" : "Guardar Servicio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};