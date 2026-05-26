import createIcon from "../../../assets/icons/Create.svg";

export const OrderHeader = ({ onNewOrder }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
    <div>
      <h1 className="text-2xl md:text-3xl font-black text-gray-800 italic uppercase">
        Gestión de <span className="text-kinal-red">Órdenes</span>
      </h1>
      <p className="text-gray-500 font-medium text-sm md:text-base">
        Monitor de pedidos y transacciones en tiempo real.
      </p>
    </div>
    <button
      onClick={onNewOrder}
      className="w-full sm:w-auto bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2 shrink-0"
    >
      <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
      <span>Nueva Orden</span>
    </button>
  </div>
);