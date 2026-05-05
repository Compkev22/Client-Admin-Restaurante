import { axiosAdmin } from "./api";

// ================= ADDITIONAL SERVICES =================
export const getAdditionalServices = async () => {
    return await axiosAdmin.get("/AS");
};

export const createAdditionalService = async (data) => {
    return await axiosAdmin.post("/AS", data);
};

export const updateAdditionalService = async (id, data) => {
    return await axiosAdmin.put(`/AS/${id}`, data);
};

export const changeAdditionalServiceStatus = async (id) => {
    return await axiosAdmin.patch(`/AS/${id}/status`);
};