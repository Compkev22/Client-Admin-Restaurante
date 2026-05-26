export const ServiceImagePreview = ({ preview, register }) => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden shadow-inner">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-xs font-medium">Sin imagen</span>
        )}
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
        Imagen del servicio
      </label>
      <input
        type="file"
        accept="image/*"
        className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 cursor-pointer text-sm text-gray-500"
        {...register("image")}
      />
    </div>
  </div>
);