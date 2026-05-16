// features/menu/components/MenuView.jsx
import { useEffect, useState } from "react";
import { ProductModal } from "./ProductModal.jsx";
import { useProductStore } from "../../../features/users/store/adminStore.js";
import { MenuHeader } from "./MenuHeader.jsx";
import { MenuFilters } from "./MenuFilters.jsx";
import { MenuProductCard } from "./MenuProductCard.jsx";

export const MenuPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, loading, error, getProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await deleteProduct(id);
      await getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const categories = ["Todos", ...new Set(products.map((p) => p.categoria))];
  const filteredProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.categoria === activeCategory);

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn p-2 md:p-4">
      <MenuHeader
        onNewProduct={() => {
          setSelectedProduct(null);
          setIsModalOpen(true);
        }}
      />

      <MenuFilters
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {loading && (
        <p className="text-center font-bold text-gray-500 py-4">Cargando productos...</p>
      )}

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-600 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12 md:py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-black uppercase tracking-widest text-sm md:text-base">
            No hay productos en esta categoría
          </p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <MenuProductCard
              key={product._id}
              product={product}
              onEdit={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDelete(product._id)}
            />
          ))}
        </div>
      )}

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