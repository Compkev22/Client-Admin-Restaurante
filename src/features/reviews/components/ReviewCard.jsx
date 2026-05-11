// src/features/reviews/components/ReviewCard.jsx
export const ReviewCard = ({ review, onEdit, onDelete }) => (
    <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-gray-50 relative group transition-all hover:shadow-xl flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start mb-4">
                <div className="flex text-gray-800 text-lg md:text-xl gap-0.5 md:gap-1">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-gray-800 font-bold" : "text-gray-200"}>☆</span>
                    ))}
                </div>
                <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">{review.date || "Reciente"}</span>
            </div>

            <h3 className="text-lg md:text-xl font-black italic text-gray-800 mb-2 line-clamp-1">
                {review.title || (review.rating >= 4 ? "Excelente Experiencia" : "Mala Experiencia")}
            </h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-6 md:mb-8 text-xs md:sm italic line-clamp-4 md:line-clamp-3">
                "{review.comment}"
            </p>
        </div>

        <div className="flex justify-between items-end gap-4 mt-auto">
            <div className="flex-1 min-w-0">
                <p className="text-[9px] md:text-[10px] font-black text-[#ff8c00] uppercase mb-0.5 truncate">{review.branch?.name || "SUCURSAL"}</p>
                <p className="text-xs md:text-sm font-bold text-gray-700 truncate">{review.customer?.UserName || "Usuario Anónimo"}</p>
            </div>
            <button 
                onClick={() => onEdit(review)}
                className="bg-gray-50 px-4 md:px-6 py-2 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-100 transition-colors border border-gray-100 whitespace-nowrap"
            >
                VER / MODERAR
            </button>
        </div>

        <button 
            onClick={() => onDelete(review._id)}
            className="absolute -top-3 -right-3 lg:top-4 lg:right-4 lg:opacity-0 group-hover:opacity-100 bg-white lg:bg-red-50 text-red-500 p-2 md:p-2.5 rounded-full transition-all hover:bg-red-500 hover:text-white shadow-lg lg:shadow-none border border-gray-100 lg:border-none"
        >
            ✕
        </button>
    </div>
);