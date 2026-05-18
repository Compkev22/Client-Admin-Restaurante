import { useState, useEffect, useCallback } from 'react';
import {
    getDashboardSummary,
    getDashboardRecentOrders,
    getDashboardUpcomingReservations,
} from '../../../shared/api/admin.js';
import { showError } from '../../../shared/utils/toast.js';

export const useDashboardData = () => {
    const [summary, setSummary]             = useState(null);
    const [recentOrders, setRecentOrders]   = useState([]);
    const [upcomingRes, setUpcomingRes]     = useState([]);
    const [loading, setLoading]             = useState(true);
    const [error, setError]                 = useState(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [summaryRes, ordersRes, reservationsRes] = await Promise.all([
                getDashboardSummary(),
                getDashboardRecentOrders(5),
                getDashboardUpcomingReservations(),
            ]);

            setSummary(summaryRes.data.summary);
            setRecentOrders(ordersRes.data.orders);
            setUpcomingRes(reservationsRes.data.reservations);
        } catch (err) {
            const msg = err?.response?.data?.message || 'Error al cargar el dashboard.';
            setError(msg);
            showError(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    return { summary, recentOrders, upcomingRes, loading, error, refetch: fetchAll };
};