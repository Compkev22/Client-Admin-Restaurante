const ORDER_TYPE_LABELS = {
  DINE_IN: "Comer en Restaurante",
  TAKEAWAY: "Para Llevar",
  DELIVERY: "Delivery",
};

export const OrderDetailTicket = ({
  orderData,
  orderDetails,
  subtotal,
  total,
  empleadoNombre,
  sucursalNombre,
  mesaInfo,
  clienteNombre,
  couponCode,
  discountApplied,
}) => (
  <div className="p-5 md:p-8 space-y-6 md:space-y-8 bg-gray-50/50">

    {/* ── Bloque 1: Datos Generales de la Orden ── */}
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest mb-4">
        Datos de la Orden
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase">Tipo de Orden</p>
          <p className="font-bold text-gray-800">
            {ORDER_TYPE_LABELS[orderData.orderType] || orderData.orderType}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase">Sucursal</p>
          <p className="font-bold text-gray-800">{sucursalNombre}</p>
        </div>

        {orderData.orderType === "DINE_IN" && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Mesa</p>
            <p className="font-bold text-gray-800">{mesaInfo}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase">Fecha y Hora</p>
          <p className="font-bold text-gray-800">
            {new Date(orderData.horaPedido).toLocaleString("es-GT", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase">Estado</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${
              orderData.estado === "Entregado"
                ? "bg-green-100 text-green-600"
                : orderData.estado === "Cancelado"
                ? "bg-red-100 text-red-600"
                : orderData.estado === "En Preparacion"
                ? "bg-blue-100 text-blue-600"
                : orderData.estado === "Listo"
                ? "bg-purple-100 text-purple-600"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {orderData.estado}
          </span>
        </div>

      </div>
    </div>

    {/* ── Bloque 2: Personas involucradas ── */}
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest mb-4">
        Personas
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

        {/* FIX #3: Solo visible para DINE_IN */}
        {orderData.orderType === "DINE_IN" && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Atendido por</p>
            <p className="font-bold text-gray-800">{empleadoNombre}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase">Cliente / Facturado a</p>
          <p className="font-bold text-gray-800">{clienteNombre}</p>
        </div>

        {couponCode !== "N/A" && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Cupón Aplicado</p>
            <p className="font-bold text-green-600">{couponCode}</p>
          </div>
        )}

      </div>
    </div>

    {/* ── Bloque 3: Lista de artículos ── */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 md:px-6 py-4 border-b border-gray-100">
        <h3 className="text-xs font-black text-kinal-orange uppercase tracking-widest">
          Artículos Pedidos
        </h3>
      </div>

      {orderDetails.length === 0 ? (
        <p className="text-center text-gray-400 font-bold py-8 text-sm italic">
          Sin artículos registrados.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[480px]">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
              <tr>
                <th className="p-4">Ítem</th>
                <th className="p-4 text-center">Cant.</th>
                <th className="p-4 text-right">Precio Unit.</th>
                <th className="p-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orderDetails.map((item) => (
                <tr key={item._id} className="hover:bg-orange-50/30">
                  <td className="p-4">
                    <p className="font-bold text-gray-800">{item.nombre}</p>
                    <span className="text-[10px] font-black uppercase text-gray-400 border border-gray-200 rounded px-2 py-0.5">
                      {item.tipo}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-kinal-orange">{item.cantidad}</td>
                  <td className="p-4 text-right font-medium text-gray-500">
                    Q {item.precio.toFixed(2)}
                  </td>
                  <td className="p-4 text-right font-black text-gray-800">
                    Q {item.subtotal.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {/* ── Bloque 4: Totales ── */}
    <div className="flex justify-end">
      <div className="w-full md:w-1/2 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
        <div className="flex justify-between text-sm font-bold text-gray-500">
          <span>Subtotal:</span>
          <span>Q {subtotal.toFixed(2)}</span>
        </div>
        {discountApplied > 0 && (
          <div className="flex justify-between text-sm font-bold text-green-500">
            <span>Descuento ({couponCode}):</span>
            <span>- Q {discountApplied.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-black text-kinal-red pt-4 border-t border-gray-100">
          <span>Total:</span>
          <span>Q {total.toFixed(2)}</span>
        </div>
      </div>
    </div>

  </div>
);