export const TableFormFields = ({ register, errors, branches }) => (
  <div className="space-y-5">

    {/* Sucursal */}
    <div className="flex flex-col gap-1">
      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
        Sucursal
      </label>
      <select
        {...register("branchId", { required: "La sucursal es obligatoria" })}
        className={`w-full px-4 py-3 rounded-xl border outline-none bg-white font-medium ${
          errors.branchId
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-200 focus:ring-2 focus:ring-kinal-orange"
        }`}
      >
        <option value="">Selecciona la sucursal...</option>
        {branches.map((b) => (
          <option key={b._id} value={b._id}>{b.name}</option>
        ))}
      </select>
      {errors.branchId && (
        <p className="text-red-500 text-xs font-bold">{errors.branchId.message}</p>
      )}
    </div>

    {/* Número de Mesa y Capacidad */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
          Número de Mesa
        </label>
        <input
          type="number"
          min="1"
          max="1000"
          onInput={(e) => {
            if (e.target.value < 1) e.target.value = 1;
            if (e.target.value > 1000) e.target.value = 1000;
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-black text-gray-700"
          {...register("numberTable", {
            required: "El número de mesa es obligatorio",
            min: { value: 1, message: "Mínimo 1" },
            max: { value: 1000, message: "Máximo 1000" },
          })}
        />
        {errors.numberTable && (
          <p className="text-red-500 text-xs font-bold">{errors.numberTable.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
          Capacidad (Personas)
        </label>
        <input
          type="number"
          min="1"
          max="50"
          onInput={(e) => {
            if (e.target.value < 1) e.target.value = 1;
            if (e.target.value > 50) e.target.value = 50;
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-bold text-gray-700"
          {...register("capacity", {
            required: "La capacidad es obligatoria",
            min: { value: 1, message: "Mínimo 1 persona" },
            max: { value: 50, message: "Máximo 50 personas" },
          })}
        />
        {errors.capacity && (
          <p className="text-red-500 text-xs font-bold">{errors.capacity.message}</p>
        )}
      </div>
    </div>

    {/* Disponibilidad, Estado y Coordenadas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-orange-50 p-4 md:p-5 rounded-2xl border border-orange-100">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
          Disponibilidad Actual
        </label>
        <select
          {...register("availability")}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium"
        >
          <option value="Disponible">🟢 Disponible</option>
          <option value="Ocupada">🔴 Ocupada</option>
          <option value="Mantenimiento">🟡 Mantenimiento</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
          Estado del Registro
        </label>
        <select
          {...register("TableStatus")}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium"
        >
          <option value="ACTIVE">Activo</option>
          <option value="INACTIVE">Inactivo (Soft Delete)</option>
        </select>
      </div>

      {/* Coordenadas */}
      <div className="flex flex-col gap-1 sm:col-span-2 mt-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
          Coordenadas en el Mapa (X, Y)
        </label>
        <div className="flex gap-2">
          <input
            {...register("coordsX")}
            type="number"
            placeholder="X"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-mono text-gray-500"
          />
          <input
            {...register("coordsY")}
            type="number"
            placeholder="Y"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-mono text-gray-500"
          />
        </div>
      </div>
    </div>
  </div>
);