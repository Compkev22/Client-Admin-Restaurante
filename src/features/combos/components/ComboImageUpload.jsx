// ComboImageUpload.jsx
export const ComboImageUpload = ({ preview, onFileChange }) => (
  <div className="flex flex-col items-center gap-2 mb-4">
    <div className="w-32 h-32 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
      {preview ? (
        <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-400 text-sm font-medium text-center px-2">
          Sin imagen
        </span>
      )}
    </div>
    <input
      type="file"
      accept="image/*"
      onChange={onFileChange}
      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-orange-50 file:text-kinal-orange hover:file:bg-orange-100 cursor-pointer"
    />
  </div>
);