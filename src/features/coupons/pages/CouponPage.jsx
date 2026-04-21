import { useState } from "react";
import { CouponModal } from "../components/CouponModal";

// Importación de iconos oficiales
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg"; // Usando la ruta que mencionaste

export const CouponPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const coupons = [
    { id: 1, code: "KINALFRIED", discount: "20%", expires: "30/04/2026", status: "Activo" },
    { id: 2, code: "PROFE20", discount: "15%", expires: "15/05/2026", status: "Activo" },
    { id: 3, code: "POLLO10", discount: "10%", expires: "10/04/2026", status: "Expirado" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Gestión de <span className="text-kinal-red">Cupones</span>
          </h1>
          <p className="text-gray-500 font-medium">Crea códigos promocionales para tus clientes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-kinal-orange text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter"
        >
          + Crear Cupón
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Código</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Descuento</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Expira</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Estado</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-orange-50/30 transition-colors">
                <td className="p-4 font-black text-kinal-red tracking-wider">{c.code}</td>
                <td className="p-4 font-bold text-gray-700">{c.discount}</td>
                <td className="p-4 text-gray-500 text-sm">{c.expires}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    c.status === 'Activo' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    {/* Botón Editar con Icono */}
                    <button className="hover:scale-110 transition-transform p-1">
                      <img src={iconEdit} alt="Editar" className="w-5 h-5 opacity-70 hover:opacity-100" />
                    </button>
                    {/* Botón Borrar con Icono */}
                    <button className="hover:scale-110 transition-transform p-1">
                      <img src={iconDelete} alt="Borrar" className="w-5 h-5 opacity-70 hover:opacity-100" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CouponModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};