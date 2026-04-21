export const InvoicesTable = () => {
  // Datos quemados para que la T93 se vea completa
  const invoices = [
    { id: "FAC-001", client: "Diego Lopez", date: "20/04/2026", total: "Q 150.00", status: "Pagado" },
    { id: "FAC-002", client: "Bradley Smith", date: "20/04/2026", total: "Q 85.00", status: "Pagado" },
    { id: "FAC-003", client: "Roberto Gomez", date: "19/04/2026", total: "Q 210.00", status: "Anulado" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">No. Factura</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Cliente</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Fecha</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Total</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Estado</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="hover:bg-orange-50/50 transition-colors border-b border-gray-50 group">
              <td className="py-4 px-2 font-bold text-gray-700">{inv.id}</td>
              <td className="py-4 px-2 text-gray-600">{inv.client}</td>
              <td className="py-4 px-2 text-gray-500 text-sm">{inv.date}</td>
              <td className="py-4 px-2 font-black text-gray-800">{inv.total}</td>
              <td className="py-4 px-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  inv.status === 'Pagado' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {inv.status}
                </span>
              </td>
              <td className="py-4 px-2">
                <button className="text-kinal-red font-bold text-sm hover:underline">
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};