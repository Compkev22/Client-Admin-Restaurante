import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const DashboardContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar /> 

      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-8 overflow-y-auto animate-fade-in">
          {/* Aquí es donde se renderizarán los componentes de cada tarea (T92, T93...) */}
          <div className="max-w-7xl mx-auto">
             {children || (
               <div className="text-center py-20">
                 <h2 className="text-3xl font-black text-gray-300 uppercase tracking-tighter">
                   Selecciona un módulo para comenzar
                 </h2>
                 <p className="text-gray-400">Panel de Administración KinalRest v1.0</p>
               </div>
             )}
          </div>
        </main>
      </div>
    </div>
  );
}