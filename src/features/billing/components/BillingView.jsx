// BillingView.jsx
import { useState } from "react";
import { BillingStats } from "./BillingStats.jsx";
import { InvoicesTable } from "./InvoicesTable.jsx";
import { BillingModal } from "./BillingModal.jsx";
import { BillingHeader } from "./BillingHeader.jsx";

export const BillingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in p-2 md:p-4">
      <BillingHeader onOpenModal={() => setIsModalOpen(true)} />
      <BillingStats />

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-4 md:mb-6">
          Facturas Recientes
        </h2>
        <InvoicesTable />
      </div>

      <BillingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};