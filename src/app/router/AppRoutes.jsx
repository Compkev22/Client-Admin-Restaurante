import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "../layouts/DashboardPage.jsx";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx"; // <-- 1. Importa la página real

export const AppRoutes = () => {
    return(
        <Routes>
            {/* PUBLIC */}
            <Route path="/login" element={<AuthPage />} /> {/* <-- 2. Úsala aquí */}

            {/* PROTECTED */}
            <Route path="/dashboard/*" element={<DashboardPage />} />

            {/* REDIRECTS */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<h1>404 - No encontrado</h1>} />
        </Routes>
    );
}