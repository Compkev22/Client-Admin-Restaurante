// features/branches/components/BranchGrid.jsx
import { BranchCard } from "./BranchCard";
import { Spinner } from "../../auth/components/Spinner";

export const BranchGrid = ({ branches, loading, error, onEdit, onRetry }) => {
  if (loading && branches.length === 0) {
    return (
      <div className="p-20 flex flex-col justify-center items-center gap-4">
        <Spinner />
        <p className="text-gray-400 font-bold animate-pulse">Cargando sucursales...</p>
      </div>
    );
  }

  if (error && branches.length === 0) {
    return (
      <div className="p-20 text-center">
        <p className="text-red-500 font-black text-xl uppercase italic">Error al cargar datos</p>
        <p className="text-gray-500">{error}</p>
        <button onClick={onRetry} className="mt-4 text-kinal-orange font-bold underline">
          Reintentar conexión
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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