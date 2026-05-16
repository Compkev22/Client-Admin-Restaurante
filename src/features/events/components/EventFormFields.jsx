// features/events/components/EventFormFields.jsx
export const EventFormFields = ({ register, branches, users, minDateStr }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Nombre — ancho completo */}
    <div className="sm:col-span-2 space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Nombre
      </label>
      <input
        {...register("name", { required: "Requerido" })}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-700 outline-none text-sm"
      />
    </div>

    {/* Cliente */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Cliente
      </label>
      <select
        {...register("clientId", { required: true })}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      >
        <option value="">Elegir cliente...</option>
        {users
          .filter((u) => u.role === "CLIENT" && u.UserStatus === "ACTIVE")
          .map((u) => (
            <option key={u._id || u.uid} value={u._id || u.uid}>
              {u.UserName} {u.UserSurname}
            </option>
          ))}
      </select>
    </div>

    {/* Sucursal */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Sucursal
      </label>
      <select
        {...register("branchId", { required: "Sucursal es requerida" })}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      >
        <option value="">Elegir sucursal...</option>
        {branches &&
          branches.length > 0 &&
          branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.name}
            </option>
          ))}
      </select>
    </div>

    {/* Fecha */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Fecha (Mín. 1 mes)
      </label>
      <input
        type="date"
        min={minDateStr}
        {...register("eventDate", {
          required: "Requerido",
          min: { value: minDateStr, message: "La fecha debe ser al menos un mes en el futuro" },
        })}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      />
    </div>

    {/* Personas */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Personas
      </label>
      <input
        {...register("numberOfPersons", { required: true })}
        type="number"
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      />
    </div>

    {/* Hora inicio */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Inicio (07:00 - 22:00)
      </label>
      <input
        {...register("startTime", { required: true })}
        type="time"
        min="07:00"
        max="22:00"
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      />
    </div>

    {/* Hora fin */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Fin (07:00 - 22:00)
      </label>
      <input
        {...register("endTime", { required: true })}
        type="time"
        min="07:00"
        max="22:00"
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      />
    </div>

    {/* Estado — ancho completo */}
    <div className="sm:col-span-2 space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Estado del Evento
      </label>
      <select
        {...register("status")}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      >
        <option value="Pendiente">Pendiente</option>
        <option value="Confirmado">Confirmado</option>
        <option value="Cancelado">Cancelado</option>
      </select>
    </div>
  </div>
);