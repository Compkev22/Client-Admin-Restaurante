// features/services/components/ServiceView.jsx
import { useEffect, useState } from "react";
import { useAdditionalServicesStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { ShowConfirmToast } from "../../auth/components/ShowConfirmToast.jsx";
import { ServiceHeader } from "./ServiceHeader.jsx";
import { ServiceTabs } from "./ServiceTabs.jsx";
import { ServiceCard } from "./ServiceCard.jsx";
import { ServiceModal } from "./ServiceModal.jsx";

export const ServicePage = () => {
  const { additionalServices, loading, error, getAdditionalServices, changeAdditionalServiceStatus } = useAdditionalServicesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("Todos");

  useEffect(() => { getAdditionalServices(); }, [getAdditionalServices]);
  useEffect(() => { if (error) showError(error); }, [error]);

  const filtered = additionalServices.filter((s) => {
    if (activeTab === "Activos") return s.status === "ACTIVE";
    if (activeTab === "Inactivos") return s.status === "INACTIVE";
    return true;
  });

  const handleOpenEdit = (service) => { setSelectedService(service); setIsModalOpen(true); };
  const handleOpenCreate = () => { setSelectedService(null); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedService(null); };

  const handleChangeStatus = (service) => {
    const isActive = service.status === "ACTIVE";
    ShowConfirmToast({
      title: isActive ? "Desactivar servicio" : "Activar servicio",
      message: `¿Seguro que deseas ${isActive ? "desactivar" : "activar"} ${service.Name}?`,
      onConfirm: async () => {
        const ok = await changeAdditionalServiceStatus(service._id);
        if (ok) showSuccess(isActive ? "Servicio desactivado correctamente" : "Servicio activado correctamente");
      },
    });
  };

  if (loading && additionalServices.length === 0) return <Spinner />;

  return (
    <div className="space-y-8 animate-fadeIn">
      <ServiceHeader onCreateClick={handleOpenCreate} />
      <ServiceTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {filtered.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-700">No hay servicios para mostrar</h3>
          <p className="text-gray-400 font-medium mt-1">Crea un nuevo servicio adicional para verlo aquí.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <ServiceCard key={service._id} service={service} onEdit={handleOpenEdit} onChangeStatus={handleChangeStatus} />
        ))}
      </div>
      <ServiceModal isOpen={isModalOpen} onClose={handleCloseModal} serviceData={selectedService} />
    </div>
  );
};