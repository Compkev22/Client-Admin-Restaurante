// Importación de imágenes locales
import imgCombo1 from "../../../assets/img/Combo1.png";
import imgCombo2 from "../../../assets/img/Combo2.png";
import imgCombo3 from "../../../assets/img/Combo3.png";
import createIcon from "../../../assets/icons/Create.svg";

import { ComboCard } from "../components/ComboCard";
import { ComboModal } from "../components/ComboModal";
import { useState } from "react";

export const ComboPage = () => {
    const [isComboModalOpen, setIsComboModalOpen] = useState(false);

  const combos = [
    { _id: "1", ComboName: "Combo Familiar Kinal", ComboDescription: "8 piezas de pollo frito, 2 papas grandes y una soda de 1.5L.", ComboPrice: 155.00, ComboDiscount: 0, ComboStatus: "ACTIVE", image: imgCombo1 },
    { _id: "2", ComboName: "Menú Económico", ComboDescription: "2 piezas de pollo, papas medianas y soda de 12oz.", ComboPrice: 45.00, ComboDiscount: 5, ComboStatus: "ACTIVE", image: imgCombo2 },
    { _id: "3", ComboName: "Kinal Box", ComboDescription: "1 hamburguesa, 1 pieza de pollo y papas fritas.", ComboPrice: 65.00, ComboDiscount: 0, ComboStatus: "INACTIVE", image: imgCombo3 }
  ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 italic uppercase">
                        Nuestros <span className="text-kinal-red">Combos</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Gestiona las ofertas de Kinal Fried Chicken.</p>
                </div>
                <button
                    onClick={() => setIsComboModalOpen(true)}
                    className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex flex-row items-center justify-center gap-2">
                    <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
                    <span>Nuevo Combo</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {combos.map(combo => (
                    <ComboCard key={combo.id} combo={combo} />
                ))}
            </div>
            <ComboModal 
            isOpen={isComboModalOpen} 
            onClose={() => setIsComboModalOpen(false)} 
            />
        </div>

    );
};