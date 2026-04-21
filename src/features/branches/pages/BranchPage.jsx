import { BranchCard } from "../components/BranchCard";
import { BranchModal } from "../components/BranchModal";
import { useState } from "react";

export const BranchPage = () => {
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

// Sustituye el arreglo 'branches' actual por este:
  const branches = [
    { _id: "1", name: "Sede Central Kinal", address: "6a. Avenida 13-54", city: "Guatemala", zone: 7, phone: 23812000, Email: "central@kinal.com", Category: "Familiar", OpenedAt: "06:00", ClosedAt: "22:00", branchStatus: "ACTIVE" },
    { _id: "2", name: "KFC Arkadia", address: "Centro Comercial Arkadia", city: "Guatemala", zone: 10, phone: 22345566, Email: "arkadia@kinal.com", Category: "Fast Food", OpenedAt: "10:00", ClosedAt: "21:00", branchStatus: "ACTIVE" },
    { _id: "3", name: "KFC Roosevelt", address: "Calzada Roosevelt 22-43", city: "Guatemala", zone: 11, phone: 24419090, Email: "roosevelt@kinal.com", Category: "Fast Food", OpenedAt: "06:00", ClosedAt: "23:00", branchStatus: "INACTIVE" }
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
            onClick={() => setIsBranchModalOpen(true)}
            className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-lg hover:bg-orange-600 transition-all uppercase tracking-tighter">
          + Nueva Sucursal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map(branch => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>

    <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        />
    </div>
  );
};