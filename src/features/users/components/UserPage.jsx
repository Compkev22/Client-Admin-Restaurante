// src/features/users/components/UserPage.jsx
import { useState, useEffect } from "react";
import { UserModal } from "./UserModal";
import { UserCard } from "./UserCard";
import { useUserStore, useBranchStore } from "../store/adminStore";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { showError } from "../../../shared/utils/toast";
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

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) || u.UserEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === "Inactivos") return u.UserStatus === "INACTIVE";
    if (activeTab === "Admins") return ['PLATFORM_ADMIN', 'BRANCH_ADMIN'].includes(u.role);
    if (activeTab === "Empleados") return u.role === 'EMPLOYEE';
    if (activeTab === "Clientes") return u.role === 'CLIENT';
    return true;
  });

  const handleDelete = (user) => {
    showConfirmToast({
      title: "Cambiar Estado",
      message: `¿Cambiar el estado de ${user.UserName}?`,
      onConfirm: async () => { await deleteUser(user.uid || user._id); getUsers(); }
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">Directorio de <span className="text-kinal-red">Usuarios</span></h1>
          <p className="text-gray-500 font-medium">Gestión de personal y clientes.</p>
        </div>
        <div className="relative w-full xl:max-w-sm">
          <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-5 pr-12 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-red" />
        </div>
        <button onClick={() => { setSelectedUser(null); setIsModalOpen(true); }} className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 flex items-center gap-2">
          <img src={createIcon} alt="C" className="w-5 h-5 invert" /> <span>Nuevo Usuario</span>
        </button>
      </header>

      <nav className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all ${activeTab === tab ? 'bg-kinal-red text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>{tab}</button>
        ))}
      </nav>

      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user._id || user.uid} user={user} onEdit={(u) => { setSelectedUser(u); setIsModalOpen(true); }} onDelete={handleDelete} />
        ))}
      </main>

      <UserModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedUser(null); }} userData={selectedUser} />
    </div>
  );
};