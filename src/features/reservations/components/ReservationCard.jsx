// features/reservations/components/ReservationCard.jsx
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

const STATUS_COLORS = {
  Pendiente:  "bg-yellow-100 text-yellow-700 border-yellow-200",
  Confirmada: "bg-blue-100 text-blue-700 border-blue-200",
  Completada: "bg-green-100 text-green-700 border-green-200",
  Cancelada:  "bg-red-100 text-red-600 border-red-200",
};

export const ReservationCard = ({ res, branches, users, onEdit, onToggleStatus }) => {
  const clientName = res.clientId?.UserName
    ? `${res.clientId.UserName} ${res.clientId.UserSurname}`
    : users.find((u) => (u._id || u.uid) === res.clientId)?.UserName || "Cargando...";

  const branchName = res.branchId?.name || branches.find((b) => b._id === res.branchId)?.name || "N/A";
  const tableNumber = res.tableId?.numberTable || "Asignando...";

  const dateObj = new Date(res.date);
  const day = dateObj.getUTCDate();
  const month = dateObj.toLocaleString("es-ES", { month: "short", timeZone: "UTC" }).toUpperCase();
  const statusColor = STATUS_COLORS[res.status] || "bg-gray-100 text-gray-500 border-gray-200";
  const isInactive = res.statusRes === "DESACTIVADO";

  return (
    <div className={`bg-white rounded-3xl p-5 md:p-6 shadow-sm border-2 transition-all relative flex flex-col ${
      isInactive ? "opacity-60 border-red-100" : "border-gray-50 hover:border-orange-100 hover:shadow-xl"
    }`}>
      <div className="absolute top-5 right-5 md:top-6 md:right-6">
        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border shrink-0 ${statusColor}`}>
          {res.status}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="bg-orange-50 border border-orange-100 rounded-2xl px-4 py-2 flex flex-col items-center justify-center min-w-[64px] shrink-0">
          <span className="text-kinal-orange text-[10px] font-black uppercase">{month}</span>
          <span className="text-gray-800 text-2xl font-black leading-none">{day}</span>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hora de reserva</p>
          <p className="text-xl md:text-2xl font-black text-gray-800 italic">{res.time}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-[9px] font-black text-gray-400 uppercase">Responsable</p>
            <p className="font-bold text-gray-800 truncate">{clientName}</p>
          </div>
          <div className="text-right shrink-0 ml-2">
            <p className="text-[9px] font-black text-gray-400 uppercase">Pax</p>
            <p className="font-black text-kinal-orange text-xl leading-none">{res.numberOfPersons}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-blue-50/50 border border-blue-100 p-2 rounded-xl text-center min-w-0">
            <p className="text-[8px] font-black text-blue-400 uppercase">Sucursal</p>
            <p className="text-xs font-bold text-blue-700 truncate">{branchName}</p>
          </div>
          <div className="flex-1 bg-purple-50/50 border border-purple-100 p-2 rounded-xl text-center min-w-0">
            <p className="text-[8px] font-black text-purple-400 uppercase">Asignación</p>
            <p className="text-xs font-bold text-purple-700 truncate">Mesa #{tableNumber}</p>
          </div>
        </div>
      </div>

      {res.notes && (
        <div className="mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 text-right">Comentarios</p>
          <p className="text-xs text-gray-500 font-medium italic border-r-4 border-kinal-orange pr-2 text-right line-clamp-2 bg-orange-50/30 py-1 rounded">
            "{res.notes}"
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-gray-50">
        <button
          onClick={() => onEdit(res)}
          className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-gray-600 hover:text-kinal-orange font-black text-[10px] uppercase flex items-center gap-2"
        >
          <img src={iconEdit} className="w-4 h-4 opacity-70" alt="Edit" /> Editar
        </button>
        <button
          onClick={() => onToggleStatus(res._id, res.clientId?.UserName)}
          className={`p-2.5 rounded-xl transition-all font-black text-[10px] uppercase flex items-center gap-2 ${
            isInactive
              ? "bg-green-50 text-green-600 hover:bg-green-100"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          <img src={iconDelete} className="w-4 h-4 opacity-70" alt="Delete" />
          {isInactive ? "Activar" : "Eliminar"}
        </button>
      </div>

      {isInactive && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-3xl flex items-center justify-center pointer-events-none">
          <span className="bg-red-600 text-white px-4 py-1 rounded-full font-black text-[10px] uppercase -rotate-12 shadow-lg">
            Registro Inactivo
          </span>
        </div>
      )}
    </div>
  );
};