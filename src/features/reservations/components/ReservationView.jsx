import { useEffect, useState } from "react";
import { useReservationStore, useBranchStore, useUserStore } from "../../users/store/adminStore.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { showError } from "../../../shared/utils/toast.js";
import { ReservationHeader } from "./ReservationHeader.jsx";
import { ReservationTabs } from "./ReservationTabs.jsx";
import { ReservationGrid } from "./ReservationGrid.jsx";
import { ReservationModal } from "./ReservationModal.jsx";

export const ReservationPage = () => {
  const { reservations, loading, error, getReservations, deleteReservation } = useReservationStore();
  const { branches, getBranches } = useBranchStore();
  const { users, getUsers } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("Todas");

  useEffect(() => { getReservations(); }, [getReservations]);
  useEffect(() => { getBranches(); }, [getBranches]);
  useEffect(() => { getUsers(); }, [getUsers]);
  useEffect(() => { if (error) showError(error); }, [error]);

  const safeReservations = reservations || [];
  const filtered = activeTab === "Todas"
    ? safeReservations
    : safeReservations.filter((r) => r.status === activeTab);

  const handleEdit = (res) => { setSelectedItem(res); setIsModalOpen(true); };
  const handleCreate = () => { setSelectedItem(null); setIsModalOpen(true); };

  const handleToggleStatus = (id, name) => {
    showConfirmToast({
      title: "Cambiar Estado",
      message: `¿Deseas cambiar el estado (ACTIVADO/DESACTIVADO) de la reserva de ${name}?`,
      onConfirm: () => deleteReservation(id),
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn p-2 md:p-4">
      <ReservationHeader onCreateClick={handleCreate} />
      <ReservationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ReservationGrid
        reservations={filtered}
        allReservations={safeReservations}
        branches={branches}
        users={users}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
      />
      <ReservationModal
        key={selectedItem?._id ?? "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
};