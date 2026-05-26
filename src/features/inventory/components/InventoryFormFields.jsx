export const InventoryFormFields = ({ register, errors, branches }) => {
  return (
    <div className="grid grid-cols-1 gap-4">

      {/* Sucursal */}
      <div className="flex flex-col">
        <label className="text-xs font-black uppercase text-gray-400 mb-1">
          Sucursal a la que pertenece
        </label>
        <select
          {...register("branchId", { required: "La sucursal es obligatoria" })}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-bold text-gray-700 bg-white text-sm"
        >
          <option value="">Selecciona una sucursal...</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>
        {errors.branchId && (
          <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.branchId.message}</p>
        )}
      </div>

      {/* Nombre */}
      <div className="flex flex-col">
        <label className="text-xs font-black uppercase text-gray-400 mb-1">
          Nombre del Insumo
        </label>
        <input
          type="text"
          maxLength={100}
          {...register("name", {
            required: "El nombre es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
            validate: (v) => v.trim().length >= 2 || "El nombre no puede estar vacío",
          })}
          placeholder="EJ: Pechuga de Pollo"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-bold text-sm"
        />
        {errors.name && (
          <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="flex flex-col">
        <label className="text-xs font-black uppercase text-gray-400 mb-1">
          Descripción / Presentación
        </label>
        <textarea
          maxLength={250}
          {...register("description", {
            required: "La descripción es obligatoria",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
            maxLength: { value: 250, message: "Máximo 250 caracteres" },
            validate: (v) => v.trim().length >= 5 || "La descripción no puede estar vacía",
          })}
          placeholder="EJ: Caja de 40 lbs"
          rows="2"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-medium resize-none text-sm"
        />
        {errors.description && (
          <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.description.message}</p>
        )}
      </div>

      {/* Stock + Costo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-xs font-black uppercase text-gray-400 mb-1">Stock Actual</label>
          <input
            type="number"
            min="0"
            max="100000"
            onInput={(e) => {
              if (e.target.value < 0) e.target.value = 0;
            }}
            {...register("stock", {
              required: "Obligatorio",
              min: { value: 0, message: "No puede ser negativo" },
              max: { value: 100000, message: "Límite excedido (máx. 100,000)" },
            })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold text-sm"
          />
          {errors.stock && (
            <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.stock.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-black uppercase text-gray-400 mb-1">Costo Unit. (Q)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            max="50000"
            onInput={(e) => {
              if (e.target.value < 0) e.target.value = 0;
            }}
            {...register("unitCost", {
              required: "Obligatorio",
              min: { value: 0.01, message: "Mínimo Q0.01" },
              max: { value: 50000, message: "Revisa el costo (máx. Q50,000)" },
            })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold text-sm"
          />
          {errors.unitCost && (
            <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.unitCost.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};