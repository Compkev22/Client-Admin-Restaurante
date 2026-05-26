import iconDelete from "../../../assets/icons/Delete.svg";

export const OrderCart = ({ menuProducts, orderList, selectedProduct, setSelectedProduct, onAdd, onRemove }) => (
  <div>
    <label className="text-xs font-black text-kinal-red uppercase tracking-widest mb-2 block">
      Detalle del Pedido
    </label>
    <div className="flex gap-2 mb-4">
      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium min-w-0"
      >
        <option value="">-- Buscar en el menú --</option>
        {menuProducts.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} - Q{p.price?.toFixed(2)}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onAdd}
        className="bg-kinal-orange text-white font-black px-5 py-3 rounded-xl hover:bg-orange-600 transition-colors shrink-0"
      >
        Agregar
      </button>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto min-h-[150px]">
      {orderList.length > 0 ? (
        <table className="w-full text-left min-w-[400px]">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3 text-center">Cant.</th>
              <th className="p-3 text-right">Subtotal</th>
              <th className="p-3 text-center">X</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orderList.map((item) => (
              <tr key={item.productId} className="hover:bg-gray-50/50">
                <td className="p-3 font-bold text-gray-700">{item.name}</td>
                <td className="p-3 text-center font-bold text-kinal-orange">{item.quantity}</td>
                <td className="p-3 text-right font-black text-gray-800">Q{(item.price * item.quantity).toFixed(2)}</td>
                <td className="p-3 text-center">
                  <button type="button" onClick={() => onRemove(item.productId)} className="p-1 hover:bg-red-100 rounded-lg transition-colors">
                    <img src={iconDelete} className="w-5 h-5 opacity-70 hover:opacity-100" alt="Eliminar" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center h-full py-8">
          <p className="text-gray-400 font-bold text-sm">La orden está vacía. Agrega productos.</p>
        </div>
      )}
    </div>
  </div>
);