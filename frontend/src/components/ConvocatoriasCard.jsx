import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardHeader, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ConvocatoriasCard({
  nombre = "Lorem ipsum dolor",
  investigador = "Lorem ipsum dolor",
  descripcion = "Anim ipsum proident nisi eu laboris consectetur eu proident sint sunt reprehenderit exercitation sunt. Non irure velit sint ipsum amet. Dolor laborum nostrud elit adipisicing dolore Lorem laborum eiusmod. Eiusmod reprehenderit do qui velit. Lorem qui proident nostrud culpa tempor in elit voluptate in exercitation ad excepteur. Ea exercitation esse veniam aute. Non tempor et cupidatat aliquip cillum esse.",
  }){
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('../Administracion/ConvocatoriasDetalle')} style={{ height: "100%" }}>
      <CardActionArea>
        <CardHeader style={{backgroundColor: "#E9F1FE"}}></CardHeader>
        <CardContent style={{ width: "100%", height: "60%" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "start" }}
          >
            {nombre}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ textAlign: "start" }}
          >
            {investigador}
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
            {descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ConvocatoriasCard;
