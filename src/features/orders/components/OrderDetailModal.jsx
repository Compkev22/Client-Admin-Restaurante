// features/orders/components/OrderDetailModal.jsx
import { useEffect } from "react";
import { OrderDetailTicket } from "./OrderDetailTicket.jsx";
import { useOrderActions } from "../hooks/useOrderActions.js";

export const OrderDetailModal = ({ isOpen, onClose, orderData, billingData = null }) => {
  const { currentOrderDetails, fetchOrderDetails } = useOrderActions();

  useEffect(() => {
    if (isOpen && orderData?._id) fetchOrderDetails(orderData._id);
  }, [isOpen, orderData, fetchOrderDetails]);

  if (!isOpen || !orderData) return null;

  const realOrderDetails = currentOrderDetails.map((detail) => ({
    _id: detail._id,
    nombre: detail.productoId?.nombre || detail.comboId?.ComboName || "Item eliminado",
    tipo: detail.productoId ? "Producto" : "Combo",
    cantidad: detail.cantidad,
    precio: detail.precio,
    subtotal: detail.subtotal,
  }));

  const subtotal = realOrderDetails.reduce((acc, item) => acc + item.subtotal, 0);
  const total = orderData.total || subtotal;

  // Datos del empleado (viene populado desde getOrders)
  const empleado = orderData.empleadoId;
  const empleadoNombre = empleado
    ? `${empleado.UserName} ${empleado.UserSurname}`
    : "No asignado";

  // Datos de la sucursal
  const sucursal = orderData.branchId;
  const sucursalNombre = sucursal?.name || "N/A";

  // Datos de la mesa
  const mesa = orderData.mesaId;
  const mesaInfo = mesa ? `Mesa ${mesa.numberTable} (cap. ${mesa.capacity})` : "N/A";

  // Cliente: puede venir del billingData (cuando se abre desde Facturación)
  // o no estar disponible si la orden aún no está pagada.
  const clienteFactura = billingData?.client;
  const clienteNombre = clienteFactura
    ? `${clienteFactura.UserName} ${clienteFactura.UserSurname}`
    : "Consumidor Final";

  // Cupón / descuento
  const couponCode = orderData.coupon ? "SÍ" : "N/A";
  const discountApplied = orderData.discountApplied || 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* Cabecera fija */}
        <div className="bg-gray-800 px-6 md:px-8 py-5 md:py-6 flex justify-between items-center text-white shrink-0 rounded-t-3xl">
          <div>
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-wider">
              Detalle de <span className="text-kinal-red">Orden</span>
            </h2>
            <p className="text-gray-400 font-mono text-xs md:text-sm mt-1">
              ORD-{orderData._id.slice(-4).toUpperCase()} •{" "}
              {new Date(orderData.horaPedido).toLocaleString("es-GT", {
                dateStyle: "short",
                timeStyle: "short",
              })}
              {" "}•{" "}
              <span
                className={`font-black ${
                  orderData.estado === "Entregado"
                    ? "text-green-400"
                    : orderData.estado === "Cancelado"
                    ? "text-red-400"
                    : "text-kinal-orange"
                }`}
              >
                {orderData.estado}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white font-bold text-xl transition-colors"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Cuerpo con scroll */}
        <div className="overflow-y-auto flex-1">
          <OrderDetailTicket
            orderData={orderData}
            orderDetails={realOrderDetails}
            subtotal={subtotal}
            total={total}
            empleadoNombre={empleadoNombre}
            sucursalNombre={sucursalNombre}
            mesaInfo={mesaInfo}
            clienteNombre={clienteNombre}
            couponCode={couponCode}
            discountApplied={discountApplied}
          />
        </div>

        {/* Footer fijo */}
        <div className="shrink-0 bg-white border-t border-gray-100 px-6 md:px-8 py-4 md:py-6">
          <button
            onClick={onClose}
            className="px-6 py-3 font-bold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cerrar Detalles
          </button>
        </div>
      </div>
    </div>
  );
};