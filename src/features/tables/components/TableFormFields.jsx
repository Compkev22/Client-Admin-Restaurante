// features/tables/components/TableFormFields.jsx
export const TableFormFields = ({ register, errors, branches }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Sucursal */}
        <div className="flex flex-col gap-1 col-span-2">
          <label className="text-sm font-bold text-gray-700">Sucursal</label>
          <select {...register("branchId", { required: true })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
            <option value="">Selecciona la sucursal...</option>
            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
          </select>
        </div>

        {/* Número de Mesa */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Número de Mesa</label>
          <input
            type="number"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-black text-gray-700"
            {...register("numberTable", { required: "Requerido", min: { value: 1, message: "Mínimo 1" }, max: { value: 100, message: "Máximo 100" } })}
          />
          {errors?.numberTable && <p className="text-red-500 text-xs font-bold">{errors.numberTable.message}</p>}
        </div>

        {/* Capacidad */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Capacidad (Personas)</label>
          <input
            type="number"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-bold text-gray-700"
            {...register("capacity", { required: "Requerido", min: { value: 1, message: "Mínimo 1 persona" }, max: { value: 50, message: "Máximo 50 personas" } })}
          />
          {errors?.capacity && <p className="text-red-500 text-xs font-bold">{errors.capacity.message}</p>}
        </div>
      </div>

      {/* Disponibilidad, Estado y Coordenadas */}
      <div className="grid grid-cols-2 gap-4 bg-orange-50 p-5 rounded-2xl border border-orange-100">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Disponibilidad Actual</label>
          <select {...register("availability")} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
            <option value="Disponible">🟢 Disponible</option>
            <option value="Ocupada">🔴 Ocupada</option>
            <option value="Mantenimiento">🟡 Mantenimiento</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Estado del Registro</label>
          <select {...register("TableStatus")} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo (Soft Delete)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 col-span-2 mt-2">
          <label className="text-sm font-bold text-gray-700">Coordenadas en el Mapa (X, Y)</label>
          <div className="flex gap-2">
            <input {...register("coordsX")} type="number" placeholder="X" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-mono text-gray-500" />
            <input {...register("coordsY")} type="number" placeholder="Y" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-mono text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};