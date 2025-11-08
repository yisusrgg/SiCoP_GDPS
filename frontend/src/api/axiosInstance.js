import axios from "axios";

// Use relative base URL so Vite dev server proxy (configured in vite.config.js)
// can forward the requests to the Django backend. This makes cookies same-site
// in development and avoids cross-site cookie restrictions.
const api = axios.create({
  baseURL: '',
  withCredentials: true,
});

function getCookie(name) {
  const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return v ? v.pop() : '';
}

api.interceptors.request.use((config) => {
  const csrftoken = getCookie('csrftoken');
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken;
  }
  return config;
});

// simple in-memory holder for the current access token
let _accessToken = null;

// allow other modules (AuthContext) to set the access token so axios defaults
export function setAccessToken(token) {
  _accessToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// response interceptor: on 401 try to refresh using the refresh cookie and retry once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);
      // avoid infinite loop and don't try to refresh if the failing request is itself the refresh endpoint
      const isRefreshEndpoint = originalRequest.url && originalRequest.url.includes('/credenciales/token/refresh/');
      if (error.response && error.response.status === 401 && !originalRequest._retry && !isRefreshEndpoint) {
        originalRequest._retry = true;
        try {
          const refreshResp = await api.post('/credenciales/token/refresh/');
          const newAccess = refreshResp.data?.access;
          if (newAccess) {
            setAccessToken(newAccess);
            originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
            return api(originalRequest);
          }
        } catch (refreshErr) {
          // refresh failed (e.g. cookie missing/invalid) — reject and let caller handle (or logout)
          return Promise.reject(error);
        }
      }
    return Promise.reject(error);
  }
);

export default api;
