import { useState, useCallback } from "react";
import { axiosAdmin } from "../../../shared/api/api"; 
import { showSuccess, showError } from "../../../shared/utils/toast";

export const useReviewActions = () => {
    const [reviews, setReviews] = useState([]);

    const mockData = [
        { _id: "1", rating: 5, title: "Excelente Experiencia", comment: "El pollo estaba súper crujiente y caliente. ¡Excelente servicio!", customer: { UserName: "Diego López" }, branch: { name: "KFC ZONA 10" }, date: "Hace 2 horas", isDeleted: false },
        { _id: "2", rating: 4, title: "Excelente Experiencia", comment: "Todo muy rico, pero tardaron un poco en entregar la orden.", customer: { UserName: "María Argueta" }, branch: { name: "KFC MIRAFLORES" }, date: "Hace 5 horas", isDeleted: false },
        { _id: "3", rating: 1, title: "Mala Experiencia", comment: "Pésimo. Las papas estaban frías y faltó mi soda.", customer: { UserName: "Carlos Pérez" }, branch: { name: "KFC ZONA 10" }, date: "Ayer", isDeleted: false }
    ];

    const getReviews = useCallback(async (branchId) => {
        try {
            const { data } = await axiosAdmin.get(`/reviews/branch/${branchId}`);
            // Si no hay datos en el backend, cargamos los mock para que no se vea vacío
            setReviews(data.data?.length > 0 ? data.data : mockData);
        } catch (error) {
            setReviews(mockData);
        }
    }, []);

    const saveReview = async (formData) => {
        if (formData._id) {
            setReviews(prev => prev.map(r => r._id === formData._id ? { ...r, ...formData } : r));
            showSuccess("Reseña editada correctamente");
        } else {
            const newReview = { 
                ...formData, 
                _id: Date.now().toString(), 
                date: "Recién ahora", 
                isDeleted: false,
                customer: { UserName: "Admin (Tú)" } // Para la simulación
            };
            setReviews(prev => [newReview, ...prev]);
            showSuccess("Reseña publicada con éxito");
        }
        return true; 
    };

    const toggleReviewStatus = async (id) => {
        setReviews(prev => prev.map(r => r._id === id ? { ...r, isDeleted: !r.isDeleted } : r));
        showSuccess("Estado de la reseña actualizado");
    };

    const deleteReview = async (id) => {
        setReviews(prev => prev.filter(r => r._id !== id));
        showSuccess("Reseña eliminada correctamente");
    };

    return { reviews, getReviews, saveReview, toggleReviewStatus, deleteReview };
};