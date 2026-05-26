const todayISO = new Date().toISOString().split("T")[0];

export const ReservationFormFields = ({ register, errors, branches, users, isEditing }) => {
  const clientOptions = users.filter(
    (u) =>
      u.role === "CLIENT" &&
      u.UserName?.toLowerCase() !== "consumidor" &&
      u.UserSurname?.toLowerCase() !== "final"
  );

  return (
    <div className="space-y-5">
      {/* Sucursal y Cliente */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 md:p-5 rounded-2xl border border-gray-100">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black uppercase text-gray-400">Sucursal</label>
          <select
            {...register("branchId", { required: "La sucursal es obligatoria" })}
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none bg-white font-bold ${
              errors.branchId ? "border-red-500" : "border-gray-100 focus:border-kinal-red"
            }`}
          >
            <option value="">Selecciona...</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
          {errors.branchId && (
            <p className="text-red-500 text-[10px] font-bold">{errors.branchId.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black uppercase text-gray-400">Cliente</label>
          <select
            {...register("clientId", { required: "El cliente es obligatorio" })}
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none bg-white font-bold ${
              errors.clientId ? "border-red-500" : "border-gray-100 focus:border-kinal-red"
            }`}
          >
            <option value="">Selecciona cliente...</option>
            {clientOptions.map((c) => {
              const id = c._id || c.uid;
              return (
                <option key={id} value={id}>
                  {c.UserName} {c.UserSurname}
                </option>
              );
            })}
          </select>
          {errors.clientId && (
            <p className="text-red-500 text-[10px] font-bold">{errors.clientId.message}</p>
          )}
        </div>
      </div>

      {/* Fecha, Hora, Personas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black uppercase text-gray-400">Fecha</label>
          <input
            type="date"
            min={todayISO}
            {...register("date", {
              required: "Selecciona una fecha",
              validate: (v) =>
                new Date(v) >= new Date(todayISO) || "No puedes reservar en el pasado",
            })}
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-bold ${
              errors.date ? "border-red-500" : "border-gray-100 focus:border-kinal-red"
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-[10px] font-bold">{errors.date.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black uppercase text-gray-400">Hora</label>
          <input
            type="time"
            {...register("time", { required: "Selecciona la hora" })}
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-bold ${
              errors.time ? "border-red-500" : "border-gray-100 focus:border-kinal-red"
            }`}
          />
          {errors.time && (
            <p className="text-red-500 text-[10px] font-bold">{errors.time.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black uppercase text-gray-400">Personas</label>
          <input
            type="number"
            min="1"
            max="50"
            onInput={(e) => {
              if (e.target.value < 1) e.target.value = 1;
              if (e.target.value > 50) e.target.value = 50;
            }}
            {...register("numberOfPersons", {
              required: "Ingresa la cantidad",
              min: { value: 1, message: "Mínimo 1" },
              max: { value: 50, message: "Máximo 50" },
            })}
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-bold ${
              errors.numberOfPersons ? "border-red-500" : "border-gray-100 focus:border-kinal-red"
            }`}
          />
          {errors.numberOfPersons && (
            <p className="text-red-500 text-[10px] font-bold">{errors.numberOfPersons.message}</p>
          )}
        </div>
      </div>

      {/* Notas */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black uppercase text-gray-400">Notas (Opcional)</label>
        <textarea
          rows="2"
          maxLength={250}
          {...register("notes", {
            maxLength: { value: 250, message: "Máximo 250 caracteres" },
          })}
          placeholder="Indicaciones especiales, alergias, etc."
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none resize-none font-medium"
        />
        {errors.notes && (
          <p className="text-red-500 text-[10px] font-bold">{errors.notes.message}</p>
        )}
      </div>

      {/* Estados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black uppercase text-gray-400">Estado</label>
          <select
            {...register("status")}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none bg-white font-bold"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Completada">Completada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
        {isEditing && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase text-gray-400">Estatus Lógico</label>
            <select
              {...register("statusRes")}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none bg-white font-bold"
            >
              <option value="ACTIVADO">Activado</option>
              <option value="DESACTIVADO">Desactivado</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};