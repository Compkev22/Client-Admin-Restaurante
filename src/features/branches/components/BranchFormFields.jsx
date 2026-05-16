// features/branches/components/BranchFormFields.jsx
export const BranchFormFields = ({ register, errors }) => {
  /*
    Clases reutilizables para mantener consistencia y reducir repetición.
  */
  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none text-sm transition-colors";
  const inputErrorClass =
    "w-full px-4 py-2.5 rounded-xl border border-red-400 focus:ring-2 focus:ring-red-300 outline-none text-sm";
  const labelClass = "text-sm font-bold text-gray-700";
  const errorClass = "text-red-500 text-[10px] font-bold mt-0.5";

  return (
    /*
      Grid de 1 columna en móvil (320-640px), 2 columnas desde sm (640px+).
      Cada campo de ancho completo usa sm:col-span-2.
    */
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">

      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Nombre</label>
        <input
          {...register("name", { required: "Requerido" })}
          className={errors.name ? inputErrorClass : inputClass}
          placeholder="Ej: Sucursal Central"
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Email</label>
        <input
          type="email"
          {...register("Email", { required: "El correo es obligatorio" })}
          className={errors.Email ? inputErrorClass : inputClass}
          placeholder="sucursal@ejemplo.com"
        />
        {errors.Email && <p className={errorClass}>{errors.Email.message}</p>}
      </div>

      {/* Dirección — ocupa las 2 columnas en sm+ */}
      <div className="sm:col-span-2 flex flex-col gap-1">
        <label className={labelClass}>Dirección</label>
        <input
          {...register("address", { required: "Requerido" })}
          className={errors.address ? inputErrorClass : inputClass}
          placeholder="Ej: 6a Avenida 0-60"
        />
        {errors.address && <p className={errorClass}>{errors.address.message}</p>}
      </div>

      {/* Zona */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Zona</label>
        <input
          type="number"
          {...register("zone", {
            required: "Requerido",
            min: { value: 1, message: "La zona mínima es 1" },
            max: { value: 25, message: "La zona máxima es 25" },
          })}
          className={errors.zone ? inputErrorClass : inputClass}
          placeholder="Ej: 10"
        />
        {errors.zone && <p className={errorClass}>{errors.zone.message}</p>}
      </div>

      {/* Ciudad */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Ciudad</label>
        <input
          {...register("city", { required: "Requerido" })}
          className={errors.city ? inputErrorClass : inputClass}
          placeholder="Ej: Guatemala"
        />
        {errors.city && <p className={errorClass}>{errors.city.message}</p>}
      </div>

      {/* Categoría */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Categoría</label>
        <select
          {...register("Category", { required: "Requerido" })}
          className={`${inputClass} bg-white cursor-pointer`}
        >
          <option value="Fast Food">Fast Food</option>
          <option value="Familiar">Familiar</option>
          <option value="Gourmet">Gourmet</option>
          <option value="Buffet">Buffet</option>
        </select>
      </div>

      {/* Teléfono */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Teléfono</label>
        <input
          type="number"
          {...register("phone", {
            required: "Requerido",
            pattern: { value: /^[0-9]{8}$/, message: "Número de teléfono inválido (8 dígitos)" },
          })}
          className={errors.phone ? inputErrorClass : inputClass}
          placeholder="Ej: 22345678"
        />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      {/* Horario: Apertura y Cierre en la misma fila siempre */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Hora de apertura</label>
        <input
          type="time"
          {...register("OpenedAt", { required: "Requerido" })}
          className={errors.OpenedAt ? inputErrorClass : inputClass}
        />
        {errors.OpenedAt && <p className={errorClass}>{errors.OpenedAt.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Hora de cierre</label>
        <input
          type="time"
          {...register("ClosedAt", { required: "Requerido" })}
          className={errors.ClosedAt ? inputErrorClass : inputClass}
        />
        {errors.ClosedAt && <p className={errorClass}>{errors.ClosedAt.message}</p>}
      </div>

    </div>
  );
};