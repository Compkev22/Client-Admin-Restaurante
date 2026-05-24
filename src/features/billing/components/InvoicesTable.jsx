// InvoicesTable.jsx
import { useEffect, useState } from "react";
import { PaymentWizardModal } from "./PaymentModal.jsx";
import { OrderDetailModal } from "../../orders/components/OrderDetailModal.jsx";
import { useBillingStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";

export const InvoicesTable = () => {
  const { billings, loading, error, getBillings } = useBillingStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    getBillings();
  }, [getBillings]);

  const handleOpenPaymentModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
  };

  const handleOpenOrderDetailModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsOrderDetailModalOpen(true);
  };

  if (loading && billings.length === 0) {
    return (
      <div className="flex flex-col items-center p-10 gap-4">
        <Spinner />
        <p className="text-gray-400 font-bold animate-pulse italic">OBTENIENDO REGISTROS...</p>
      </div>
    );
  }

  if (error && billings.length === 0) {
    return (
      <div className="text-center p-10 text-red-500 font-bold uppercase">{error}</div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full text-left border-collapse min-w-[540px] px-4 md:px-0">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase">Serie</th>
              <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase">Cliente</th>
              <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase">Total</th>
              <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase">Estado</th>
              <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {billings.map((inv) => (
              <tr
                key={inv._id}
                className="hover:bg-orange-50/50 transition-colors border-b border-gray-50 group"
              >
                <td className="py-3 px-3 font-bold text-gray-700 text-sm">{inv.BillSerie}</td>
                <td className="py-3 px-3 text-gray-600 text-sm">
                  {inv.client?.UserName
                    ? `${inv.client.UserName} ${inv.client.UserSurname}`
                    : "Consumidor Final"}
                </td>
                <td className="py-3 px-3 font-black text-gray-800 text-sm">
                  Q {inv.BillTotal?.toFixed(2)}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      inv.BillStatus === "PAYED"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {inv.BillStatus === "PAYED" ? "Pagada" : "Pendiente"}
                  </span>
                </td>
                <td className="py-3 px-3">
                  {inv.BillStatus === "PAYED" ? (
                    <button
                      onClick={() => handleOpenOrderDetailModal(inv)}
                      disabled={!inv.Order}
                      className="text-gray-400 font-bold text-sm hover:text-gray-600 underline disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Ver Detalles
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenPaymentModal(inv)}
                      className="w-full sm:w-auto bg-kinal-red text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-red-700 shadow-sm transition-colors"
                    >
                      Cobrar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOrderDetailModalOpen && selectedInvoice?.Order && (
        <OrderDetailModal
          isOpen={isOrderDetailModalOpen}
          onClose={() => {
            setIsOrderDetailModalOpen(false);
            setSelectedInvoice(null);
          }}
          // La orden ya viene con populate profundo desde el backend
          orderData={selectedInvoice.Order}
          // El billing lleva el cliente real que pagó
          billingData={selectedInvoice}
        />
      )}

      {isPaymentModalOpen && (
        <PaymentWizardModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedInvoice(null);
          }}
          orderData={selectedInvoice}
        />
      )}
    </>
  );
};