import iconDelete from "../../../assets/icons/Delete.svg";

export const ComboListTable = ({ comboList, onQuantityChange, onRemove }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden min-h-[120px]">
    {comboList.length > 0 ? (
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
          <tr>
            <th className="p-3">Producto</th>
            <th className="p-3 w-24 text-center">Cantidad</th>
            <th className="p-3 w-16 text-center">X</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {comboList.map((item) => (
            <tr key={item.productId} className="hover:bg-gray-50/50">
              <td className="p-3 font-bold text-gray-700">{item.nombre}</td>
              <td className="p-3">
                <input 
                  type="number" min="1" value={item.cantidad}
                  onChange={(e) => onQuantityChange(item.productId, e.target.value)}
                  className="w-full px-2 py-1 text-center font-bold text-kinal-orange rounded-lg border border-gray-200 outline-none"
                />
              </td>
              <td className="p-3 text-center">
                <button type="button" onClick={() => onRemove(item.productId)} className="p-1 hover:bg-red-100 rounded-lg">
                  <img src={iconDelete} alt="Borrar" className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-400 font-bold text-sm">Este combo está vacío.</p>
      </div>
    )}
  </div>
);