// features/reservations/components/ReservationHeader.jsx
import createIcon from "../../../assets/icons/Create.svg";

export const ReservationHeader = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 className="text-3xl font-black text-gray-800 italic uppercase">
          Gestión de <span className="text-kinal-red">Reservas</span>
        </h1>
        <p className="text-gray-500 font-medium">Control de agenda, mesas y clientes en sucursal.</p>
      </div>
      <button
        onClick={onCreateClick}
        className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2 w-full md:w-auto"
      >
        <img src={createIcon} alt="+" className="w-5 h-5 invert opacity-90" />
        <span>Nueva Reserva</span>
      </button>
    </div>
  );
};