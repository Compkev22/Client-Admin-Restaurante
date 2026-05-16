// src/features/users/components/UserPage.jsx
import { useState, useEffect } from "react";
import { UserModal } from "./UserModal.jsx";
import { UserCard } from "./UserCard.jsx";
import { useUserStore, useBranchStore } from "../store/adminStore.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { showError } from "../../../shared/utils/toast.js";
import createIcon from "../../../assets/icons/Create.svg";

export const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const { users, getUsers, error, deleteUser } = useUserStore();
  const { getBranches } = useBranchStore();

  useEffect(() => { getUsers(); getBranches(); }, []);
  useEffect(() => { if (error) showError(error); }, [error]);

  const tabs = ["Todos", "Admins", "Empleados", "Clientes", "Inactivos"];

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.UserEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === "Inactivos") return u.UserStatus === "INACTIVE";
    if (activeTab === "Admins") return ["PLATFORM_ADMIN", "BRANCH_ADMIN"].includes(u.role);
    if (activeTab === "Empleados") return u.role === "EMPLOYEE";
    if (activeTab === "Clientes") return u.role === "CLIENT";
    return true;
  });

  const handleDelete = (user) => {
    showConfirmToast({
      title: "Cambiar Estado",
      message: `¿Cambiar el estado de ${user.UserName}?`,
      onConfirm: async () => { await deleteUser(user.uid || user._id); getUsers(); },
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn p-2 md:p-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 italic uppercase">
            Directorio de <span className="text-kinal-red">Usuarios</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Gestión de personal y clientes.
          </p>
        </div>
        <button
          onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
          className="w-full sm:w-auto bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2 shrink-0"
        >
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Buscador */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-5 pr-12 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red font-medium text-gray-700"
        />
      </div>

      {/* Tabs */}
      <nav className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm uppercase transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-kinal-red text-white shadow-md"
                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredUsers.map((user) => (
          <UserCard
            key={user._id || user.uid}
            user={user}
            onEdit={(u) => { setSelectedUser(u); setIsModalOpen(true); }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedUser(null); }}
        userData={selectedUser}
      />
    </div>
  );
};