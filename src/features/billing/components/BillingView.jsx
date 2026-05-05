import { BillingStats } from "./BillingStats";
import { InvoicesTable } from "./InvoicesTable";
import { BillingModal } from "./BillingModal";
import { useState } from "react";

import createIcon from "../../../assets/icons/Create.svg";

export const BillingPage = () => {
    const [isComboModalOpen, setIsComboModalOpen] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-black text-gray-800 italic">
                    CONTROL DE <span className="text-red-600">FACTURACIÓN</span>
                </h1>
                <p className="text-gray-500 font-medium">Gestiona los ingresos y comprobantes de venta.</p>
            </div>

            <BillingStats />

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-700">Facturas Recientes</h2>
                    <button className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2">
                        <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
                        <span>Generar Factura</span>
                    </button>
                </div>
                <InvoicesTable />
            </div>
        </div>
    );
};