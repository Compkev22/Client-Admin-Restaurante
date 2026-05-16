// features/orders/components/OrderDetailModal.jsx
import { useEffect } from "react";
import printorderIcon from "../../../assets/icons/PrintOrder.svg";
import { OrderDetailTicket } from "./OrderDetailTicket.jsx";
import { useOrderActions } from "../hooks/useOrderActions.js";

export const OrderDetailModal = ({ isOpen, onClose, orderData }) => {
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

  const mockOrderRequest = {
    customerName: orderData.orderType === "DINE_IN" ? "Cliente en Restaurante" : "Cliente Mostrador/App",
    deliveryAddress: "N/A",
    couponCode: orderData.coupon ? "SÍ" : "N/A",
    discountApplied: orderData.discountApplied || 0,
  };

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
              {new Date(orderData.horaPedido).toLocaleTimeString()}
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
            mockOrderRequest={mockOrderRequest}
            mockOrderDetails={realOrderDetails}
            subtotal={subtotal}
            total={total}
          />
        </div>

        {/* Footer fijo */}
        <div className="shrink-0 bg-white border-t border-gray-100 px-6 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 font-bold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cerrar Detalles
          </button>
          <button className="flex-1 bg-gray-800 text-white font-black py-3 rounded-xl hover:bg-black transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
            <img src={printorderIcon} alt="Imprimir Comanda" className="w-5 h-5" />
            Imprimir Comanda
          </button>
        </div>
      </div>
    </div>
  );
};