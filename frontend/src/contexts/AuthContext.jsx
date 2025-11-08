import React, { createContext, useState, useEffect } from 'react';
import api, { setAccessToken } from '../api/axiosInstance';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const resp = await api.get('/credenciales/check-auth/');
        if (resp.data.is_authenticated) {
          setUser(resp.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    };
    check();
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
