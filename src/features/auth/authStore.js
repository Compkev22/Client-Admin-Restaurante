import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

import { 
    login as loginRequest
} from "../../shared/api/auth.js"


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
                const role = get().user?.role;
                const isAdmin = role === "PLATFORM_ADMIN_ROLE";

                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: "No tienes permiso para acceder como administrador"
                    })
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
            //------------------------------------------------------------------
            login: async ({ emailOrUsername, password }) => {
                set({ loading: true, error: null }); // Indicamos que está cargando y limpiamos errores
                
                try {
                    const { data } = await loginRequest({ emailOrUsername, password });

                    // Solo administradores pueden iniciar sesion en cliente-admin
                    const role = data?.userDetails?.role;
                    if (role !== "PLATFORM_ADMIN_ROLE") {
                        const message = "No tienes permisos para acceder como administrador";

                        set({
                            user: null,
                            token: null,
                            refreshToken: null,
                            expiresAt: null,
                            isAuthenticated: false,
                            loading: false,
                            error: message,
                        });

                        toast.error(message);
                        return { success: false, error: message };
                    }

                    // Si todo está bien, guardamos los datos
                    set({
                        user: data.userDetails,
                        token: data.accessToken || data.token,
                        refreshToken: data.refreshToken,
                        expiresAt: data.expiresIn || data.expiresAt,
                        isAuthenticated: true,
                        loading: false,
                    });

                    return { success: true };

                } catch (err) {
                    // AQUÍ CAPTURAMOS EL ERROR 401 O CUALQUIER OTRO
                    let errorMessage = "Ocurrió un error al intentar iniciar sesión";

                    if (err.response) {
                        // Si el status es 401, son credenciales incorrectas
                        if (err.response.status === 401) {
                            errorMessage = "Credenciales inválidas. Revisa tu usuario o contraseña.";
                        } else {
                            errorMessage = err.response.data?.message || "Error en el servidor";
                        }
                    } else if (err.request) {
                        errorMessage = "No se pudo conectar con el servidor. Revisa tu conexión.";
                    }

                    set({ loading: false, error: errorMessage });
                    toast.error(errorMessage); // Lanzamos el toast rojo
                    
                    return { success: false, error: errorMessage };
                }
            }
            //--------------------------------------------------------------
        }),
        { name: "auth-store" }
    )
);