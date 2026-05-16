// features/services/components/ServiceHeader.jsx
import createIcon from "../../../assets/icons/Create.svg";

export const ServiceHeader = ({ onCreateClick }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
    <div>
      <h1 className="text-2xl md:text-3xl font-black text-gray-800 italic uppercase">
        Servicios <span className="text-kinal-red">Adicionales</span>
      </h1>
      <p className="text-gray-500 font-medium text-sm md:text-base">
        Catálogo de extras para reservaciones y eventos.
      </p>
    </div>
    <button
      onClick={onCreateClick}
      className="w-full sm:w-auto bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2 shrink-0"
    >
      <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
      <span>Nuevo Servicio</span>
    </button>
  </div>
);