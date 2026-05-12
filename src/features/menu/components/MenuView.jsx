// MenuView.jsx
import { useEffect, useState } from "react";
import { ProductModal } from "./ProductModal";
import { useProductStore } from "../../../features/users/store/adminStore";
import { MenuHeader } from "./MenuHeader";
import { MenuFilters } from "./MenuFilters";
import { MenuProductCard } from "./MenuProductCard";

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
    <div className="space-y-8 animate-fadeIn">
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
        <p className="text-center font-bold text-gray-500">Cargando productos...</p>
      )}

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-black uppercase tracking-widest">
            No hay productos en esta categoría
          </p>
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