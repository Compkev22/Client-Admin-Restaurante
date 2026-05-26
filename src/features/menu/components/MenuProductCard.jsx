import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const MenuProductCard = ({ product, onEdit, onDelete }) => (
  <div
    className={`rounded-3xl shadow-sm border transition-all relative flex flex-col ${
      product.ProductStatus === "INACTIVE"
        ? "bg-gray-100 border-gray-200 opacity-70 grayscale"
        : "bg-white border-gray-100 hover:shadow-xl"
    }`}
  >
    {/* Badges de estado  */}
    <div className="absolute top-3 right-3 flex flex-col gap-1 items-end z-10">
      {product.estado !== "Disponible" && (
        <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-2 py-1 rounded-full uppercase">
          {product.estado}
        </span>
      )}
      {product.ProductStatus === "INACTIVE" && (
        <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-1 rounded-full uppercase">
          Inactivo
        </span>
      )}
    </div>

    {/* Imagen */}
    <div className="w-full h-36 md:h-40 rounded-t-3xl overflow-hidden bg-gray-100">
      <img
        src={product.imagen_url}
        alt={product.nombre}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Contenido */}
    <div className="p-4 md:p-5 flex flex-col flex-1">
      <span className="text-[10px] font-black uppercase text-kinal-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100 w-fit shrink-0">
        {product.categoria}
      </span>

      <h3 className="text-base md:text-lg font-black italic uppercase leading-tight my-3 line-clamp-2">
        {product.nombre}
      </h3>

      {/* Precio + acciones */}
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-50 gap-2">
        <span className="text-lg md:text-xl font-black text-kinal-red shrink-0">
          Q {product.precio?.toFixed(2)}
        </span>
        <div className="flex gap-1 md:gap-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110"
            aria-label="Editar producto"
          >
            <img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Editar" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
            aria-label="Eliminar producto"
          >
            <img src={iconDelete} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Eliminar" />
          </button>
        </div>
      </div>
    </div>
  </div>
);