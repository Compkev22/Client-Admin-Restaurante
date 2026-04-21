// src/shared/components/layout/Sidebar.jsx

import iconDashboard from "../../../assets/icons/Dashboard.svg";
import iconBranches from "../../../assets/icons/Branches.svg";
import iconMenu from "../../../assets/icons/Menú.svg";
import iconOrders from "../../../assets/icons/Orders.svg";
import iconInventory from "../../../assets/icons/Inventory.svg";
import iconUsers from "../../../assets/icons/Users.svg";
import iconCoupons from "../../../assets/icons/Coupons.svg";

export const Sidebar = () => {
    // Array de opciones del menú mapeado a tus nuevos iconos
    const menuItems = [
        { label: "Dashboard", icon: iconDashboard },
        { label: "Sucursales", icon: iconBranches },
        { label: "Menú", icon: iconMenu },
        { label: "Órdenes", icon: iconOrders },
        { label: "Inventario", icon: iconInventory },
        { label: "Usuarios", icon: iconUsers },
        { label: "Cupones", icon: iconCoupons },
    ];

    return (
        <aside className="w-64 bg-white min-h-[calc(100vh-4rem)] p-4 shadow-xl border-r border-gray-100 flex flex-col justify-between">
            <ul className="space-y-2">
                {menuItems.map((item, index) => {
                    const isActive = index === 0; // Por ahora forzamos el primero como activo (Dashboard)

                    return (
                        <li key={item.label}>
                            <div className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 cursor-pointer
                                ${isActive 
                                    ? "bg-kinal-red text-white shadow-md shadow-red-200" 
                                    : "text-gray-500 hover:bg-orange-50 hover:text-kinal-orange"}
                            `}>
                                <img 
                                    src={item.icon} 
                                    alt={`${item.label} icon`} 
                                    className={`w-6 h-6 object-contain transition-all duration-200 
                                        ${isActive ? "invert brightness-0" : "opacity-70 grayscale"}
                                    `}
                                />
                                <span>{item.label}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Footer del Sidebar con efecto Glassmorphism */}
            <div className="mt-8 p-4 rounded-2xl bg-kinal-yellow/10 border border-kinal-yellow/20">
                <p className="text-[10px] uppercase tracking-widest text-kinal-dark-red font-black mb-1">Estado del Sistema</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-xs font-bold text-kinal-dark-red">Servidor Online</p>
                </div>
            </div>
        </aside>
    );
};