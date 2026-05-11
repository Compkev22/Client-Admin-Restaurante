import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import iconEventDate from "../../../assets/icons/EventDate.svg";
import iconEventTime from "../../../assets/icons/EventTime.svg";

export const EventCard = ({ event, onEdit, onAction }) => {
  const isCancelado = event.status === 'Cancelado';
  const statusColors = {
    Confirmado: 'bg-green-50 text-green-600 border-green-100',
    Pendiente: 'bg-orange-50 text-kinal-orange border-orange-100',
    Cancelado: 'bg-red-50 text-red-600 border-red-100'
  };

  return (
    <div className={`bg-white rounded-[2.5rem] p-6 shadow-md border transition-all relative ${isCancelado ? 'opacity-60 border-red-100' : 'border-gray-100 hover:shadow-xl'}`}>
      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${statusColors[event.status] || statusColors.Pendiente}`}>
        {event.status || 'Pendiente'}
      </span>
      <h3 className="text-xl font-black text-gray-800 italic mt-4 mb-1 uppercase truncate">{event.name}</h3>
      <div className="space-y-2 mt-4 font-bold text-gray-500">
        <div className="flex items-center gap-2"><img src={iconEventDate} className="w-4 h-4 opacity-50" />
          <span className="text-sm">{new Date(event.eventDate).toLocaleDateString()}</span></div>
        <div className="flex items-center gap-2"><img src={iconEventTime} className="w-4 h-4 opacity-50" />
          <span className="text-sm">{event.startTime} - {event.endTime}</span></div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end gap-3">
        {!isCancelado && <button onClick={() => onEdit(event)} className="p-2 hover:bg-gray-100 rounded-lg"><img src={iconEdit} className="w-5 h-5 opacity-60" /></button>}
        <button onClick={() => onAction(event)} className={`p-2 rounded-lg ${isCancelado ? 'bg-red-600 text-white' : 'hover:bg-red-50'}`}><img src={iconDelete} className={`w-5 h-5 ${isCancelado ? 'invert' : 'opacity-60'}`} /></button>
      </div>
    </div>
  );
};