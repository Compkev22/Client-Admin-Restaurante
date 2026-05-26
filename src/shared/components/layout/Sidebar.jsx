import { Link, useLocation } from "react-router-dom";

import iconDashboard from "../../../assets/icons/Dashboard.svg";
import iconOrders from "../../../assets/icons/Orders.svg";
import iconReservations from "../../../assets/icons/Reservations.svg";
import iconMenu from "../../../assets/icons/Menú.svg";
import iconCombos from "../../../assets/icons/Combos.svg";
import iconInventory from "../../../assets/icons/Inventory.svg";
import iconTables from "../../../assets/icons/Tables.svg";
import iconBilling from "../../../assets/icons/Billing.svg";
import iconCoupons from "../../../assets/icons/Coupons.svg";
import iconEvents from "../../../assets/icons/Events.svg";
import iconReviews from "../../../assets/icons/Reviews.svg";
import iconBranches from "../../../assets/icons/Branches.svg";
import iconUsers from "../../../assets/icons/Users.svg";
import iconService from "../../../assets/icons/ExtraServices.svg";

export const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const currentUserRole = "PLATFORM_ADMIN_ROLE";

  const menuGroups = [
    {
      title: "Principal",
      allowedRoles: ["PLATFORM_ADMIN_ROLE", "BRANCH_ADMIN_ROLE", "EMPLOYEE_ROLE"],
      items: [
        { label: "Dashboard", to: "/dashboard", icon: iconDashboard },
        { label: "Órdenes", to: "/dashboard/orders", icon: iconOrders },
        { label: "Reservaciones", to: "/dashboard/reservations", icon: iconReservations },
      ],
    },
    {
      title: "Restaurante",
      allowedRoles: ["PLATFORM_ADMIN_ROLE", "BRANCH_ADMIN_ROLE"],
      items: [
        { label: "Menú", to: "/dashboard/menu", icon: iconMenu },
        { label: "Combos", to: "/dashboard/combos", icon: iconCombos },
        { label: "Inventario", to: "/dashboard/inventory", icon: iconInventory },
        { label: "Mesas", to: "/dashboard/tables", icon: iconTables },
      ],
    },
    {
      title: "Comercial",
      allowedRoles: ["PLATFORM_ADMIN_ROLE", "BRANCH_ADMIN_ROLE"],
      items: [
        { label: "Facturación", to: "/dashboard/billing", icon: iconBilling },
        { label: "Cupones", to: "/dashboard/coupons", icon: iconCoupons },
        { label: "Eventos", to: "/dashboard/events", icon: iconEvents },
        { label: "Reseñas", to: "/dashboard/reviews", icon: iconReviews },
        { label: "Servicios Extras", to: "/dashboard/services", icon: iconService },
      ],
    },
    {
      title: "Administración",
      allowedRoles: ["PLATFORM_ADMIN_ROLE"],
      items: [
        { label: "Sucursales", to: "/dashboard/branches", icon: iconBranches },
        { label: "Usuarios", to: "/dashboard/users", icon: iconUsers },
      ],
    },
  ];

  const visibleGroups = menuGroups.filter((group) =>
    group.allowedRoles.includes(currentUserRole)
  );

  return (
    <div className="w-64 bg-white h-full min-h-[calc(100vh-4rem)] shadow-xl border-r border-gray-100 flex flex-col justify-between overflow-y-auto">
      <div className="p-4 space-y-6">
        {visibleGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <p className="text-[10px] font-black text-gray-400 uppercase mb-2 px-4 italic">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active =
                  location.pathname === item.to ||
                  (item.to !== "/dashboard" && location.pathname.startsWith(item.to));

                return (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all
                        ${active
                          ? "bg-kinal-red text-white shadow-md"
                          : "text-gray-500 hover:bg-orange-50 hover:text-kinal-orange"}
                      `}
                    >
                      <img
                        src={item.icon}
                        className={`w-5 h-5 shrink-0 ${active ? "invert brightness-0" : "opacity-60"}`}
                        alt={item.label}
                      />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="m-4 p-4 rounded-2xl bg-kinal-yellow/10 border border-kinal-yellow/20">
        <p className="text-[10px] uppercase tracking-widest text-kinal-dark-red font-black mb-1">
          Estado del Sistema
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs font-bold text-kinal-dark-red">Servidor Online</p>
        </div>
      </div>
    </div>
  );
};