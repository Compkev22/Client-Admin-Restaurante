import { axiosAdmin } from "../../../shared/api/api"; 
import { showSuccess, showError } from "../../../shared/utils/toast";

export const useSaveEvent = () => {
    const saveEvent = async (data, eventId = null) => {
        const cleanBranchId = typeof data.branchId === 'object' ? data.branchId?._id : data.branchId;
        const cleanClientId = typeof data.clientId === 'object' ? data.clientId?._id || data.clientId?.uid : data.clientId;

        const eventPayload = {
            name: data.name,
            eventDate: data.eventDate,
            startTime: data.startTime,
            endTime: data.endTime,
            numberOfPersons: Number(data.numberOfPersons),
            branchId: cleanBranchId?.trim(),
            clientId: cleanClientId?.trim(),
            status: data.status || "Pendiente",
            notes: data.notes || "Sin notas"
        };

        try {
            if (eventId) {
                await axiosAdmin.put(`/events/${eventId}`, eventPayload);
                showSuccess("¡Evento actualizado!");
            } else {
                await axiosAdmin.post('/events', eventPayload);
                showSuccess("¡Evento creado con éxito!");
            }
            return true;
        } catch (error) {
            const backendErrors = error.response?.data?.error;
            const message = error.response?.data?.message;
            
            if (Array.isArray(backendErrors)) {
                showError(`${backendErrors[0].message}`);
            } else {
                showError(message || "Error al procesar la solicitud en el servidor");
            }
            return false;
        }
    };

    const cancelEvent = async (id, currentEventData) => {
        try {
            const payload = {
                ...currentEventData,
                branchId: currentEventData.branchId?._id || currentEventData.branchId,
                clientId: currentEventData.clientId?._id || currentEventData.clientId?.uid || currentEventData.clientId,
                status: 'Cancelado'
            };
            await axiosAdmin.put(`/events/${id}`, payload);
            showSuccess("Evento cancelado");
            return true;
        } catch (error) {
            showError("No se pudo cancelar el evento");
            return false;
        }
    };

    const deleteEventPermanently = async (id) => {
        try {
            await axiosAdmin.delete(`/events/${id}`);
            showSuccess("Evento eliminado definitivamente");
            return true;
        } catch (error) {
            showError("Error al eliminar permanentemente");
            return false;
        }
    };

    return { saveEvent, cancelEvent, deleteEventPermanently };
};