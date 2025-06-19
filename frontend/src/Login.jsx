import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Box,
  CssBaseline,
  Paper,
  IconButton,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Footer from "./components/Footer";

function CarouselNoticias() {
  // Aquí puedes poner tus imágenes en el array
  const images = [
    // Ejemplo: "/assets/noticia1.jpg", "/assets/noticia2.jpg"
    null,
    null,
    null,
  ];
  const [index, setIndex] = React.useState(0);

  const handlePrev = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <Box
      sx={{
        border: "2px solid #222",
        borderRadius: 2,
        height: 320, // Más alto
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        background: "#fff",
        width: "100%",
        maxWidth: 450, // Más ancho
        minWidth: 300,
        mx: "auto",
        boxShadow: 2,
        py: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            zIndex: 1,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        {/* Aquí pondrías tu imagen */}
        <Box
          sx={{
            width: 260,
            height: 260,
            background: "#eee",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            color: "#888",
            overflow: "hidden",
          }}
        >
          {/* Para mostrar una imagen real, descomenta la línea de abajo y pon la ruta en el array */}
          {/* <img src={images[index]} alt={`noticia-${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
          <span>Imagen {index + 1}</span>
        </Box>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    // Aquí iría tu lógica de autenticación
    navigate("/Detalles/Investigadores");
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 6 },
              borderRadius: 3,
              minHeight: { xs: 400, sm: 500 },
              minWidth: { xs: 320, sm: 700, md: 900 },
              maxWidth: "100%",
            }}
          >
            <Grid container spacing={6} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Box sx={{ px: { xs: 0, sm: 4 } }}>
                  <Typography variant="h4" align="center" sx={{ mt: 2, mb: 4 }}>
                    Iniciar Sesión
                  </Typography>
                  <form onSubmit={onSubmit}>
                    <label className="col-form-label" style={{ fontSize: "1.1rem" }}>
                      CURP/Matricula
                    </label>
                    <TextField
                      label="CURP/Matricula"
                      variant="outlined"
                      fullWidth
                      placeholder="Ingrese su CURP/Matricula"
                      {...register("curp", { required: true })}
                      error={!!errors.curp}
                      InputLabelProps={{ style: { fontSize: "1rem" } }}
                      InputProps={{
                        style: { fontSize: "1rem" },
                        endAdornment: errors.curp ? (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                          </InputAdornment>
                        ) : null,
                      }}
                      sx={{ mb: 3 }}
                    />

                    <label className="col-form-label" style={{ fontSize: "1.1rem" }}>
                      Contraseña
                    </label>
                    <TextField
                      label="Contraseña"
                      variant="outlined"
                      fullWidth
                      placeholder="Ingrese su contraseña"
                      type="password"
                      {...register("password", { required: true })}
                      error={!!errors.password}
                      InputLabelProps={{ style: { fontSize: "1rem" } }}
                      InputProps={{
                        style: { fontSize: "1rem" },
                        endAdornment: errors.password ? (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                          </InputAdornment>
                        ) : null,
                      }}
                      sx={{ mb: 3 }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#1B396A",
                          color: "#fff",
                          borderRadius: "20px",
                          "&:hover": {
                            backgroundColor: "#162e54",
                          },
                          mt: 2,
                          px: 4,
                        }}
                      >
                        Iniciar Sesión
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h4" align="center" sx={{ mb: 2 }}>
                  Noticias
                </Typography>
                <CarouselNoticias />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}