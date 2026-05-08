import { useReservationStore } from "../../users/store/adminStore.js";

export const useSaveReservation = () => {
    const createReservation = useReservationStore((state) => state.createReservation);
    const updateReservation = useReservationStore((state) => state.updateReservation);

    /**
     * Guarda o actualiza una reservación
     * @param {Object} data - Datos provenientes del formulario
     * @param {string|null} reservationId - ID de la reservación si es edición
     */
    const saveReservation = async (data, reservationId = null) => {
        // Mapeamos los datos al formato que el Backend requiere
        const reservationPayload = {
            branchId: data.branchId,
            clientId: data.clientId,
            date: data.date,
            time: data.time,
            numberOfPersons: Number(data.numberOfPersons),
            notes: data.notes || "",
            // Solo incluimos status en la edición si tu vista permite al admin cambiarlo manualmente
            ...(reservationId && { status: data.status }) 
        };

        if (reservationId) {
            // PUT /reservation/:id
            await updateReservation(reservationId, reservationPayload);
        } else {
            // POST /reservation/
            // El backend asignará automáticamente la mejor mesa (bestTable)
            return await createReservation(reservationPayload);
        }
    };

    return { saveReservation };
};