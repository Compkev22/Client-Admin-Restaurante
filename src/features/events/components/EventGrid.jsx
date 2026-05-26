import { EventCard } from "./EventCard.jsx";

export const EventGrid = ({ events, onEdit, onAction }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {events.length > 0 ? (
      events.map((event) => (
        <EventCard key={event._id} event={event} onEdit={onEdit} onAction={onAction} />
      ))
    ) : (
      <div className="col-span-full py-16 md:py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
        <p className="text-gray-400 font-bold text-lg">No hay eventos programados.</p>
        <p className="text-gray-300 text-sm mt-1">Crea un nuevo evento para comenzar.</p>
      </div>
    )}
  </div>
);