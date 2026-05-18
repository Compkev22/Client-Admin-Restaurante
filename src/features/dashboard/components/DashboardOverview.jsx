// features/dashboard/components/DashboardView.jsx
import { useAuthStore }            from '../../auth/store/authStore.js';
import { useDashboardData }        from '../hooks/useDashboardData.js';
import { DashboardHeader }         from './DashboardHeader.jsx';
import { DashboardStatsGrid }      from './DashboardStatsGrid.jsx';
import { DashboardRecentOrders }   from './DashboardRecentOrders.jsx';
import { DashboardUpcomingRes }    from './DashboardUpcomingRes.jsx';

export const DashboardOverview = () => {
    const user = useAuthStore((state) => state.user);
    const { summary, recentOrders, upcomingRes, loading } = useDashboardData();

    return (
        <div className="space-y-6 md:space-y-8 animate-fadeIn">

            <DashboardHeader userName={user?.UserName} />

            <DashboardStatsGrid summary={summary} loading={loading} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <DashboardRecentOrders
                    orders={recentOrders}
                    loading={loading}
                />
                <DashboardUpcomingRes
                    reservations={upcomingRes}
                    loading={loading}
                />
            </div>

        </div>
    );
};