import { useEffect } from "react";
import printorderIcon from "../../../assets/icons/PrintOrder.svg"; 
import { OrderDetailTicket } from "./OrderDetailTicket";
import { useOrderActions } from "../hooks/useOrderActions";

export const OrderDetailModal = ({ isOpen, onClose, orderData }) => {
  const { currentOrderDetails, fetchOrderDetails } = useOrderActions();

  useEffect(() => {
    // Cuando el modal se abre, buscamos los detalles de esa orden
    if (isOpen && orderData?._id) {
      fetchOrderDetails(orderData._id);
    }
  }, [isOpen, orderData, fetchOrderDetails]);

  if (!isOpen || !orderData) return null;

  // Transformamos los detalles reales de Mongo al formato visual de la tabla
  const realOrderDetails = currentOrderDetails.map(detail => ({
    _id: detail._id,
    nombre: detail.productoId?.nombre || detail.comboId?.ComboName || "Item eliminado",
    tipo: detail.productoId ? "Producto" : "Combo",
    cantidad: detail.cantidad,
    precio: detail.precio,
    subtotal: detail.subtotal
  }));

  const subtotal = realOrderDetails.reduce((acc, item) => acc + item.subtotal, 0);
  const total = orderData.total || subtotal; 

  const mockOrderRequest = {
    customerName: orderData.orderType === 'DINE_IN' ? 'Cliente en Restaurante' : 'Cliente Mostrador/App',
    deliveryAddress: 'N/A',
    couponCode: orderData.coupon ? 'SÍ' : 'N/A',
    discountApplied: orderData.discountApplied || 0
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gray-800 px-8 py-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-wider">Detalle de <span className="text-kinal-red">Orden</span></h2>
            <p className="text-gray-400 font-mono text-sm mt-1">ORD-{orderData._id.slice(-4).toUpperCase()} • {new Date(orderData.horaPedido).toLocaleTimeString()}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-2xl transition-colors">×</button>
        </div>

        {/* Le inyectamos los datos REALES al sub-componente */}
        <OrderDetailTicket 
            orderData={orderData} 
            mockOrderRequest={mockOrderRequest} 
            mockOrderDetails={realOrderDetails} 
            subtotal={subtotal} 
            total={total} 
        />

        <div className="bg-white border-t border-gray-100 p-6 flex gap-4">
          <button onClick={onClose} className="px-6 py-3 font-bold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Cerrar Detalles</button>
          <button className="flex-1 bg-gray-800 text-white font-black py-3 rounded-xl hover:bg-black transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
            <img src={printorderIcon} alt="Imprimir Comanda" className="w-5 h-5" /> Imprimir Comanda
          </button>
        </div>
      </div>
    </div>
  );
};