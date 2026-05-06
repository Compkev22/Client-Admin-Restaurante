// C:\2022473\SegundoBimestre\PROYECTO-RESTAURANTE\Client-Admin-Restaurante\src\features\branches\components\BranchView.jsx
import { useEffect, useState } from "react";
import { BranchCard } from "./BranchCard";
import { BranchModal } from "./BranchModal";
import { useBranchStore } from "../../users/store/adminStore";
import { showError } from "../../../shared/utils/toast";

import createIcon from "../../../assets/icons/Create.svg";

export const BranchPage = () => {
  // Extraemos todo de tu store
  const { branches, loading, error, getBranches } = useBranchStore();
  
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // 1. Efecto para traer la data real de tu base de datos al cargar la pantalla
  useEffect(() => {
    getBranches(); 
  }, [getBranches]);

  // 2. Efecto para mostrar errores si falla la petición
  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  // 3. Protección de seguridad: si branches viene indefinido por alguna razón, usamos un arreglo vacío []
  const branchesList = branches || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic">
            NUESTRAS <span className="text-kinal-red">SUCURSALES</span>
          </h1>
          <p className="text-gray-500 font-medium">Administra las ubicaciones y horarios del restaurante.</p>
        </div>
        <button
            onClick={() => {
              setSelectedBranch(null);
              setIsBranchModalOpen(true);
            }}
            className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2">
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" /> 
          <span>Nueva Sucursal</span>
        </button>
      </div>

      {/* 4. Si está cargando, mostramos texto. Si no, mapeamos las sucursales reales */}
      {loading ? (
        <p className="text-center font-bold text-gray-500">Cargando sucursales desde el servidor...</p>
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