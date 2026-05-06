// src/app/router/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Asegúrate de que las rutas de estos imports sean las correctas en tu PC
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardContainer } from "../../shared/components/layout/DashboardContainer.jsx";

// Importa TODAS tus páginas del restaurante
import { DashboardOverview } from "../../features/dashboard/components/DashboardOverview.jsx";
import { OrderPage } from "../../features/orders/components/OrderView.jsx";
import { ReservationPage } from "../../features/reservations/components/ReservationView.jsx";
import { MenuPage } from "../../features/menu/components/MenuView.jsx";
import { ComboPage } from "../../features/combos/components/ComboView.jsx";
import { InventoryPage } from "../../features/inventory/components/InventoryView.jsx";
import { TablePage } from "../../features/tables/components/TableView.jsx";
import { BillingPage } from "../../features/billing/components/BillingView.jsx";
import { CouponPage } from "../../features/coupons/components/CouponView.jsx";
import { EventPage } from "../../features/events/components/EventView.jsx";
import { ReviewPage } from "../../features/reviews/components/ReviewView.jsx";
import { ServicePage } from "../../features/services/components/ServiceView.jsx";
import { BranchPage } from "../../features/branches/components/BranchView.jsx"; 
import { UserPage } from "../../features/users/components/UserPage.jsx";

export const AppRoutes = () => {
    return(
        <Routes>
            {/* PUBLICO: Aquí devolvemos el login a la ruta principal */}
            <Route path="/" element={<AuthPage />} />

            {/* PROTEGIDO: Estructura de Outlet */}
            <Route path="/dashboard" element={<DashboardContainer />}>
                <Route index element={<DashboardOverview />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="reservations" element={<ReservationPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="combos" element={<ComboPage />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="tables" element={<TablePage />} />
                <Route path="billing" element={<BillingPage />} />
                <Route path="coupons" element={<CouponPage />} />
                <Route path="events" element={<EventPage />} />
                <Route path="reviews" element={<ReviewPage />} />
                <Route path="services" element={<ServicePage />} />
                <Route path="branches" element={<BranchPage />} />
                <Route path="users" element={<UserPage />} />
            </Route>

            {/* ERROR 404 */}
            <Route path="*" element={<h1 className="p-10 text-2xl font-bold text-center text-gray-700">404 - Página no encontrada</h1>} />
        </Routes>
    );
}