import orderTimeIcon from "../../../assets/icons/orderTime.svg";

export const getOrderTypeStyle = (type) => {
  switch (type) {
    case "DINE_IN":
      return {
        text: "En Restaurante",
        bg: "bg-blue-100",
        textCol: "text-blue-700",
        border: "border-blue-200",
      };
    case "TAKEAWAY":
      return {
        text: "Para Llevar",
        bg: "bg-orange-100",
        textCol: "text-orange-700",
        border: "border-orange-200",
      };
    case "DELIVERY":
      return {
        text: "A Domicilio",
        bg: "bg-purple-100",
        textCol: "text-purple-700",
        border: "border-purple-200",
      };
    default:
      return {
        text: type,
        bg: "bg-gray-100",
        textCol: "text-gray-700",
        border: "border-gray-200",
      };
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Pendiente":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "En Preparacion":
      return "bg-orange-100 text-kinal-orange border-orange-200";
    case "Listo":
      return "bg-green-100 text-green-600 border-green-200";
    case "Entregado":
      return "bg-gray-100 text-gray-500 border-gray-200";
    case "Cancelado":
      return "bg-red-100 text-red-600 border-red-200";
    default:
      return "bg-gray-100 text-gray-500 border-gray-200";
  }
};

export const OrderCard = ({ order, onPay, onDetail }) => {
  const typeStyle = getOrderTypeStyle(order.orderType);
  const isPayable = order.estado === "Pendiente" || order.estado === "Listo";
  const isEditable =
    order.estado !== "Entregado" && order.estado !== "Cancelado";

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col relative group">
      <div className="flex justify-between items-start mb-4">
        <span
          className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${typeStyle.bg} ${typeStyle.textCol} ${typeStyle.border}`}
        >
          {typeStyle.text}
        </span>
        <span className="text-sm font-bold text-gray-400">
          <img
            src={orderTimeIcon}
            alt="Hora"
            className="w-5 h-5 inline-block mr-2"
          />
          {/* Usamos createdAt si horaPedido no existe en el modelo */}
          {order.horaPedido ||
            new Date(order.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-black text-gray-800 uppercase italic leading-none mb-1">
          ORD-{order._id.slice(-4).toUpperCase()}
        </h3>

        <p className="text-sm text-gray-500 font-bold">
          {order.orderType === "DINE_IN"
            ? `Mesa #${order.mesaId?.numberTable || "N/A"}`
            : "Cliente Mostrador/App"}
          • {order.items || 0} items
        </p>

        {order.empleadoId && (
          <p className="text-[10px] text-gray-400 font-medium italic mt-1">
            Atendido por: {order.empleadoId.UserName}
          </p>
        )}
      </div>

      <hr className="border-dashed border-gray-200 mb-4" />

      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Total a Pagar
          </p>
          <p className="text-2xl font-black text-kinal-red">
            Q {(order.total || 0).toFixed(2)}
          </p>
        </div>
        <span
          className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${getStatusColor(order.estado)}`}
        >
          {order.estado}
        </span>
      </div>

      <button
        onClick={() => (isPayable ? onPay(order) : onDetail(order))}
        className={`w-full py-3 rounded-xl font-black uppercase tracking-widest transition-all mt-auto ${
          isPayable
            ? "bg-kinal-red text-white hover:bg-red-700 shadow-lg"
            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
        }`}
      >
        {isPayable ? "Facturar y Cobrar" : "Ver Detalles"}
      </button>
      {isEditable && (
        <button
          onClick={() => onEdit(order)}
          className="w-full py-2 rounded-xl font-black uppercase tracking-widest bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all mt-2 text-sm"
        >
          + Agregar Productos
        </button>
      )}
    </div>
  );
};
