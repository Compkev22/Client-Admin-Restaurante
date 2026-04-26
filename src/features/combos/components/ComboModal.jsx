import { useState } from "react";
import iconDelete from "../../../assets/icons/Delete.svg";

export const ComboModal = ({ isOpen, onClose }) => {
  // Productos de prueba (Estos vendrán de tu base de datos Mongoose de 'Products')
  const availableProducts = [
    { _id: "p1", nombre: "Hamburguesa Crispy", precio: 35.00 },
    { _id: "p2", nombre: "Pieza de Pollo", precio: 15.00 },
    { _id: "p3", nombre: "Papas Fritas Medianas", precio: 12.00 },
    { _id: "p4", nombre: "Soda 16oz", precio: 8.00 },
  ];

  // Estado para la lista dinámica de productos que conforman el combo
  const [comboList, setComboList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  if (!isOpen) return null;

  // Función para agregar un producto al combo
  const handleAddProduct = () => {
    if (!selectedProduct) return;
    
    // Verificamos si ya está en la lista para no duplicarlo, solo aumentar cantidad
    const existingProduct = comboList.find(item => item.productId === selectedProduct);
    
    if (existingProduct) {
      setComboList(comboList.map(item => 
        item.productId === selectedProduct 
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
      ));
    } else {
      const productDetails = availableProducts.find(p => p._id === selectedProduct);
      setComboList([...comboList, { 
        productId: selectedProduct, 
        nombre: productDetails.nombre, 
        precio: productDetails.precio,
        cantidad: 1 
      }]);
    }
    setSelectedProduct(""); 
  };

  // Función para cambiar cantidad en la tabla
  const handleQuantityChange = (id, newQuantity) => {
    setComboList(comboList.map(item => 
      item.productId === id ? { ...item, cantidad: parseInt(newQuantity) || 1 } : item
    ));
  };

  // Función para remover de la lista
  const handleRemoveProduct = (id) => {
    setComboList(comboList.filter(item => item.productId !== id));
  };

  // Calcular el precio real basado en los productos agregados
  const realValue = comboList.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            Armar <span className="text-kinal-red">Combo</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
        </div>

        <form className="space-y-6">
          {/* DATOS GENERALES DEL COMBO */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-sm font-bold text-gray-700">Nombre del Combo</label>
              <input type="text" placeholder="Ej: Combo Familiar Kinal" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Precio Final (Q)</label>
              <input type="number" step="0.01" placeholder="Ej: 155.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-black text-kinal-red" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Estado</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo</option>
              </select>
            </div>
          </div>

          {/* CONSTRUCTOR DE LA LISTA DE PRODUCTOS */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm font-black text-kinal-orange uppercase tracking-wider">
                Productos Incluidos
              </label>
              <span className="text-xs font-bold text-gray-400">Valor Real: Q {realValue.toFixed(2)}</span>
            </div>
            
            {/* Buscador/Selector de Productos */}
            <div className="flex gap-2 mb-4">
              <select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium"
              >
                <option value="">-- Selecciona un producto del menú --</option>
                {availableProducts.map(p => (
                  <option key={p._id} value={p._id}>{p.nombre} (Q{p.precio.toFixed(2)})</option>
                ))}
              </select>
              <button 
                type="button" 
                onClick={handleAddProduct}
                className="bg-kinal-orange text-white font-black px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors"
              >
                Agregar
              </button>
            </div>

            {/* Tabla Dinámica */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden min-h-[120px]">
              {comboList.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
                    <tr>
                      <th className="p-3">Producto</th>
                      <th className="p-3 w-24 text-center">Cantidad</th>
                      <th className="p-3 w-16 text-center">X</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {comboList.map((item) => (
                      <tr key={item.productId} className="hover:bg-gray-50/50">
                        <td className="p-3 font-bold text-gray-700">{item.nombre}</td>
                        <td className="p-3">
                          <input 
                            type="number" min="1" value={item.cantidad}
                            onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                            className="w-full px-2 py-1 text-center font-bold text-kinal-orange rounded-lg border border-gray-200 outline-none focus:border-kinal-orange"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <button type="button" onClick={() => handleRemoveProduct(item.productId)} className="p-1 hover:bg-red-100 rounded-lg transition-colors">
                            <img src={iconDelete} alt="Borrar" className="w-5 h-5 opacity-70 hover:opacity-100" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 font-bold text-sm">Este combo está vacío. Agrega productos arriba.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex gap-3 border-t border-gray-100 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Cancelar</button>
            <button type="submit" disabled={comboList.length === 0} className="flex-2 bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest disabled:bg-gray-300 disabled:cursor-not-allowed">
              Guardar Combo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};