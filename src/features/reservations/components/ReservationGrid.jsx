// features/reservations/components/ReservationGrid.jsx
import { Spinner } from "../../auth/components/Spinner.jsx";
import { ReservationCard } from "./ReservationCard.jsx";

export const ReservationGrid = ({ reservations, allReservations, branches, users, loading, error, onEdit, onToggleStatus }) => {
  if (loading && allReservations.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center gap-4">
        <Spinner />
        <p className="text-gray-400 font-bold animate-pulse">Cargando reservas...</p>
      </div>
    );
  }

  if (error && allReservations.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 font-black text-xl uppercase italic">Error de conexión</p>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400 font-bold uppercase italic">
          No se encontraron reservaciones en esta categoría
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {reservations.map((res) => (
        <ReservationCard
          key={res._id}
          res={res}
          branches={branches}
          users={users}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};