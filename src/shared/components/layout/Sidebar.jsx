// src/shared/components/layout/Sidebar.jsx
import { useState } from "react";

// Importación de todos tus SVG oficiales
import iconDashboard from "../../../assets/icons/Dashboard.svg";
import iconOrders from "../../../assets/icons/Orders.svg";
import iconReservations from "../../../assets/icons/Reservations.svg";
import iconMenu from "../../../assets/icons/Menú.svg";
import iconInventory from "../../../assets/icons/Inventory.svg";
import iconTables from "../../../assets/icons/Tables.svg";
import iconBilling from "../../../assets/icons/Billing.svg";
import iconCoupons from "../../../assets/icons/Coupons.svg";
import iconEvents from "../../../assets/icons/Events.svg";
import iconReviews from "../../../assets/icons/Reviews.svg";
import iconBranches from "../../../assets/icons/Branches.svg";
import iconUsers from "../../../assets/icons/Users.svg";

export const Sidebar = () => {
    // Simulamos el rol del usuario actual.
    // TODO: En el futuro esto vendrá de tu Zustand (useAuthStore).
    const currentUserRole = "PLATFORM_ADMIN_ROLE"; 
    
    // Estado para simular cuál pestaña está activa
    const [activeTab, setActiveTab] = useState("Dashboard");

    // Estructura del menú segmentada por categorías y roles
    const menuGroups = [
        {
            title: "Principal",
            allowedRoles: ["PLATFORM_ADMIN_ROLE", "BRANCH_ADMIN_ROLE", "EMPLOYEE_ROLE"],
            items: [
                { label: "Dashboard", icon: iconDashboard },
                { label: "Órdenes", icon: iconOrders },
                { label: "Reservaciones", icon: iconReservations },
            ]
        },
        {
            title: "Restaurante",
            allowedRoles: ["PLATFORM_ADMIN_ROLE", "BRANCH_ADMIN_ROLE"],
            items: [
                { label: "Menú", icon: iconMenu },
                { label: "Inventario", icon: iconInventory },
                { label: "Mesas", icon: iconTables },
            ]
        },
        {
            title: "Comercial",
            allowedRoles: ["PLATFORM_ADMIN_ROLE", "BRANCH_ADMIN_ROLE"],
            items: [
                { label: "Facturación", icon: iconBilling },
                { label: "Cupones", icon: iconCoupons },
                { label: "Eventos", icon: iconEvents },
                { label: "Reseñas", icon: iconReviews },
            ]
        },
        {
            title: "Administración",
            allowedRoles: ["PLATFORM_ADMIN_ROLE"], // Solo el admin supremo ve esto
            items: [
                { label: "Sucursales", icon: iconBranches },
                { label: "Usuarios", icon: iconUsers },
            ]
        }
    ];

    // Filtramos las secciones según el rol del usuario logueado
    const visibleGroups = menuGroups.filter(group => 
        group.allowedRoles.includes(currentUserRole)
    );

    return (
        <aside className="w-64 bg-white min-h-[calc(100vh-4rem)] shadow-xl border-r border-gray-100 flex flex-col justify-between overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-6">
                {visibleGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {/* Título de la Categoría */}
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-4">
                            {group.title}
                        </p>
                        
                        {/* Items de la Categoría */}
                        <ul className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = activeTab === item.label;

                                return (
                                    <li key={item.label}>
                                        <div 
                                            onClick={() => setActiveTab(item.label)}
                                            className={`
                                                flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all duration-200 cursor-pointer
                                                ${isActive 
                                                    ? "bg-kinal-red text-white shadow-md shadow-red-200" 
                                                    : "text-gray-500 hover:bg-orange-50 hover:text-kinal-orange"}
                                            `}
                                        >
                                            <img 
                                                src={item.icon} 
                                                alt={`${item.label} icon`} 
                                                className={`w-5 h-5 object-contain transition-all duration-200 
                                                    ${isActive ? "invert brightness-0" : "opacity-60 grayscale"}
                                                `}
                                            />
                                            <span className="text-sm">{item.label}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Footer del Sidebar con efecto Glassmorphism */}
            <div className="m-4 p-4 rounded-2xl bg-kinal-yellow/10 border border-kinal-yellow/20">
                <p className="text-[10px] uppercase tracking-widest text-kinal-dark-red font-black mb-1">Estado del Sistema</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-xs font-bold text-kinal-dark-red">Servidor Online</p>
                </div>
            </div>
        </aside>
    );
};