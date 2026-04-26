import printorderIcon from "../../../assets/icons/PrintOrder.svg"; 

export const OrderDetailModal = ({ isOpen, onClose, orderData }) => {
  if (!isOpen || !orderData) return null;

  // MOCK DATA: Simulamos lo que respondería el Backend al hacer un ".populate()" 
  // juntando Order, OrderDetail y OrderRequest
  const mockOrderRequest = {
    customerName: orderData.orderType === 'DINE_IN' ? 'Cliente en Restaurante' : 'Diego López',
    deliveryAddress: orderData.orderType === 'DELIVERY' ? '15 Avenida 4-55, Zona 10, Edificio Dubai Center' : 'N/A',
    couponCode: 'KINAL2026',
    discountApplied: 15.00
  };

  const mockOrderDetails = [
    { _id: "od1", nombre: "Combo Familiar Kinal", tipo: "Combo", cantidad: 1, precio: 155.00, subtotal: 155.00 },
    { _id: "od2", nombre: "Soda 16oz", tipo: "Producto", cantidad: 2, precio: 10.00, subtotal: 20.00 },
    { _id: "od3", nombre: "Papas Fritas Medianas", tipo: "Producto", cantidad: 1, precio: 15.00, subtotal: 15.00 }
  ];

  // Matemáticas para el resumen
  const subtotal = mockOrderDetails.reduce((acc, item) => acc + item.subtotal, 0);
  const total = subtotal - mockOrderRequest.discountApplied;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER DEL TICKET */}
        <div className="bg-gray-800 px-8 py-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-wider">
              Detalle de <span className="text-kinal-red">Orden</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm mt-1">ORD-{orderData._id.slice(-4).toUpperCase()} • {orderData.horaPedido}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-2xl transition-colors">×</button>
        </div>

        <div className="p-8 overflow-y-auto space-y-8 bg-gray-50/50">
          
          {/* SECCIÓN 1: DATOS DEL ORDER REQUEST (Cliente/Envío) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest mb-4">Datos del Pedido (Order Request)</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Tipo y Ubicación</p>
                <p className="font-bold text-gray-800">
                  {orderData.orderType} {orderData.orderType === 'DINE_IN' ? `• ${orderData.mesaId}` : ''}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Cliente</p>
                <p className="font-bold text-gray-800">{mockOrderRequest.customerName}</p>
              </div>
              {orderData.orderType === 'DELIVERY' && (
                <div className="col-span-2">
                  <p className="text-xs font-bold text-gray-400 uppercase">Dirección de Entrega</p>
                  <p className="font-bold text-gray-800">{mockOrderRequest.deliveryAddress}</p>
                </div>
              )}
            </div>
          </div>

          {/* SECCIÓN 2: LISTA DE PRODUCTOS (Order Detail) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest">Artículos (Order Detail)</h3>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
                <tr>
                  <th className="p-4">Ítem</th>
                  <th className="p-4 text-center">Cant.</th>
                  <th className="p-4 text-right">Precio Unit.</th>
                  <th className="p-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockOrderDetails.map((item) => (
                  <tr key={item._id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-gray-800">{item.nombre}</p>
                      <span className="text-[10px] font-black uppercase text-gray-400 border border-gray-200 rounded px-2 py-0.5">{item.tipo}</span>
                    </td>
                    <td className="p-4 text-center font-bold text-kinal-orange">{item.cantidad}</td>
                    <td className="p-4 text-right font-medium text-gray-500">Q {item.precio.toFixed(2)}</td>
                    <td className="p-4 text-right font-black text-gray-800">Q {item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SECCIÓN 3: TOTALES */}
          <div className="flex justify-end">
            <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="flex justify-between text-sm font-bold text-gray-500">
                <span>Subtotal de Artículos:</span>
                <span>Q {subtotal.toFixed(2)}</span>
              </div>
              {mockOrderRequest.discountApplied > 0 && (
                <div className="flex justify-between text-sm font-bold text-green-500">
                  <span>Descuento (Cupón {mockOrderRequest.couponCode}):</span>
                  <span>- Q {mockOrderRequest.discountApplied.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-black text-kinal-red pt-4 border-t border-gray-100">
                <span>Total de Orden:</span>
                <span>Q {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER DE ACCIONES */}
        <div className="bg-white border-t border-gray-100 p-6 flex gap-4">
          <button onClick={onClose} className="px-6 py-3 font-bold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Cerrar Detalles
          </button>
          <button className="flex-1 bg-gray-800 text-white font-black py-3 rounded-xl hover:bg-black transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
            <span> <img src={printorderIcon} alt="Imprimir Comanda" className="w-5 h-5" /> Imprimir Comanda</span>
          </button>
        </div>

      </div>
    </div>
  );
};