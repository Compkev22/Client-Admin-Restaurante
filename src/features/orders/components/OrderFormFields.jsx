export const OrderFormFields = ({ orderType, setOrderType, tables, mesaId, setMesaId }) => (
    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6">
        <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Tipo de Orden</label>
            <select
                value={orderType} onChange={(e) => setOrderType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700"
            >
                <option value="DINE_IN">Para Comer Aquí (DINE_IN)</option>
                <option value="TAKEAWAY">Para Llevar (TAKEAWAY)</option>
                <option value="DELIVERY">A Domicilio (DELIVERY)</option>
            </select>
        </div>
        {orderType === "DINE_IN" ? (
            <div className="flex flex-col gap-1 animate-fadeIn">
                <label className="text-sm font-bold text-gray-700">Seleccionar Mesa</label>
                <select
                    value={mesaId}
                    onChange={(e) => setMesaId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white"
                >
                    <option value="">-- Elige una mesa --</option>
                    {tables?.filter(t => t.availability === 'Disponible').map(t => (
                        <option key={t._id} value={t._id}>
                            Mesa {t.numberTable} (Cap: {t.capacity})
                        </option>
                    ))}
                </select>
            </div>
        ) : (
            <div className="flex flex-col gap-1 animate-fadeIn">
                <label className="text-sm font-bold text-gray-700">Nombre del Cliente (Opcional)</label>
                <input type="text" placeholder="Ej: Carlos López" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white" />
            </div>
        )}
    </div>
);