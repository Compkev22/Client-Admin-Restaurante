// features/dashboard/components/DashboardUpcomingRes.jsx
import { useNavigate } from 'react-router-dom';

const STATUS_COLORS_RES = {
    'Confirmada': 'text-green-600 bg-green-50 border-green-100',
    'Pendiente':  'text-yellow-600 bg-yellow-50 border-yellow-100',
};

export const DashboardUpcomingRes = ({ reservations, loading }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 md:p-6">
            <div className="flex justify-between items-end mb-5 md:mb-6">
                <div>
                    <h3 className="text-base md:text-lg font-black text-gray-800 uppercase tracking-wider">
                        Próximas Reservas
                    </h3>
                    <p className="text-xs text-gray-400 font-bold">
                        Agenda para las próximas horas
                    </p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/reservations')}
                    className="text-xs font-bold text-blue-500 hover:underline transition-all shrink-0"
                >
                    Ver agenda ➔
                </button>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="h-16 bg-blue-50/50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : reservations.length === 0 ? (
                <p className="text-center text-sm text-gray-400 font-bold py-10">
                    No hay reservaciones programadas para hoy.
                </p>
            ) : (
                <div className="space-y-3 md:space-y-4">
                    {reservations.map((res) => {
                        const statusClass = STATUS_COLORS_RES[res.status] || STATUS_COLORS_RES['Pendiente'];
                        return (
                            <div
                                key={res._id}
                                className="flex justify-between items-center p-3 md:p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50"
                            >
                                <div className="flex gap-3 md:gap-4 items-center">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-blue-100 flex flex-col items-center justify-center border border-blue-200 shrink-0">
                                        <span className="text-[9px] font-black text-blue-500 uppercase leading-none">
                                            Hoy
                                        </span>
                                        <span className="font-black text-blue-700 text-xs md:text-sm mt-0.5">
                                            {res.time}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-800 text-sm">{res.client}</p>
                                        <p className="text-xs font-bold text-gray-500">
                                            {res.table} • {res.persons} Personas
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${statusClass}`}>
                                    {res.status}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};