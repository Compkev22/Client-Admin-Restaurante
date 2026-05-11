// features/coupons/components/CouponHeader.jsx
import createIcon from "../../../assets/icons/Create.svg";

export const CouponHeader = ({ onCreateClick }) => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-black text-gray-800 italic uppercase">
          Gestión de <span className="text-kinal-red">Cupones</span>
        </h1>
        <p className="text-gray-500 font-medium">Crea códigos promocionales para tus clientes.</p>
      </div>
      <button
        onClick={onCreateClick}
        className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2"
      >
        <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
        <span>Crear Cupón</span>
      </button>
    </div>
  );
};