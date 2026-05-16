// features/branches/components/BranchCard.jsx
import { useBranchStore } from "../../users/store/adminStore.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

import branchLocationIcon from "../../../assets/icons/BranchLocation.svg";
import branchPhoneIcon from "../../../assets/icons/BranchPhone.svg";
import DeleteIcon from "../../../assets/icons/Delete.svg";

export const BranchCard = ({ branch, onEdit }) => {
  const isActive = branch.branchStatus === "ACTIVE";
  const deleteBranch = useBranchStore((state) => state.deleteBranch);

  const handleDelete = () => {
    showConfirmToast({
      title: "Eliminar Sucursal",
      message: `¿Estás seguro de que deseas eliminar la sucursal ${branch.name}?`,
      onConfirm: () => {
        deleteBranch(branch._id);
      },
    });
  };

  const imageUrl =
    branch.Photos && branch.Photos.length > 0
      ? branch.Photos[0].ImageURL
      : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&h=200&auto=format&fit=crop";

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow animate-fadeIn flex flex-col">
      {/* Barra de estado superior */}
      <div
        className={`h-2 bg-gradient-to-r ${
          isActive ? "from-green-400 to-green-600" : "from-red-400 to-red-600"
        }`}
      />

      {/* Imagen de la sucursal */}
      <div className="w-full h-44 md:h-48 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={branch.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 md:p-6 flex-1 flex flex-col">
        {/* Nombre y badge de estado */}
        <div className="flex justify-between items-start mb-4 gap-2">
          <h3 className="text-lg md:text-xl font-black text-gray-800 uppercase italic leading-tight">
            {branch.name}
          </h3>
          <span
            className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
              isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {isActive ? "Activa" : "Inactiva"}
          </span>
        </div>

        {/* Datos de la sucursal */}
        <div className="space-y-2 md:space-y-3 text-sm text-gray-600 font-medium flex-1">
          <div className="flex items-start gap-3">
            <img src={branchLocationIcon} alt="Ubicación" className="w-5 h-5 opacity-70 shrink-0 mt-0.5" />
            {/* line-clamp evita que direcciones largas rompan el layout */}
            <span className="line-clamp-2">{branch.address}, Zona {branch.zone}</span>
          </div>
          <div className="flex items-center gap-3">
            <img src={branchPhoneIcon} alt="Teléfono" className="w-5 h-5 opacity-70 shrink-0" />
            <span>{branch.phone}</span>
          </div>
          <div className="text-xs text-gray-400 font-bold bg-gray-50 rounded-xl px-3 py-2 mt-2">
            🕐 {branch.OpenedAt} — {branch.ClosedAt} &nbsp;|&nbsp; {branch.Category}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-4 md:mt-6 flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-kinal-red text-white text-xs font-black py-2.5 rounded-xl hover:bg-red-700 transition-colors uppercase"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-3 md:px-4 py-2.5 border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-50 transition-colors"
            aria-label="Eliminar sucursal"
          >
            <img src={DeleteIcon} alt="Eliminar" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};