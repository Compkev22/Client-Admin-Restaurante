// src/features/reviews/components/ReviewModal.jsx
import { useState, useEffect } from "react";

export const ReviewModal = ({ isOpen, onClose, reviewData, onModerate }) => {
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        if (reviewData && isOpen) {
            setIsDeleted(reviewData.isDeleted || false);
        }
    }, [reviewData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Solo enviamos la instrucción de cambiar el estado (moderación)
        if (reviewData.isDeleted !== isDeleted) {
            onModerate(reviewData._id);
        }
        onClose();
    };

    if (!isOpen || !reviewData) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
                <header className="bg-[#e63946] p-8 text-white flex justify-between items-center">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                        Moderar Reseña
                    </h2>
                    <button onClick={onClose} className="text-3xl font-light hover:rotate-90 transition-all">×</button>
                </header>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="bg-gray-50 rounded-3xl p-5 text-center">
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <span key={star} className={`text-4xl ${star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Comentario del Cliente</label>
                        <div className="w-full px-6 py-4 rounded-[2rem] bg-gray-50 border-none min-h-28 font-medium text-gray-600">
                            {reviewData.comment || "Sin comentarios adicionales."}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-red-50 p-4 rounded-2xl border border-red-100 mt-4">
                        <input type="checkbox" id="isDeleted" checked={isDeleted}
                            onChange={(e) => setIsDeleted(e.target.checked)} className="w-5 h-5 accent-[#e63946]" />
                        <label htmlFor="isDeleted" className="text-xs font-black text-red-700 uppercase italic cursor-pointer">
                            Ocultar esta reseña al público
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-4 font-black text-gray-400 uppercase text-[10px]">Cerrar</button>
                        <button type="submit" className="flex-[2] bg-gray-900 text-white font-black py-5 rounded-2xl hover:bg-[#e63946] transition-all uppercase text-[10px] tracking-widest">
                            Aplicar Moderación
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};