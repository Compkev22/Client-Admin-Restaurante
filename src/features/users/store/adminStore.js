import { create } from "zustand";
import * as api from "../../../shared/api/admin";

export const useAdditionalServicesStore = create((set, get) => ({
  additionalServices: [],
  loading: false,
  error: null,

  getAdditionalServices: async () => {
    try {
      set({ loading: true, error: null });

      const response = await api.getAdditionalServices();

      set({
        additionalServices: response.data.data,
        loading: false,
      });
    } catch (error) {
      console.log("ERROR GET:", error);
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

      const response = await api.createAdditionalService(data);

      set({
        additionalServices: [response.data.data, ...get().additionalServices],
        loading: false,
      });

      return true;
    } catch (error) {
      console.log("ERROR CREATE:", error);
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

      const response = await api.updateAdditionalService(id, data);

      set({
        additionalServices: get().additionalServices.map((service) =>
          service._id === id ? response.data.data : service,
        ),
        loading: false,
      });

      return true;
    } catch (error) {
      console.log("ERROR UPDATE:", error);
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

      const response = await api.changeAdditionalServiceStatus(id);

      set({
        additionalServices: get().additionalServices.map((service) =>
          service._id === id ? response.data.data : service,
        ),
        loading: false,
      });

      return true;
    } catch (error) {
      console.log("ERROR STATUS:", error);
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

// ================= SUCURSALES STORE =================
export const useBranchStore = create((set, get) => ({
  branches: [],
  loading: false,
  error: null,
  getBranches: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.getBranches();
      set({ branches: res.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener sucursales",
        loading: false,
      });
    }
  },
  createBranch: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createBranch(data);
      set({ branches: [res.data.data, ...get().branches], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear",
        loading: false,
      });
      throw error;
    }
  },
  updateBranch: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateBranch(id, data);
      set({
        branches: get().branches.map((b) => (b._id === id ? res.data.data : b)),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar",
        loading: false,
      });
      throw error;
    }
  },
  deleteBranch: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteBranch(id);
      set({
        branches: get().branches.filter((b) => b._id !== id),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al eliminar",
        loading: false,
      });
    }
  },
}));

// ================= PRODUCTOS STORE =================
export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  getProducts: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.getProducts();
      set({ products: res.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener productos",
        loading: false,
      });
    }
  },
  createProduct: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createProduct(data);
      set({ products: [res.data.data, ...get().products], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear producto",
        loading: false,
      });
      throw error;
    }
  },
  updateProduct: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateProduct(id, data);
      set({
        products: get().products.map((p) => (p._id === id ? res.data.data : p)),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar producto",
        loading: false,
      });
      throw error;
    }
  },
  deleteProduct: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteProduct(id);
      set({
        products: get().products.filter((p) => p._id !== id),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al eliminar producto",
        loading: false,
      });
    }
  },
}));

// ================= MENÚ STORE (Solo Lectura) =================
export const useMenuStore = create((set) => ({
  menuItems: [],
  loading: false,
  error: null,
  getMenu: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.getMenu();
      set({ menuItems: res.data.menu, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al cargar menú",
        loading: false,
      });
    }
  },
}));

// ================= CUPONES STORE =================
export const useCouponStore = create((set, get) => ({
  coupons: [],
  loading: false,
  error: null,
  getCoupons: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.getCoupons();
      set({ coupons: res.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener cupones",
        loading: false,
      });
    }
  },
  createCoupon: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createCoupon(data);
      set({ coupons: [res.data.data, ...get().coupons], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear cupón",
        loading: false,
      });
      throw error;
    }
  },
  updateCoupon: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateCoupon(id, data);
      set({
        coupons: get().coupons.map((c) => (c._id === id ? res.data.data : c)),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar cupón",
        loading: false,
      });
      throw error;
    }
  },
  deleteCoupon: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteCoupon(id);
      set({
        coupons: get().coupons.filter((c) => c._id !== id),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al eliminar cupón",
        loading: false,
      });
    }
  },
}));

// ================= MESAS STORE =================
export const useTableStore = create((set, get) => ({
  tables: [],
  loading: false,
  error: null,

  getTables: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.getTables();
      set({ tables: res.data.tables || [], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener mesas",
        loading: false,
      });
    }
  },

  createTable: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createTable(data);
      set({ tables: [res.data.table, ...get().tables], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear mesa",
        loading: false,
      });
      throw error;
    }
  },

  updateTable: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateTable(id, data);
      set({
        tables: get().tables.map((t) => (t._id === id ? res.data.updated : t)),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar mesa",
        loading: false,
      });
      throw error;
    }
  },

  deleteTable: async (id) => {
    try {
      set({ loading: true });
      await api.deleteTable(id);
      // Si la API responde 200, quitamos la mesa del estado local
      set({
        tables: get().tables.filter((t) => t._id !== id),
        loading: false,
      });
    } catch (error) {
      console.error("Error al eliminar:", error);
      set({ error: "No se pudo eliminar la mesa", loading: false });
    }
  },
}));

// ================= USUARIOS STORE =================
export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,
  getUsers: async (params) => {
    try {
      set({ loading: true, error: null });
      const res = await api.getUsers(params);
      set({ users: res.data.data, loading: false });
    } catch (error) {
      set({
        users: [],
        error: error.response?.data?.message || "Error al obtener usuarios",
        loading: false,
      });
    }
  },
  createUser: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createUser(data);
      set({ users: [res.data.data, ...get().users], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear usuario",
        loading: false,
      });
      throw error;
    }
  },
  updateUser: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateUser(id, data);
      set({
        users: get().users.map((u) => (u._id === id ? res.data.data : u)),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar usuario",
        loading: false,
      });
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteUser(id);
      set({ users: get().users.filter((u) => u._id !== id), loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al eliminar usuario",
        loading: false,
      });
    }
  },
}));

// ================= BILLING STORE =================
export const useBillingStore = create((set, get) => ({
  billings: [],
  loading: false,
  error: null,

  getBillings: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.getBillings();
      // Accedemos a res.data.data basándonos en tu estructura común
      set({ billings: res.data.data || [], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener facturas",
        loading: false,
      });
    }
  },

  createBilling: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createBilling(data);
      const newBilling = res.data?.data || res.data;
      set({ billings: [res.data.data, ...get().billings], loading: false });
      return res.data.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear factura",
        loading: false,
      });
      throw error;
    }
  },

  payBilling: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await api.payBilling(id);
      set({
        billings: get().billings.map((billing) =>
          billing._id === id ? res.data.data : billing,
        ),
        loading: false,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      set({
        error: error.response?.data?.message || "Error al pagar factura",
        loading: false,
      });
      throw error;
    }
  },
}));

// ================= RESERVATIONS STORE =================
export const useReservationStore = create((set, get) => ({
  reservations: [],
  loading: false,
  error: null,

  getReservations: async (params) => {
    try {
      set({ loading: true, error: null });
      const res = await api.getReservations(params);
      // El controlador devuelve { success: true, reservations: [...] }
      set({ reservations: res.data.reservations, loading: false });
    } catch (error) {
      set({
        reservations: [],
        error:
          error.response?.data?.message || "Error al obtener reservaciones",
        loading: false,
      });
    }
  },

  createReservation: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createReservation(data);
      // El controlador devuelve { success: true, data: {...} }
      set({
        reservations: [res.data.data, ...get().reservations],
        loading: false,
      });
      return res.data; // Útil para mostrar la mesa asignada en el componente
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear reservación",
        loading: false,
      });
      throw error;
    }
  },

  updateReservation: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateReservation(id, data);
      // El controlador devuelve { success: true, updated: {...} }
      set({
        reservations: get().reservations.map((r) =>
          r._id === id ? res.data.updated : r,
        ),
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al actualizar reservación",
        loading: false,
      });
      throw error;
    }
  },

  deleteReservation: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await api.deleteReservation(id);
      // El controlador hace un toggle y devuelve el objeto modificado o mensaje
      // Para mantener sincronía con tu controlador que cambia statusRes y status:
      await get().getReservations(); // Recargamos para ver los cambios de estado aplicados
      set({ loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error al cambiar estado de reservación",
        loading: false,
      });
    }
  },
}));

// ================= INVENTORY STORE =================
export const useInventoryStore = create((set, get) => ({
  inventory: [],
  loading: false,
  error: null,

  getInventory: async (params) => {
    try {
      set({ loading: true, error: null });
      const res = await api.getInventory(params);
      // Tu controlador devuelve { success: true, items: [...] }
      set({ inventory: res.data.items, loading: false });
    } catch (error) {
      set({
        inventory: [],
        error: error.response?.data?.message || "Error al obtener inventario",
        loading: false,
      });
    }
  },

  createInventory: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createInventory(data);
      // Tu controlador devuelve { inventory: {...} }
      set({
        inventory: [res.data.inventory, ...get().inventory],
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear insumo",
        loading: false,
      });
      throw error;
    }
  },

  updateInventory: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateInventory(id, data);
      const updatedItem = res.data.updatedItem;
      // Tu controlador devuelve { updatedItem: {...} }
      set({
        inventory: get().inventory.map((item) =>
          item._id === id ? res.data.updatedItem : item,
        ),
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar insumo",
        loading: false,
      });
      throw error;
    }
  },

  deleteInventory: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await api.deleteInventory(id);
      // Como es un soft delete (toggle status), actualizamos el objeto en el store
      set({
        inventory: get().inventory.map((item) =>
          item._id === id ? res.data.updatedItem : item,
        ),
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al cambiar estado del insumo",
        loading: false,
      });
    }
  },
}));

// ================= EVENTS STORE =================
export const useEventStore = create((set, get) => ({
  events: [],
  loading: false,
  error: null,

  getEvents: async (params) => {
    try {
      set({ loading: true, error: null });
      const res = await api.getEvents(params);
      // El controlador de eventos devuelve { success: true, data: [...] }
      set({ events: res.data.data, loading: false });
    } catch (error) {
      set({
        events: [],
        error: error.response?.data?.message || "Error al obtener eventos",
        loading: false,
      });
    }
  },

  createEvent: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createEvent(data);
      // El controlador devuelve { success: true, data: {...} }
      set({ events: [res.data.data, ...get().events], loading: false });
      return res.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear el evento",
        loading: false,
      });
      throw error;
    }
  },

  updateEvent: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateEvent(id, data);
      // El controlador devuelve { success: true, data: {...} }
      set({
        events: get().events.map((e) => (e._id === id ? res.data.data : e)),
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar el evento",
        loading: false,
      });
      throw error;
    }
  },

  changeEventStatus: async (id, status) => {
    try {
      set({ loading: true, error: null });
      const res = await api.changeEventStatus(id, status);
      // El controlador devuelve el evento con el nuevo estado en "data"
      set({
        events: get().events.map((e) => (e._id === id ? res.data.data : e)),
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error al cambiar el estado del evento",
        loading: false,
      });
      return false;
    }
  },

  deleteEventPermanently: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteEventPermanently(id);
      // Filtramos el evento borrado para sacarlo de la lista
      set({
        events: get().events.filter((e) => e._id !== id),
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error al eliminar el evento permanentemente",
        loading: false,
      });
      return false;
    }
  },
}));

// ================= REVIEWS STORE =================
export const useReviewStore = create((set, get) => ({
  reviews: [],
  loading: false,
  error: null,

  getReviews: async (branchId) => {
    try {
      set({ loading: true, error: null });
      // Si el branchId es "all" o viene vacío, traemos el global. Si no, filtramos por sucursal.
      const res =
        !branchId || branchId === "all"
          ? await api.getAllReviews()
          : await api.getBranchReviews(branchId);

      set({ reviews: res.data.data, loading: false });
    } catch (error) {
      set({
        reviews: [],
        error: error.response?.data?.message || "Error al obtener reseñas",
        loading: false,
      });
    }
  },

  deleteReview: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await api.toggleReviewStatus(id);

      // Actualizamos solo la reseña modificada en la lista actual
      set({
        reviews: get().reviews.map((r) =>
          r._id === id ? { ...r, isDeleted: res.data.data.isDeleted } : r,
        ),
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al moderar reseña",
        loading: false,
      });
      return false;
    }
  },
}));

// ================= ORDER STORE =================
export const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrderDetails: [],
  loading: false,
  error: null,

  getOrders: async (params) => {
    try {
      set({ loading: true, error: null });
      const res = await api.getOrders(params);
      set({ orders: res.data.data, loading: false });
    } catch (error) {
      set({
        orders: [],
        error: error.response?.data?.message || "Error al obtener órdenes",
        loading: false,
      });
    }
  },

  getOrderDetails: async (orderId) => {
    try {
      set({ loading: true, error: null });
      const res = await api.getOrderDetailsByOrder(orderId);
      set({ currentOrderDetails: res.data.data, loading: false });
      return res.data.data;
    } catch (error) {
      set({
        currentOrderDetails: [],
        error: "Error al obtener detalles",
        loading: false,
      });
      return [];
    }
  },

  createFullOrder: async (orderData, cartItems) => {
    try {
      set({ loading: true, error: null });

      // 1. Crear la orden (Cabecera)
      const orderRes = await api.createOrder(orderData);
      const newOrder = orderRes.data.data;

      // 2. Insertar cada producto del carrito como OrderDetail
      for (const item of cartItems) {
        await api.createOrderDetail({
          order: newOrder._id,
          productoId: item.type === "Individual" ? item.productId : null,
          comboId: item.type === "Combo" ? item.productId : null,
          cantidad: item.quantity,
        });
      }

      // 3. ✅ NUEVO: Generar la factura automáticamente con estado GENERATED
      //    Necesitamos recalcular el total porque el backend lo calcula en OrderDetail
      //    Obtenemos la orden actualizada para tener el total correcto
      const updatedOrderRes = await api.getOrderById(newOrder._id);
      const updatedOrder =
        updatedOrderRes.data.data?.order || updatedOrderRes.data.data;

      await api.createBilling({
        Order: newOrder._id,
        BillPaymentMethod: "CASH", // Valor por defecto, se cambia al pagar
        clientId: orderData.clientId || null,
        newClientData: orderData.newClientData || null,
        BillSerie: `FAC-${Date.now()}`,
      });

      await get().getOrders();
      set({ loading: false });
      return true;
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al crear la orden completa",
        loading: false,
      });
      throw error;
    }
  },

  changeOrderStatus: async (id, estado) => {
    try {
      set({ loading: true, error: null });
      const res = await api.changeOrderStatus(id, estado);
      set({
        orders: get().orders.map((o) => (o._id === id ? res.data.data : o)),
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al cambiar estado",
        loading: false,
      });
      return false;
    }
  },
}));

// En src/features/users/store/adminStore.js

export const useComboStore = create((set, get) => ({
  combos: [],
  loading: false,
  error: null,

  getCombos: async () => {
    try {
      set({ loading: true });
      const res = await api.getCombos();
      set({ combos: res.data.data, loading: false });
    } catch (err) {
      set({ error: "Error al cargar combos", loading: false });
    }
  },

  saveCombo: async (formData) => {
    try {
      set({ loading: true });
      const res = await api.createCombo(formData);
      set({ combos: [res.data.data, ...get().combos], loading: false });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Error al guardar el combo",
        loading: false,
      });
      return false;
    }
  },

  deleteCombo: async (id) => {
    try {
      set({ loading: true });
      const res = await api.toggleComboStatus(id);
      // Actualizamos el estado local para reflejar si quedó ACTIVE o INACTIVE
      set({
        combos: get().combos.map((c) => (c._id === id ? res.data.data : c)),
        loading: false,
      });
      return true;
    } catch (err) {
      set({ loading: false });
      return false;
    }
  },
}));
