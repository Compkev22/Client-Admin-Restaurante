// src/shared/api/api.js
import axios from "axios";
import { useAuthStore } from "../../features/auth/store/authStore.js";

// ================= INSTANCIAS AXIOS =================
const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

const axiosAdmin = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

// ================= INTERCEPTORES DE REQUEST =================
axiosAuth.interceptors.request.use((config) => {
  config._axiosClient = "auth";
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosAdmin.interceptors.request.use((config) => {
  config._axiosClient = "admin";
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ================= LÓGICA DE REFRESCO =================
let _isRefreshing = false;
let failedQueue = [];

function _processQueue(_error, token = null) {
  failedQueue.forEach(({ resolve, reject }) =>
    _error ? reject(_error) : resolve(token)
  );
  failedQueue = [];
}

/**
 * Fuerza el cierre de sesión y redirige al login.
 * Usamos window.location para no depender de React Router fuera de componentes.
 */
function forceLogout() {
  useAuthStore.getState().logout();
  // Solo redirige si no estamos ya en la raíz (login)
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
}

const handleRefreshToken = async function (_error) {
  const _original = _error.config;

  // Sin config o ya reintentado → logout directo
  if (!_original || _original._retry) {
    forceLogout();
    return Promise.reject(_error);
  }

  const status = _error.response?.status;
  const errorCode = _error.response?.data?.error;
  const requestUrl = _original.url || "";
  const isRefreshEndpoint = requestUrl.includes("/api/v1/Auth/refresh");

  // 401 con mensaje de token caducado (Auth-Service)
  const shouldAttemptRefresh =
    !isRefreshEndpoint &&
    status === 401 &&
    _error.response?.data?.message?.includes("token");

  // 403 con código TOKEN_EXPIRED
  const shouldAttemptRefreshFrom403 =
    !isRefreshEndpoint && status === 403 && errorCode === "TOKEN_EXPIRED";

  // 401 genérico (sin mensaje de token): sesión inválida → logout inmediato
  const isHardUnauthorized =
    !isRefreshEndpoint && status === 401 && !shouldAttemptRefresh;

  if (isHardUnauthorized) {
    forceLogout();
    return Promise.reject(_error);
  }

  const shouldRefresh = shouldAttemptRefresh || shouldAttemptRefreshFrom403;

  if (shouldRefresh) {
    const retryClient =
      _original._axiosClient === "admin" ? axiosAdmin : axiosAuth;

    if (_isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          _original.headers["Authorization"] = "Bearer " + token;
          return retryClient(_original);
        })
        .catch((err) => Promise.reject(err));
    }

    _original._retry = true;
    _isRefreshing = true;

    const refreshToken = useAuthStore.getState().refreshToken;

    // Sin refreshToken almacenado → logout inmediato
    if (!refreshToken) {
      _isRefreshing = false;
      forceLogout();
      return Promise.reject(_error);
    }

    try {
      const response = await axiosAuth.post("/api/v1/Auth/refresh", {
        refreshToken,
      });

      const {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn,
        userDetails,
      } = response.data;

      useAuthStore.setState({
        token: accessToken,
        refreshToken: newRefreshToken,
        expiresAt: expiresIn,
        user: userDetails || useAuthStore.getState().user,
        isAuthenticated: true,
      });

      _processQueue(null, accessToken);
      _original.headers["Authorization"] = "Bearer " + accessToken;
      return retryClient(_original);
    } catch (err) {
      // El refresh falló → sesión expirada definitivamente
      _processQueue(err, null);
      forceLogout();
      return Promise.reject(err);
    } finally {
      _isRefreshing = false;
    }
  }

  return Promise.reject(_error);
};

axiosAuth.interceptors.response.use((res) => res, handleRefreshToken);
axiosAdmin.interceptors.response.use((res) => res, handleRefreshToken);

// ================= EXPORTS =================
export { axiosAuth, axiosAdmin };
export { handleRefreshToken };