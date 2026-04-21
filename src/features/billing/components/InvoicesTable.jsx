export const InvoicesTable = () => {
  // Data falsa adaptada al modelo Billing de Mongoose
  const invoices = [
    { _id: "1", clientName: "Diego Lopez", BillSerie: "FAC-001", BillDate: "20/04/2026", BillTotal: 150.00, BillStatus: "PAYED", BillPaymentMethod: "CASH" },
    { _id: "2", clientName: "Bradley Smith", BillSerie: "FAC-002", BillDate: "20/04/2026", BillTotal: 85.00, BillStatus: "PAYED", BillPaymentMethod: "CARD" },
    { _id: "3", clientName: "Roberto Gomez", BillSerie: "FAC-003", BillDate: "19/04/2026", BillTotal: 210.00, BillStatus: "GENERATED", BillPaymentMethod: "CASH" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Serie</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Cliente</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Total</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Pago</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Estado</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv._id} className="hover:bg-orange-50/50 transition-colors border-b border-gray-50 group">
              <td className="py-4 px-2 font-bold text-gray-700">{inv.BillSerie}</td>
              <td className="py-4 px-2 text-gray-600">{inv.clientName}</td>
              <td className="py-4 px-2 font-black text-gray-800">Q {inv.BillTotal.toFixed(2)}</td>
              <td className="py-4 px-2 text-gray-500 text-sm font-bold">{inv.BillPaymentMethod}</td>
              <td className="py-4 px-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  inv.BillStatus === 'PAYED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {inv.BillStatus === 'PAYED' ? 'Pagada' : 'Generada'}
                </span>
              </td>
              <td className="py-4 px-2">
                <button className="text-kinal-red font-bold text-sm hover:underline">Ver Detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};