import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import iconEventDate from "../../../assets/icons/EventDate.svg";
import iconEventTime from "../../../assets/icons/EventTime.svg";

export const EventCard = ({ event, onEdit, onAction }) => {
  const isCancelado = event.status === "Cancelado";

  const statusColors = {
    Confirmado: "bg-green-50 text-green-600 border-green-100",
    Pendiente: "bg-orange-50 text-kinal-orange border-orange-100",
    Cancelado: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <div
      className={`bg-white rounded-3xl p-4 md:p-6 shadow-md border transition-all relative flex flex-col ${isCancelado
          ? "opacity-60 border-red-100"
          : "border-gray-100 hover:shadow-xl"
        }`}
    >
      {/* Badge de estado */}
      <span
        className={`self-start text-[10px] font-black uppercase px-3 py-1 rounded-full border shrink-0 ${statusColors[event.status] || statusColors.Pendiente
          }`}
      >
        {event.status || "Pendiente"}
      </span>

      {/* Nombre */}
      <h3 className="text-lg md:text-xl font-black text-gray-800 italic mt-4 mb-1 uppercase line-clamp-2 leading-tight">
        {event.name}
      </h3>

      {/* Fecha y hora */}
      <div className="space-y-2 mt-3 font-bold text-gray-500 flex-1">
        <div className="flex items-center gap-2">
          <img src={iconEventDate} className="w-4 h-4 opacity-50 shrink-0" alt="Fecha" />
          <span className="text-sm">
            {new Intl.DateTimeFormat('es-GT', { timeZone: 'UTC' }).format(new Date(event.eventDate))}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src={iconEventTime} className="w-4 h-4 opacity-50 shrink-0" alt="Hora" />
          <span className="text-sm">
            {event.startTime} - {event.endTime}
          </span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-4 md:mt-6 pt-4 border-t border-gray-50 flex justify-end gap-2">
        {!isCancelado && (
          <button
            onClick={() => onEdit(event)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Editar evento"
          >
            <img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Editar" />
          </button>
        )}
        <button
          onClick={() => onAction(event)}
          className={`p-2 rounded-lg transition-colors ${isCancelado ? "bg-red-600 text-white" : "hover:bg-red-50"
            }`}
          aria-label={isCancelado ? "Eliminar permanente" : "Cancelar evento"}
        >
          <img
            src={iconDelete}
            className={`w-5 h-5 ${isCancelado ? "invert" : "opacity-60 hover:opacity-100"}`}
            alt="Acción"
          />
        </button>
      </div>
    </div>
  );
};