import { useState } from "react";

export const ServiceModal = ({ isOpen, onClose, serviceData = null }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic text-gray-800 uppercase">
              {serviceData ? 'Editar' : 'Nuevo'} <span className="text-kinal-red">Servicio</span>
            </h2>
            <p className="text-sm font-bold text-gray-400">Agrega valor extra a las reservaciones.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl transition-colors">×</button>
        </div>

        <form className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 gap-4">
            
            {/* NOMBRE DEL SERVICIO */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Nombre del Servicio</label>
              <input 
                type="text" 
                required 
                defaultValue={serviceData?.Name}
                placeholder="Ej: Decoración de Cumpleaños VIP" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-bold text-gray-700" 
              />
            </div>

            {/* DESCRIPCIÓN */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Descripción Detallada</label>
              <textarea 
                required 
                rows="3"
                defaultValue={serviceData?.Description}
                placeholder="Incluye globos, pastel pequeño y música temática..." 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none resize-none text-gray-600 font-medium" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* PRECIO ADICIONAL */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">Precio Extra (Q)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0"
                  required 
                  defaultValue={serviceData?.AdditionalPrice}
                  placeholder="Ej: 150.00" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-black text-kinal-red" 
                />
              </div>

              {/* ESTADO */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">Estado</label>
                <select 
                  defaultValue={serviceData?.status || "ACTIVE"}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700"
                >
                  <option value="ACTIVE">Activo</option>
                  <option value="INACTIVE">Inactivo</option>
                </select>
              </div>
            </div>

          </div>

          <div className="pt-4 flex gap-3 mt-2 border-t border-gray-50">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-2 bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">
              {serviceData ? 'Actualizar' : 'Guardar'} Servicio
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};