// features/branches/components/BranchFormFields.jsx
export const BranchFormFields = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Nombre</label>
        <input {...register("name", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Email</label>
        <input type="email" {...register("Email", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Dirección</label>
        <input {...register("address", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Zona</label>
        <input type="number" {...register("zone", { required: "Requerido", min: { value: 1, message: "La zona mínima es 1" }, max: { value: 25, message: "La zona máxima es 25" } })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
        {errors?.zone && <p className="text-red-500 text-[10px] font-bold">{errors.zone.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Ciudad</label>
        <input {...register("city", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Categoría</label>
        <select {...register("Category", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
          <option value="Fast Food">Fast Food</option>
          <option value="Familiar">Familiar</option>
          <option value="Gourmet">Gourmet</option>
          <option value="Buffet">Buffet</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Teléfono</label>
        <input type="number" {...register("phone", { required: "Requerido", pattern: { value: /^[0-9]{8}$/, message: "Número de teléfono inválido" } })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
        {errors?.phone && <p className="text-red-500 text-[10px] font-bold">{errors.phone.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Apertura</label>
        <input type="time" {...register("OpenedAt", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">Cierre</label>
        <input type="time" {...register("ClosedAt", { required: true })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
      </div>
    </div>
  );
};