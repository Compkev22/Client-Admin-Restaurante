// features/events/components/EventHeader.jsx
import createIcon from "../../../assets/icons/Create.svg";

export const EventHeader = ({ onCreateClick }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
    <div>
      <h1 className="text-2xl md:text-3xl font-black text-gray-800 italic uppercase tracking-tighter">
        Próximos <span className="text-kinal-red">Eventos</span>
      </h1>
      <p className="text-gray-500 font-medium text-sm md:text-base">
        Gestiona el calendario de actividades del restaurante.
      </p>
    </div>
    <button
      onClick={onCreateClick}
      className="w-full sm:w-auto bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase flex items-center justify-center gap-2 shrink-0"
    >
      <img src={createIcon} className="w-5 h-5 invert opacity-90" alt="Crear" />
      <span>Nuevo Evento</span>
    </button>
  </div>
);