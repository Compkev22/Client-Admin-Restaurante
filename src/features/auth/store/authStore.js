// src/features/auth/store/authStore.js
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
                const isAdmin = user?.role === "PLATFORM_ADMIN_ROLE";

                // SIEMPRE que inicie la app, reseteamos loading y error para evitar bloqueos
                set({ loading: false, error: null, isLoadingAuth: false });

                if (token && !isAdmin) {
                    get().logout(); // Usamos la función logout que ya tienes para limpiar todo
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

            // ------------------------------------------------------------------
            login: async ({ emailOrUsername, password }) => {
                // 1. Limpieza total antes de empezar
                set({ loading: true, error: null });

                try {
                    const { data } = await loginRequest({ emailOrUsername, password });

                    const role = data?.userDetails?.role;
                    if (role !== "PLATFORM_ADMIN_ROLE") {
                        const message = "No tienes permisos para acceder como administrador";
                        set({
                            user: null, token: null, isAuthenticated: false,
                            loading: false, // <--- DESBLOQUEO
                            error: message
                        });
                        toast.error(message);
                        return { success: false, error: message };
                    }

                    set({
                        user: data.userDetails,
                        token: data.accessToken || data.token,
                        isAuthenticated: true,
                        loading: false, // <--- DESBLOQUEO EXITOSO
                    });
                    return { success: true };

                } catch (err) {
                    let errorMessage = "Credenciales inválidas o error de conexión";

                    if (err.response?.status === 401) {
                        errorMessage = "Usuario o contraseña incorrectos";
                    }

                    // 2. DESBLOQUEO CRÍTICO: Si no haces esto, el botón se queda "Iniciando..." para siempre
                    set({ loading: false, error: errorMessage });
                    toast.error(errorMessage);
                    return { success: false, error: errorMessage };
                }
            }
        }),
        { name: "auth-store" }
    )
);