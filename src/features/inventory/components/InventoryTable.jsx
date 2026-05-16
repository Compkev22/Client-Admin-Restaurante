// features/inventory/components/InventoryTable.jsx
import { Spinner } from "../../auth/components/Spinner.jsx";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const InventoryTable = ({ inventory, branches, loading, error, onEdit, onToggleStatus }) => {
  if (loading && inventory.length === 0) {
    return (
      <div className="p-16 md:p-20 flex flex-col justify-center items-center gap-4">
        <Spinner />
        <p className="text-gray-400 font-bold animate-pulse">Cargando inventario...</p>
      </div>
    );
  }

  if (error && inventory.length === 0) {
    return (
      <div className="p-16 md:p-20 text-center">
        <p className="text-red-500 font-black text-xl uppercase italic">Error de conexión</p>
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <div className="p-16 md:p-20 text-center border-2 border-dashed border-gray-100 m-6 rounded-3xl">
        <p className="text-gray-400 font-bold text-lg">El inventario está vacío.</p>
        <p className="text-gray-300 text-sm">Agrega insumos para empezar a llevar el control.</p>
      </div>
    );
  }

  return (
    /*
      overflow-x-auto permite scroll horizontal en móvil.
      La tabla mantiene su estructura pero se puede deslizar.
    */
    <div className="overflow-x-auto -mx-0">
      <table className="w-full text-left min-w-[600px]">
        <thead className="bg-gray-50">
          <tr>
            {["Insumo", "Sucursal", "Stock", "Costo Unit.", "Estado", "Acciones"].map((col) => (
              <th key={col} className="p-3 md:p-4 text-xs font-black text-gray-400 uppercase italic whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {inventory.map((item) => {
            const branchName =
              item.branchId?.name ||
              branches.find((b) => b._id === item.branchId)?.name ||
              "N/A";
            return (
              <tr key={item._id} className="hover:bg-orange-50/30 transition-colors">
                <td className="p-3 md:p-4">
                  <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{item.description}</p>
                </td>
                <td className="p-3 md:p-4">
                  <span className="text-xs font-black text-kinal-orange uppercase whitespace-nowrap">{branchName}</span>
                </td>
                <td className="p-3 md:p-4">
                  <span className={`font-black text-sm ${item.stock <= 5 ? "text-red-500" : "text-gray-700"}`}>
                    {item.stock}
                  </span>
                </td>
                <td className="p-3 md:p-4 font-bold text-kinal-red italic text-sm whitespace-nowrap">
                  Q {item.unitCost?.toFixed(2)}
                </td>
                <td className="p-3 md:p-4">
                  <span
                    className={`px-2 md:px-3 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap ${
                      item.status === "ACTIVE"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status === "ACTIVE" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="p-3 md:p-4">
                  <div className="flex justify-center gap-3 md:gap-4">
                    <button onClick={() => onEdit(item)} className="hover:scale-110 transition-transform p-1">
                      <img src={iconEdit} className="w-5 h-5 opacity-60 hover:opacity-100" alt="Editar" />
                    </button>
                    <button onClick={() => onToggleStatus(item)} className="hover:scale-110 transition-transform p-1">
                      <img
                        src={iconDelete}
                        className={`w-5 h-5 opacity-60 hover:opacity-100 ${item.status === "INACTIVE" ? "grayscale" : ""}`}
                        alt="Cambiar estado"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};