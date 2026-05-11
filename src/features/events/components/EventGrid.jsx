import { EventCard } from "./EventCard";

export const EventGrid = ({ events, onEdit, onAction }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {events.length > 0 ? (
      events.map((event) => <EventCard key={event._id} event={event} onEdit={onEdit} onAction={onAction} />)
    ) : (
      <div className="col-span-full py-20 text-center text-gray-400 font-bold">No hay eventos programados.</div>
    )}
  </div>
);