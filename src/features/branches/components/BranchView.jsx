import { useEffect, useState } from "react";
import { BranchCard } from "./BranchCard";
import { BranchModal } from "./BranchModal";
import { useBranchStore } from "../../users/store/adminStore"; // Ajustar ruta luego
import { showError } from "../../../shared/utils/toast";

import createIcon from "../../../assets/icons/Create.svg";

export const BranchPage = () => {
  // FALTA: Que estos métodos existan en el store
  const { branches, loading, error, getBranches } = useBranchStore();
  
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Efecto para traer la data real
  useEffect(() => {
    // Descomentar cuando el store esté listo
    // getBranches(); 
  }, []);

  // Efecto para errores
  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  // Arreglo temporal mientras se conecta el backend
  const mockBranches = branches.length > 0 ? branches : [
    { _id: "1", name: "Sede Central Kinal", address: "6a. Avenida 13-54", city: "Guatemala", zone: 7, phone: 23812000, Email: "central@kinal.com", Category: "Familiar", OpenedAt: "06:00", ClosedAt: "22:00", branchStatus: "ACTIVE" },
  ];

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

      {loading ? (
        <p className="text-center font-bold text-gray-500">Cargando sucursales...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBranches.map(branch => (
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