import { useEffect, useState } from "react";
import { useInventoryStore } from "../../users/store/adminStore.js";
import { InventoryModal } from "./InventoryModal.jsx";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { Spinner } from "../../auth/components/Spinner.jsx";

import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import createIcon from "../../../assets/icons/Create.svg";

export const InventoryPage = () => {
  const { inventory, loading, getInventory, deleteInventory } = useInventoryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (item) => {
    const action = item.status === 'ACTIVE' ? 'desactivar' : 'activar';

    showConfirmToast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Insumo`,
      message: `¿Estás seguro de que deseas ${action} "${item.name}"?`,
      onConfirm: () => {
        deleteInventory(item._id);
      }
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn p-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Control de <span className="text-kinal-red">Inventario</span>
          </h1>
          <p className="text-gray-500 font-medium">Gestiona el stock y costos de ingredientes por sucursal.</p>
        </div>
        <button
          onClick={() => {
            setSelectedItem(null);
            setIsModalOpen(true);
          }}
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2"
        >
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Agregar Insumo</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && inventory.length === 0 ? (
          <div className="p-20 flex justify-center"><Spinner /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Insumo</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Sucursal</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Stock</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Costo Unit.</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Estado</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase italic text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inventory.map((item) => (
                  <tr key={item._id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="p-4">
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{item.description}</p>
                    </td>
                    <td className="p-4">
                      {/* Mostramos el nombre de la sucursal si está populado */}
                      <span className="text-xs font-black text-kinal-orange uppercase">
                        {item.branchId?.name || "N/A"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-black ${item.stock <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-kinal-red italic">
                        Q {item.unitCost?.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        item.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {item.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="hover:scale-110 transition-transform p-1"
                        >
                          <img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Editar" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(item)}
                          className="hover:scale-110 transition-transform p-1"
                        >
                          <img
                            src={iconDelete}
                            className={`w-5 h-5 opacity-60 hover:opacity-100 ${item.status === 'INACTIVE' ? 'grayscale' : ''}`}
                            alt="Cambiar estado"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
};