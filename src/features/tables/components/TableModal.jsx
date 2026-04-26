import { useState } from "react";

export const TableModal = ({ isOpen, onClose, tableData = null }) => {
  if (!isOpen) return null;

  // Mock de Sucursales
  const branches = [
    { id: "b1", name: "KFC Zona 10" },
    { id: "b2", name: "KFC Miraflores" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic text-gray-800 uppercase">
              {tableData ? 'Editar' : 'Nueva'} <span className="text-kinal-red">Mesa</span>
            </h2>
            <p className="text-sm font-bold text-gray-400">Configuración de espacios y capacidad.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl transition-colors">×</button>
        </div>

        <form className="p-8 space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            {/* SUCURSAL */}
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-sm font-bold text-gray-700">Sucursal (branchId)</label>
              <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
                <option value="">Selecciona la sucursal...</option>
                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>

            {/* NÚMERO DE MESA */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Número de Mesa</label>
              <input type="number" required min="1" placeholder="Ej: 12" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-black text-gray-700" />
            </div>

            {/* CAPACIDAD */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Capacidad (Personas)</label>
              <input type="number" required min="1" placeholder="Ej: 4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-bold text-gray-700" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* ESTADOS Y UBICACIÓN */}
          <div className="grid grid-cols-2 gap-4 bg-orange-50 p-5 rounded-2xl border border-orange-100">
            
            {/* DISPONIBILIDAD OPERATIVA */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Disponibilidad Actual</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
                <option value="Disponible">🟢 Disponible</option>
                <option value="Ocupada">🔴 Ocupada</option>
                <option value="Mantenimiento">🟡 Mantenimiento</option>
              </select>
            </div>

            {/* ESTADO LÓGICO */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Estado del Registro (TableStatus)</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo (Soft Delete)</option>
              </select>
            </div>

            {/* COORDENADAS */}
            <div className="flex flex-col gap-1 col-span-2 mt-2">
              <label className="text-sm font-bold text-gray-700 flex justify-between">
                <span>Coordenadas en el Mapa (X, Y)</span>
                <span className="text-xs text-kinal-orange italic">Opcional para plano visual</span>
              </label>
              <div className="flex gap-2">
                <input type="number" placeholder="X (Ej: 100)" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-mono text-gray-500" />
                <input type="number" placeholder="Y (Ej: 250)" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-mono text-gray-500" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-2 bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">
              Guardar Mesa
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};