import { create } from "zustand";

import {
    getAdditionalServices as getAdditionalServicesRequest,
    createAdditionalService as createAdditionalServiceRequest,
    updateAdditionalService as updateAdditionalServiceRequest,
    changeAdditionalServiceStatus as changeAdditionalServiceStatusRequest,
} from "../../../shared/api";

export const useAdditionalServicesStore = create((set, get) => ({
    additionalServices: [],
    loading: false,
    error: null,

    getAdditionalServices: async () => {
        try {
            set({ loading: true, error: null });

            const response = await getAdditionalServicesRequest();

            set({
                additionalServices: response.data.data,
                loading: false,
            });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Error al obtener los servicios adicionales",
                loading: false,
            });
        }
    },

    createAdditionalService: async (data) => {
        try {
            set({ loading: true, error: null });

            const response = await createAdditionalServiceRequest(data);

            set({
                additionalServices: [
                    response.data.data,
                    ...get().additionalServices,
                ],
                loading: false,
            });

            return true;
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Error al crear el servicio adicional",
                loading: false,
            });

            return false;
        }
    },

    updateAdditionalService: async (id, data) => {
        try {
            set({ loading: true, error: null });

            const response = await updateAdditionalServiceRequest(id, data);

            set({
                additionalServices: get().additionalServices.map((service) =>
                    service._id === id ? response.data.data : service
                ),
                loading: false,
            });

            return true;
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Error al actualizar el servicio adicional",
                loading: false,
            });

            return false;
        }
    },

    changeAdditionalServiceStatus: async (id) => {
        try {
            set({ loading: true, error: null });

            const response = await changeAdditionalServiceStatusRequest(id);

            set({
                additionalServices: get().additionalServices.map((service) =>
                    service._id === id ? response.data.data : service
                ),
                loading: false,
            });

            return true;
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Error al cambiar el estado del servicio adicional",
                loading: false,
            });

            return false;
        }
    },
}));