import { useState } from "react";
import { ReservationModal } from "../components/ReservationModal";

// Asumiendo que sigues teniendo estos iconos disponibles
import createIcon from "../../../assets/icons/Create.svg";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const ReservationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Todas");

  // Tabs basados en tu schema enum de status
  const tabs = ["Todas", "Pendiente", "Confirmada", "Completada", "Cancelada"];

  // Mock data poblada con la estructura del backend (simulando los .populate())
  const reservations = [
    { _id: "res1", date: "2026-05-01", time: "18:30", numberOfPersons: 4, status: "Confirmada", clientName: "Carlos Argüello", branchName: "KFC Zona 10", tableName: "Mesa 4", notes: "Silla de bebé requerida" },
    { _id: "res2", date: "2026-05-02", time: "13:00", numberOfPersons: 2, status: "Pendiente", clientName: "María López", branchName: "KFC Miraflores", tableName: "Mesa 12", notes: "" },
    { _id: "res3", date: "2026-04-25", time: "19:00", numberOfPersons: 8, status: "Completada", clientName: "Roberto Milian", branchName: "KFC Zona 10", tableName: "VIP 1", notes: "Celebración de cumpleaños" },
    { _id: "res4", date: "2026-05-03", time: "20:00", numberOfPersons: 3, status: "Cancelada", clientName: "Ana Méndez", branchName: "KFC Miraflores", tableName: "Mesa 2", notes: "Canceló por teléfono" },
  ];

  // Filtro
  const filteredReservations = activeTab === "Todas" 
    ? reservations 
    : reservations.filter(r => r.status === activeTab);

  // Auxiliar para colores de los estados
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Confirmada': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Completada': return 'bg-green-100 text-green-700 border-green-200';
      case 'Cancelada': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Gestión de <span className="text-kinal-red">Reservas</span>
          </h1>
          <p className="text-gray-500 font-medium">Control de agenda, mesas y clientes en sucursal.</p>
        </div>
        
        {/* Botón con el Icono Blanco */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2"
        >
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Nueva Reserva</span>
        </button>
      </div>

      {/* Tabs / Filtros */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-kinal-red text-white shadow-md' 
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid de Tarjetas tipo "Agenda" */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReservations.map((res) => {
          // Extraemos el día para el diseño del calendario
          const dateObj = new Date(res.date);
          const day = dateObj.getDate() + 1; // Ajuste básico de timezone local
          const month = dateObj.toLocaleString('es-ES', { month: 'short' }).toUpperCase();

          return (
            <div key={res._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative group flex flex-col">
              
              {/* Badge de Estado flotante */}
              <div className="absolute top-6 right-6">
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${getStatusColor(res.status)}`}>
                  {res.status}
                </span>
              </div>

              {/* Fecha y Hora (Estilo Calendario) */}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-2 flex flex-col items-center justify-center min-w-[70px]">
                  <span className="text-kinal-orange text-xs font-black uppercase">{month}</span>
                  <span className="text-gray-800 text-2xl font-black leading-none">{day}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Hora</p>
                  <p className="text-2xl font-black text-gray-800 italic">{res.time}</p>
                </div>
              </div>

              {/* Información del Cliente y Mesa */}
              <div className="space-y-3 mb-4">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">Cliente</p>
                    <p className="font-bold text-gray-800">{res.clientName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Personas</p>
                    <p className="font-black text-kinal-orange text-lg leading-none">{res.numberOfPersons}</p>
                  </div>
                </div>

                <div className="flex gap-2 text-sm">
                  <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-lg border border-blue-100 flex-1 text-center truncate">
                    {res.branchName}
                  </span>
                  <span className="bg-purple-50 text-purple-700 font-bold px-3 py-1 rounded-lg border border-purple-100 flex-1 text-center truncate">
                    {res.tableName}
                  </span>
                </div>
              </div>

              {/* Notas (si existen) */}
              {res.notes && (
                <p className="text-xs text-gray-500 font-medium italic border-l-2 border-kinal-orange pl-2 line-clamp-2 mt-2 mb-4">
                  "{res.notes}"
                </p>
              )}

              {/* Acciones */}
              <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-gray-50">
                <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-gray-600 hover:text-kinal-orange font-bold text-xs uppercase flex items-center gap-2">
                  <img src={iconEdit} className="w-4 h-4 opacity-60" alt="Edit" /> Editar
                </button>
                <button className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-all text-red-600 font-bold text-xs uppercase flex items-center gap-2">
                  <img src={iconDelete} className="w-4 h-4 opacity-60" alt="Delete" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};