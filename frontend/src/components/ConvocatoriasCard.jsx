import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
function ConvocatoriasCard({ convocatoria, onClick, isActive = false }) {
  const navigate = useNavigate();

  const nombre = convocatoria?.convocatoria || "Convocatoria";
  const descripcion = convocatoria?.descripcion || convocatoria?.descripcion || "";
  const fechaInicioFinanciamiento = convocatoria?.fechaInicioFinanciamiento || convocatoria?.fechaInicio || "";
  const fechaFinFinanciamiento = convocatoria?.fechaFinFinanciamiento || convocatoria?.fechaFin || "";

  let archivoUrl = null;
  const archivoField = convocatoria?.archivo;
  if (archivoField) {
    if (typeof archivoField === 'string') {
      if (archivoField.startsWith('http')) archivoUrl = archivoField;
      else if (archivoField.startsWith('/media')) archivoUrl = `http://127.0.0.1:8000${archivoField}`;
      else archivoUrl = `http://127.0.0.1:8000/media/${archivoField}`;
    } else if (archivoField.url) {
      archivoUrl = archivoField.url;
    }
  }

  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      onClick();
      return;
    }
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
  <CardHeader sx={{ backgroundColor: '#E9F1FE', '& .MuiCardHeader-content': { margin: 0 }, height: 36, borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
  <CardContent sx={{ width: '100%', height: '60%' }}>
          <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "start" }}>
=======
function ConvocatoriasCard({
  nombre = "Lorem ipsum dolor",
  investigador = "Lorem ipsum dolor",
  descripcion = "Anim ipsum proident nisi eu laboris consectetur eu proident sint sunt reprehenderit exercitation sunt. Non irure velit sint ipsum amet. Dolor laborum nostrud elit adipisicing dolore Lorem laborum eiusmod. Eiusmod reprehenderit do qui velit. Lorem qui proident nostrud culpa tempor in elit voluptate in exercitation ad excepteur. Ea exercitation esse veniam aute. Non tempor et cupidatat aliquip cillum esse.",
  to = null,
  onClick = null,
  }){
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) return navigate(to);
    if (onClick) return onClick();
    return navigate('../Administracion/ConvocatoriasDetalle');
  };

  return (
    <Card onClick={handleClick} style={{ height: "100%", cursor: 'pointer' }}>
      <CardActionArea>
        <CardHeader style={{backgroundColor: "#E9F1FE"}}></CardHeader>
        <CardContent style={{ width: "100%", height: "60%" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "start" }}
          >
>>>>>>> 82048c16ab605e90f76de90150af5960050a2648
            {nombre}
          </Typography>
          <Typography variant="body1" color="text.secondary" style={{ textAlign: "start" }}>
            Fecha inicio: {fechaInicioFinanciamiento}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ textAlign: "start", width: "100%", overflow: "hidden", whiteSpace: "pre", textOverflow: "ellipsis" }}>
            Fecha fin: {fechaFinFinanciamiento}
          </Typography>
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
