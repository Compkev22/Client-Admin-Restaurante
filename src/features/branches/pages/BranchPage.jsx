import { BranchCard } from "../components/BranchCard";

export const BranchPage = () => {
  const branches = [
    { id: 1, name: "Sede Central Kinal", address: "6a. Avenida 13-54, Zona 7", phone: "2381-2000", isOpen: true },
    { id: 2, name: "KFC Arkadia", address: "Centro Comercial Arkadia, Zona 10", phone: "2234-5566", isOpen: true },
    { id: 3, name: "KFC Roosevelt", address: "Calzada Roosevelt 22-43, Zona 11", phone: "2441-9090", isOpen: false },
    { id: 4, name: "KFC Cayalá", address: "Paseo Cayalá, Zona 16", phone: "2560-1010", isOpen: true },
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
        <button className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-lg hover:bg-orange-600 transition-all uppercase tracking-tighter">
          + Nueva Sucursal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map(branch => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>
    </div>
  );
};