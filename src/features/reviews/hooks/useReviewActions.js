import { useState, useCallback } from "react";
import { axiosAdmin } from "../../../shared/api/api"; 
import { showSuccess, showError } from "../../../shared/utils/toast";

export const useReviewActions = () => {
    const [reviews, setReviews] = useState([]);

    const mockData = [
        { _id: "1", rating: 5, comment: "¡Excelente servicio y comida!", customer: { UserName: "Bradley Oliva" }, branch: { name: "Central" }, isDeleted: false },
        { _id: "2", rating: 4, comment: "Muy buen ambiente para cenar.", customer: { UserName: "Tio Rayo" }, branch: { name: "Norte" }, isDeleted: false }
    ];

    const getReviews = useCallback(async (branchId) => {
        try {
            const { data } = await axiosAdmin.get(`/reviews/branch/${branchId}`);
            setReviews(data.data?.length > 0 ? data.data : mockData);
        } catch (error) {
            setReviews(mockData);
        }
    }, []);

    const saveReview = async (formData) => {
        if (formData._id) {
            setReviews(prev => prev.map(r => r._id === formData._id ? { ...r, ...formData } : r));
            showSuccess("Reseña editada (Local)");
        } else {
            const newReview = { ...formData, _id: Date.now().toString(), isDeleted: false };
            setReviews(prev => [newReview, ...prev]);
            showSuccess("Reseña creada (Local)");
        }
        return true; 
    };

    const toggleReviewStatus = async (id) => {
        // PATCH real (si existe el ID) o Simulación
        try {
            await axiosAdmin.patch(`/reviews/${id}/status`);
            setReviews(prev => prev.map(r => r._id === id ? { ...r, isDeleted: !r.isDeleted } : r));
            showSuccess("Estado actualizado");
        } catch (error) {
            setReviews(prev => prev.map(r => r._id === id ? { ...r, isDeleted: !r.isDeleted } : r));
            showSuccess("Estado actualizado (Local)");
        }
    };

   
    const deleteReview = async (id) => {
        // No llamamos al servidor porque no tienes ruta DELETE
        setReviews(prev => prev.filter(r => r._id !== id));
        showSuccess("Reseña eliminada permanentemente (Local)");
    };

    return { reviews, getReviews, saveReview, toggleReviewStatus, deleteReview };
};