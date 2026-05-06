import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAdditionalServicesStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const ServiceModal = ({ isOpen, onClose, serviceData = null }) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const loading = useAdditionalServicesStore((state) => state.loading);
    const createAdditionalService = useAdditionalServicesStore(
        (state) => state.createAdditionalService
    );
    const updateAdditionalService = useAdditionalServicesStore(
        (state) => state.updateAdditionalService
    );

    const [preview, setPreview] = useState(null);

    // 🔹 Cargar datos al editar
    useEffect(() => {
        if (!isOpen) return;

        if (serviceData) {
            reset({
                Name: serviceData.Name || "",
                Description: serviceData.Description || "",
                AdditionalPrice: serviceData.AdditionalPrice || "",
                status: serviceData.status || "ACTIVE",
                image: null,
            });

            setPreview(serviceData.image?.url || null);
        } else {
            reset({
                Name: "",
                Description: "",
                AdditionalPrice: "",
                status: "ACTIVE",
                image: null,
            });

            setPreview(null);
        }
    }, [isOpen, serviceData, reset]);

    // 🔹 Preview en tiempo real
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "image" && value.image?.length > 0) {
                const file = value.image[0];
                setPreview(URL.createObjectURL(file));
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    const handleClose = () => {
        reset();
        setPreview(null);
        onClose();
    };

    // 🔹 Envío con FormData
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("Name", data.Name);
            formData.append("Description", data.Description);
            formData.append("AdditionalPrice", Number(data.AdditionalPrice));
            formData.append("status", data.status);

            if (data.image?.[0]) {
                formData.append("image", data.image[0]);
            }

            let ok;

            if (serviceData) {
                ok = await updateAdditionalService(serviceData._id, formData);
            } else {
                ok = await createAdditionalService(formData);
            }

            if (!ok) {
                showError("Error al guardar el servicio");
                return;
            }

            showSuccess(
                serviceData
                    ? "Servicio actualizado correctamente"
                    : "Servicio creado correctamente"
            );

            handleClose();
        } catch (error) {
            console.log("ERROR SERVICE:", error);
            showError("Error al guardar el servicio");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn px-4">
            <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">

                {/* HEADER */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black italic text-gray-800 uppercase">
                            {serviceData ? "Editar" : "Nuevo"}{" "}
                            <span className="text-kinal-red">Servicio</span>
                        </h2>
                        <p className="text-sm font-bold text-gray-400">
                            Agrega valor extra a las reservaciones.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 font-bold text-2xl transition-colors"
                    >
                        ×
                    </button>
                </div>

                <form className="p-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    {/* PREVIEW */}
                    <div className="flex justify-center">
                        <div className="w-28 h-28 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden shadow-inner">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-xs">
                                    Sin imagen
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">

                        {/* NOMBRE */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-700">
                                Nombre del Servicio
                            </label>

                            <input
                                type="text"
                                placeholder="Ej: Decoración de Cumpleaños VIP"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-bold text-gray-700"
                                {...register("Name", {
                                    required: "El nombre del servicio es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "El nombre debe tener al menos 3 caracteres",
                                    },
                                })}
                            />

                            {errors.Name && (
                                <p className="text-red-600 text-xs font-bold mt-1">
                                    {errors.Name.message}
                                </p>
                            )}
                        </div>

                        {/* DESCRIPCIÓN */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-700">
                                Descripción Detallada
                            </label>

                            <textarea
                                rows="3"
                                placeholder="Incluye globos, pastel pequeño y música temática..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none resize-none text-gray-600 font-medium"
                                {...register("Description", {
                                    required: "La descripción es obligatoria",
                                })}
                            />

                            {errors.Description && (
                                <p className="text-red-600 text-xs font-bold mt-1">
                                    {errors.Description.message}
                                </p>
                            )}
                        </div>

                        {/* IMAGEN */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-700">
                                Imagen del servicio
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 cursor-pointer"
                                {...register("image")}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* PRECIO */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-gray-700">
                                    Precio Extra (Q)
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-black text-kinal-red"
                                    {...register("AdditionalPrice", {
                                        required: "El precio es obligatorio",
                                    })}
                                />
                            </div>

                            {/* ESTADO */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-gray-700">
                                    Estado
                                </label>

                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700"
                                    {...register("status")}
                                >
                                    <option value="ACTIVE">Activo</option>
                                    <option value="INACTIVE">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="pt-4 flex flex-col-reverse sm:flex-row items-center gap-3 mt-2 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            // Agregué "flex justify-center" para que el Spinner quede bien centrado dentro del botón
                            className="flex-1 sm:flex-2 flex justify-center items-center bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest disabled:opacity-60"
                        >
                            {loading ? (
                                <Spinner small />
                            ) : serviceData ? (
                                "Actualizar Servicio"
                            ) : (
                                "Guardar Servicio"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};