import { axiosAdmin } from "./api";

// ================= ADDITIONAL SERVICES =================
export const getAdditionalServices = async () => {
    return await axiosAdmin.get("/AS");
};

export const createAdditionalService = async (data) => {
    return await axiosAdmin.post("/AS", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateAdditionalService = async (id, data) => {
    return await axiosAdmin.put(`/AS/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const changeAdditionalServiceStatus = async (id) => {
    return await axiosAdmin.patch(`/AS/${id}/status`);
};

// ================= BRANCHES (SUCURSALES) =================
export const getBranches = async (params) => await axiosAdmin.get("/branches", { params });
export const createBranch = async (data) => await axiosAdmin.post("/branches", data, { headers: { "Content-Type": "multipart/form-data" } });
export const updateBranch = async (id, data) => await axiosAdmin.put(`/branches/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteBranch = async (id) => await axiosAdmin.patch(`/branches/${id}/status`);

// ================= PRODUCTS (PRODUCTOS) =================
export const getProducts = async (params) => await axiosAdmin.get("/products", { params });
export const createProduct = async (data) => await axiosAdmin.post("/products", data, { headers: { "Content-Type": "multipart/form-data" } });
export const updateProduct = async (id, data) => await axiosAdmin.put(`/products/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteProduct = async (id) => await axiosAdmin.patch(`/products/${id}/status`);

// ================= MENU (SOLO LECTURA) =================
export const getMenu = async () => await axiosAdmin.get("/menu");

// ================= COUPONS (CUPONES) =================
export const getCoupons = async () => await axiosAdmin.get("/coupons");
export const createCoupon = async (data) => await axiosAdmin.post("/coupons", data);
export const updateCoupon = async (id, data) => await axiosAdmin.put(`/coupons/${id}`, data);
export const deleteCoupon = async (id) => await axiosAdmin.patch(`/coupons/${id}/status`);

// ================= TABLES (MESAS) =================
export const getTables = async (params) => await axiosAdmin.get("/tables", { params });
export const createTable = async (data) => await axiosAdmin.post("/tables", data);
export const updateTable = async (id, data) => await axiosAdmin.put(`/tables/${id}`, data);

// CORRECCIÓN: Cambiamos 'apiClient' por 'axiosAdmin' y quitamos el '/status'
export const deleteTable = async (id) => await axiosAdmin.patch(`/tables/${id}`);



// ================= USERS (USUARIOS/EMPLEADOS) =================
export const getUsers = async (params) => await axiosAdmin.get("/users", { params });
export const getUserById = async (id) => await axiosAdmin.get(`/users/${id}`);
export const createUser = async (data) => await axiosAdmin.post("/users", data);
export const updateUser = async (id, data) => await axiosAdmin.put(`/users/${id}`, data);
export const deleteUser = async (id) => await axiosAdmin.patch(`/users/${id}/status`);

// ================= BILLING (FACTURACIÓN) =================
export const getBillings = async () => await axiosAdmin.get("/billings");
export const getBillingById = async (id) => await axiosAdmin.get(`/billings/${id}`);
export const createBilling = async (data) => await axiosAdmin.post("/billings", data);
export const payBilling = async (id, data) => await axiosAdmin.patch(`/billings/pay/${id}`, data);