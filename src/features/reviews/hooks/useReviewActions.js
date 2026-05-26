import { useReviewStore } from "../../users/store/adminStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const useReviewActions = () => {
    const { reviews, getReviews, deleteReview: moderateReviewAPI } = useReviewStore();

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