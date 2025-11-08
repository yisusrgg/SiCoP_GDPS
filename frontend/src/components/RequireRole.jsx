import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chechSession, checkRol } from '../api/Credenciales.api';
import { CircularProgress, Box } from '@mui/material';

export default function RequireRole({ allowedRoles = [], children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const verify = async () => {
      try {
        const isLoggedIn = await chechSession();
        if (!isLoggedIn) {
          if (mounted) {
            navigate('/');
          }
          return;
        }

        const rolResp = await checkRol();
        const userRole = rolResp?.Rol || rolResp?.role || null;
        if (!userRole || !allowedRoles.includes(userRole)) {
          if (mounted) navigate('/');
          return;
        }
      } catch (err) {
        if (mounted) {
          navigate('/');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    verify();
    return () => { mounted = false; };
  }, [allowedRoles, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
