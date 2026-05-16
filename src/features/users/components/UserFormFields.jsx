// src/features/users/components/UserFormFields.jsx
export const UserFormFields = ({ register, userData, selectedRole, setSelectedRole, setValue, branches }) => (
  <div className="space-y-5">
    {/* Nombres y Apellidos */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Nombres</label>
        <input
          {...register("UserName", { required: "El nombre es requerido" })}
          type="text"
          placeholder="Ej: Kevin Estuardo"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-700"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Apellidos</label>
        <input
          {...register("UserSurname", { required: "El apellido es requerido" })}
          type="text"
          placeholder="Ej: Velásquez Rivera"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-700"
        />
      </div>
    </div>

    {/* Correo — span completo */}
    <div className="flex flex-col gap-1">
      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Correo Electrónico</label>
      <input
        {...register("UserEmail", { required: "El correo es obligatorio" })}
        type="email"
        placeholder="ejemplo@kinal.edu.gt"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-700"
      />
    </div>

    {/* Contraseña solo en creación */}
    {!userData && (
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Contraseña Temporal</label>
        <input
          {...register("password", { required: "La contraseña es obligatoria" })}
          type="password"
          placeholder="Mínimo 8 caracteres"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-mono text-gray-700"
        />
      </div>
    )}

    <hr className="border-gray-100" />

    {/* Rol, Estado y Sucursal */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-orange-50 p-4 md:p-5 rounded-2xl border border-orange-100">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Rol del Sistema</label>
        <select
          {...register("role")}
          value={selectedRole}
          onChange={(e) => { setSelectedRole(e.target.value); setValue("role", e.target.value); }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-black text-gray-700"
        >
          <option value="CLIENT">Cliente</option>
          <option value="EMPLOYEE">Empleado</option>
          <option value="BRANCH_ADMIN">Admin de Sucursal</option>
          <option value="PLATFORM_ADMIN">Admin de Plataforma</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Estado de la Cuenta</label>
        <select
          {...register("UserStatus")}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium text-gray-700"
        >
          <option value="ACTIVE">Activo</option>
          <option value="INACTIVE">Inactivo / Bloqueado</option>
        </select>
      </div>

      {/* Sucursal — solo para roles que la requieren */}
      {["BRANCH_ADMIN", "EMPLOYEE"].includes(selectedRole) && (
        <div className="flex flex-col gap-1 sm:col-span-2 animate-fadeIn">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex justify-between">
            <span>Asignar Sucursal</span>
            <span className="text-kinal-orange italic normal-case font-bold text-xs">Obligatorio</span>
          </label>
          <select
            {...register("branchId", { required: true })}
            className="w-full px-4 py-3 rounded-xl border border-kinal-orange focus:ring-2 focus:ring-kinal-red outline-none bg-white font-medium text-gray-700"
          >
            <option value="">Selecciona la sucursal...</option>
            {branches.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
          </select>
        </div>
      )}
    </div>
  </div>
);