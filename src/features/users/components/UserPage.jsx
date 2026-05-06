import { useState, useEffect } from "react";
import { UserModal } from "./UserModal";
import { useUserStore, useBranchStore } from "../store/adminStore";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

import createIcon from "../../../assets/icons/Create.svg";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import UserVerifyIcon from "../../../assets/icons/UserVerify.svg";

export const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Todos");

  const { users, getUsers, deleteUser } = useUserStore();
  const { getBranches } = useBranchStore();

  useEffect(() => {
    getUsers();
    getBranches();
  }, []);

  const tabs = ["Todos", "Admins", "Empleados", "Clientes", "Inactivos"];

  const filteredUsers = users.filter(u => {
    if (activeTab === "Inactivos") return u.UserStatus === "INACTIVE";
    if (u.UserStatus === "INACTIVE" && activeTab !== "Todos") return false;
    if (activeTab === "Admins") return u.role === "PLATFORM_ADMIN" || u.role === "BRANCH_ADMIN";
    if (activeTab === "Empleados") return u.role === "EMPLOYEE";
    if (activeTab === "Clientes") return u.role === "CLIENT";
    return true;
  });

  const getRoleStyle = (role) => {
    switch(role) {
      case 'PLATFORM_ADMIN': return { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Admin Plataforma' };
      case 'BRANCH_ADMIN': return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Admin Sucursal' };
      case 'EMPLOYEE': return { bg: 'bg-orange-100', text: 'text-kinal-orange', label: 'Empleado' };
      case 'CLIENT': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Cliente' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Usuario' };
    }
  };

  const handleDelete = (user) => {
    showConfirmToast({
      title: "Cambiar Estado",
      message: `¿Estás seguro de cambiar el estado de ${user.UserName}?`,
      onConfirm: async () => {
      await deleteUser(user.uid || user._id); 
      getUsers(); 
    }
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Directorio de <span className="text-kinal-red">Usuarios</span>
          </h1>
          <p className="text-gray-500 font-medium">Gestión de personal, clientes y administradores.</p>
        </div>
        
        <button 
          onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2"
        >
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-kinal-red text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const roleStyle = getRoleStyle(user.role);
          const isInactive = user.UserStatus === "INACTIVE";
          const initials = `${user.UserName?.charAt(0)}${user.UserSurname?.charAt(0)}`.toUpperCase();

          return (
            <div key={user._id || user.uid} className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative flex flex-col ${isInactive ? 'opacity-60 grayscale' : ''}`}>
              
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl shadow-inner border-2 ${roleStyle.bg} ${roleStyle.text} border-white ring-2 ring-gray-100`}>
                  {initials}
                </div>
                
                <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-gray-800 truncate leading-tight">
                      {user.UserName} {user.UserSurname}
                    </h3>
                    {user.isVerified && (
                      <img src={UserVerifyIcon} alt="Verificado" className="w-5 h-5 ml-1 object-contain" />
                    )}
                  </div>
                  <p className="text-xs font-bold text-gray-400 truncate mt-1">{user.UserEmail}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rol</p>
                  <span className={`text-xs font-black px-3 py-1 rounded-full uppercase ${roleStyle.bg} ${roleStyle.text}`}>
                    {roleStyle.label}
                  </span>
                </div>

                {['BRANCH_ADMIN', 'EMPLOYEE'].includes(user.role) && (
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sucursal Asignada</p>
                    <p className="text-sm font-bold text-gray-700">
                      {user.branchId?.name || 
                      useBranchStore.getState().branches.find(b => b._id === user.branchId)?.name || 
                      "Sin asignar"}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-auto">
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${isInactive ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {isInactive ? 'Inactivo' : 'Activo'}
                </span>

                <div className="flex gap-2">
                  <button onClick={() => handleEdit(user)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                    <img src={iconEdit} className="w-5 h-5 opacity-70" alt="Edit" />
                  </button>
                  <button onClick={() => handleDelete(user)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors">
                    <img src={iconDelete} className="w-5 h-5 opacity-70" alt="Delete" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedUser(null); }} 
        userData={selectedUser}
      />
    </div>
  );
};