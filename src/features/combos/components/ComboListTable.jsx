// ComboListTable.jsx
import iconDelete from "../../../assets/icons/Delete.svg";

export const ComboListTable = ({ comboList, onQuantityChange, onRemove }) => (
  /* overflow-x-auto permite scroll horizontal en móvil sin romper el layout */
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden min-h-[120px]">
    {comboList.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[340px]">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3 w-24 text-center">Cantidad</th>
              <th className="p-3 w-14 text-center">X</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {comboList.map((item) => (
              <tr key={item.productId} className="hover:bg-gray-50/50">
                <td className="p-3 font-bold text-gray-700 text-sm">{item.nombre}</td>
                <td className="p-3">
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => onQuantityChange(item.productId, e.target.value)}
                    className="w-full px-2 py-1 text-center font-bold text-kinal-orange rounded-lg border border-gray-200 outline-none text-sm"
                  />
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => onRemove(item.productId)}
                    className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                    aria-label="Eliminar producto"
                  >
                    <img src={iconDelete} alt="Borrar" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-400 font-bold text-sm">Este combo está vacío.</p>
      </div>
    )}
  </div>
);