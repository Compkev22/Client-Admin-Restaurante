// src/app/router/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Layaout y Auth
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx"; 

// Vistas del Restaurante (Asegúrate de que estas rutas coincidan con tus archivos)
import { DashboardOverview } from "../../features/dashboard/pages/DashboardOverview.jsx";
import { BillingPage } from "../../features/billing/pages/BillingPage.jsx";
import { BranchPage } from "../../features/branches/pages/BranchPage.jsx"; 
import { ComboPage } from "../../features/combos/pages/ComboPage.jsx";
import { CouponPage } from "../../features/coupons/pages/CouponPage.jsx";
import { EventPage } from "../../features/events/pages/EventPage.jsx";
import { InventoryPage } from "../../features/inventory/Pages/InventoryPage.jsx";
import { MenuPage } from "../../features/menu/pages/MenuPage.jsx";
import { OrderPage } from "../../features/orders/pages/OrderPage.jsx";
import { ReservationPage } from "../../features/reservations/pages/ReservationPage.jsx";
import { ReviewPage } from "../../features/reviews/pages/ReviewPage.jsx";
import { TablePage } from "../../features/tables/pages/TablePage.jsx";
import { UserPage } from "../../features/users/pages/UserPage.jsx";
import { ServicePage } from "../../features/services/pages/ServicePage.jsx";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<AuthPage />} />

            {/* PROTECTED - Anidamiento limpio como lo pide el profe */}
            <Route path="/dashboard" element={<DashboardPage />}>
                
                {/* index determina qué se muestra al entrar directamente a /dashboard */}
                <Route index element={<DashboardOverview />} />
                
                {/* Sub-rutas inyectadas en el Outlet */}
                <Route path="billing" element={<BillingPage />} />
                <Route path="branches" element={<BranchPage />} />
                <Route path="combos" element={<ComboPage />} />
                <Route path="coupons" element={<CouponPage />} />
                <Route path="events" element={<EventPage />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="reservations" element={<ReservationPage />} />
                <Route path="reviews" element={<ReviewPage />} />
                <Route path="tables" element={<TablePage />} />
                <Route path="users" element={<UserPage />} />
                <Route path="services" element={<ServicePage />} />

            </Route>

            {/* ERROR 404 */}
            <Route path="*" element={<h1 className="p-10 text-2xl font-bold text-center">404 - Página no encontrada</h1>} />
        </Routes>
    );
}