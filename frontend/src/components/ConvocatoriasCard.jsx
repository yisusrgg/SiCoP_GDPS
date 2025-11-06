import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ConvocatoriasCard({ convocatoria, onClick, isActive = false }) {
  const navigate = useNavigate();

  // Usa los datos de la prop 'convocatoria'
  const nombre = convocatoria?.convocatoria || "Convocatoria";
  const descripcion = convocatoria?.descripcion || convocatoria?.descripcion || ""; // Redundante, pero se mantiene la estructura
  const fechaInicioFinanciamiento = convocatoria?.fechaInicioFinanciamiento || convocatoria?.fechaInicio || "";
  const fechaFinFinanciamiento = convocatoria?.fechaFinFinanciamiento || convocatoria?.fechaFin || "";

  // Lógica para construir la URL del archivo (tomada de HEAD)
  let archivoUrl = null;
  const archivoField = convocatoria?.archivo;
  if (archivoField) {
    if (typeof archivoField === 'string') {
      if (archivoField.startsWith('http')) archivoUrl = archivoField;
      // Asumiendo que tu servidor de Django/backend corre en 8000
      else if (archivoField.startsWith('/media')) archivoUrl = `http://127.0.0.1:8000${archivoField}`;
      else archivoUrl = `http://127.0.0.1:8000/media/${archivoField}`;
    } else if (archivoField.url) {
      archivoUrl = archivoField.url;
    }
  }

  const handleClick = () => {
    // Si se proporciona un onClick, lo usa. Si no, navega.
    if (onClick && typeof onClick === 'function') {
      onClick();
      return;
    }
    // Navegación detallada con el objeto convocatoria en el estado (tomada de HEAD)
    navigate('../Administracion/ConvocatoriasDetalle', { state: { convocatoria } });
  };

  return (
    <Card
      sx={{
        minHeight: { xs: 200, sm: 250, md: 300 },
        width: '100%',
        maxWidth: '100%',
        margin: 'auto',
        transition: 'transform 300ms ease, box-shadow 300ms ease',
        // Efecto visual para destacar si está activo (tomado de HEAD)
        transform: isActive ? 'scale(1.03)' : 'scale(1)',
        boxShadow: isActive ? 6 : 1,
        cursor: 'pointer',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardActionArea onClick={handleClick}>
        {/* CardHeader con estilo de HEAD */}
        <CardHeader sx={{ backgroundColor: '#E9F1FE', '& .MuiCardHeader-content': { margin: 0 }, height: 36, borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
        
        <CardContent sx={{ width: '100%', height: '60%' }}>
          <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "start" }}>
            {nombre}
          </Typography>
          
          {/* Mostrar fechas (tomado de HEAD) */}
          <Typography variant="body1" color="text.secondary" style={{ textAlign: "start" }}>
            Fecha inicio: {fechaInicioFinanciamiento}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ textAlign: "start", width: "100%", overflow: "hidden", whiteSpace: "pre", textOverflow: "ellipsis" }}>
            Fecha fin: {fechaFinFinanciamiento}
          </Typography>
          
          {/* Botones para documento (tomado de HEAD) */}
          {archivoUrl && (
            <div style={{ marginTop: 12 }}>
              <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); window.open(archivoUrl, '_blank'); }}>
                Ver documento
              </Button>
              <Button size="small" style={{ marginLeft: 8 }} onClick={(e) => { e.stopPropagation(); const a = document.createElement('a'); a.href = archivoUrl; a.download = ''; a.click(); }}>
                Descargar
              </Button>
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ConvocatoriasCard;