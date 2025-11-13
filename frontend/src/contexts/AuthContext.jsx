import React, { createContext, useState, useEffect } from 'react';
import api, { setAccessToken } from '../api/axiosInstance';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // 1) Primero intenta check-auth; si ya hay access válido, evita un refresh innecesario
        let resp;
        try {
          resp = await api.get('/credenciales/check-auth/');
        } catch (e) {
          resp = null;
        }

        if (resp && resp.data?.is_authenticated) {
          setUser(resp.data.user);
          return;
        }

        // 2) Si no hay sesión (o falló), intenta obtener access desde la cookie de refresh
        try {
          await refreshAccess();
          // tras refrescar, vuelve a consultar check-auth
          const resp2 = await api.get('/credenciales/check-auth/');
          if (resp2.data?.is_authenticated) setUser(resp2.data.user);
          else setUser(null);
        } catch (refreshErr) {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    };
    init();
  }, []);

  // attach access token to axios headers when set
  // keep axios instance aware of the current access token
  useEffect(() => {
    setAccessToken(access);
  }, [access]);

  const login = async (username, password) => {
    const resp = await api.post('/credenciales/login/', { username, password });
    setAccess(resp.data.access);
    // ensure axios has the token immediately
    setAccessToken(resp.data.access);
    setUser(resp.data.user || { username });
    return resp.data;
  };

  const refreshAccess = async () => {
    try {
      const resp = await api.post('/credenciales/token/refresh/');
      setAccess(resp.data.access);
      setAccessToken(resp.data.access);
      return resp.data.access;
    } catch (err) {
      setAccess(null);
      setUser(null);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/credenciales/logout/');
    } catch (err) {
      // ignore
    } finally {
      setAccess(null);
      setUser(null);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, access, login, logout, refreshAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
