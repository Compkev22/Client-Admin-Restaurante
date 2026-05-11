// src/features/reviews/components/ReviewHeader.jsx
export const ReviewHeader = ({ stats }) => (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
            <h1 className="text-2xl md:text-3xl font-black italic text-gray-800 uppercase tracking-tight">
                FEEDBACK & <span className="text-[#ffc107]">RESEÑAS</span>
            </h1>
            <p className="text-gray-500 text-xs md:text-sm font-medium italic mt-1">
                Monitorea la satisfacción de tus clientes y modera comentarios.
            </p>
        </div>
        
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
);