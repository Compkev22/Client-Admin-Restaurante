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

// ================= RESERVATIONS (RESERVAS) =================
export const getReservations = async (params) => await axiosAdmin.get("/reservations", { params });
export const createReservation = async (data) => await axiosAdmin.post("/reservations", data);
export const updateReservation = async (id, data) => await axiosAdmin.put(`/reservations/${id}`, data);
export const deleteReservation = async (id) => await axiosAdmin.patch(`/reservations/${id}/status`);

// ================= INVENTORY (INVENTARIO) =================
export const getInventory = async (params) => await axiosAdmin.get("/inventory", { params });
export const createInventory = async (data) => await axiosAdmin.post("/inventory", data);
export const updateInventory = async (id, data) => await axiosAdmin.put(`/inventory/${id}`, data);
export const deleteInventory = async (id) => await axiosAdmin.patch(`/inventory/${id}/status`);

// ================= EVENTS (EVENTOS) =================
export const getEvents = async (params) => await axiosAdmin.get("/events", { params });
export const getEventById = async (id) => await axiosAdmin.get(`/events/${id}`);
export const createEvent = async (data) => await axiosAdmin.post("/events", data);
export const updateEvent = async (id, data) => await axiosAdmin.put(`/events/${id}`, data);
export const changeEventStatus = async (id, status) => await axiosAdmin.patch(`/events/${id}/status`, { status });
export const toggleEventAttendance = async (id, action) => await axiosAdmin.patch(`/events/${id}/attendance`, { action });
export const deleteEventPermanently = async (id) => await axiosAdmin.delete(`/events/${id}`);

// ================= REVIEWS (RESEÑAS) =================
export const getAllReviews = async () => await axiosAdmin.get("/reviews");
export const getBranchReviews = async (branchId) => await axiosAdmin.get(`/reviews/branch/${branchId}`);
export const toggleReviewStatus = async (id) => await axiosAdmin.patch(`/reviews/${id}/status`);

// ================= BILLING (FACTURACIÓN) =================
// GET /billings acepta params como { page, limit, BillStatus, branchId }
export const getBillings = async (params) => await axiosAdmin.get("/billings", { params });
export const getBillingById = async (id) => await axiosAdmin.get(`/billings/${id}`);
export const createBilling = async (data) => await axiosAdmin.post("/billings", data);
export const payBilling = async (id) => await axiosAdmin.patch(`/billings/pay/${id}`);