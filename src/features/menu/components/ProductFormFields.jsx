// ProductFormFields.jsx
export const ProductFormFields = ({ formData, setFormData, preview }) => (
  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
    <div className="col-span-2 flex justify-center">
      <div className="w-28 h-28 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden shadow-inner">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-xs">Sin imagen</span>
        )}
      </div>
    </div>

    <div className="col-span-2 flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Nombre</label>
      <input
        type="text"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        placeholder="Ej: Hamburguesa Clásica"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
        required
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Precio</label>
      <input
        type="number"
        step="0.01"
        value={formData.precio}
        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
        placeholder="0.00"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
        required
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Categoría</label>
      <input
        type="text"
        value={formData.categoria}
        onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
        placeholder="Ej: Hamburguesas"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
        required
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Estado</label>
      <select
        value={formData.estado}
        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
      >
        <option value="Disponible">Disponible</option>
        <option value="Agotado">Agotado</option>
        <option value="Descontinuado">Descontinuado</option>
      </select>
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Estatus</label>
      <select
        value={formData.ProductStatus}
        onChange={(e) => setFormData({ ...formData, ProductStatus: e.target.value })}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
      >
        <option value="ACTIVE">Activo</option>
        <option value="INACTIVE">Inactivo</option>
      </select>
    </div>

    <div className="col-span-2 flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Imagen</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none cursor-pointer"
      />
    </div>
  </div>
);