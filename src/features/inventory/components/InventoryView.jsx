// features/inventory/components/InventoryView.jsx
import { useEffect, useState } from "react";
import { useInventoryStore, useBranchStore } from "../../users/store/adminStore.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { showError } from "../../../shared/utils/toast.js";
import { InventoryHeader } from "./InventoryHeader.jsx";
import { InventoryTable } from "./InventoryTable.jsx";
import { InventoryModal } from "./InventoryModal.jsx";

export const InventoryPage = () => {
  const { inventory, loading, error, getInventory, deleteInventory } = useInventoryStore();
  const { branches } = useBranchStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => { getInventory(); }, [getInventory]);
  useEffect(() => { if (error) showError(error); }, [error]);

  const safeInventory = inventory || [];

  const handleEdit = (item) => { setSelectedItem(item); setIsModalOpen(true); };
  const handleCreate = () => { setSelectedItem(null); setIsModalOpen(true); };

  const handleToggleStatus = (item) => {
    const action = item.status === "ACTIVE" ? "desactivar" : "activar";
    showConfirmToast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Insumo`,
      message: `¿Estás seguro de que deseas ${action} "${item.name}"?`,
      onConfirm: () => deleteInventory(item._id),
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn p-4">
      <InventoryHeader onCreateClick={handleCreate} />
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <InventoryTable
          inventory={safeInventory}
          branches={branches}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
        />
      </div>
      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
};