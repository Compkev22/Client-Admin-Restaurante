// src/features/reviews/components/ReviewGrid.jsx
import { ReviewCard } from "./ReviewCard.jsx";

export const ReviewGrid = ({ reviews, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <ReviewCard key={review._id} review={review} onEdit={onEdit} onDelete={onDelete} />
      ))
    ) : (
      <div className="col-span-full text-center py-16 md:py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 px-6">
        <p className="text-gray-400 font-black uppercase tracking-widest italic text-xs md:text-sm">
          No hay reseñas para mostrar en esta categoría
        </p>
      </div>
    )}
  </div>
);