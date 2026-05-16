// features/events/components/EventView.jsx
import { useState, useEffect, useCallback } from "react";
import { EventModal } from "./EventModal.jsx";
import { EventGrid } from "./EventGrid.jsx";
import { EventHeader } from "./EventHeader.jsx";
import { useSaveEvent } from "../hooks/useSaveEvent.js";
import { axiosAdmin } from "../../../shared/api/api.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { cancelEvent, deleteEventPermanently } = useSaveEvent();

  const fetchEvents = useCallback(async () => {
    const res = await axiosAdmin.get("/events");
    setEvents(res.data.data || []);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleAction = (event) => {
    const isCancel = event.status !== "Cancelado";
    showConfirmToast({
      title: isCancel ? "Cancelar Evento" : "Eliminar Permanente",
      onConfirm: async () => {
        const ok = isCancel
          ? await cancelEvent(event._id, event)
          : await deleteEventPermanently(event._id);
        if (ok) fetchEvents();
      },
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn p-2 md:p-4">
      <EventHeader
        onCreateClick={() => {
          setSelectedEvent(null);
          setIsModalOpen(true);
        }}
      />
      <EventGrid
        events={events}
        onEdit={(e) => {
          setSelectedEvent(e);
          setIsModalOpen(true);
        }}
        onAction={handleAction}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventToEdit={selectedEvent}
        onRefresh={fetchEvents}
      />
    </div>
  );
};