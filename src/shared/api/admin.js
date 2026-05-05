import { axiosAdmin } from "./api";

// ================= BRANCHES (SUCURSALES) =================
export const getBranches = async () => {
    return await axiosAdmin.get("/branches"); // Coincide con router.get('/')
};

export const createBranch = async (data) => {
    // Si envías imagen, recuerda usar FormData en el hook
    return await axiosAdmin.post("/branches", data); // Coincide con router.post('/')
};

export const updateBranch = async (id, data) => {
    return await axiosAdmin.put(`/branches/${id}`, data); // Coincide con router.put('/:id')
};

export const deleteBranch = async (id) => {
    // TU BACKEND USA PATCH PARA STATUS
    return await axiosAdmin.patch(`/branches/${id}/status`); 
};

// ... Mantén aquí las demás entidades conforme las agreguemos