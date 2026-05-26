import DeleteIcon from "../../../assets/icons/Delete.svg";
import { useComboStore } from "../../users/store/adminStore.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&auto=format&fit=crop";

export const ComboCard = ({ combo, onEdit }) => {
  const isActive = combo.ComboStatus === "ACTIVE";
  const changeComboStatus = useComboStore((state) => state.changeComboStatus);
  const imageUrl = combo.image?.url || FALLBACK_IMG;

  const handleDelete = () => {
    showConfirmToast({
      title: "Desactivar Combo",
      message: `¿Deseas cambiar el estado del combo "${combo.ComboName}"?`,
      onConfirm: () => changeComboStatus(combo._id),
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fadeIn relative flex flex-col">
      {!isActive && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <span className="bg-red-600 text-white font-black px-4 py-2 rounded-xl rotate-[-10deg] uppercase tracking-widest border-4 border-red-800">
            Inactivo
          </span>
        </div>
      )}

      <div className="relative h-44 md:h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={combo.ComboName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-kinal-red text-white font-black px-3 py-1.5 rounded-2xl shadow-lg transform rotate-3 text-sm shrink-0">
          Q {combo.ComboPrice?.toFixed(2)}
        </div>
      </div>

      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl font-black text-gray-800 uppercase italic mb-2 leading-tight">
          {combo.ComboName}
        </h3>
        <p className="text-gray-500 text-sm font-medium mb-4 line-clamp-2 flex-1">
          {combo.ComboDescription}
        </p>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={onEdit}
            className="flex-1 bg-kinal-red text-white text-xs font-black py-2.5 rounded-xl hover:bg-red-700 transition-colors uppercase tracking-widest relative z-20"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-3 md:px-4 py-2.5 border border-gray-100 text-gray-400 rounded-xl hover:bg-gray-50 transition-all hover:text-red-500 relative z-20"
            aria-label="Cambiar estado"
          >
            <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};