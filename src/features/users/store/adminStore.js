import { create } from "zustand";
import {
  getBranches as getBranchesRequest,
  createBranch as createBranchRequest,
  updateBranch as updateBranchRequest,
  deleteBranch as deleteBranchRequest,
} from "../../../shared/api/admin";

export const useBranchStore = create((set, get) => ({
  branches: [],
  loading: false,
  error: null,

  getBranches: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getBranchesRequest();
      set({ branches: response.data.data, loading: false }); // response.data.data según tu controller
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al obtener sucursales", loading: false });
    }
  },

  createBranch: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await createBranchRequest(data);
      set({ branches: [response.data.data, ...get().branches], loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al crear sucursal", loading: false });
    }
  },

  updateBranch: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const response = await updateBranchRequest(id, data);
      set({
        branches: get().branches.map((b) => (b._id === id ? response.data.data : b)),
        loading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al actualizar", loading: false });
      throw error;
    }
  },

  deleteBranch: async (id) => {
    try {
      set({ loading: true, error: null });
      await deleteBranchRequest(id);
      // Como el status cambia a INACTIVE, lo filtramos de la vista actual
      set({
        branches: get().branches.filter((b) => b._id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error al cambiar status", loading: false });
    }
  },
}));