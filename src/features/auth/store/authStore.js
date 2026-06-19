import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

import {
    login as loginRequest
} from "../../../shared/api/auth.js"

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,

            checkAuth: () => {
                const token = get().token;
                const user = get().user;
                const isAdmin = user?.role === "PLATFORM_ADMIN";


                set({ loading: false, error: null, isLoadingAuth: false });

                if (token && !isAdmin) {
                    get().logout();
                    set({ error: "No tienes permiso para acceder como administrador" });
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },

            // ✅ DESPUÉS
            login: async ({ emailOrUsername, password }) => {
                set({ loading: true, error: null });

                try {
                    const { data } = await loginRequest({ emailOrUsername, password });

                    // .NET sin CamelCase policy → claves raíz en PascalCase
                    const details = data?.UserDetails;
                    const role = details?.role;

                    if (role !== "PLATFORM_ADMIN") {
                        const message = "No tienes permisos para acceder como administrador";
                        set({
                            user: null, token: null, isAuthenticated: false,
                            loading: false,
                            error: message
                        });
                        toast.error(message);
                        return { success: false, error: message };
                    }

                    set({
                        user: details,
                        token: data.Token,
                        isAuthenticated: true,
                        loading: false,
                    });
                    return { success: true };

                } catch (err) {
                    let errorMessage = "Credenciales inválidas o error de conexión";

                    if (err.response?.status === 401) {
                        errorMessage = "Usuario o contraseña incorrectos";
                    }

                    set({ loading: false, error: errorMessage });
                    toast.error(errorMessage);
                    return { success: false, error: errorMessage };
                }
            }
        }),
        { name: "auth-store" }
    )
);