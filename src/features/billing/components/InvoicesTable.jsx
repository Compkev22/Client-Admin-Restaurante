import { useEffect, useState } from "react";
import { PaymentWizardModal } from "./PaymentModal";
import { useBillingStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";

export const InvoicesTable = () => {
  const { billings, loading, error, getBillings } = useBillingStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    getBillings();
  }, [getBillings]);

  const handleOpenPaymentModal = (invoice) => {
    setSelectedInvoice({
      _id: invoice._id,
      total: invoice.BillTotal,
    });
    setIsPaymentModalOpen(true);
  }

  if (loading && billings.length === 0) {
    return (
      <div className="flex flex-col items-center p-10 gap-4">
        <Spinner />
        <p className="text-gray-400 font-bold animate-pulse italic">OBTENIENDO REGISTROS...</p>
      </div>
    );
  }

  if (error && billings.length === 0) {
    return <div className="text-center p-10 text-red-500 font-bold uppercase">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Serie</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Cliente</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Total</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Estado</th>
            <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {billings.map((inv) => (
            <tr key={inv._id} className="hover:bg-orange-50/50 transition-colors border-b border-gray-50 group">
              <td className="py-4 px-2 font-bold text-gray-700">{inv.BillSerie}</td>
              {/* Nota: Asumiendo que el backend hace .populate('client') */}
              <td className="py-4 px-2 text-gray-600">
                {inv.client?.UserName ? `${inv.client.UserName} ${inv.client.UserSurname}` : "Consumidor Final"}
              </td>
              <td className="py-4 px-2 font-black text-gray-800">Q {inv.BillTotal?.toFixed(2)}</td>
              <td className="py-4 px-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${inv.BillStatus === 'PAYED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {inv.BillStatus === 'PAYED' ? 'Pagada' : 'Pendiente'}
                </span>
              </td>
              <td className="py-4 px-2">
                <button
                  onClick={() => handleOpenPaymentModal(inv)}
                  className="text-kinal-red font-bold text-sm hover:underline"
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaymentWizardModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderData={selectedInvoice}
      />
    </div>
  );
};