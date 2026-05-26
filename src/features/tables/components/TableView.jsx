import { useEffect, useState } from "react";
import { useTableStore } from "../../users/store/adminStore.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { showError } from "../../../shared/utils/toast.js";
import { TableHeader } from "./TableHeader.jsx";
import { TableTabs } from "./TableTabs.jsx";
import { TableGrid } from "./TableGrid.jsx";
import { TableModal } from "./TableModal.jsx";

export const TablePage = () => {
  const { tables, getTables, deleteTable, error, loading } = useTableStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [activeTab, setActiveTab] = useState("Todas");

  useEffect(() => { getTables(); }, [getTables]);
  useEffect(() => { if (error) showError(error); }, [error]);

  const safeTables = Array.isArray(tables) ? tables : [];
  const filtered = safeTables.filter((t) => activeTab === "Todas" || t.availability === activeTab);

  const handleEdit = (table) => { setSelectedTable(table); setIsModalOpen(true); };
  const handleCreate = () => { setSelectedTable(null); setIsModalOpen(true); };

  const handleDelete = (table) => {
    showConfirmToast({
      title: "Eliminar Mesa",
      message: `¿Estás seguro de eliminar la mesa #${table.numberTable}?`,
      onConfirm: () => deleteTable(table._id),
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn p-2 md:p-4">
      <TableHeader onCreateClick={handleCreate} />
      <TableTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <TableGrid
        tables={filtered}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <TableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tableData={selectedTable}
      />
    </div>
  );
};