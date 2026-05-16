// features/tables/components/TableCard.jsx
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import ChairsIcon from "../../../assets/icons/Chairs.svg";

const AVAILABILITY_STYLES = {
  Disponible:    { bg: "bg-green-100",  border: "border-green-200",  text: "text-green-700",  icon: "🟢" },
  Ocupada:       { bg: "bg-red-100",    border: "border-red-200",    text: "text-red-700",    icon: "🔴" },
  Mantenimiento: { bg: "bg-yellow-100", border: "border-yellow-200", text: "text-yellow-700", icon: "🟡" },
};

const DEFAULT_STYLE = { bg: "bg-gray-100", border: "border-gray-200", text: "text-gray-500", icon: "⚪" };

export const TableCard = ({ table, onEdit, onDelete }) => {
  const style = AVAILABILITY_STYLES[table.availability] || DEFAULT_STYLE;

  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 relative flex flex-col items-center text-center hover:shadow-lg transition-all">
      <div className="w-full flex justify-between items-start mb-4">
        <span className="text-[10px] font-black text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded truncate max-w-[70%]">
          {table.branchId?.name || "Sin sucursal"}
        </span>
        {/* Botones arriba a la derecha */}
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(table)}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            title="Editar"
          >
            <img src={iconEdit} className="w-4 h-4 opacity-60" alt="Editar" />
          </button>
          <button
            onClick={() => onDelete(table)}
            className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            title="Eliminar"
          >
            <img src={iconDelete} className="w-4 h-4 opacity-60" alt="Eliminar" />
          </button>
        </div>
      </div>

      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center mb-4 ${style.bg} ${style.border}`}>
        <span className={`text-2xl md:text-3xl font-black ${style.text}`}>
          #{table.numberTable}
        </span>
      </div>

      <p className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
        <img src={ChairsIcon} className="w-5 h-5 opacity-70" alt="Sillas" />
        {table.capacity} Personas
      </p>

      <div className={`w-full py-2 rounded-xl text-xs font-black uppercase ${style.bg} ${style.text} border ${style.border}`}>
        {style.icon} {table.availability}
      </div>
    </div>
  );
};