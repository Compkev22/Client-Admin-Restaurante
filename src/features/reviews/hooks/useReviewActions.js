import { useReviewStore } from "../../users/store/adminStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const useReviewActions = () => {
    // Traemos los datos y funciones reales del store
    const { reviews, getReviews, deleteReview: moderateReviewAPI } = useReviewStore();

    // Mantenemos el nombre 'deleteReview' para que ReviewPage.jsx no se rompa
    const deleteReview = async (id) => {
        const success = await moderateReviewAPI(id);
        if (success) {
            showSuccess("Estado de la reseña actualizado (Moderación)");
        } else {
            showError("No se pudo actualizar el estado de la reseña");
        }
    };

    return { 
        reviews, 
        getReviews, 
        deleteReview 
    };
};