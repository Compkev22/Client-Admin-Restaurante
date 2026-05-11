import { useState, useEffect, useCallback } from "react";
import { EventModal } from "./EventModal";
import { useSaveEvent } from "../hooks/useSaveEvent";
import { axiosAdmin } from "../../../shared/api/api";
import { showConfirmToast } from "../../auth/components/ConfirmModal"; // Importado igual que en mesas

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

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  // FIX: Borrado y Cancelación con Toast de Confirmación
  const handleAction = (event) => {
    if (event.status === 'Cancelado') {
      showConfirmToast({
        title: "Eliminar Permanente",
        message: `¿Estás seguro de borrar "${event.name}" de la base de datos?`,
        onConfirm: async () => {
          const success = await deleteEventPermanently(event._id);
          if (success) fetchEvents();
        }
      });
    } else {
      showConfirmToast({
        title: "Cancelar Evento",
        message: `¿Deseas marcar "${event.name}" como Cancelado?`,
        onConfirm: async () => {
          const success = await cancelEvent(event._id, event);
          if (success) fetchEvents();
        }
      });
    }
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
        <button onClick={() => { setSelectedEvent(null); setIsModalOpen(true); }} 
            className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase flex items-center gap-2">
          <img src={createIcon} className="w-5 h-5 invert opacity-90" />
          <span>Nuevo Evento</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const isCancelado = event.status === 'Cancelado';
          return (
            <div key={event._id} className={`bg-white rounded-[2.5rem] p-6 shadow-md border transition-all relative overflow-hidden ${isCancelado ? 'opacity-60 border-red-100' : 'border-gray-100 hover:shadow-xl'}`}>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                event.status === 'Confirmado' ? 'bg-green-50 text-green-600 border-green-100' :
                event.status === 'Pendiente' ? 'bg-orange-50 text-kinal-orange border-orange-100' : 'bg-red-50 text-red-600 border-red-100'
              }`}>
                {event.status || 'Confirmado'}
              </span>
              
              <h3 className="text-xl font-black text-gray-800 italic mt-4 mb-1 uppercase line-clamp-1">{event.name}</h3>
              <p className="text-xs font-bold text-gray-400 mb-4">Para {event.numberOfPersons} personas</p>
              
              <div className="space-y-2 mt-4 font-bold text-gray-500">
                <div className="flex items-center gap-2">
                  <img src={iconEventDate} className="w-4 h-4 opacity-50" />
                  <span className="text-sm">{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={iconEventTime} className="w-4 h-4 opacity-50" />
                  <span className="text-sm">{event.startTime} - {event.endTime}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end gap-3">
                {!isCancelado && (
                  <button onClick={() => { setSelectedEvent(event); setIsModalOpen(true); }} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                    <img src={iconEdit} className="w-5 h-5 opacity-60" />
                  </button>
                )}
                <button 
                  onClick={() => handleAction(event)} 
                  className={`p-2 rounded-lg transition-all ${isCancelado ? 'bg-red-600 text-white' : 'hover:bg-red-50'}`}
                >
                  <img src={iconDelete} className={`w-5 h-5 ${isCancelado ? 'invert' : 'opacity-60'}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        eventToEdit={selectedEvent} 
        onRefresh={fetchEvents} 
      />
    </div>
  );
};