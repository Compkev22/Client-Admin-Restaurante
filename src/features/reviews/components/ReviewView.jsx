import { useState } from "react";
import { ReviewModal } from "./ReviewModal";
import StarIcon from "../../../assets/icons/Star.svg";
import iconDelete from "../../../assets/icons/Delete.svg"; // Asegúrate de tener la ruta correcta

export const ReviewPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [activeTab, setActiveTab] = useState("Todas");

    // Tabs de filtrado
    const tabs = ["Todas", "5 Estrellas", "Buenas (3-4)", "Críticas (1-2)", "Ocultas"];
    // Mock data basada en tu schema Mongoose (Simulando los populate de User, Order y Branch)
    const reviews = [
        { _id: "r1", customerName: "Diego López", orderId: "A1B2", branchName: "KFC Zona 10", rating: 5, comment: "El pollo estaba súper crujiente y caliente. ¡Excelente servicio!", isDeleted: false, createdAt: "Hace 2 horas" },
        { _id: "r2", customerName: "María Argueta", orderId: "C3D4", branchName: "KFC Miraflores", rating: 4, comment: "Todo muy rico, pero tardaron un poco en entregar la orden.", isDeleted: false, createdAt: "Hace 5 horas" },
        { _id: "r3", customerName: "Carlos Pérez", orderId: "E5F6", branchName: "KFC Zona 10", rating: 1, comment: "Pésimo. Las papas estaban frías y faltó mi soda.", isDeleted: false, createdAt: "Ayer" },
        { _id: "r4", customerName: "Usuario Anónimo", orderId: "G7H8", branchName: "KFC Portales", rating: 5, comment: "", isDeleted: false, createdAt: "Hace 2 días" },
        { _id: "r5", customerName: "Troll 123", orderId: "I9J0", branchName: "KFC Miraflores", rating: 1, comment: "Comida asquerosa, vayan a otro lado.", isDeleted: true, createdAt: "Hace 1 semana" },
    ];

    // Lógica de Filtrado
    const filteredReviews = reviews.filter(r => {
        if (activeTab === "Ocultas") return r.isDeleted;
        if (r.isDeleted) return false;

        if (activeTab === "5 Estrellas") return r.rating === 5;
        if (activeTab === "Buenas (3-4)") return r.rating === 3 || r.rating === 4;
        if (activeTab === "Críticas (1-2)") return r.rating === 1 || r.rating === 2;
        return true;
    });

    // Auxiliar para dibujar estrellas
    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <img
                key={index}
                src={StarIcon}
                alt="Star"
                className={`w-5 h-5 transition-all ${index < rating ? 'opacity-100' : 'opacity-20 grayscale'}`}
            />
        ));
    };

    // Matemáticas para el resumen rápido
    const validReviews = reviews.filter(r => !r.isDeleted);
    const avgRating = validReviews.reduce((acc, curr) => acc + curr.rating, 0) / (validReviews.length || 1);

    return (
        <div className="space-y-8 animate-fadeIn">

            {/* Header y Resumen Estadístico */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 italic uppercase">
                        Feedback & <span className="text-yellow-500">Reseñas</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Monitorea la satisfacción de tus clientes y modera comentarios.</p>
                </div>

                {/* Tarjeta de Resumen Rápido */}
                <div className="flex gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-center px-4 border-r border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase">Promedio Global</p>
                        <p className="text-3xl font-black text-gray-800 flex items-center justify-center gap-1">
                            {avgRating.toFixed(1)} <img src={StarIcon} className="w-6 h-6 inline-block" alt="Star" />
                        </p>          </div>
                    <div className="text-center px-4">
                        <p className="text-xs font-bold text-gray-400 uppercase">Total Reseñas</p>
                        <p className="text-3xl font-black text-gray-800 flex items-center justify-center gap-1">
                            {avgRating.toFixed(1)} <img src={StarIcon} className="w-6 h-6 inline-block" alt="Star" />
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs / Filtros */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${activeTab === tab
                            ? 'bg-gray-800 text-white shadow-md'
                            : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Grid de Reseñas */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                    <div key={review._id} className={`bg-white rounded-3xl p-6 shadow-sm border hover:shadow-xl transition-all relative flex flex-col h-full ${review.isDeleted ? 'border-red-200 bg-red-50/30 opacity-80' : 'border-gray-100'}`}>

                        {review.isDeleted && (
                            <div className="absolute top-4 right-4 z-10">
                                <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-1 rounded-full uppercase border border-red-200">Oculta (isDeleted)</span>
                            </div>
                        )}

                        {/* Cabecera de la Tarjeta */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-1 text-xl">
                                {renderStars(review.rating)}
                            </div>
                            <span className="text-xs font-bold text-gray-400">{review.createdAt}</span>
                        </div>

                        {/* Comentario */}
                        <h3 className="text-lg font-black italic text-gray-800 mb-2 leading-tight">
                            {review.rating >= 4 ? 'Excelente Experiencia' : review.rating === 3 ? 'Experiencia Regular' : 'Mala Experiencia'}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium mb-6 flex-grow line-clamp-3">
                            {review.comment ? `"${review.comment}"` : <span className="text-gray-400 italic">Sin comentario.</span>}
                        </p>

                        {/* Datos y Acciones */}
                        <div className="flex justify-between items-end border-t border-gray-50 pt-4 mt-auto">
                            <div>
                                <p className="text-[10px] font-black text-kinal-orange uppercase">{review.branchName}</p>
                                <p className="text-xs font-bold text-gray-500">{review.customerName}</p>
                            </div>

                            <div className="flex gap-2">
                                {/* Botón para abrir el Modal de Moderación */}
                                <button
                                    onClick={() => {
                                        setSelectedReview(review);
                                        setIsModalOpen(true);
                                    }}
                                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-gray-600 font-bold text-xs uppercase"
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
            />
        </div>
    );
};