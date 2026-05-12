// MenuProductCard.jsx
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const MenuProductCard = ({ product, onEdit, onDelete }) => (
  <div
    className={`rounded-3xl p-6 shadow-sm border transition-all relative group flex flex-col ${
      product.ProductStatus === "INACTIVE"
        ? "bg-gray-100 border-gray-200 opacity-70 grayscale"
        : "bg-white border-gray-100 hover:shadow-xl"
    }`}
  >
    <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
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

    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 bg-gray-100">
      <img
        src={product.imagen_url}
        alt={product.nombre}
        className="w-full h-full object-cover"
      />
    </div>

    <span className="text-[10px] font-black uppercase text-kinal-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100 w-fit">
      {product.categoria}
    </span>

    <h3 className="text-lg font-black italic uppercase leading-tight my-4">
      {product.nombre}
    </h3>

    <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">
      <span className="text-xl font-black text-kinal-red">
        Q {product.precio?.toFixed(2)}
      </span>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110"
        >
          <img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Editar" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
        >
          <img src={iconDelete} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Eliminar" />
        </button>
      </div>
    </div>
  </div>
);