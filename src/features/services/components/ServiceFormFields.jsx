// features/services/components/ServiceFormFields.jsx
export const ServiceFormFields = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Nombre del Servicio</label>
        <input
          type="text"
          placeholder="Ej: Decoración de Cumpleaños VIP"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-bold text-gray-700"
          {...register("Name", {
            required: "El nombre del servicio es obligatorio",
            minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
          })}
        />
        {errors.Name && <p className="text-red-600 text-xs font-bold mt-1">{errors.Name.message}</p>}
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Descripción Detallada</label>
        <textarea
          rows="3"
          placeholder="Incluye globos, pastel pequeño y música temática..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none resize-none text-gray-600 font-medium"
          {...register("Description", { required: "La descripción es obligatoria" })}
        />
        {errors.Description && <p className="text-red-600 text-xs font-bold mt-1">{errors.Description.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Precio */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Precio Extra (Q)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-black text-kinal-red"
            {...register("AdditionalPrice", {
              required: "El precio es obligatorio",
              min: { value: 0.01, message: "Mínimo Q0.01" },
              max: { value: 10000, message: "Límite excedido" },
            })}
          />
          {errors.AdditionalPrice && <p className="text-red-600 text-xs font-bold mt-1">{errors.AdditionalPrice.message}</p>}
        </div>

        {/* Estado */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Estado</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700"
            {...register("status")}
          >
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
          </select>
        </div>
      </div>
    </div>
  );
};