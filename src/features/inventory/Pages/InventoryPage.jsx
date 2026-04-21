import { useState } from "react";
import { InventoryModal } from "../components/InventoryModal";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const InventoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data falsa adaptada al modelo Inventory
  const inventory = [
    { _id: "1", name: "Pechuga de Pollo", description: "Caja de 40 lbs", stock: 120, unitCost: 15.50, status: "ACTIVE" },
    { _id: "2", name: "Aceite para Freír", description: "Bidón de 5 Galones", stock: 2, unitCost: 120.00, status: "ACTIVE" },
    { _id: "3", name: "Harina de Trigo", description: "Costal de 50 lbs", stock: 40, unitCost: 45.00, status: "INACTIVE" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ... Header igual ... */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">Control de <span className="text-kinal-red">Inventario</span></h1>
          <p className="text-gray-500 font-medium">Gestiona el stock y costos de ingredientes.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-kinal-orange text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter">
          + Agregar Insumo
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Insumo</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Descripción</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Stock</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Costo Unit.</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic">Estado</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase italic text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventory.map((item) => (
              <tr key={item._id} className="hover:bg-orange-50/30 transition-colors">
                <td className="p-4 font-bold text-gray-800">{item.name}</td>
                <td className="p-4 text-sm text-gray-500 font-medium">{item.description}</td>
                <td className="p-4 font-black text-gray-700">{item.stock}</td>
                <td className="p-4 font-bold text-kinal-red">Q {item.unitCost.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    item.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button className="hover:scale-110 transition-transform"><img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" /></button>
                    <button className="hover:scale-110 transition-transform"><img src={iconDelete} className="w-5 h-5 opacity-60 hover:opacity-100" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InventoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};