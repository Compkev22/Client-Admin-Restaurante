import { useState } from "react";
import { OrderModal } from "../components/OrderModal";
import createIcon from "../../../assets/icons/Create.svg"; 
import orderTimeIcon from "../../../assets/icons/OrderTime.svg";

export const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data basada EXACTAMENTE en tu modelo Order
  const orders = [
    { _id: "65a1b2c3", orderType: "DINE_IN", mesaId: "Mesa 4", horaPedido: "14:30", estado: "Pendiente", total: 155.00, items: 3 },
    { _id: "65a1b2c4", orderType: "TAKEAWAY", mesaId: null, horaPedido: "14:35", estado: "En Preparacion", total: 85.00, items: 2 },
    { _id: "65a1b2c5", orderType: "DELIVERY", mesaId: null, horaPedido: "14:10", estado: "Listo", total: 210.00, items: 5 },
    { _id: "65a1b2c6", orderType: "DINE_IN", mesaId: "Mesa 12", horaPedido: "13:50", estado: "Entregado", total: 320.00, items: 8 },
  ];

  const tabs = ["Todos", "Pendiente", "En Preparacion", "Listo", "Entregado", "Cancelado"];

  // Filtrado de órdenes
  const filteredOrders = activeTab === "Todos" 
    ? orders 
    : orders.filter(o => o.estado === activeTab);

  // Función auxiliar para colores y textos del tipo de orden
  const getOrderTypeStyle = (type) => {
    switch(type) {
      case "DINE_IN": return { text: "En Restaurante", bg: "bg-blue-100", textCol: "text-blue-700", border: "border-blue-200" };
      case "TAKEAWAY": return { text: "Para Llevar", bg: "bg-orange-100", textCol: "text-orange-700", border: "border-orange-200" };
      case "DELIVERY": return { text: "A Domicilio", bg: "bg-purple-100", textCol: "text-purple-700", border: "border-purple-200" };
      default: return { text: type, bg: "bg-gray-100", textCol: "text-gray-700", border: "border-gray-200" };
    }
  };

  // Función auxiliar para colores del estado
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'En Preparacion': return 'bg-orange-100 text-kinal-orange border-orange-200';
      case 'Listo': return 'bg-green-100 text-green-600 border-green-200';
      case 'Entregado': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'Cancelado': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Gestión de <span className="text-kinal-red">Órdenes</span>
          </h1>
          <p className="text-gray-500 font-medium">Monitor de pedidos y transacciones en tiempo real.</p>
        </div>
        
        {/* Botón con el nuevo estilo visual que hicimos */}
        <button
          onClick={() => setIsModalOpen(true)} 
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2">
          <img src={createIcon} alt="Crear" 
          className="w-5 h-5 invert opacity-90" />
          <span>Nueva Orden</span>
        </button>
      </div>

      {/* Navegación por Estados (Tabs) */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            
            className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-kinal-red text-white shadow-md' 
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid de Órdenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const typeStyle = getOrderTypeStyle(order.orderType);
          
          return (
            <div key={order._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col relative group">
              
              {/* Encabezado de la Tarjeta */}
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${typeStyle.bg} ${typeStyle.textCol} ${typeStyle.border}`}>
                  {typeStyle.text}
                </span>
                <span className="text-sm font-bold text-gray-400">
                  <img src={orderTimeIcon} alt="Hora del Pedido" className="w-5 h-5 inline-block mr-2" />
                  {order.horaPedido}
                </span>
              </div>

              {/* Info Principal */}
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-800 uppercase italic leading-none mb-1">
                  ORD-{order._id.slice(-4).toUpperCase()}
                </h3>
                <p className="text-sm text-gray-500 font-bold">
                  {order.orderType === 'DINE_IN' ? order.mesaId : 'Cliente Mostrador/App'} • {order.items} items
                </p>
              </div>

              {/* Separador */}
              <hr className="border-dashed border-gray-200 mb-4" />

              {/* Total y Estado */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total a Pagar</p>
                  <p className="text-2xl font-black text-kinal-red">Q {order.total.toFixed(2)}</p>
                </div>
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${getStatusColor(order.estado)}`}>
                  {order.estado}
                </span>
              </div>

              {/* Botón de Acción Principal (El que detonará el Feat 1) */}
              <button className={`w-full py-3 rounded-xl font-black uppercase tracking-widest transition-all mt-auto ${
                order.estado === 'Pendiente' || order.estado === 'Listo'
                  ? 'bg-kinal-red text-white hover:bg-red-700 shadow-lg'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}>
                {order.estado === 'Pendiente' || order.estado === 'Listo' ? 'Facturar y Cobrar' : 'Ver Detalles'}
              </button>

            </div>
          );
        })}
      </div>

        <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};