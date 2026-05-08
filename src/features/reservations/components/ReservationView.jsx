import { useEffect, useState } from "react";
import { useReservationStore } from "../../users/store/adminStore.js";
import { ReservationModal } from "./ReservationModal.jsx";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

import createIcon from "../../../assets/icons/Create.svg";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const ReservationPage = () => {
  const { reservations, loading, getReservations, deleteReservation } = useReservationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("Todas");

  const tabs = ["Todas", "Pendiente", "Confirmada", "Completada", "Cancelada"];

  useEffect(() => {
    getReservations();
  }, [getReservations]);

  // Filtrado de datos reales
  const filteredReservations = activeTab === "Todas" 
    ? reservations 
    : reservations.filter(r => r.status === activeTab);

  const handleEdit = (reservation) => {
    setSelectedItem(reservation);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id, name) => {
    showConfirmToast({
      title: "Cambiar Estado",
      message: `¿Deseas cambiar el estado (ACTIVADO/DESACTIVADO) de la reserva de ${name}?`,
      onConfirm: () => deleteReservation(id),
    });
  };

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
    <div className="space-y-8 animate-fadeIn p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Gestión de <span className="text-kinal-red">Reservas</span>
          </h1>
          <p className="text-gray-500 font-medium">Control de agenda, mesas y clientes en sucursal.</p>
        </div>
        
        <button 
          onClick={() => { setSelectedItem(null); setIsModalOpen(true); }}
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2 w-full md:w-auto"
        >
          <img src={createIcon} alt="+" className="w-5 h-5 invert opacity-90" />
          <span>Nueva Reserva</span>
        </button>
      </div>

      {/* Tabs / Filtros */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-black text-xs uppercase transition-all whitespace-nowrap border-2 ${
              activeTab === tab 
                ? 'bg-kinal-red border-kinal-red text-white shadow-md' 
                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid de Tarjetas */}
      {loading && reservations.length === 0 ? (
        <div className="py-20 flex justify-center"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReservations.map((res) => {
            // Lógica de fecha para el icono de calendario
            const dateObj = new Date(res.date);
            const day = dateObj.getUTCDate(); // Usamos UTC para evitar desfases de zona horaria
            const month = dateObj.toLocaleString('es-ES', { month: 'short', timeZone: 'UTC' }).toUpperCase();

            return (
              <div key={res._id} className={`bg-white rounded-3xl p-6 shadow-sm border-2 transition-all relative group flex flex-col ${res.statusRes === 'DESACTIVADO' ? 'opacity-60 border-red-100' : 'border-gray-50 hover:border-orange-100 hover:shadow-xl'}`}>
                
                {/* Badge de Estado */}
                <div className="absolute top-6 right-6">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${getStatusColor(res.status)}`}>
                    {res.status}
                  </span>
                </div>

                {/* Fecha y Hora */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl px-4 py-2 flex flex-col items-center justify-center min-w-[70px]">
                    <span className="text-kinal-orange text-[10px] font-black uppercase">{month}</span>
                    <span className="text-gray-800 text-2xl font-black leading-none">{day}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hora de reserva</p>
                    <p className="text-2xl font-black text-gray-800 italic">{res.time}</p>
                  </div>
                </div>

                {/* Info Cliente y Mesa */}
                <div className="space-y-3 mb-4">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Responsable</p>
                      <p className="font-bold text-gray-800 truncate max-w-[150px]">
                        {res.clientId?.UserName} {res.clientId?.UserSurname}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-gray-400 uppercase">Pax</p>
                      <p className="font-black text-kinal-orange text-xl leading-none">{res.numberOfPersons}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 bg-blue-50/50 border border-blue-100 p-2 rounded-xl text-center">
                      <p className="text-[8px] font-black text-blue-400 uppercase">Sucursal</p>
                      <p className="text-xs font-bold text-blue-700 truncate">{res.branchId?.name}</p>
                    </div>
                    <div className="flex-1 bg-purple-50/50 border border-purple-100 p-2 rounded-xl text-center">
                      <p className="text-[8px] font-black text-purple-400 uppercase">Asignación</p>
                      <p className="text-xs font-bold text-purple-700 truncate">Mesa #{res.tableId?.numberTable}</p>
                    </div>
                  </div>
                </div>

                {/* Notas */}
                {res.notes && (
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 text-right">Comentarios</p>
                    <p className="text-xs text-gray-500 font-medium italic border-r-4 border-kinal-orange pr-2 text-right line-clamp-2 bg-orange-50/30 py-1 rounded">
                      "{res.notes}"
                    </p>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleEdit(res)}
                    className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-gray-600 hover:text-kinal-orange font-black text-[10px] uppercase flex items-center gap-2"
                  >
                    <img src={iconEdit} className="w-4 h-4 opacity-70" alt="Edit" /> Editar
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(res._id, res.clientId?.UserName)}
                    className={`p-2.5 rounded-xl transition-all font-black text-[10px] uppercase flex items-center gap-2 ${
                        res.statusRes === 'DESACTIVADO' 
                        ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    <img src={iconDelete} className="w-4 h-4 opacity-70" alt="Delete" />
                    {res.statusRes === 'DESACTIVADO' ? 'Activar' : 'Eliminar'}
                  </button>
                </div>

                {/* Indicador de Desactivado */}
                {res.statusRes === 'DESACTIVADO' && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-3xl flex items-center justify-center pointer-events-none">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full font-black text-[10px] uppercase -rotate-12 shadow-lg">
                      Registro Inactivo
                    </span>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Si no hay resultados */}
      {!loading && filteredReservations.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold uppercase italic">No se encontraron reservaciones en esta categoría</p>
        </div>
      )}

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
};