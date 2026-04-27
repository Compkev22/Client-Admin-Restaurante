import { useState } from "react";

// --- IMPORTACIÓN DE TUS ICONOS ---
import HelloIcon from "../../../assets/icons/Hello.svg";
import FireIcon from "../../../assets/icons/Fire.svg";
import CashIcon from "../../../assets/icons/Cash.svg";
import DateIcon from "../../../assets/icons/EventDate.svg";
import StarIcon from "../../../assets/icons/Star.svg";
import DineInIcon from "../../../assets/icons/DineIn.svg";
import DeliveryIcon from "../../../assets/icons/Delivery.svg";
import TakeAwayIcon from "../../../assets/icons/TakeAway.svg";

export const DashboardOverview = ({ onNavigate }) => {
  // Mock Data: Esto en el futuro vendrá de un endpoint tipo "GET /api/dashboard/summary"
  const summaryData = {
    todaySales: 3450.00,
    activeOrders: 8,
    todayReservations: 5,
    avgRating: 4.8
  };

  const recentOrders = [
    { id: "ORD-A1B2", type: "DINE_IN", total: 155.00, time: "Hace 5 min", status: "En Preparacion" },
    { id: "ORD-C3D4", type: "DELIVERY", total: 210.00, time: "Hace 12 min", status: "Pendiente" },
    { id: "ORD-E5F6", type: "TAKEAWAY", total: 85.00, time: "Hace 20 min", status: "Listo" },
  ];

  const upcomingReservations = [
    { id: "RES-1", client: "Roberto Milian", time: "19:00", table: "Mesa 4", persons: 4 },
    { id: "RES-2", client: "Diego López", time: "20:30", table: "VIP 1", persons: 8 },
  ];

  // Helper para renderizar el icono correcto según el tipo de orden
  const getOrderIcon = (type) => {
    switch(type) {
      case 'DINE_IN': return <img src={DineInIcon} alt="Dine In" className="w-6 h-6 opacity-80" />;
      case 'DELIVERY': return <img src={DeliveryIcon} alt="Delivery" className="w-6 h-6 opacity-80" />;
      case 'TAKEAWAY': return <img src={TakeAwayIcon} alt="Take Away" className="w-6 h-6 opacity-80" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER DEL DASHBOARD */}
      <div>
        <h1 className="text-3xl font-black text-gray-800 italic uppercase flex items-center gap-3">
          Hola, <span className="text-kinal-red">Administrador</span>
          <img src={HelloIcon} alt="Hola" className="w-8 h-8 inline-block animate-bounce" />
        </h1>
        <p className="text-gray-500 font-medium mt-1">Aquí tienes el resumen operativo de hoy, 26 de abril.</p>
      </div>

      {/* FILA 1: TARJETAS DE RESUMEN (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Tarjeta de Ventas */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <img src={CashIcon} alt="Ingresos" className="w-6 h-6 opacity-80" style={{ filter: 'invert(40%) sepia(80%) saturate(1500%) hue-rotate(90deg) brightness(90%) contrast(90%)' }} />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+12% vs ayer</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ingresos de Hoy</p>
          <h2 className="text-3xl font-black text-gray-800">Q {summaryData.todaySales.toFixed(2)}</h2>
        </div>

        {/* Tarjeta de Órdenes */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <img src={FireIcon} alt="Órdenes" className="w-6 h-6 opacity-80" style={{ filter: 'invert(60%) sepia(90%) saturate(2000%) hue-rotate(10deg) brightness(100%) contrast(100%)' }} />
            </div>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Órdenes Activas</p>
          <h2 className="text-3xl font-black text-gray-800">{summaryData.activeOrders} <span className="text-sm text-gray-400 font-medium">en cocina</span></h2>
        </div>

        {/* Tarjeta de Reservaciones */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <img src={DateIcon} alt="Reservas" className="w-6 h-6 opacity-80" style={{ filter: 'invert(40%) sepia(80%) saturate(2000%) hue-rotate(200deg) brightness(90%) contrast(90%)' }} />
            </div>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reservas para Hoy</p>
          <h2 className="text-3xl font-black text-gray-800">{summaryData.todayReservations} <span className="text-sm text-gray-400 font-medium">confirmadas</span></h2>
        </div>

        {/* Tarjeta de Satisfacción */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <img src={StarIcon} alt="Calificación" className="w-6 h-6 opacity-80" style={{ filter: 'invert(70%) sepia(80%) saturate(1000%) hue-rotate(350deg) brightness(100%) contrast(100%)' }} />
            </div>
            <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">Excelente</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Calificación Global</p>
          <h2 className="text-3xl font-black text-gray-800">{summaryData.avgRating} <span className="text-sm text-gray-400 font-medium">/ 5.0</span></h2>
        </div>

      </div>

      {/* FILA 2: TABLAS RÁPIDAS */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Panel de Órdenes Recientes */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-wider">Órdenes Recientes</h3>
              <p className="text-xs text-gray-400 font-bold">Últimos pedidos ingresados al sistema</p>
            </div>
            {/* MODIFICADO: Ahora cambia la vista a Ordenes */}
            <button 
              onClick={() => onNavigate("Órdenes")} 
              className="text-xs font-bold text-kinal-orange hover:underline transition-all"
            >
              Ver todas ➔
            </button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                    {getOrderIcon(order.type)}
                  </div>
                  <div>
                    <p className="font-black text-gray-800 text-sm">{order.id}</p>
                    <p className="text-xs font-bold text-gray-400">{order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-kinal-red">Q {order.total.toFixed(2)}</p>
                  <span className="text-[10px] font-black uppercase text-orange-500 bg-orange-50 px-2 py-1 rounded border border-orange-100">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel de Reservaciones Próximas */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-wider">Próximas Reservas</h3>
              <p className="text-xs text-gray-400 font-bold">Agenda para las próximas horas</p>
            </div>
            {/* MODIFICADO: Ahora cambia la vista a Reservaciones */}
            <button 
              onClick={() => onNavigate("Reservaciones")} 
              className="text-xs font-bold text-blue-500 hover:underline transition-all"
            >
              Ver agenda ➔
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingReservations.map(res => (
              <div key={res.id} className="flex justify-between items-center p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex flex-col items-center justify-center border border-blue-200">
                    <span className="text-[10px] font-black text-blue-500 uppercase leading-none">Hoy</span>
                    <span className="font-black text-blue-700 text-sm mt-1">{res.time}</span>
                  </div>
                  <div>
                    <p className="font-black text-gray-800 text-sm">{res.client}</p>
                    <p className="text-xs font-bold text-gray-500">{res.table} • {res.persons} Personas</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};