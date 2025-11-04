import React, { useEffect, useState } from "react";
import { Grid, CssBaseline, Typography, CircularProgress, Alert } from "@mui/material";
import ConvocatoriasCard from "../../components/ConvocatoriasCard";
import SideBar from "../../components/SideBar";

export default function ConvocatoriasInvestigador({ user = { type: "Investigador" } }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConvocatorias = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://127.0.0.1:8000/convocatoria/convocatorias/');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setItems(json || []);
      } catch (err) {
        setError(err.message || 'Error cargando convocatorias');
      } finally {
        setLoading(false);
      }
    };
    fetchConvocatorias();
  }, []);

  return (
    <div className="max-w-xl mx-auto text-center">
      <CssBaseline />
      {user && user.type === "Investigador" && (
        <nav>
          <SideBar />
        </nav>
      )}
      <div
        className="text-center"
        style={
          user && user.type === "Investigador"
            ? { paddingTop: "50px", marginLeft: "80px" }
            : { paddingTop: "50px" }
        }
      >
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Convocatorias
        </Typography>
        <p>
          Conoce las diversas convocatorias activas, en las que puedes
          participar para superarte a ti mismo, ayudando a transformar e innovar
          nuestra comunidad
        </p>

        {loading && <div style={{ padding: 40 }}><CircularProgress /></div>}
        {error && <div style={{ padding: 20 }}><Alert severity="error">{error}</Alert></div>}

        {!loading && !error && (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            style={{ padding: 30 }}
          >
            {items.length === 0 && (
              <Typography variant="body1">No hay convocatorias disponibles.</Typography>
            )}
            {items.map((c) => (
              <Grid xs={2} sm={4} md={4} className="p-2" key={c.clave_convocatoria || c.id}>
                <ConvocatoriasCard
                  nombre={c.convocatoria}
                  investigador={c.institucionFinanciamiento}
                  descripcion={c.descripcion}
                  to={`../Investigador/ConvocatoriaDetalle/${c.clave_convocatoria || c.id}`}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}