import { useState } from "react";
import { TableModal } from "../components/TableModal";

import createIcon from "../../../assets/icons/Create.svg";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import ChairsIcon from "../../../assets/icons/Chairs.svg";

export const TablePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Todas");

    // Tabs basadas en tu schema 'availability'
    const tabs = ["Todas", "Disponible", "Ocupada", "Mantenimiento", "Inactivas"];

    // Mock data poblada
    const tables = [
        { _id: "t1", numberTable: 1, capacity: 4, availability: "Disponible", TableStatus: "ACTIVE", branchName: "KFC Zona 10", coords: [10, 20] },
        { _id: "t2", numberTable: 2, capacity: 2, availability: "Ocupada", TableStatus: "ACTIVE", branchName: "KFC Zona 10", coords: [50, 20] },
        { _id: "t3", numberTable: 3, capacity: 8, availability: "Disponible", TableStatus: "ACTIVE", branchName: "KFC Zona 10", coords: [100, 80] },
        { _id: "t4", numberTable: 4, capacity: 4, availability: "Mantenimiento", TableStatus: "ACTIVE", branchName: "KFC Miraflores", coords: [0, 0] },
        { _id: "t5", numberTable: 5, capacity: 6, availability: "Disponible", TableStatus: "INACTIVE", branchName: "KFC Miraflores", coords: [0, 0] }, // Soft deleted
    ];

    // Lógica de Filtrado
    const filteredTables = tables.filter(t => {
        if (activeTab === "Inactivas") return t.TableStatus === "INACTIVE";
        if (t.TableStatus === "INACTIVE") return false; // Ocultamos las inactivas de las demás tabs

        if (activeTab === "Todas") return true;
        return t.availability === activeTab;
    });

    // Colores para la disponibilidad operativa
    const getAvailabilityStyle = (availability) => {
        switch (availability) {
            case 'Disponible': return { bg: 'bg-green-100', border: 'border-green-200', text: 'text-green-700', icon: '🟢' };
            case 'Ocupada': return { bg: 'bg-red-100', border: 'border-red-200', text: 'text-red-700', icon: '🔴' };
            case 'Mantenimiento': return { bg: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-700', icon: '🟡' };
            default: return { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-500', icon: '⚪' };
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 italic uppercase">
                        Gestión de <span className="text-kinal-red">Mesas</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Control de capacidad y disponibilidad en restaurante.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase tracking-tighter flex items-center justify-center gap-2"
                >
                    <img src={createIcon} alt="Crear" className="w-5 h-5 invert opacity-90" />
                    <span>Nueva Mesa</span>
                </button>
            </div>

            {/* Tabs / Filtros */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${activeTab === tab
                                ? 'bg-kinal-red text-white shadow-md'
                                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Grid de Mesas */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTables.map((table) => {
                    const style = getAvailabilityStyle(table.availability);
                    const isInactive = table.TableStatus === "INACTIVE";

                    return (
                        <div key={table._id} className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative flex flex-col items-center text-center ${isInactive ? 'opacity-60 grayscale' : ''}`}>

                            {/* Sucursal y Estado Lógico */}
                            <div className="w-full flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded">
                                    {table.branchName}
                                </span>
                                {isInactive && (
                                    <span className="text-[10px] font-black text-red-500 uppercase border border-red-200 px-2 py-1 rounded">Inactiva</span>
                                )}
                            </div>

                            {/* Icono Principal (Número de Mesa) */}
                            <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center mb-4 shadow-inner ${style.bg} ${style.border}`}>
                                <span className={`text-3xl font-black ${style.text}`}>#{table.numberTable}</span>
                            </div>

                            {/* Capacidad */}
                            <p className="text-sm font-bold text-gray-800 flex items-center justify-center gap-2 mb-4">
                                <img src={ChairsIcon} className="w-5 h-5 opacity-70" alt="Sillas" />
                                {table.capacity} Personas
                            </p>

                            {/* Disponibilidad Operativa */}
                            <div className={`w-full py-2 rounded-xl text-xs font-black uppercase tracking-widest ${style.bg} ${style.text} border ${style.border}`}>
                                {style.icon} {table.availability}
                            </div>

                            {/* Coordenadas (Info técnica) */}
                            <p className="text-[10px] font-mono text-gray-400 mt-4">
                                Pos: [{table.coords[0]}, {table.coords[1]}]
                            </p>

                            {/* Botones de Acción Mínimos */}
                            <div className="absolute top-4 right-4 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                                <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                    <img src={iconEdit} className="w-4 h-4 opacity-70" alt="Edit" />
                                </button>
                                <button className="p-1.5 bg-red-50 hover:bg-red-100 rounded text-red-600 transition-colors">
                                    <img src={iconDelete} className="w-4 h-4 opacity-70" alt="Delete" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <TableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};