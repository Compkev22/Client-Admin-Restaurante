// ComboView.jsx
import { useEffect, useState } from "react";
import { ComboCard } from "./ComboCard.jsx";
import { ComboModal } from "./ComboModal.jsx";
import { useComboStore } from "../../users/store/adminStore.js";
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
    getCombos();
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn p-2 md:p-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 italic uppercase">
            Nuestros <span className="text-kinal-red">Combos</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Gestiona las ofertas de Kinal Fried Chicken.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="w-full sm:w-auto bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2 shrink-0"
        >
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Nuevo Combo</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 md:py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-kinal-red" />
        </div>
      ) : combos.length === 0 ? (
        <div className="p-10 md:p-16 text-center border-2 border-dashed border-gray-200 rounded-3xl">
          <p className="text-gray-400 font-bold text-lg">No hay combos registrados.</p>
          <p className="text-gray-300 text-sm mt-1">Crea un nuevo combo para comenzar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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