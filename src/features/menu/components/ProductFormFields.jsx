// features/menu/components/ProductFormFields.jsx
export const ProductFormFields = ({ formData, setFormData, preview }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 md:p-5 rounded-2xl border border-gray-100">

    {/* Preview de imagen — centrada, ancho completo */}
    <div className="sm:col-span-2 flex justify-center">
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-xs text-center px-2 leading-tight">Sin imagen</span>
        )}
      </div>
    </div>

    {/* Nombre — ancho completo */}
    <div className="sm:col-span-2 flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Nombre</label>
      <input
        type="text"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        placeholder="Ej: Hamburguesa Clásica"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none text-sm"
        required
      />
    </div>

    {/* Precio */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Precio</label>
      <input
        type="number"
        step="0.01"
        value={formData.precio}
        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
        placeholder="0.00"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none text-sm"
        required
      />
    </div>

    {/* Categoría */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Categoría</label>
      <input
        type="text"
        value={formData.categoria}
        onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
        placeholder="Ej: Hamburguesas"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none text-sm"
        required
      />
    </div>

    {/* Estado de disponibilidad */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Estado</label>
      <select
        value={formData.estado}
        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none text-sm"
      >
        <option value="Disponible">Disponible</option>
        <option value="Agotado">Agotado</option>
        <option value="Descontinuado">Descontinuado</option>
      </select>
    </div>

    {/* Estatus del producto */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Estatus</label>
      <select
        value={formData.ProductStatus}
        onChange={(e) => setFormData({ ...formData, ProductStatus: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none text-sm"
      >
        <option value="ACTIVE">Activo</option>
        <option value="INACTIVE">Inactivo</option>
      </select>
    </div>

    {/* Input imagen — ancho completo */}
    <div className="sm:col-span-2 flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Imagen</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none cursor-pointer text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-kinal-orange hover:file:bg-orange-100"
      />
    </div>
  </div>
);