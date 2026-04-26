import { useState } from "react";

export const ReservationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mock Data (Simulando lo que vendrá de tus otras colecciones)
  const branches = [{ id: "b1", name: "KFC Zona 10" }, { id: "b2", name: "KFC Miraflores" }];
  const tables = [{ id: "t1", name: "Mesa 1 (Ventana)" }, { id: "t2", name: "Mesa 2 (Centro)" }];
  const clients = [{ id: "c1", name: "Roberto Milian" }, { id: "c2", name: "Kevin Velásquez" }];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            Nueva <span className="text-kinal-red">Reservación</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl transition-colors">×</button>
        </div>

        <form className="space-y-6">
          
          {/* SECCIÓN 1: RELACIONES (Dónde, Quién, Qué Mesa) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Sucursal (branchId)</label>
              <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
                <option value="">Selecciona una sucursal...</option>
                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Mesa (tableId)</label>
              <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
                <option value="">Selecciona una mesa...</option>
                {tables.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-sm font-bold text-gray-700">Cliente (clientId)</label>
              <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
                <option value="">Selecciona un cliente...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* SECCIÓN 2: DATOS DE LA RESERVA (Cuándo, Cuántos, Detalles) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Fecha</label>
              <input type="date" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-600" />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Hora</label>
              <input type="time" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-600" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Personas</label>
              <input type="number" min="1" required placeholder="Ej: 4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-medium text-gray-600" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Notas / Peticiones Especiales (notes)</label>
            <textarea rows="2" placeholder="Ej: Cumpleaños, requiere silla de bebé..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none resize-none" />
          </div>

          {/* SECCIÓN 3: ESTADOS DEL SISTEMA */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Estado de la Reserva</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Estatus Lógico (statusRes)</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
                <option value="ACTIVADO">Activado</option>
                <option value="DESACTIVADO">Desactivado</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3 border-t border-gray-100 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-2 bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">
              Guardar Reservación
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};