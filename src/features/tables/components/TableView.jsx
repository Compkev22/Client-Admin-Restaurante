// C:\2022473\Proyectos 2026\Segundo Bimestre\Client-Admin-Restaurante\src\features\tables\components\TableView.jsx
import { useEffect, useState } from "react";
import { TableModal } from "./TableModal";
import { useTableStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner"; // 👇 Importa el Spinner
import { showError } from "../../../shared/utils/toast";
import { showConfirmToast } from "../../auth/components/ConfirmModal"; // 👇 Importa para borrar seguro

import createIcon from "../../../assets/icons/Create.svg";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";
import ChairsIcon from "../../../assets/icons/Chairs.svg";

export const TablePage = () => {
    // 👇 AGREGAMOS error Y loading AQUÍ (Esto quita el error de la consola)
    const { tables, getTables, deleteTable, error, loading } = useTableStore();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [activeTab, setActiveTab] = useState("Todas");

    const tabs = ["Todas", "Disponible", "Ocupada", "Mantenimiento"];

    useEffect(() => { 
        getTables(); 
    }, [getTables]);

    // 👇 Ahora sí funcionará porque 'error' ya existe
    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const filteredTables = (Array.isArray(tables) ? tables : []).filter(t => {
        if (activeTab === "Todas") return true;
        return t.availability === activeTab;
    });

    const getAvailabilityStyle = (availability) => {
        switch (availability) {
            case 'Disponible': return { bg: 'bg-green-100', border: 'border-green-200', text: 'text-green-700', icon: '🟢' };
            case 'Ocupada': return { bg: 'bg-red-100', border: 'border-red-200', text: 'text-red-700', icon: '🔴' };
            case 'Mantenimiento': return { bg: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-700', icon: '🟡' };
            default: return { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-500', icon: '⚪' };
        }
    };

    // 👇 Función para borrar con confirmación (Más seguro)
    const handleDelete = (table) => {
        showConfirmToast({
            title: "Eliminar Mesa",
            message: `¿Estás seguro de eliminar la mesa #${table.numberTable}?`,
            onConfirm: () => deleteTable(table._id)
        });
    };

    return (
        <div className="space-y-8 animate-fadeIn p-4">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 italic uppercase">
                        Gestión de <span className="text-kinal-red">Mesas</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Control de capacidad y disponibilidad en restaurante.</p>
                </div>
                <button
                    onClick={() => { setSelectedTable(null); setIsModalOpen(true); }}
                    className="bg-kinal-orange text-white font-black px-6 py-3 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase flex items-center gap-2"
                >
                    <img src={createIcon} className="w-5 h-5 invert opacity-90" />
                    <span>Nueva Mesa</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all ${activeTab === tab ? 'bg-kinal-red text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* --- LÓGICA DE ESTADOS (Spinner, Error, Empty) --- */}
            {loading && filteredTables.length === 0 ? (
                <div className="p-20 flex flex-col justify-center items-center gap-4">
                    <Spinner />
                    <p className="text-gray-400 font-bold animate-pulse">Cargando mesas...</p>
                </div>
            ) : error && filteredTables.length === 0 ? (
                <div className="p-20 text-center">
                    <p className="text-red-500 font-black text-xl uppercase italic">Error de conexión</p>
                    <p className="text-gray-500">{error}</p>
                </div>
            ) : filteredTables.length === 0 ? (
                <div className="p-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="text-gray-400 font-bold">No hay mesas en esta categoría.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTables.map((table) => {
                        const style = getAvailabilityStyle(table.availability);
                        return (
                            <div key={table._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative flex flex-col items-center text-center hover:shadow-lg transition-all">
                                <div className="w-full flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-black text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded">
                                        {table.branchId?.name || "Sin sucursal"}
                                    </span>
                                </div>

                                <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center mb-4 ${style.bg} ${style.border}`}>
                                    <span className={`text-3xl font-black ${style.text}`}>#{table.numberTable}</span>
                                </div>

                                <p className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                                    <img src={ChairsIcon} className="w-5 h-5 opacity-70" />
                                    {table.capacity} Personas
                                </p>

                                <div className={`w-full py-2 rounded-xl text-xs font-black uppercase ${style.bg} ${style.text} border ${style.border}`}>
                                    {style.icon} {table.availability}
                                </div>

                                <div className="absolute top-4 right-4 flex gap-1">
                                    <button 
                                        onClick={() => { setSelectedTable(table); setIsModalOpen(true); }}
                                        className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <img src={iconEdit} className="w-4 h-4 opacity-60" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(table)} // 👇 Ahora usa la confirmación
                                        className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                    >
                                        <img src={iconDelete} className="w-4 h-4 opacity-60 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <TableModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                tableData={selectedTable} 
            />
        </div>
    );
};