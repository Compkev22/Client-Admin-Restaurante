// features/coupons/components/CouponFormFields.jsx
export const CouponFormFields = ({ register, errors }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="grid grid-cols-1 gap-4">

      {/* Código */}
      <div className="flex flex-col">
        <label className="text-xs font-black uppercase text-gray-400 mb-1">
          Código del Cupón
        </label>
        <input
          type="text"
          {...register("code", {
            required: "El código es obligatorio",
            pattern: { value: /^[A-Za-z0-9]+$/, message: "Sin espacios ni símbolos" },
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 15, message: "Máximo 15 caracteres" },
          })}
          onInput={(e) =>
            (e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
          }
          placeholder="EJ: KINAL2026"
          maxLength={15}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none transition-all font-bold uppercase text-sm"
        />
        {errors.code && (
          <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.code.message}</p>
        )}
      </div>

      {/* Descuento + Límite */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-xs font-black uppercase text-gray-400 mb-1">% Descuento</label>
          <input
            type="number"
            min="1"
            max="100"
            onInput={(e) => {
              if (e.target.value < 1) e.target.value = 1;
              if (e.target.value > 100) e.target.value = 100;
            }}
            {...register("discountPercentage", {
              required: "El descuento es obligatorio",
              min: { value: 1, message: "Mínimo 1%" },
              max: { value: 100, message: "Máximo 100%" },
            })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold text-sm"
          />
          {errors.discountPercentage && (
            <p className="text-red-500 text-[10px] mt-1 font-bold">
              {errors.discountPercentage.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-black uppercase text-gray-400 mb-1">
            Límite de Uso
          </label>
          <input
            type="number"
            min="1"
            max="10000"
            onInput={(e) => {
              if (e.target.value < 1) e.target.value = 1;
            }}
            {...register("usageLimit", {
              required: "El límite de uso es obligatorio",
              min: { value: 1, message: "Mínimo 1" },
              max: { value: 10000, message: "Máximo 10,000" },
            })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold text-sm"
          />
          {errors.usageLimit && (
            <p className="text-red-500 text-[10px] mt-1 font-bold">
              {errors.usageLimit.message}
            </p>
          )}
        </div>
      </div>

      {/* Fecha de expiración */}
      <div className="flex flex-col">
        <label className="text-xs font-black uppercase text-gray-400 mb-1">
          Fecha de Expiración
        </label>
        <input
          type="date"
          min={today}
          {...register("expirationDate", {
            required: "La fecha es obligatoria",
            validate: (value) =>
              new Date(value) >= new Date(today) || "La fecha debe ser hoy o futura",
          })}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-kinal-red outline-none font-bold text-sm"
        />
        {errors.expirationDate && (
          <p className="text-red-500 text-[10px] mt-1 font-bold">
            {errors.expirationDate.message}
          </p>
        )}
      </div>
    </div>
  );
};