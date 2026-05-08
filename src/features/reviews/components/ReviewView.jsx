import { useState, useEffect, useMemo } from "react";
import { ReviewModal } from "./ReviewModal";
import { useReviewActions } from "../hooks/useReviewActions";
import { useBranchStore } from "../../users/store/adminStore";

export const ReviewPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [activeTab, setActiveTab] = useState("TODAS");
    const [selectedBranch, setSelectedBranch] = useState("");

    const { reviews, getReviews, saveReview, deleteReview, toggleReviewStatus } = useReviewActions();
    const { branches, getBranches } = useBranchStore();

    useEffect(() => { getBranches(); }, [getBranches]);
    useEffect(() => { getReviews(selectedBranch || "all"); }, [selectedBranch, getReviews]);

    const filteredReviews = reviews.filter(r => {
        if (activeTab === "OCULTAS") return r.isDeleted;
        if (r.isDeleted) return false;
        if (activeTab === "5 ESTRELLAS") return r.rating === 5;
        if (activeTab === "BUENAS (3-4)") return r.rating >= 3 && r.rating <= 4;
        if (activeTab === "CRÍTICAS (1-2)") return r.rating <= 2;
        return true;
    });

    const stats = useMemo(() => {
        const total = filteredReviews.length;
        const sum = filteredReviews.reduce((acc, curr) => acc + curr.rating, 0);
        const average = total > 0 ? (sum / total).toFixed(1) : "0.0";
        return { average, total };
    }, [filteredReviews]);

    return (
        <div className="p-4 md:p-8 bg-[#f8f9fa] min-h-screen font-sans">
            {/* Header Responsivo */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black italic text-gray-800 uppercase tracking-tight">
                        FEEDBACK & <span className="text-[#ffc107]">RESEÑAS</span>
                    </h1>
                    <p className="text-gray-500 text-xs md:text-sm font-medium italic mt-1">Monitorea la satisfacción de tus clientes y modera comentarios.</p>
                </div>
                
                {/* Stats Responsivos */}
                <div className="flex gap-4 md:gap-6 w-full lg:w-auto justify-between sm:justify-start">
                    <div className="text-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex-1 lg:flex-initial min-w-[120px] md:min-w-[140px]">
                        <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Promedio Global</p>
                        <p className="text-2xl md:text-3xl font-black text-gray-800">{stats.average} <span className="text-yellow-400 text-xl">☆</span></p>
                    </div>
                    <div className="text-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex-1 lg:flex-initial min-w-[120px] md:min-w-[140px]">
                        <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Reseñas</p>
                        <p className="text-2xl md:text-3xl font-black text-gray-800">{stats.total} <span className="text-gray-400 text-xl font-light">#</span></p>
                    </div>
                </div>
            </div>

            {/* Barra de Herramientas Responsiva */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10 bg-white sm:bg-transparent p-4 sm:p-0 rounded-3xl sm:rounded-none shadow-sm sm:shadow-none border sm:border-none border-gray-100">
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 sm:pb-0 -mx-2 sm:mx-0 px-2 sm:px-0 scrollbar-thin">
                    {["TODAS", "5 ESTRELLAS", "BUENAS (3-4)", "CRÍTICAS (1-2)", "OCULTAS"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-[11px] font-black tracking-wider transition-all border-2 whitespace-nowrap
                            ${activeTab === tab ? 'bg-[#1a202c] border-[#1a202c] text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={() => { setSelectedReview(null); setIsModalOpen(true); }}
                    className="bg-[#1a202c] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-[#e63946] transition-all shadow-xl active:scale-95 w-full sm:w-auto"
                >
                    + AÑADIR RESEÑA
                </button>
            </div>

            {/* Grid de Feedback Responsivo */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(review => (
                        <div key={review._id} className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-gray-50 relative group transition-all hover:shadow-xl flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex text-gray-800 text-lg md:text-xl gap-0.5 md:gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < review.rating ? "text-gray-800 font-bold" : "text-gray-200"}>☆</span>
                                        ))}
                                    </div>
                                    <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">{review.date || "Reciente"}</span>
                                </div>

                                <h3 className="text-lg md:text-xl font-black italic text-gray-800 mb-2 line-clamp-1">{review.title || (review.rating >= 4 ? "Excelente Experiencia" : "Mala Experiencia")}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed mb-6 md:mb-8 text-xs md:sm italic line-clamp-4 md:line-clamp-3">"{review.comment}"</p>
                            </div>

                            <div className="flex justify-between items-end gap-4 mt-auto">
                                <div className="flex-1 min-w-0">
                                    <p className="text-[9px] md:text-[10px] font-black text-[#ff8c00] uppercase mb-0.5 truncate">{review.branch?.name || "SUCURSAL"}</p>
                                    <p className="text-xs md:text-sm font-bold text-gray-700 truncate">{review.customer?.UserName || "Usuario Anónimo"}</p>
                                </div>
                                <button 
                                    onClick={() => { setSelectedReview(review); setIsModalOpen(true); }}
                                    className="bg-gray-50 px-4 md:px-6 py-2 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-100 transition-colors border border-gray-100 whitespace-nowrap"
                                >
                                    VER / MODERAR
                                </button>
                            </div>

                            {/* Botón eliminar responsivo (siempre visible en móvil, hover en PC) */}
                            <button 
                                onClick={() => deleteReview(review._id)}
                                className="absolute -top-3 -right-3 lg:top-4 lg:right-4 lg:opacity-0 group-hover:opacity-100 bg-white lg:bg-red-50 text-red-500 p-2 md:p-2.5 rounded-full transition-all hover:bg-red-500 hover:text-white shadow-lg lg:shadow-none border border-gray-100 lg:border-none"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-16 md:py-20 bg-gray-50 rounded-3xl md:rounded-[3rem] border-2 border-dashed border-gray-200 px-6">
                        <p className="text-gray-400 font-black uppercase tracking-widest italic text-xs md:text-sm">No hay reseñas para mostrar en esta categoría</p>
                    </div>
                )}
            </div>

            <ReviewModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                reviewData={selectedReview} 
                onSave={saveReview} 
            />
        </div>
    );
};