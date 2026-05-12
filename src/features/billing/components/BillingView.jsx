// BillingView.jsx
import { useState } from "react";
import { BillingStats } from "./BillingStats";
import { InvoicesTable } from "./InvoicesTable";
import { BillingModal } from "./BillingModal";
import { BillingHeader } from "./BillingHeader";

export const BillingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      <BillingHeader onOpenModal={() => setIsModalOpen(true)} />
      <BillingStats />

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-6">Facturas Recientes</h2>
        <InvoicesTable />
      </div>

      <BillingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};