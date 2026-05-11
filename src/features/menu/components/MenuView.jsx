import { useEffect, useState } from "react";
import { ProductModal } from "./ProductModal";

import { useProductStore } from "../../../features/users/store/adminStore";

import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import createIcon from "../../../assets/icons/Create.svg";

export const MenuPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    products,
    loading,
    error,
    getProducts,
    deleteProduct
  } = useProductStore();

  useEffect(() => {
    getProducts();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = confirm("¿Eliminar este producto?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      await getProducts(); // refresca lista
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CATEGORÍAS =================
  const categories = [
    "Todos",
    ...new Set(products.map((p) => p.categoria))
  ];

  // ================= FILTRO =================
  const filteredProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.categoria === activeCategory);

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Gestión de <span className="text-kinal-red">Menú</span>
          </h1>

          <p className="text-gray-500 font-medium">
            Administra los productos individuales disponibles para la venta.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center gap-2"
        >
          <img src={createIcon} className="w-5 h-5 invert opacity-90" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* FILTROS */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${activeCategory === cat
              ? "bg-kinal-red text-white shadow-md"
              : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center font-bold text-gray-500">
          Cargando productos...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* GRID */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className={`rounded-3xl p-6 shadow-sm border transition-all relative group flex flex-col
                  ${product.ProductStatus === "INACTIVE"
                  ? "bg-gray-100 border-gray-200 opacity-70 grayscale"
                  : "bg-white border-gray-100 hover:shadow-xl"
                }`
              }
            >

              {/* BADGES */}
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

              {/* IMAGEN */}
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CATEGORÍA */}
              <span className="text-[10px] font-black uppercase text-kinal-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100 w-fit">
                {product.categoria}
              </span>

              {/* NOMBRE */}
              <h3 className="text-lg font-black italic uppercase leading-tight my-4">
                {product.nombre}
              </h3>

              {/* FOOTER */}
              <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">

                <span className="text-xl font-black text-kinal-red">
                  Q {product.precio?.toFixed(2)}
                </span>

                <div className="flex gap-2">

                  {/* EDITAR */}
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110"
                  >
                    <img
                      src={iconEdit}
                      className="w-5 h-5 opacity-60 hover:opacity-100"
                    />
                  </button>

                  {/* ELIMINAR */}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                  >
                    <img
                      src={iconDelete}
                      className="w-5 h-5 opacity-60 hover:opacity-100"
                    />
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-black uppercase tracking-widest">
            No hay productos en esta categoría
          </p>
        </div>
      )}

      {/* MODAL */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        productData={selectedProduct}
      />
    </div>
  );
};