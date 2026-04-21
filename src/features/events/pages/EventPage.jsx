import { useState } from "react";
import { EventModal } from "../components/EventModal";

// Importación de iconos oficiales
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import iconEventDate from "../../../assets/icons/EventDate.svg";
import iconEventTime from "../../../assets/icons/EventTime.svg";

export const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = [
    { id: 1, title: "Aniversario Kinal", date: "15 de Mayo", time: "18:00", type: "Corporativo" },
    { id: 2, title: "Noche de Alitas 2x1", date: "Todos los Jueves", time: "19:00", type: "Promoción" },
    { id: 3, title: "Música en Vivo", date: "22 de Abril", time: "20:00", type: "Social" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Próximos <span className="text-kinal-red">Eventos</span>
          </h1>
          <p className="text-gray-500 font-medium">Gestiona el calendario de actividades del restaurante.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-kinal-orange text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter"
        >
          + Nuevo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-kinal-yellow/10 rounded-bl-full -mr-10 -mt-10 group-hover:bg-kinal-yellow/20 transition-colors" />
            
            <span className="text-[10px] font-black uppercase text-kinal-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              {event.type}
            </span>
            
            <h3 className="text-xl font-black text-gray-800 italic mt-4 mb-1 uppercase tracking-tight">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-6 mt-4 font-bold text-gray-500">
              {/* Fecha con Icono SVG */}
              <div className="flex items-center gap-2">
                <img src={iconEventDate} alt="Fecha" className="w-5 h-5 opacity-70" />
                <span className="text-sm">{event.date}</span>
              </div>
              
              {/* Hora con Icono SVG */}
              <div className="flex items-center gap-2">
                <img src={iconEventTime} alt="Hora" className="w-5 h-5 opacity-70" />
                <span className="text-sm">{event.time}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110">
                <img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Edit" />
              </button>
              <button className="p-2 hover:bg-red-50 rounded-lg transition-all hover:scale-110">
                <img src={iconDelete} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};