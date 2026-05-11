// features/branches/components/BranchHeader.jsx
import createIcon from "../../../assets/icons/Create.svg";

export const BranchHeader = ({ onCreateClick }) => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-black text-gray-800 italic uppercase">
          NUESTRAS <span className="text-kinal-red">SUCURSALES</span>
        </h1>
        <p className="text-gray-500 font-medium">
          Administra las ubicaciones y horarios del restaurante.
        </p>
      </div>
      <button
        onClick={onCreateClick}
        className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2"
      >
        <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
        <span>Nueva Sucursal</span>
      </button>
    </div>
  );
};