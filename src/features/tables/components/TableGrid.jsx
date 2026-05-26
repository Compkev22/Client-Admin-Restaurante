import { Spinner } from "../../auth/components/Spinner.jsx";
import { TableCard } from "./TableCard.jsx";

export const TableGrid = ({ tables, loading, error, onEdit, onDelete }) => {
  if (loading && tables.length === 0) {
    return (
      <div className="py-20 flex flex-col justify-center items-center gap-4">
        <Spinner />
        <p className="text-gray-400 font-bold animate-pulse">Cargando mesas...</p>
      </div>
    );
  }

  if (error && tables.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 font-black text-xl uppercase italic">Error de conexión</p>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (tables.length === 0) {
    return (
      <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
        <p className="text-gray-400 font-bold">No hay mesas en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {tables.map((table) => (
        <TableCard key={table._id} table={table} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};