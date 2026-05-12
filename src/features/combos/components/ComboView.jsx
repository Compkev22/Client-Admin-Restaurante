// ComboView.jsx
import { useEffect, useState } from "react";
import { ComboCard } from "./ComboCard";
import { ComboModal } from "./ComboModal";
import { useComboStore } from "../../users/store/adminStore";
import createIcon from "../../../assets/icons/Create.svg";

export const ComboPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const { combos, getCombos, loading } = useComboStore();

  useEffect(() => {
    getCombos();
  }, [getCombos]);

  const handleEdit = (combo) => {
    setSelectedCombo(combo);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCombo(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCombo(null);
    getCombos(); // refresca la lista al cerrar
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Nuestros <span className="text-kinal-red">Combos</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Gestiona las ofertas de Kinal Fried Chicken.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2"
        >
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Nuevo Combo</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-kinal-red" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo) => (
            <ComboCard
              key={combo._id}
              combo={combo}
              onEdit={() => handleEdit(combo)}
            />
          ))}
        </div>
      )}

      <ComboModal
        isOpen={isModalOpen}
        onClose={handleClose}
        comboData={selectedCombo}
      />
    </div>
  );
};