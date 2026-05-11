// features/inventory/components/InventoryFormFields.jsx
export const InventoryFormFields = ({ register, errors, branches }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Selector de Sucursal */}
      <div className="flex flex-col">
        <label className="text-xs font-black uppercase text-gray-400 mb-1">Sucursal a la que pertenece</label>
        <select
          {...register("branchId", { required: "La sucursal es obligatoria" })}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-bold text-gray-700 bg-white"
        >
          <option value="">Selecciona una sucursal...</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>
        {errors.branchId && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.branchId.message}</p>}
      </div>

      {/* Nombre */}
      <div className="flex flex-col">
        <label className="text-xs font-black uppercase text-gray-400 mb-1">Nombre del Insumo</label>
        <input
          {...register("name", { required: "El nombre es obligatorio" })}
          placeholder="EJ: Pechuga de Pollo"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-bold"
        />
        {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name.message}</p>}
      </div>

      {/* Descripción */}
      <div className="flex flex-col">
        <label className="text-xs font-black uppercase text-gray-400 mb-1">Descripción / Presentación</label>
        <textarea
          {...register("description", { required: "La descripción es obligatoria" })}
          placeholder="EJ: Caja de 40 lbs"
          rows="2"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-medium resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Stock */}
        <div className="flex flex-col">
          <label className="text-xs font-black uppercase text-gray-400 mb-1">Stock Actual</label>
          <input
            type="number"
            {...register("stock", { required: "Obligatorio", min: { value: 0, message: "No puede ser negativo" }, max: { value: 10000, message: "Límite excedido" } })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold"
          />
          {errors.stock && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.stock.message}</p>}
        </div>

        {/* Costo Unitario */}
        <div className="flex flex-col">
          <label className="text-xs font-black uppercase text-gray-400 mb-1">Costo Unit. (Q)</label>
          <input
            type="number"
            step="0.01"
            {...register("unitCost", { required: "Obligatorio", min: { value: 0, message: "Mínimo Q0.01" }, max: { value: 50000, message: "Revisa el costo" } })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold"
          />
          {errors.unitCost && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.unitCost.message}</p>}
        </div>
      </div>
    </div>
  );
};