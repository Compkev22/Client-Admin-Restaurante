// src/shared/components/layout/DashboardContainer.jsx
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const DashboardContainer = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar /> 

      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          {/* El Outlet renderiza automáticamente la página correspondiente a la URL */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}