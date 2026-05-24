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
      {/* ── TARJETAS MÓVIL (< md) ── */}
      <div className="grid md:hidden gap-4">
        {billings.map((inv) => (
          <div
            key={inv._id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3"
          >
            {/* Cabecera */}
            <div className="flex justify-between items-start">
              <span className="font-black text-gray-700">{inv.BillSerie}</span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  inv.BillStatus === "PAYED"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {inv.BillStatus === "PAYED" ? "Pagada" : "Pendiente"}
              </span>
            </div>

            {/* Datos */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Cliente</p>
                <p className="font-bold text-gray-700">
                  {inv.client?.UserName
                    ? `${inv.client.UserName} ${inv.client.UserSurname}`
                    : "Consumidor Final"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Total</p>
                <p className="font-black text-gray-800">Q {inv.BillTotal?.toFixed(2)}</p>
              </div>
            </div>

            {/* Acción */}
            <div className="pt-2 border-t border-gray-100">
              {inv.BillStatus === "PAYED" ? (
                <button
                  onClick={() => handleOpenOrderDetailModal(inv)}
                  disabled={!inv.Order}
                  className="w-full py-2 rounded-xl border border-gray-200 font-bold text-sm text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Ver Detalles
                </button>
              ) : (
                <button
                  onClick={() => handleOpenPaymentModal(inv)}
                  className="w-full bg-kinal-red text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-700 shadow-sm transition-colors"
                >
                  Cobrar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── TABLA ESCRITORIO (≥ md) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[540px]">
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
          orderData={selectedInvoice.Order}
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