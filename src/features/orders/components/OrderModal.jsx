import { useState } from "react";
import iconDelete from "../../../assets/icons/Delete.svg";

export const OrderModal = ({ isOpen, onClose }) => {
  // Estado principal de la orden
  const [orderType, setOrderType] = useState("DINE_IN");
  
  // Productos de prueba (vienen del Menú)
  const menuProducts = [
    { _id: "p1", nombre: "Combo Familiar", precio: 155.00 },
    { _id: "p2", nombre: "Hamburguesa Crispy", precio: 35.00 },
    { _id: "p3", nombre: "Papas Fritas Medianas", precio: 15.00 },
    { _id: "p4", nombre: "Soda 16oz", precio: 10.00 },
  ];

  // Mesas de prueba
  const tables = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

  const [orderList, setOrderList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  if (!isOpen) return null;

  // Lógica para agregar productos (Igual que en Combos)
  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const exists = orderList.find(item => item.productId === selectedProduct);
    if (exists) {
      setOrderList(orderList.map(item => 
        item.productId === selectedProduct ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      const product = menuProducts.find(p => p._id === selectedProduct);
      setOrderList([...orderList, { productId: selectedProduct, nombre: product.nombre, precio: product.precio, cantidad: 1 }]);
    }
    setSelectedProduct("");
  };

  const handleRemoveProduct = (id) => {
    setOrderList(orderList.filter(item => item.productId !== id));
  };

  // Calcular Total Dinámico
  const totalOrder = orderList.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            Nueva <span className="text-kinal-red">Orden</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
        </div>

        <form className="space-y-6">
          {/* DATOS DE LA ORDEN */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Tipo de Orden</label>
              <select 
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700"
              >
                <option value="DINE_IN">Para Comer Aquí (DINE_IN)</option>
                <option value="TAKEAWAY">Para Llevar (TAKEAWAY)</option>
                <option value="DELIVERY">A Domicilio (DELIVERY)</option>
              </select>
            </div>

            {/* Mostrar selección de mesa SOLO si es DINE_IN */}
            {orderType === "DINE_IN" ? (
              <div className="flex flex-col gap-1 animate-fadeIn">
                <label className="text-sm font-bold text-gray-700">Seleccionar Mesa</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
                  {tables.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            ) : (
              <div className="flex flex-col gap-1 animate-fadeIn">
                <label className="text-sm font-bold text-gray-700">Nombre del Cliente (Opcional)</label>
                <input type="text" placeholder="Ej: Carlos López" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white" />
              </div>
            )}
          </div>

          {/* PUNTO DE VENTA (Agregar Productos) */}
          <div>
            <label className="text-sm font-black text-kinal-red uppercase tracking-wider mb-2 block">
              Detalle del Pedido (Order Details)
            </label>
            
            <div className="flex gap-2 mb-4">
              <select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium"
              >
                <option value="">-- Buscar en el menú --</option>
                {menuProducts.map(p => (
                  <option key={p._id} value={p._id}>{p.nombre} - Q{p.precio.toFixed(2)}</option>
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

            {/* Tabla de Productos Seleccionados */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden min-h-[150px]">
              {orderList.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
                    <tr>
                      <th className="p-3">Producto</th>
                      <th className="p-3 text-center">Cant.</th>
                      <th className="p-3 text-right">Subtotal</th>
                      <th className="p-3 text-center">X</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orderList.map((item) => (
                      <tr key={item.productId} className="hover:bg-gray-50/50">
                        <td className="p-3 font-bold text-gray-700">{item.nombre}</td>
                        <td className="p-3 text-center font-bold text-kinal-orange">{item.cantidad}</td>
                        <td className="p-3 text-right font-black text-gray-800">Q{(item.precio * item.cantidad).toFixed(2)}</td>
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
                <div className="flex items-center justify-center h-full py-8">
                  <p className="text-gray-400 font-bold text-sm">La orden está vacía. Agrega productos.</p>
                </div>
              )}
            </div>
          </div>

          {/* TOTAL Y BOTONES */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
            <div className="text-left w-full sm:w-auto">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total de la Orden</p>
              <p className="text-3xl font-black text-kinal-red leading-none">Q {totalOrder.toFixed(2)}</p>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <button type="button" onClick={onClose} className="px-6 py-4 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button type="button" className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg transition-all ${
                orderList.length > 0 ? 'bg-kinal-red text-white hover:bg-red-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}>
                Enviar a Cocina
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};