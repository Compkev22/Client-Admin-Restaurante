export const BillingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            Generar <span className="text-kinal-red">Factura</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Serie (BillSerie)</label>
            <input type="text" name="BillSerie" placeholder="Ej: A-001" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Método de Pago</label>
            <select name="BillPaymentMethod" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
              <option value="CASH">Efectivo (CASH)</option>
              <option value="CARD">Tarjeta (CARD)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Subtotal</label>
            <input type="number" step="0.01" name="BillSubtotal" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">IVA</label>
            <input type="number" step="0.01" name="BillIVA" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Estado de Factura</label>
            <select name="BillStatus" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white">
              <option value="GENERATED">Generada (GENERATED)</option>
              <option value="PAYED">Pagada (PAYED)</option>
            </select>
          </div>

          <div className="col-span-2 pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 bg-kinal-red text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">Crear Factura</button>
          </div>
        </form>
      </div>
    </div>
  );
};