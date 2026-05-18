// features/dashboard/components/DashboardStatsGrid.jsx
import { DashboardStatCard } from './DashboardStatCard.jsx';

import CashIcon  from '../../../assets/icons/Cash.svg';
import FireIcon  from '../../../assets/icons/Fire.svg';
import DateIcon  from '../../../assets/icons/EventDate.svg';
import StarIcon  from '../../../assets/icons/Star.svg';

const ICON_FILTERS = {
    green:  'invert(40%) sepia(80%) saturate(1500%) hue-rotate(90deg) brightness(90%) contrast(90%)',
    orange: 'invert(60%) sepia(90%) saturate(2000%) hue-rotate(10deg) brightness(100%) contrast(100%)',
    blue:   'invert(40%) sepia(80%) saturate(2000%) hue-rotate(200deg) brightness(90%) contrast(90%)',
    yellow: 'invert(70%) sepia(80%) saturate(1000%) hue-rotate(350deg) brightness(100%) contrast(100%)',
};

export const DashboardStatsGrid = ({ summary, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-36 animate-pulse"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 mb-4" />
                        <div className="h-3 bg-gray-100 rounded w-2/3 mb-2" />
                        <div className="h-8 bg-gray-100 rounded w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    const salesBadge = summary?.salesVariation != null
        ? `${summary.salesVariation > 0 ? '+' : ''}${summary.salesVariation}% vs ayer`
        : null;

    const ratingLabel = summary?.avgRating >= 4.5
        ? 'Excelente'
        : summary?.avgRating >= 3.5
            ? 'Bueno'
            : 'Regular';

    const cards = [
        {
            iconSrc:    CashIcon,
            iconAlt:    'Ingresos',
            iconBg:     'bg-green-100',
            iconFilter: ICON_FILTERS.green,
            badge:      salesBadge,
            badgeColor: salesBadge && summary.salesVariation >= 0
                ? 'text-green-500 bg-green-50'
                : 'text-red-500 bg-red-50',
            label:       'Ingresos de Hoy',
            value:       `Q ${(summary?.todaySales || 0).toFixed(2)}`,
            valueSuffix: null,
        },
        {
            iconSrc:    FireIcon,
            iconAlt:    'Órdenes Activas',
            iconBg:     'bg-orange-100',
            iconFilter: ICON_FILTERS.orange,
            badge:      null,
            label:      'Órdenes Activas',
            value:      summary?.activeOrders ?? '—',
            valueSuffix:'en cocina',
        },
        {
            iconSrc:    DateIcon,
            iconAlt:    'Reservas',
            iconBg:     'bg-blue-100',
            iconFilter: ICON_FILTERS.blue,
            badge:      null,
            label:      'Reservas para Hoy',
            value:      summary?.todayReservations ?? '—',
            valueSuffix:'confirmadas',
        },
        {
            iconSrc:    StarIcon,
            iconAlt:    'Calificación',
            iconBg:     'bg-yellow-100',
            iconFilter: ICON_FILTERS.yellow,
            badge:      ratingLabel,
            badgeColor: 'text-yellow-600 bg-yellow-50',
            label:      'Calificación Global',
            value:      summary?.avgRating ?? '—',
            valueSuffix:'/ 5.0',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {cards.map((card) => (
                <DashboardStatCard key={card.label} {...card} />
            ))}
        </div>
    );
};