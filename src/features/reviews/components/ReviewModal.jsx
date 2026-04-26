import StarIcon from "../../../assets/icons/Star.svg"; // <-- Agrega esta importación

export const ReviewModal = ({ isOpen, onClose, reviewData }) => {
  if (!isOpen || !reviewData) return null;

  // NUEVO: Generador de estrellas usando tu SVG
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <img 
        key={index} 
        src={StarIcon} 
        alt="Star" 
        className={`w-6 h-6 transition-all ${index < rating ? 'opacity-100' : 'opacity-20 grayscale'}`} 
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="bg-gray-800 px-8 py-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-wider">
              Detalle de <span className="text-yellow-400">Reseña</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">Orden: ORD-{reviewData.orderId}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-2xl transition-colors">×</button>
        </div>

        <div className="p-8 space-y-6">
          {/* INFO DEL CLIENTE Y CALIFICACIÓN */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Cliente</p>
              <p className="font-black text-gray-800 text-lg">{reviewData.customerName}</p>
              <p className="text-sm font-bold text-kinal-orange">{reviewData.branchName}</p>
            </div>
            <div className="flex gap-1">
              {renderStars(reviewData.rating)}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* COMENTARIO */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Comentario del Cliente</p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 min-h-[120px]">
              <p className="text-gray-700 italic font-medium leading-relaxed">
                {reviewData.comment ? `"${reviewData.comment}"` : "El cliente no dejó un comentario escrito, solo calificación."}
              </p>
            </div>
          </div>

          {/* ESTADO DE MODERACIÓN (isDeleted) */}
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <label className="text-sm font-black text-kinal-orange uppercase tracking-widest block mb-2">Estado de Moderación</label>
            <select 
              defaultValue={reviewData.isDeleted ? "true" : "false"}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700"
            >
              <option value="false">Público (Visible en la app)</option>
              <option value="true">Oculto / Eliminado (isDeleted: true)</option>
            </select>
            <p className="text-xs text-gray-500 mt-2 font-medium">Si el comentario contiene lenguaje inapropiado, puedes ocultarlo del sistema.</p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="bg-gray-50 border-t border-gray-100 p-6 flex gap-4">
          <button onClick={onClose} className="px-6 py-3 font-bold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
            Cancelar
          </button>
          <button className="flex-1 bg-kinal-red text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">
            Guardar Cambios
          </button>
        </div>

      </div>
    </div>
  );
};