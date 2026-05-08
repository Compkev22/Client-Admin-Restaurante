import { useState, useEffect, useCallback } from "react";
import { EventModal } from "./EventModal";
import { useSaveEvent } from "../hooks/useSaveEvent";
import { axiosAdmin } from "../../../shared/api/api";

import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import iconEventDate from "../../../assets/icons/EventDate.svg";
import iconEventTime from "../../../assets/icons/EventTime.svg";
import createIcon from "../../../assets/icons/Create.svg";

export const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { cancelEvent, deleteEventPermanently } = useSaveEvent();

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axiosAdmin.get('/events'); 
      const data = response.data.events || response.data.data || response.data;
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener eventos:", err);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleAction = async (event) => {
    if (event.status === 'Cancelado') {
      if (window.confirm(`¿Estás seguro de eliminar "${event.name}" definitivamente? Esta acción no se puede deshacer.`)) {
        const success = await deleteEventPermanently(event._id);
        if (success) fetchEvents();
      }
    } else {
      if (window.confirm(`¿Deseas marcar el evento "${event.name}" como Cancelado?`)) {
        const success = await cancelEvent(event._id, event);
        if (success) fetchEvents();
      }
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn p-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase tracking-tighter">
            Próximos <span className="text-kinal-red">Eventos</span>
          </h1>
          <p className="text-gray-500 font-medium">Gestiona el calendario de actividades del restaurante.</p>
        </div>
        <button onClick={handleCreate} 
            className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2">
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Nuevo Evento</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const isCancelado = event.status === 'Cancelado';
          return (
            <div 
              key={event._id} 
              className={`bg-white rounded-[2.5rem] p-6 shadow-md border transition-all group relative overflow-hidden
                ${isCancelado ? 'opacity-55 grayscale-[30%] border-red-200' : 'border-gray-100 hover:shadow-xl'}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-kinal-yellow/10 rounded-bl-full -mr-10 -mt-10 group-hover:bg-kinal-yellow/20 transition-colors" />
              
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                event.status === 'Confirmado' || event.status === 'Aprobada' ? 'bg-green-50 text-green-600 border-green-100' :
                event.status === 'Pendiente' ? 'bg-orange-50 text-kinal-orange border-orange-100' : 
                'bg-red-50 text-red-600 border-red-100'
              }`}>
                {event.status || 'Confirmado'}
              </span>
              
              <h3 className="text-xl font-black text-gray-800 italic mt-4 mb-1 uppercase tracking-tight">{event.name}</h3>
              <p className="text-xs font-bold text-gray-400 mb-4">Para {event.numberOfPersons} personas</p>
              
              <div className="flex flex-col gap-2 mt-4 font-bold text-gray-500">
                <div className="flex items-center gap-2">
                  <img src={iconEventDate} alt="Fecha" className="w-5 h-5 opacity-70" />
                  <span className="text-sm">{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={iconEventTime} alt="Hora" className="w-5 h-5 opacity-70" />
                  <span className="text-sm">{event.startTime} - {event.endTime}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end gap-3">
                {!isCancelado && (
                  <button onClick={() => handleEdit(event)} className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110">
                    <img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" />
                  </button>
                )}
                <button 
                  onClick={() => handleAction(event)} 
                  className={`p-2 rounded-lg transition-all hover:scale-110 ${isCancelado ? 'bg-red-600 hover:bg-red-700 text-white' : 'hover:bg-red-50'}`}
                  title={isCancelado ? "Eliminar permanentemente" : "Cancelar evento"}
                >
                  <img 
                    src={iconDelete} 
                    className={`w-5 h-5 ${isCancelado ? 'invert brightness-200' : 'opacity-60 hover:opacity-100'}`} 
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} eventToEdit={selectedEvent} onRefresh={fetchEvents} />
    </div>
  );
};