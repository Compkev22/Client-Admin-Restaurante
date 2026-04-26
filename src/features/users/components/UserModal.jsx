import { useState } from "react";

export const UserModal = ({ isOpen, onClose, userData = null }) => {
  // Estado para controlar el rol seleccionado y mostrar/ocultar la sucursal
  const [selectedRole, setSelectedRole] = useState(userData?.role || "CLIENT");

  if (!isOpen) return null;

  // Mock de Sucursales
  const branches = [
    { id: "b1", name: "KFC Zona 10" },
    { id: "b2", name: "KFC Miraflores" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic text-gray-800 uppercase">
              {userData ? 'Editar' : 'Nuevo'} <span className="text-kinal-red">Usuario</span>
            </h2>
            <p className="text-sm font-bold text-gray-400">Gestión de cuentas y permisos de acceso.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl transition-colors">×</button>
        </div>

        <form className="p-8 space-y-6">
          
          {/* SECCIÓN 1: DATOS PERSONALES */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Nombres</label>
              <input type="text" required placeholder="Ej: Kevin Estuardo" defaultValue={userData?.UserName} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-700" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Apellidos</label>
              <input type="text" required placeholder="Ej: Velásquez Rivera" defaultValue={userData?.UserSurname} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-700" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-sm font-bold text-gray-700">Correo Electrónico</label>
              <input type="email" required placeholder="ejemplo@kinal.edu.gt" defaultValue={userData?.UserEmail} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-700" />
            </div>
            
            {/* Si es creación, pedimos la contraseña */}
            {!userData && (
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-bold text-gray-700">Contraseña Temporal</label>
                <input type="password" required placeholder="Mínimo 8 caracteres" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-mono text-gray-700" />
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* SECCIÓN 2: PERMISOS Y ESTADO */}
          <div className="grid grid-cols-2 gap-4 bg-orange-50 p-5 rounded-2xl border border-orange-100">
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Rol del Sistema</label>
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
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
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium text-gray-700">
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo / Bloqueado</option>
              </select>
            </div>

            {/* RENDERIZADO CONDICIONAL DE LA SUCURSAL */}
            {['BRANCH_ADMIN', 'EMPLOYEE'].includes(selectedRole) && (
              <div className="flex flex-col gap-1 col-span-2 mt-2 animate-fadeIn">
                <label className="text-sm font-bold text-gray-700 flex justify-between">
                  <span>Asignar Sucursal</span>
                  <span className="text-xs text-kinal-orange italic">Obligatorio para este rol</span>
                </label>
                <select required className="w-full px-4 py-3 rounded-xl border border-kinal-orange focus:ring-2 focus:ring-kinal-red outline-none bg-white font-medium text-gray-700">
                  <option value="">Selecciona la sucursal de trabajo...</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
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