export const BranchFormFields = ({ register, errors }) => {
  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none text-sm transition-colors";
  const inputErrorClass =
    "w-full px-4 py-2.5 rounded-xl border border-red-400 focus:ring-2 focus:ring-red-300 outline-none text-sm";
  const labelClass = "text-sm font-bold text-gray-700";
  const errorClass = "text-red-500 text-[10px] font-bold mt-0.5";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">

      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Nombre</label>
        <input
          {...register("name", {
            required: "Requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            validate: (v) => v.trim().length >= 3 || "No puede ser solo espacios",
          })}
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
          {...register("Email", {
            required: "El correo es obligatorio",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" },
          })}
          className={errors.Email ? inputErrorClass : inputClass}
          placeholder="sucursal@ejemplo.com"
        />
        {errors.Email && <p className={errorClass}>{errors.Email.message}</p>}
      </div>

      {/* Dirección */}
      <div className="sm:col-span-2 flex flex-col gap-1">
        <label className={labelClass}>Dirección</label>
        <input
          {...register("address", {
            required: "Requerido",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
            validate: (v) => v.trim().length >= 5 || "No puede ser solo espacios",
          })}
          className={errors.address ? inputErrorClass : inputClass}
          placeholder="Ej: 6a Avenida 0-60, Zona 1"
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
          {...register("city", {
            required: "Requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
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
        <label className={labelClass}>
          Teléfono <span className="text-gray-400 font-normal text-xs">(8 dígitos)</span>
        </label>
        <input
          type="tel"
          {...register("phone", {
            required: "Requerido",
            pattern: { value: /^\d{8}$/, message: "Exactamente 8 dígitos numéricos" },
          })}
          maxLength={8}
          onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8); }}
          className={errors.phone ? inputErrorClass : inputClass}
          placeholder="Ej: 22345678"
        />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      {/* Horario */}
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