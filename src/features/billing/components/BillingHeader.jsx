// BillingHeader.jsx
import createIcon from "../../../assets/icons/Create.svg";

export const BillingHeader = ({ onOpenModal }) => (
  <div className="flex justify-between items-end">
    <div>
      <h1 className="text-3xl font-black text-gray-800 italic">
        CONTROL DE <span className="text-red-600">FACTURACIÓN</span>
      </h1>
      <p className="text-gray-500 font-medium">
        Gestiona los ingresos y comprobantes de venta.
      </p>
    </div>
    <button
      onClick={onOpenModal}
      className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2"
    >
      <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
      <span>Generar Factura</span>
    </button>
  </div>
);