// src/app/router/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Asegúrate de que las rutas de estos imports sean las correctas en tu PC
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardContainer } from "../../shared/components/layout/DashboardContainer.jsx";

// Importa TODAS tus páginas del restaurante
import { DashboardOverview } from "../../features/dashboard/pages/DashboardOverview";
import { OrderPage } from "../../features/orders/pages/OrderPage";
import { ReservationPage } from "../../features/reservations/pages/ReservationPage";
import { MenuPage } from "../../features/menu/pages/MenuPage";
import { ComboPage } from "../../features/combos/pages/ComboPage";
import { InventoryPage } from "../../features/inventory/Pages/InventoryPage";
import { TablePage } from "../../features/tables/pages/TablePage";
import { BillingPage } from "../../features/billing/pages/BillingPage";
import { CouponPage } from "../../features/coupons/pages/CouponPage";
import { EventPage } from "../../features/events/pages/EventPage";
import { ReviewPage } from "../../features/reviews/pages/ReviewPage";
import { ServicePage } from "../../features/services/pages/ServicePage";
import { BranchPage } from "../../features/branches/pages/BranchPage"; 
import { UserPage } from "../../features/users/pages/UserPage";

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