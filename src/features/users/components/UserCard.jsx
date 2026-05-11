// src/features/users/components/UserCard.jsx
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import UserVerifyIcon from "../../../assets/icons/UserVerify.svg";
import { useBranchStore } from "../../users/store/adminStore";

export const UserCard = ({ user, onEdit, onDelete }) => {
  const isInactive = user.UserStatus === "INACTIVE";
  const initials = `${user.UserName?.charAt(0)}${user.UserSurname?.charAt(0)}`.toUpperCase();

  const roleStyles = {
    PLATFORM_ADMIN: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Admin Plataforma' },
    BRANCH_ADMIN: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Admin Sucursal' },
    EMPLOYEE: { bg: 'bg-orange-100', text: 'text-kinal-orange', label: 'Empleado' },
    CLIENT: { bg: 'bg-green-100', text: 'text-green-700', label: 'Cliente' },
  };

  const style = roleStyles[user.role] || { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Usuario' };

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative flex flex-col ${isInactive ? 'opacity-60 grayscale' : ''}`}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl border-2 ${style.bg} ${style.text} border-white ring-2 ring-gray-100`}>
          {initials}
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-gray-800 truncate">{user.UserName} {user.UserSurname}</h3>
            {user.isVerified && <img src={UserVerifyIcon} alt="V" className="w-5 h-5 ml-1" />}
          </div>
          <p className="text-xs font-bold text-gray-400 truncate mt-1">{user.UserEmail}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6 flex-grow text-left">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rol</p>
          <span className={`text-xs font-black px-3 py-1 rounded-full uppercase ${style.bg} ${style.text}`}>{style.label}</span>
        </div>
        {['BRANCH_ADMIN', 'EMPLOYEE'].includes(user.role) && (
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sucursal Asignada</p>
            <p className="text-sm font-bold text-gray-700">
              {user.branchId?.name || useBranchStore.getState().branches.find(b => b._id === user.branchId)?.name || "Sin asignar"}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center border-t border-gray-50 pt-4">
        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${isInactive ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{isInactive ? 'Inactivo' : 'Activo'}</span>
        <div className="flex gap-2">
          <button onClick={() => onEdit(user)} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"><img src={iconEdit} className="w-5 h-5 opacity-70" alt="Edit" /></button>
          <button onClick={() => onDelete(user)} className="p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"><img src={iconDelete} className="w-5 h-5 opacity-70" alt="Delete" /></button>
        </div>
      </div>
    </div>
  );
};