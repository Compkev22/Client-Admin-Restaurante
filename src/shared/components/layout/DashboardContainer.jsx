import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

// Importa tus páginas (Entidades)
import { BillingPage } from "../../../features/billing/pages/BillingPage";
import { BranchPage } from "../../../features/branches/pages/BranchPage"; 
import { ComboPage } from "../../../features/combos/pages/ComboPage";
import { CouponPage } from "../../../features/coupons/pages/CouponPage";

export const DashboardContainer = () => {
  // 1. Creamos el estado para saber qué ver
  const [currentView, setCurrentView] = useState("Dashboard");

  // 2. Función para renderizar el contenido dinámicamente
  const renderContent = () => {
    switch (currentView) {
      case "Facturación":
        return <BillingPage />;
      case "Dashboard":
        return <div className="p-10 text-center font-bold text-gray-400">BIENVENIDO A KINAL FRIED CHICKEN</div>;
      // Aquí irás agregando los demás cases:
      case "Sucursales": 
        return <BranchPage />;
      case "Combos": 
        return <ComboPage />;
      case "Cupones":
        return <CouponPage />;
      default:
        return <BillingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar /> 

      <div className="flex flex-1">
        {/* 3. Le pasamos la función para cambiar de vista al Sidebar */}
        <Sidebar onNavigate={setCurrentView} activeTab={currentView} />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}