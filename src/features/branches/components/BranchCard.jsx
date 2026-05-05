import { useBranchStore } from "../../users/store/adminStore"; // Ajustar ruta luego
import { useUIStore } from "../../auth/store/uiStore";

import branchLocationIcon from "../../../assets/icons/BranchLocation.svg";
import branchPhoneIcon from "../../../assets/icons/BranchPhone.svg";
import DeleteIcon from "../../../assets/icons/Delete.svg";

export const BranchCard = ({ branch, onEdit }) => {
  const isActive = branch.branchStatus === 'ACTIVE';
  
  // FALTA: Que este método exista en el store
  const deleteBranch = useBranchStore((state) => state.deleteBranch);
  const { openConfirm } = useUIStore();

  const handleDelete = () => {
    openConfirm(
      "Eliminar Sucursal",
      `¿Estás seguro de que deseas eliminar la sucursal ${branch.name}?`,
      () => deleteBranch(branch._id)
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow animate-fadeIn">
      <div className={`h-2 bg-gradient-t-r ${isActive ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600'}`} />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-black text-gray-800 uppercase italic leading-tight">
            {branch.name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
            isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {isActive ? 'Activa' : 'Inactiva'}
          </span>
        </div>
        
        <div className="space-y-3 text-sm text-gray-600 font-medium">
          <div className="flex items-center gap-3">
            <img src={branchLocationIcon} alt="Location" className="w-5 h-5 opacity-70" />
            <span>{branch.address}, Zona {branch.zone}</span>
          </div>
          <div className="flex items-center gap-3">
            <img src={branchPhoneIcon} alt="Phone" className="w-5 h-5 opacity-70" />
            <span>{branch.phone}</span>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Horario: {branch.OpenedAt} - {branch.ClosedAt} | {branch.Category}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button 
            onClick={onEdit}
            className="flex-1 bg-kinal-red text-white text-xs font-black py-2.5 rounded-xl hover:bg-red-700 transition-colors uppercase"
          >
            Editar
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2.5 border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};