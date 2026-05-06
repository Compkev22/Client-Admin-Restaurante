// C:\2022473\SegundoBimestre\PROYECTO-RESTAURANTE\Client-Admin-Restaurante\src\features\branches\components\BranchView.jsx
import { useEffect, useState } from "react";
import { BranchCard } from "./BranchCard";
import { BranchModal } from "./BranchModal";
import { useBranchStore } from "../../users/store/adminStore";
import { showError } from "../../../shared/utils/toast";
import { Spinner } from "../../auth/components/Spinner"; // Asegúrate de que la ruta sea correcta

import createIcon from "../../../assets/icons/Create.svg";

export const BranchPage = () => {
  const { branches, loading, error, getBranches } = useBranchStore();
  
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  // Efecto para mostrar errores (como el de "No se proporcionó token")
  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  const branchesList = branches || [];

  return (
    <div className="space-y-8 animate-fadeIn p-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            NUESTRAS <span className="text-kinal-red">SUCURSALES</span>
          </h1>
          <p className="text-gray-500 font-medium">Administra las ubicaciones y horarios del restaurante.</p>
        </div>
        <button
          onClick={() => {
            setSelectedBranch(null);
            setIsBranchModalOpen(true);
          }}
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2"
        >
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" /> 
          <span>Nueva Sucursal</span>
        </button>
      </div>

      {/* --- LÓGICA DE CARGA Y ESTADOS --- */}
      {loading && branchesList.length === 0 ? (
        <div className="p-20 flex flex-col justify-center items-center gap-4">
          <Spinner />
          <p className="text-gray-400 font-bold animate-pulse">Cargando sucursales...</p>
        </div>
      ) : error && branchesList.length === 0 ? (
        <div className="p-20 text-center">
          <p className="text-red-500 font-black text-xl uppercase italic">Error al cargar datos</p>
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={() => getBranches()} 
            className="mt-4 text-kinal-orange font-bold underline"
          >
            Reintentar conexión
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branchesList.map(branch => (
            <BranchCard 
              key={branch._id} 
              branch={branch} 
              onEdit={() => {
                setSelectedBranch(branch);
                setIsBranchModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => {
          setIsBranchModalOpen(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
      />
    </div>
  );
};