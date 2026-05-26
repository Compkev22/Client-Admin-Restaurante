import { useReservationStore } from "../../users/store/adminStore.js";

export const useSaveReservation = () => {
    const createReservation = useReservationStore((state) => state.createReservation);
    const updateReservation = useReservationStore((state) => state.updateReservation);

    const saveReservation = async (data, reservationId = null) => {
        const reservationPayload = {
            branchId: data.branchId,
            clientId: data.clientId,
            date: data.date,
            time: data.time,
            numberOfPersons: Number(data.numberOfPersons),
            notes: data.notes?.trim() || "",
            ...(reservationId && { status: data.status }),
        };

        try {
            if (reservationId) {
                await updateReservation(reservationId, reservationPayload);
            } else {
                return await createReservation(reservationPayload);
            }
        } catch (err) {
            // Re-lanzar para que el Modal muestre el mensaje real del backend
            throw err;
        }
    };

    return { saveReservation };
};