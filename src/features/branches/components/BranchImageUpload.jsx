export const BranchImageUpload = ({ preview, register }) => {
  return (

    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">

      {/* Vista previa de imagen */}
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
        {preview ? (
          <img
            src={preview}
            alt="Vista previa"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-xs font-medium text-center px-2 leading-tight">
            Sin imagen
          </span>
        )}
      </div>

      {/* Input de archivo */}
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <p className="text-xs font-black text-gray-500 uppercase tracking-wider">
          Foto de la sucursal
        </p>
        <p className="text-[10px] text-gray-400 mb-2">
          Sube una imagen representativa (JPG, PNG, WEBP)
        </p>
        <input
          type="file"
          accept="image/*"
          {...register("photo")}
          className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-kinal-orange hover:file:bg-orange-100 cursor-pointer w-full"
        />
      </div>
    </div>
  );
};