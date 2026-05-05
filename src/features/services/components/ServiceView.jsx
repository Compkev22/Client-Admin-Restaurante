import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { ServiceModal } from "./ServiceModal";
import { useAdditionalServicesStore } from "../../users/store/adminStore.js";

import { Spinner } from "../../auth/components/Spinner.jsx";
import { showError, showSuccess } from "../../../shared//utils/toast.js";
import { ShowConfirmToast } from "../../auth/components/ShowConfirmToast.jsx";

import createIcon from "../../../assets/icons/Create.svg";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const ServicePage = () => {
    const {
        additionalServices,
        loading,
        error,
        getAdditionalServices,
        changeAdditionalServiceStatus,
    } = useAdditionalServicesStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [activeTab, setActiveTab] = useState("Todos");

    const tabs = ["Todos", "Activos", "Inactivos"];

    useEffect(() => {
        getAdditionalServices();
    }, [getAdditionalServices]);

    useToastEffect(() => {
        if (error) showError(error);
    }, [error]);

    const filteredServices = additionalServices.filter((service) => {
        if (activeTab === "Activos") return service.status === "ACTIVE";
        if (activeTab === "Inactivos") return service.status === "INACTIVE";
        return true;
    });

    const handleOpenCreate = () => {
        setSelectedService(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    const handleChangeStatus = (service) => {
        const isActive = service.status === "ACTIVE";

        ShowConfirmToast({
            title: isActive ? "Desactivar servicio" : "Activar servicio",
            message: `¿Seguro que deseas ${
                isActive ? "desactivar" : "activar"
            } ${service.Name}?`,
            onConfirm: async () => {
                const ok = await changeAdditionalServiceStatus(service._id);

                if (ok) {
                    showSuccess(
                        isActive
                            ? "Servicio desactivado correctamente"
                            : "Servicio activado correctamente"
                    );
                }
            },
        });
    };

    if (loading && additionalServices.length === 0) return <Spinner />;

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 italic uppercase">
                        Servicios <span className="text-kinal-red">Adicionales</span>
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Catálogo de extras para reservaciones y eventos.
                    </p>
                </div>

                <button
                    onClick={handleOpenCreate}
                    className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2"
                >
                    <img
                        src={createIcon}
                        alt="Crear"
                        className="w-5 h-5 invert opacity-90"
                    />
                    <span>Nuevo Servicio</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${
                            activeTab === tab
                                ? "bg-kinal-red text-white shadow-md"
                                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Empty state */}
            {filteredServices.length === 0 && (
                <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-black text-gray-700">
                        No hay servicios para mostrar
                    </h3>
                    <p className="text-gray-400 font-medium mt-1">
                        Crea un nuevo servicio adicional para verlo aquí.
                    </p>
                </div>
            )}

            {/* Grid de Servicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service) => {
                    const isActive = service.status === "ACTIVE";

                    return (
                        <div
                            key={service._id}
                            className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative flex flex-col h-full ${
                                !isActive ? "opacity-60 grayscale bg-gray-50" : ""
                            }`}
                        >
                            {/* Badge de Estado */}
                            <div className="absolute top-4 right-4">
                                <span
                                    className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                                        isActive
                                            ? "bg-green-100 text-green-700 border-green-200"
                                            : "bg-gray-200 text-gray-500 border-gray-300"
                                    }`}
                                >
                                    {isActive ? "Activo" : "Inactivo"}
                                </span>
                            </div>

                            {/* Nombre y Precio */}
                            <div className="mb-4 pr-16">
                                <h3 className="text-xl font-black text-gray-800 leading-tight mb-2">
                                    {service.Name}
                                </h3>

                                <p className="text-2xl font-black text-kinal-red">
                                    + Q {Number(service.AdditionalPrice || 0).toFixed(2)}
                                </p>
                            </div>

                            {/* Descripción */}
                            <p className="text-sm text-gray-600 font-medium flex-grow mb-6 bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                                {service.Description}
                            </p>

                            {/* Botones de Acción */}
                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-auto">
                                <button
                                    type="button"
                                    onClick={() => handleOpenEdit(service)}
                                    className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                                    title="Editar servicio"
                                >
                                    <img
                                        src={iconEdit}
                                        className="w-5 h-5 opacity-70"
                                        alt="Edit"
                                    />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleChangeStatus(service)}
                                    className={`p-2 rounded-lg transition-colors ${
                                        isActive
                                            ? "bg-red-50 hover:bg-red-100 text-red-600"
                                            : "bg-green-50 hover:bg-green-100 text-green-600"
                                    }`}
                                    title={isActive ? "Desactivar servicio" : "Activar servicio"}
                                >
                                    <img
                                        src={iconDelete}
                                        className="w-5 h-5 opacity-70"
                                        alt="Delete"
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                serviceData={selectedService}
            />
        </div>
    );
};