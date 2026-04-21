export const ProductModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            Nuevo <span className="text-kinal-red">Producto</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
        </div>

        <form className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Nombre (nombre)</label>
            <input type="text" name="nombre" placeholder="Ej: Hamburguesa Clásica" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Precio (precio)</label>
              <input type="number" step="0.01" name="precio" placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Categoría (categoria)</label>
              <input type="text" name="categoria" placeholder="Ej: Pollo" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Disponibilidad (estado)</label>
              <select name="estado" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
                <option value="Disponible">Disponible</option>
                <option value="Agotado">Agotado</option>
                <option value="Descontinuado">Descontinuado</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Estatus (ProductStatus)</label>
              <select name="ProductStatus" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
                <option value="ACTIVE">Activo (ACTIVE)</option>
                <option value="INACTIVE">Inactivo (INACTIVE)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 bg-kinal-red text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">Guardar Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
};