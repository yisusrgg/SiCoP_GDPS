import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardHeader, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ConvocatoriasCard({
  convocatoria = null,
  nombre = null,
  investigador = null,
  descripcion = null,
  to = null,
  onClick = null,
  isActive = false,
}){
  // support two calling styles: either pass a `convocatoria` object or individual props
  const title = convocatoria?.convocatoria ?? nombre ?? "Sin título";
  const author = convocatoria?.investigador ?? investigador ?? "Sin autor";
  const desc = convocatoria?.descripcion ?? descripcion ?? "No hay descripción disponible.";
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
              {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ textAlign: "start" }}
          >
            {author}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              textAlign: "start",
              width: "100%",
              overflow: "hidden",
              whiteSpace: "pre",
              textOverflow: "ellipsis",
            }}
          >
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ConvocatoriasCard;