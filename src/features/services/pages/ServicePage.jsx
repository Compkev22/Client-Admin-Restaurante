import { useState } from "react";
import { ServiceModal } from "../components/ServiceModal";

import createIcon from "../../../assets/icons/Create.svg";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const ServicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Todos");

  const tabs = ["Todos", "Activos", "Inactivos"];

  // Mock data poblada basada en tu esquema
  const services = [
    { _id: "s1", Name: "Decoración de Cumpleaños VIP", Description: "Incluye globos de helio, banderines, mantel temático y un mini-pastel para el festejado.", AdditionalPrice: 150.00, status: "ACTIVE" },
    { _id: "s2", Name: "Música en Vivo (Mariachi)", Description: "Serenata de 45 minutos con mariachi tradicional para la mesa reservada.", AdditionalPrice: 350.00, status: "ACTIVE" },
    { _id: "s3", Name: "Animador Infantil", Description: "Pintacaritas y globoflexia por 1 hora en el área de juegos.", AdditionalPrice: 200.00, status: "ACTIVE" },
    { _id: "s4", Name: "Fotografía Profesional", Description: "Sesión de fotos durante el evento y entrega digital de 20 fotografías editadas.", AdditionalPrice: 400.00, status: "INACTIVE" },
  ];

  // Filtro
  const filteredServices = services.filter(s => {
    if (activeTab === "Activos") return s.status === "ACTIVE";
    if (activeTab === "Inactivos") return s.status === "INACTIVE";
    return true; // "Todos"
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 italic uppercase">
            Servicios <span className="text-kinal-red">Adicionales</span>
          </h1>
          <p className="text-gray-500 font-medium">Catálogo de extras para reservaciones y eventos.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2"
        >
          <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
          <span>Nuevo Servicio</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-kinal-red text-white shadow-md' 
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid de Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const isActive = service.status === "ACTIVE";

          return (
            <div key={service._id} className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative flex flex-col h-full ${!isActive ? 'opacity-60 grayscale bg-gray-50' : ''}`}>
              
              {/* Badge de Estado */}
              <div className="absolute top-4 right-4">
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${isActive ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-200 text-gray-500 border-gray-300'}`}>
                  {isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              {/* Nombre y Precio */}
              <div className="mb-4 pr-16"> {/* pr-16 para que el texto no pise el badge */}
                <h3 className="text-xl font-black text-gray-800 leading-tight mb-2">
                  {service.Name}
                </h3>
                <p className="text-2xl font-black text-kinal-red">
                  + Q {service.AdditionalPrice.toFixed(2)}
                </p>
              </div>

              {/* Descripción */}
              <p className="text-sm text-gray-600 font-medium flex-grow mb-6 bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                {service.Description}
              </p>

              {/* Botones de Acción */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-auto">
                <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                  <img src={iconEdit} className="w-5 h-5 opacity-70" alt="Edit" />
                </button>
                <button className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors">
                  <img src={iconDelete} className="w-5 h-5 opacity-70" alt="Delete" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};