import { create } from "zustand";
import * as api from "../../../shared/api/admin";

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
  tables: [], loading: false, error: null,
  getTables: async () => {
    try { set({ loading: true, error: null }); const res = await api.getTables(); set({ tables: res.data.tables, loading: false }); } 
    catch (error) { set({ error: error.response?.data?.message || "Error al obtener mesas", loading: false }); }
  },
  createTable: async (data) => {
    try { set({ loading: true, error: null }); const res = await api.createTable(data); set({ tables: [res.data.table, ...get().tables], loading: false }); } 
    catch (error) { set({ error: error.response?.data?.message || "Error al crear mesa", loading: false }); throw error; }
  },
  updateTable: async (id, data) => {
    try { set({ loading: true, error: null }); const res = await api.updateTable(id, data); set({ tables: get().tables.map(t => t._id === id ? res.data.updated : t), loading: false }); } 
    catch (error) { set({ error: error.response?.data?.message || "Error al actualizar mesa", loading: false }); throw error; }
  },
  deleteTable: async (id) => {
    try { set({ loading: true, error: null }); await api.deleteTable(id); set({ tables: get().tables.filter(t => t._id !== id), loading: false }); } 
    catch (error) { set({ error: error.response?.data?.message || "Error al eliminar mesa", loading: false }); }
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
      set({ error: error.response?.data?.message || "Error al obtener reservaciones", loading: false });
    }
  },

  createReservation: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createReservation(data);
      // El controlador devuelve { success: true, data: {...} }
      set({ reservations: [res.data.data, ...get().reservations], loading: false });
      return res.data; // Útil para mostrar la mesa asignada en el componente
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al crear reservación", loading: false });
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
          r._id === id ? res.data.updated : r
        ),
        loading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al actualizar reservación", loading: false });
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
      set({ error: error.response?.data?.message || "Error al cambiar estado de reservación", loading: false });
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
      set({ error: error.response?.data?.message || "Error al obtener inventario", loading: false });
    }
  },

  createInventory: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.createInventory(data);
      // Tu controlador devuelve { inventory: {...} }
      set({ inventory: [res.data.inventory, ...get().inventory], loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al crear insumo", loading: false });
      throw error;
    }
  },

  updateInventory: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.updateInventory(id, data);
      // Tu controlador devuelve { updatedItem: {...} }
      set({
        inventory: get().inventory.map((item) =>
          item._id === id ? res.data.updatedItem : item
        ),
        loading: false,
       Suk});
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al actualizar insumo", loading: false });
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
          item._id === id ? res.data.updatedItem : item
        ),
        loading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al cambiar estado del insumo", loading: false });
    }
  },
}));
