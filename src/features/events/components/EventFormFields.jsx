// features/events/components/EventFormFields.jsx
export const EventFormFields = ({ register, errors, branches, users, minDateStr }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Nombre — ancho completo */}
    <div className="sm:col-span-2 space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Nombre del Evento
      </label>
      <input
        type="text"
        maxLength={100}
        {...register("name", {
          required: "El nombre es obligatorio",
          minLength: { value: 5, message: "Mínimo 5 caracteres" },
          maxLength: { value: 100, message: "Máximo 100 caracteres" },
          validate: (v) => v.trim().length >= 5 || "El nombre no puede estar vacío",
        })}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-700 outline-none text-sm"
      />
      {errors?.name && (
        <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name.message}</p>
      )}
    </div>

    {/* Cliente */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Cliente
      </label>
      <select
        {...register("clientId", { required: "El cliente es obligatorio" })}
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
      {errors?.clientId && (
        <p className="text-red-500 text-[10px] font-bold ml-1">{errors.clientId.message}</p>
      )}
    </div>

    {/* Sucursal */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Sucursal
      </label>
      <select
        {...register("branchId", { required: "La sucursal es obligatoria" })}
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
      {errors?.branchId && (
        <p className="text-red-500 text-[10px] font-bold ml-1">{errors.branchId.message}</p>
      )}
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
          required: "La fecha es obligatoria",
          validate: (v) =>
            new Date(v) >= new Date(minDateStr) ||
            "La fecha debe ser al menos un mes en el futuro",
        })}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      />
      {errors?.eventDate && (
        <p className="text-red-500 text-[10px] font-bold ml-1">{errors.eventDate.message}</p>
      )}
    </div>

    {/* Personas */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Personas
      </label>
      <input
        type="number"
        min="1"
        max="1000"
        onInput={(e) => {
          if (e.target.value < 1) e.target.value = 1;
          if (e.target.value > 1000) e.target.value = 1000;
        }}
        {...register("numberOfPersons", {
          required: "Indica la cantidad de personas",
          min: { value: 1, message: "Mínimo 1 persona" },
          max: { value: 1000, message: "Máximo 1000 personas" },
        })}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      />
      {errors?.numberOfPersons && (
        <p className="text-red-500 text-[10px] font-bold ml-1">{errors.numberOfPersons.message}</p>
      )}
    </div>

    {/* Hora inicio */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Inicio (07:00 - 22:00)
      </label>
      <input
        type="time"
        min="07:00"
        max="22:00"
        {...register("startTime", { required: "La hora de inicio es obligatoria" })}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      />
      {errors?.startTime && (
        <p className="text-red-500 text-[10px] font-bold ml-1">{errors.startTime.message}</p>
      )}
    </div>

    {/* Hora fin */}
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Fin (07:00 - 22:00)
      </label>
      <input
        type="time"
        min="07:00"
        max="22:00"
        {...register("endTime", { required: "La hora de fin es obligatoria" })}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none text-sm"
      />
      {errors?.endTime && (
        <p className="text-red-500 text-[10px] font-bold ml-1">{errors.endTime.message}</p>
      )}
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

    <div className="sm:col-span-2 space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 italic">
        Notas (Opcional)
      </label>
      <textarea
        rows="2"
        maxLength={500}
        {...register("notes", {
          maxLength: { value: 500, message: "Máximo 500 caracteres" },
        })}
        placeholder="Indicaciones especiales, decoración, etc."
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none resize-none text-sm"
      />
      {errors?.notes && (
        <p className="text-red-500 text-[10px] font-bold ml-1">{errors.notes.message}</p>
      )}
    </div>
  </div>
);