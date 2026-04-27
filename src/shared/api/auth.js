import { axiosAuth } from "./api";

export const login = async (data) => {
    // 1. Creamos un objeto FormData
    const formData = new FormData();
    
    // 2. Agregamos los campos que espera el LoginDto de C#
    // Asegúrate de que los nombres coincidan exactamente con tu LoginDto en el backend
    formData.append("emailOrUsername", data.emailOrUsername);
    formData.append("password", data.password);

    // 3. Enviamos el formData en lugar del objeto plano
    return await axiosAuth.post("/api/v1/Auth/login", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const register = async (data) => {
    return await axiosAuth.post("/api/v1/Auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" }    
    }); 
};

export const forgotPassword = async (email) => {
    return await axiosAuth.post("/api/v1/Auth/forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
    return await axiosAuth.post("/api/v1/Auth/reset-password", { token, newPassword });
};

export const verifyEmail = async (token) => {
    return await axiosAuth.post("/api/v1/Auth/verify-email", { token });
};

// NOTA: Verifica que estas dos existan en tu backend .NET, usualmente están en un UserController
export const updateUserRole = async (userId, roleName) => {
    return await axiosAuth.put(`/api/v1/Users/${userId}/role`, { roleName }); 
};

export const getAllUsers = async () => {
    const { data } = await axiosAuth.get("/api/v1/Users");
    return {users: data};
};