// Importación de imágenes locales
import imgCombo1 from "../../../assets/img/Combo1.png";
import imgCombo2 from "../../../assets/img/Combo2.png";
import imgCombo3 from "../../../assets/img/Combo3.png";

import { ComboCard } from "../components/ComboCard";

export const ComboPage = () => {
  const combos = [
    { 
      id: 1, 
      name: "Combo Familiar Kinal", 
      description: "8 piezas de pollo frito, 2 papas grandes y una soda de 1.5L.",
      price: 155.00,
      items: ["8 Pollo", "2 Papas", "1.5L Soda"],
      image: imgCombo1 // <-- Usamos la variable importada
    },
    { 
      id: 2, 
      name: "Menú Económico", 
      description: "2 piezas de pollo, papas medianas y soda de 12oz.",
      price: 45.00,
      items: ["2 Pollo", "1 Papas", "Soda 12oz"],
      image: imgCombo2 
    },
    { 
      id: 3, 
      name: "Kinal Box", 
      description: "1 hamburguesa, 1 pieza de pollo y papas fritas.",
      price: 65.00,
      items: ["Hamburguesa", "1 Pollo", "1 Papas"],
      image: imgCombo3 
    }
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
        <button className="bg-kinal-orange text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter">
          + Nuevo Combo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {combos.map(combo => (
          <ComboCard key={combo.id} combo={combo} />
        ))}
      </div>
    </div>
  );
};