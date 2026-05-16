// features/branches/components/BranchGrid.jsx
import { BranchCard } from "./BranchCard.jsx";
import { Spinner } from "../../auth/components/Spinner.jsx";

export const BranchGrid = ({ branches, loading, error, onEdit, onRetry }) => {
  if (loading && branches.length === 0) {
    return (
      <div className="p-16 md:p-20 flex flex-col justify-center items-center gap-4">
        <Spinner />
        <p className="text-gray-400 font-bold animate-pulse">Cargando sucursales...</p>
      </div>
    );
  }

  if (error && branches.length === 0) {
    return (
      <div className="p-10 md:p-20 text-center">
        <p className="text-red-500 font-black text-lg md:text-xl uppercase italic">
          Error al cargar datos
        </p>
        <p className="text-gray-500 text-sm mt-2">{error}</p>
        <button
          onClick={onRetry}
          className="mt-4 text-kinal-orange font-bold underline text-sm"
        >
          Reintentar conexión
        </button>
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="p-10 md:p-16 text-center border-2 border-dashed border-gray-200 rounded-3xl">
        <p className="text-gray-400 font-bold text-lg">No hay sucursales registradas.</p>
        <p className="text-gray-300 text-sm mt-1">Crea una nueva sucursal para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {branches.map((branch) => (
        <BranchCard
          key={branch._id}
          branch={branch}
          onEdit={() => onEdit(branch)}
        />
      ))}
    </div>
  );
};