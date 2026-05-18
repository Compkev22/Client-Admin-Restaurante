// features/dashboard/components/DashboardRecentOrders.jsx
import { useNavigate } from 'react-router-dom';

import DineInIcon   from '../../../assets/icons/DineIn.svg';
import DeliveryIcon from '../../../assets/icons/Delivery.svg';
import TakeAwayIcon from '../../../assets/icons/TakeAway.svg';

const ORDER_TYPE_MAP = {
    DINE_IN:  { icon: DineInIcon,   label: 'Mesa' },
    DELIVERY: { icon: DeliveryIcon, label: 'Delivery' },
    TAKEAWAY: { icon: TakeAwayIcon, label: 'Para llevar' },
};

const STATUS_COLORS = {
    'Pendiente':      'text-orange-500 bg-orange-50 border-orange-100',
    'En Preparacion': 'text-yellow-600 bg-yellow-50 border-yellow-100',
    'Listo':          'text-green-600 bg-green-50 border-green-100',
    'Entregado':      'text-blue-500 bg-blue-50 border-blue-100',
    'Cancelado':      'text-red-500 bg-red-50 border-red-100',
};

export const DashboardRecentOrders = ({ orders, loading }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 md:p-6">
            <div className="flex justify-between items-end mb-5 md:mb-6">
                <div>
                    <h3 className="text-base md:text-lg font-black text-gray-800 uppercase tracking-wider">
                        Órdenes Recientes
                    </h3>
                    <p className="text-xs text-gray-400 font-bold">
                        Últimos pedidos ingresados al sistema
                    </p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/orders')}
                    className="text-xs font-bold text-kinal-orange hover:underline transition-all shrink-0"
                >
                    Ver todas ➔
                </button>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-16 bg-gray-50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <p className="text-center text-sm text-gray-400 font-bold py-10">
                    No hay órdenes recientes hoy.
                </p>
            ) : (
                <div className="space-y-3 md:space-y-4">
                    {orders.map((order) => {
                        const typeInfo    = ORDER_TYPE_MAP[order.type] || ORDER_TYPE_MAP.DINE_IN;
                        const statusClass = STATUS_COLORS[order.status] || STATUS_COLORS['Pendiente'];
                        return (
                            <div
                                key={order._id}
                                className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-2xl border border-gray-100"
                            >
                                <div className="flex gap-3 md:gap-4 items-center">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                                        <img
                                            src={typeInfo.icon}
                                            alt={typeInfo.label}
                                            className="w-5 h-5 md:w-6 md:h-6 opacity-80"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-800 text-sm">{order.id}</p>
                                        <p className="text-xs font-bold text-gray-400">{order.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-kinal-red text-sm">
                                        Q {Number(order.total).toFixed(2)}
                                    </p>
                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${statusClass}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};