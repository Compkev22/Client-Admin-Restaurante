// features/services/components/ServiceFormFields.jsx
export const ServiceFormFields = ({ register, errors }) => (
  <div className="grid grid-cols-1 gap-4">

    {/* Nombre */}
    <div className="flex flex-col gap-1">
      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
        Nombre del Servicio
      </label>
      <input
        type="text"
        placeholder="Ej: Decoración de Cumpleaños VIP"
        maxLength={100}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-bold text-gray-700"
        {...register("Name", {
          required: "El nombre del servicio es obligatorio",
          minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
          maxLength: { value: 100, message: "Máximo 100 caracteres" },
          validate: (v) => v.trim().length >= 3 || "El nombre no puede estar vacío",
        })}
      />
      {errors.Name && (
        <p className="text-red-600 text-xs font-bold">{errors.Name.message}</p>
      )}
    </div>

    {/* Descripción */}
    <div className="flex flex-col gap-1">
      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
        Descripción Detallada
      </label>
      <textarea
        rows="3"
        placeholder="Incluye globos, pastel pequeño y música temática..."
        maxLength={500}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none resize-none text-gray-600 font-medium"
        {...register("Description", {
          required: "La descripción es obligatoria",
          minLength: { value: 10, message: "La descripción debe tener al menos 10 caracteres" },
          maxLength: { value: 500, message: "Máximo 500 caracteres" },
          validate: (v) => v.trim().length >= 10 || "La descripción no puede estar vacía",
        })}
      />
      {errors.Description && (
        <p className="text-red-600 text-xs font-bold">{errors.Description.message}</p>
      )}
    </div>

    {/* Precio y Estado */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
          Precio Extra (Q)
        </label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          max="10000"
          onInput={(e) => {
            if (e.target.value < 0) e.target.value = 0;
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-black text-kinal-red"
          {...register("AdditionalPrice", {
            required: "El precio es obligatorio",
            min: { value: 0.01, message: "Mínimo Q0.01" },
            max: { value: 10000, message: "Límite máximo Q10,000" },
          })}
        />
        {errors.AdditionalPrice && (
          <p className="text-red-600 text-xs font-bold">{errors.AdditionalPrice.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
          Estado
        </label>
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