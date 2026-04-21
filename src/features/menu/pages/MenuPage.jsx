import { useState } from "react";
import { ProductModal } from "../components/ProductModal";

import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import createIcon from "../../../assets/icons/Create.svg";

export const MenuPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Extraemos las categorías para los botones de filtro
  const categories = ["Todos", "Pollo", "Hamburguesas", "Complementos", "Bebidas"];

  // Data falsa adaptada AL MODELO REAL (nombre, categoria, precio, estado, ProductStatus)
  const products = [
    { _id: "1", nombre: "Pieza de Pollo Original", categoria: "Pollo", precio: 15.00, estado: "Disponible", ProductStatus: "ACTIVE" },
    { _id: "2", nombre: "Hamburguesa Crispy", categoria: "Hamburguesas", precio: 35.00, estado: "Disponible", ProductStatus: "ACTIVE" },
    { _id: "3", nombre: "Papas Fritas Medianas", categoria: "Complementos", precio: 12.00, estado: "Disponible", ProductStatus: "ACTIVE" },
    { _id: "4", nombre: "Ensalada de Repollo", categoria: "Complementos", precio: 10.00, estado: "Agotado", ProductStatus: "ACTIVE" },
    { _id: "5", nombre: "Soda 16oz", categoria: "Bebidas", precio: 8.00, estado: "Disponible", ProductStatus: "INACTIVE" }, // Este está borrado lógicamente
  ];

  // Filtro
  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.categoria === activeCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">Gestión de <span className="text-kinal-red">Menú</span></h1>
          <p className="text-gray-500 font-medium">Administra los productos individuales disponibles para la venta.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} 
            className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2">
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${
              activeCategory === cat ? 'bg-kinal-red text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative group flex flex-col h-full">
            
            {/* Badges de estado */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 items-end">
              {product.estado !== 'Disponible' && (
                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-2 py-1 rounded-full uppercase border border-yellow-200">
                  {product.estado}
                </span>
              )}
              {product.ProductStatus === 'INACTIVE' && (
                <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-1 rounded-full uppercase border border-red-200">
                  Inactivo
                </span>
              )}
            </div>

            <div className="mb-4 mt-2">
              <span className="text-[10px] font-black uppercase text-kinal-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                {product.categoria}
              </span>
            </div>

            <h3 className={`text-lg font-black italic uppercase leading-tight mb-6 ${product.ProductStatus === 'INACTIVE' ? 'text-gray-400' : 'text-gray-800'}`}>
              {product.nombre}
            </h3>

            <div className="flex justify-between items-end border-t border-gray-50 pt-4 mt-auto">
              <span className={`text-xl font-black ${product.ProductStatus === 'INACTIVE' ? 'text-gray-400' : 'text-kinal-red'}`}>
                Q {product.precio.toFixed(2)}
              </span>
              
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110">
                  <img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Edit" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-all hover:scale-110">
                  <img src={iconDelete} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Delete" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};