import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveUser } from "../hooks/useSaveUser";
import { useBranchStore } from "../../users/store/adminStore";

export const UserModal = ({ isOpen, onClose, userData = null }) => {
  const [selectedRole, setSelectedRole] = useState(userData?.role || "CLIENT");
  const { register, handleSubmit, reset, setValue } = useForm();
  const { saveUser } = useSaveUser();
  const branches = useBranchStore((state) => state.branches);

  useEffect(() => {
    if (userData) {
      reset({
        UserName: userData.UserName,
        UserSurname: userData.UserSurname,
        UserEmail: userData.UserEmail,
        role: userData.role,
        UserStatus: userData.UserStatus,
        branchId: userData.branchId?._id || userData.branchId
      });
      setSelectedRole(userData.role);
    } else {
      reset({ role: "CLIENT", UserStatus: "ACTIVE" });
      setSelectedRole("CLIENT");
    }
  }, [userData, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      await saveUser(data, userData?.uid || userData?._id);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic text-gray-800 uppercase">
              {userData ? 'Editar' : 'Nuevo'} <span className="text-kinal-red">Usuario</span>
            </h2>
            <p className="text-sm font-bold text-gray-400">Gestión de cuentas y permisos de acceso.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl transition-colors">×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Nombres</label>
              <input {...register("UserName")} type="text" required placeholder="Ej: Kevin Estuardo" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-700" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Apellidos</label>
              <input {...register("UserSurname")} type="text" required placeholder="Ej: Velásquez Rivera" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-700" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-sm font-bold text-gray-700">Correo Electrónico</label>
              <input {...register("UserEmail")} type="email" required placeholder="ejemplo@kinal.edu.gt" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-700" />
            </div>
            
            {!userData && (
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-bold text-gray-700">Contraseña Temporal</label>
                <input {...register("password")} type="password" required placeholder="Mínimo 8 caracteres" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-mono text-gray-700" />
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-2 gap-4 bg-orange-50 p-5 rounded-2xl border border-orange-100">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Rol del Sistema</label>
              <select 
                {...register("role")}
                value={selectedRole}
                onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setValue("role", e.target.value);
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-black text-gray-700"
              >
                <option value="CLIENT">Cliente</option>
                <option value="EMPLOYEE">Empleado</option>
                <option value="BRANCH_ADMIN">Admin de Sucursal</option>
                <option value="PLATFORM_ADMIN">Admin de Plataforma</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Estado de la Cuenta</label>
              <select {...register("UserStatus")} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium text-gray-700">
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo / Bloqueado</option>
              </select>
            </div>

            {['BRANCH_ADMIN', 'EMPLOYEE'].includes(selectedRole) && (
              <div className="flex flex-col gap-1 col-span-2 mt-2 animate-fadeIn">
                <label className="text-sm font-bold text-gray-700 flex justify-between">
                  <span>Asignar Sucursal</span>
                  <span className="text-xs text-kinal-orange italic">Obligatorio para este rol</span>
                </label>
                <select {...register("branchId")} required className="w-full px-4 py-3 rounded-xl border border-kinal-orange focus:ring-2 focus:ring-kinal-red outline-none bg-white font-medium text-gray-700">
                  <option value="">Selecciona la sucursal de trabajo...</option>
                  {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                </select>
              </div>
            )}
          </div>

          <div className="pt-4 flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-2 bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">
              {userData ? 'Actualizar' : 'Crear'} Usuario
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};