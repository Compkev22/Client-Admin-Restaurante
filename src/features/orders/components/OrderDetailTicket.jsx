export const OrderDetailTicket = ({ orderData, mockOrderRequest, mockOrderDetails, subtotal, total }) => (
  <div className="p-8 overflow-y-auto space-y-8 bg-gray-50/50">
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest mb-4">Datos del Pedido</h3>
      <div className="grid grid-cols-2 gap-6">
        <div><p className="text-xs font-bold text-gray-400 uppercase">Tipo</p><p className="font-bold text-gray-800">{orderData.orderType} {orderData.orderType === 'DINE_IN' ? `• ${orderData.mesaId}` : ''}</p></div>
        <div><p className="text-xs font-bold text-gray-400 uppercase">Cliente</p><p className="font-bold text-gray-800">{mockOrderRequest.customerName}</p></div>
        {orderData.orderType === 'DELIVERY' && (
          <div className="col-span-2"><p className="text-xs font-bold text-gray-400 uppercase">Dirección de Entrega</p><p className="font-bold text-gray-800">{mockOrderRequest.deliveryAddress}</p></div>
        )}
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100"><h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest">Artículos</h3></div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
          <tr><th className="p-4">Ítem</th><th className="p-4 text-center">Cant.</th><th className="p-4 text-right">Precio Unit.</th><th className="p-4 text-right">Subtotal</th></tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {mockOrderDetails.map((item) => (
            <tr key={item._id} className="hover:bg-orange-50/30">
              <td className="p-4"><p className="font-bold text-gray-800">{item.nombre}</p><span className="text-[10px] font-black uppercase text-gray-400 border border-gray-200 rounded px-2 py-0.5">{item.tipo}</span></td>
              <td className="p-4 text-center font-bold text-kinal-orange">{item.cantidad}</td>
              <td className="p-4 text-right font-medium text-gray-500">Q {item.precio.toFixed(2)}</td><td className="p-4 text-right font-black text-gray-800">Q {item.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex justify-end">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
        <div className="flex justify-between text-sm font-bold text-gray-500"><span>Subtotal:</span><span>Q {subtotal.toFixed(2)}</span></div>
        {mockOrderRequest.discountApplied > 0 && (
          <div className="flex justify-between text-sm font-bold text-green-500"><span>Descuento ({mockOrderRequest.couponCode}):</span><span>- Q {mockOrderRequest.discountApplied.toFixed(2)}</span></div>
        )}
        <div className="flex justify-between text-xl font-black text-kinal-red pt-4 border-t border-gray-100"><span>Total:</span><span>Q {total.toFixed(2)}</span></div>
      </div>
    </div>
  </div>
);