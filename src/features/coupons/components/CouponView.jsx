import { useEffect, useState } from "react";
import { useCouponStore } from "../../users/store/adminStore.js";
import { useUIStore } from "../../auth/store/uIStore.js";
import { CouponModal } from "./CouponModal.jsx";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { Spinner } from "../../auth/components/Spinner.jsx";

import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import createIcon from "../../../assets/icons/Create.svg";

export const CouponPage = () => {
  const { coupons, loading, getCoupons, deleteCoupon } = useCouponStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Cargar cupones al montar componente
  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (coupon) => {
    const action = coupon.status === 'ACTIVE' ? 'desactivar/eliminar' : 'activar';

    showConfirmToast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Cupón`,
      message: `¿Estás seguro de que deseas ${action} el código ${coupon.code}?`,
      onConfirm: () => {
        deleteCoupon(coupon._id);
      }
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn p-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Gestión de <span className="text-kinal-red">Cupones</span>
          </h1>
          <p className="text-gray-500 font-medium">Crea códigos promocionales para tus clientes.</p>
        </div>
        <button
          onClick={() => {
            setSelectedCoupon(null);
            setIsModalOpen(true);
          }}
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2"
        >
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Crear Cupón</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && coupons.length === 0 ? (
          <div className="p-20 flex justify-center"><Spinner /></div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Código</th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Descuento</th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Uso</th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Expira</th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Estado</th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase italic text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map((c) => (
                <tr key={c._id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="p-4 font-black text-kinal-red tracking-wider">{c.code}</td>
                  <td className="p-4 font-bold text-gray-700">{c.discountPercentage}%</td>
                  <td className="p-4 text-sm font-medium text-gray-500">
                    <span className="text-kinal-orange font-bold">{c.usedCount || 0}</span> / {c.usageLimit}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {c.expirationDate
                      ? new Date(c.expirationDate).toLocaleDateString('es-GT', { timeZone: 'UTC' })
                      : 'N/A'}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${c.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                      {c.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(c)}
                        className="hover:scale-110 transition-transform p-1"
                      >
                        <img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Editar" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(c)}
                        className="hover:scale-110 transition-transform p-1"
                      >
                        <img
                          src={iconDelete}
                          className={`w-5 h-5 opacity-60 hover:opacity-100 ${c.status === 'INACTIVE' ? 'grayscale sepia' : ''}`}
                          alt="Cambiar estado"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        coupon={selectedCoupon}
      />
    </div>
  );
};