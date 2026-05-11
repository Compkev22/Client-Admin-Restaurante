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
      console.log("ERROR GET:", error); // 👈 importante para debug
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
        additionalServices: [
          response.data.data,
          ...get().additionalServices,
        ],
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
          service._id === id ? response.data.data : service
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
          service._id === id ? response.data.data : service
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
  branches: [], loading: false, error: null,
  getBranches: async () => {
    try { set({ loading: true, error: null }); const res = await api.getBranches(); set({ branches: res.data.data, loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al obtener sucursales", loading: false }); }
  },
  createBranch: async (data) => {
    try { set({ loading: true, error: null }); const res = await api.createBranch(data); set({ branches: [res.data.data, ...get().branches], loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al crear", loading: false }); throw error; }
  },
  updateBranch: async (id, data) => {
    try { set({ loading: true, error: null }); const res = await api.updateBranch(id, data); set({ branches: get().branches.map(b => b._id === id ? res.data.data : b), loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al actualizar", loading: false }); throw error; }
  },
  deleteBranch: async (id) => {
    try { set({ loading: true, error: null }); await api.deleteBranch(id); set({ branches: get().branches.filter(b => b._id !== id), loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al eliminar", loading: false }); }
  },
}));

// ================= PRODUCTOS STORE =================
export const useProductStore = create((set, get) => ({
  products: [], loading: false, error: null,
  getProducts: async () => {
    try { set({ loading: true, error: null }); const res = await api.getProducts(); set({ products: res.data.data, loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al obtener productos", loading: false }); }
  },
  createProduct: async (data) => {
    try { set({ loading: true, error: null }); const res = await api.createProduct(data); set({ products: [res.data.data, ...get().products], loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al crear producto", loading: false }); throw error; }
  },
  updateProduct: async (id, data) => {
    try { set({ loading: true, error: null }); const res = await api.updateProduct(id, data); set({ products: get().products.map(p => p._id === id ? res.data.data : p), loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al actualizar producto", loading: false }); throw error; }
  },
  deleteProduct: async (id) => {
    try { set({ loading: true, error: null }); await api.deleteProduct(id); set({ products: get().products.filter(p => p._id !== id), loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al eliminar producto", loading: false }); }
  },
}));

// ================= MENÚ STORE (Solo Lectura) =================
export const useMenuStore = create((set) => ({
  menuItems: [], loading: false, error: null,
  getMenu: async () => {
    try { set({ loading: true, error: null }); const res = await api.getMenu(); set({ menuItems: res.data.menu, loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al cargar menú", loading: false }); }
  }
}));

// ================= CUPONES STORE =================
export const useCouponStore = create((set, get) => ({
  coupons: [], loading: false, error: null,
  getCoupons: async () => {
    try { set({ loading: true, error: null }); const res = await api.getCoupons(); set({ coupons: res.data.data, loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al obtener cupones", loading: false }); }
  },
  createCoupon: async (data) => {
    try { set({ loading: true, error: null }); const res = await api.createCoupon(data); set({ coupons: [res.data.data, ...get().coupons], loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al crear cupón", loading: false }); throw error; }
  },
  updateCoupon: async (id, data) => {
    try { set({ loading: true, error: null }); const res = await api.updateCoupon(id, data); set({ coupons: get().coupons.map(c => c._id === id ? res.data.data : c), loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al actualizar cupón", loading: false }); throw error; }
  },
  deleteCoupon: async (id) => {
    try { set({ loading: true, error: null }); await api.deleteCoupon(id); set({ coupons: get().coupons.filter(c => c._id !== id), loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al eliminar cupón", loading: false }); }
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
      set({ error: error.response?.data?.message || "Error al obtener mesas", loading: false });
    }
  },

  createTable: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createTable(data);
      set({ tables: [res.data.table, ...get().tables], loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al crear mesa", loading: false });
      throw error;
    }
  },

  updateTable: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateTable(id, data);
      set({
        tables: get().tables.map(t => t._id === id ? res.data.updated : t),
        loading: false
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al actualizar mesa", loading: false });
      throw error;
    }
  },

  deleteTable: async (id) => {
    try {
      set({ loading: true });
      await api.deleteTable(id);
      // Si la API responde 200, quitamos la mesa del estado local
      set({
        tables: get().tables.filter(t => t._id !== id),
        loading: false
      });
    } catch (error) {
      console.error("Error al eliminar:", error);
      set({ error: "No se pudo eliminar la mesa", loading: false });
    }
  },
}));

// ================= USUARIOS STORE =================
export const useUserStore = create((set, get) => ({
  users: [], loading: false, error: null,
  getUsers: async () => {
    try { set({ loading: true, error: null }); const res = await api.getUsers(); set({ users: res.data.data, loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al obtener usuarios", loading: false }); }
  },
  createUser: async (data) => {
    try { set({ loading: true, error: null }); const res = await api.createUser(data); set({ users: [res.data.data, ...get().users], loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al crear usuario", loading: false }); throw error; }
  },
  updateUser: async (id, data) => {
    try { set({ loading: true, error: null }); const res = await api.updateUser(id, data); set({ users: get().users.map(u => u._id === id ? res.data.data : u), loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al actualizar usuario", loading: false }); throw error; }
  },
  deleteUser: async (id) => {
    try { set({ loading: true, error: null }); await api.deleteUser(id); set({ users: get().users.filter(u => u._id !== id), loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || "Error al eliminar usuario", loading: false }); }
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
        loading: false
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
      set({ error: error.response?.data?.message || "Error al crear factura", loading: false });
      throw error;
    }
  },

  payBilling: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await api.payBilling(id);
      set({
        billings: get().billings.map((billing) =>
          billing._id === id
            ? res.data.data
            : billing
        ),
        loading: false,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      set({
        error:
          error.response?.data?.message ||
          "Error al pagar factura",
        loading: false,
      });
      throw error;
    }
  },
}));

// ================= INVENTORY STORE =================
export const useInventoryStore = create((set, get) => ({
  inventory: [],
  loading: false,
  error: null,

  getInventory: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.getInventory();
      console.log("INVENTORY RESPONSE:", res.data);
      set({
        inventory: res.data.items || [],
        loading: false
      });
    } catch (error) {
      console.log(error);
      set({
        error:
          error.response?.data?.message ||
          "Error al obtener inventario",
        loading: false
      });
    }
  }
}));