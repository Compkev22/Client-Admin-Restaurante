import { useState, useEffect } from "react";
import { ReviewModal } from "./ReviewModal";
import { useReviewActions } from "../hooks/useReviewActions";
import { useBranchStore } from "../../users/store/adminStore";
import StarIcon from "../../../assets/icons/Star.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const ReviewPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [activeTab, setActiveTab] = useState("Todas");
    const [selectedBranch, setSelectedBranch] = useState("");

    const { reviews, getReviews, saveReview, deleteReview, toggleReviewStatus } = useReviewActions();
    const { branches, getBranches } = useBranchStore();

    useEffect(() => { getBranches(); }, [getBranches]);
    useEffect(() => { if (selectedBranch) getReviews(selectedBranch); }, [selectedBranch, getReviews]);

    const filteredReviews = reviews.filter(r => {
        if (activeTab === "Ocultas") return r.isDeleted;
        if (r.isDeleted) return false;
        if (activeTab === "5 Estrellas") return r.rating === 5;
        if (activeTab === "Críticas (1-2)") return r.rating <= 2;
        return true;
    });

    const handleOpenCreate = () => {
        setSelectedReview(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 italic uppercase">
                        Feedback & <span className="text-red-600">Reseñas</span>
                    </h1>
                    <select 
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="mt-4 px-4 py-2 rounded-xl border border-gray-200 font-bold"
                    >
                        <option value="">Seleccionar Sucursal...</option>
                        {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                    </select>
                </div>

                {/* BOTÓN PARA CREAR NUEVA */}
                <button 
                    onClick={handleOpenCreate}
                    className="bg-black text-white px-8 py-3 rounded-2xl font-black uppercase text-xs hover:bg-red-600 transition-all shadow-lg"
                >
                    + Nueva Reseña
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                    <div key={review._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between mb-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <img key={i} src={StarIcon} className={`w-5 h-5 ${i < review.rating ? 'opacity-100' : 'opacity-20 grayscale'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 italic mb-6">"{review.comment || "Sin comentario."}"</p>
                        
                        <div className="flex justify-between items-end border-t pt-4">
                            <div>
                                <p className="text-[10px] font-black text-red-600 uppercase">{review.branch?.name}</p>
                                <p className="text-xs font-bold text-gray-500">{review.customer?.UserName || "Anónimo"}</p>
                            </div>
                            <div className="flex gap-2">
                                {/* BOTÓN ELIMINAR */}
                                <button onClick={() => deleteReview(review._id)} className="p-2 bg-red-50 rounded-lg">
                                    <img src={iconDelete} className="w-4 h-4 opacity-70" />
                                </button>
                                {/* BOTÓN EDITAR / MODERAR */}
                                <button 
                                    onClick={() => { setSelectedReview(review); setIsModalOpen(true); }}
                                    className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700 font-black text-[10px] uppercase"
                                >
                                    Ver / Moderar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ReviewModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                reviewData={selectedReview}
                onSave={saveReview}
                onToggleStatus={toggleReviewStatus}
                branches={branches}
            />
        </div>
    );
};