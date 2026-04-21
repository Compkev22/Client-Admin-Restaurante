import { useState } from "react";
import { EventModal } from "../components/EventModal";

import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import iconEventDate from "../../../assets/icons/EventDate.svg";
import iconEventTime from "../../../assets/icons/EventTime.svg";

export const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data falsa adaptada al modelo Event
  const events = [
    { _id: "1", name: "Cumpleaños Carlos", eventDate: "15/05/2026", startTime: "18:00", endTime: "21:00", numberOfPersons: 25, status: "Confirmado" },
    { _id: "2", name: "Reunión de Exalumnos", eventDate: "20/05/2026", startTime: "19:00", endTime: "23:00", numberOfPersons: 40, status: "Pendiente" },
    { _id: "3", name: "Cena Corporativa", eventDate: "22/04/2026", startTime: "20:00", endTime: "22:00", numberOfPersons: 15, status: "Cancelado" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ... Header igual ... */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">Próximos <span className="text-kinal-red">Eventos</span></h1>
          <p className="text-gray-500 font-medium">Gestiona el calendario de actividades del restaurante.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-kinal-orange text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter">
          + Nuevo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-kinal-yellow/10 rounded-bl-full -mr-10 -mt-10 group-hover:bg-kinal-yellow/20 transition-colors" />
            
            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
              event.status === 'Confirmado' ? 'bg-green-50 text-green-600 border-green-100' :
              event.status === 'Pendiente' ? 'bg-orange-50 text-kinal-orange border-orange-100' : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              {event.status}
            </span>
            
            <h3 className="text-xl font-black text-gray-800 italic mt-4 mb-1 uppercase tracking-tight">{event.name}</h3>
            <p className="text-xs font-bold text-gray-400 mb-4">Para {event.numberOfPersons} personas</p>
            
            <div className="flex flex-col gap-2 mt-4 font-bold text-gray-500">
              <div className="flex items-center gap-2">
                <img src={iconEventDate} alt="Fecha" className="w-5 h-5 opacity-70" />
                <span className="text-sm">{event.eventDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={iconEventTime} alt="Hora" className="w-5 h-5 opacity-70" />
                <span className="text-sm">{event.startTime} - {event.endTime}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110"><img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" /></button>
              <button className="p-2 hover:bg-red-50 rounded-lg transition-all hover:scale-110"><img src={iconDelete} className="w-5 h-5 opacity-60 hover:opacity-100" /></button>
            </div>
          </div>
        ))}
      </div>
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};