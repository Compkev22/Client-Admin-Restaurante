// features/tables/components/TableHeader.jsx
import createIcon from "../../../assets/icons/Create.svg";

export const TableHeader = ({ onCreateClick }) => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-black text-gray-800 italic uppercase">
          Gestión de <span className="text-kinal-red">Mesas</span>
        </h1>
        <p className="text-gray-500 font-medium">Control de capacidad y disponibilidad en restaurante.</p>
      </div>
      <button
        onClick={onCreateClick}
        className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase flex items-center gap-2"
      >
        <img src={createIcon} className="w-5 h-5 invert opacity-90" alt="Crear" />
        <span>Nueva Mesa</span>
      </button>
    </div>
  );
};