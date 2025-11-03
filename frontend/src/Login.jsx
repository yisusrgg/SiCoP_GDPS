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
import "./Login.css"; 

function CarouselNoticias() {
  const images = [null, null, null];
  const [index, setIndex] = React.useState(0);

  const handlePrev = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <Box className="carousel-container">
      <IconButton onClick={handlePrev} className="carousel-arrow left">
        <ArrowBackIosNewIcon />
      </IconButton>

      <Box className="carousel-image">
        <span>Imagen {index + 1}</span>
      </Box>

      <IconButton onClick={handleNext} className="carousel-arrow right">
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit((data) => {
    navigate("/Detalles/Investigadores");
  });

  return (
    <Box className="login-page">
      <CssBaseline />
      <Box className="login-main">
        <Container maxWidth="md">
          <Paper elevation={3} className="login-paper">
            <Grid container spacing={6} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Box className="login-form">
                  <Typography variant="h4" align="center" className="login-title">
                    Iniciar Sesión
                  </Typography>

                  <form onSubmit={onSubmit}>
                    <label className="login-label">CURP/Matricula</label>
                    <TextField
                      label="CURP/Matricula"
                      variant="outlined"
                      fullWidth
                      placeholder="Ingrese su CURP/Matricula"
                      {...register("curp", { required: true })}
                      error={!!errors.curp}
                      InputProps={{
                        endAdornment: errors.curp && (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                          </InputAdornment>
                        ),
                      }}
                      className="login-input"
                    />

                    <label className="login-label">Contraseña</label>
                    <TextField
                      label="Contraseña"
                      variant="outlined"
                      fullWidth
                      placeholder="Ingrese su contraseña"
                      type="password"
                      {...register("password", { required: true })}
                      error={!!errors.password}
                      InputProps={{
                        endAdornment: errors.password && (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                          </InputAdornment>
                        ),
                      }}
                      className="login-input"
                    />

                    <Box className="login-actions">
                      <Button type="submit" variant="contained" className="login-button">
                        Ingresar
                      </Button>
                      <p className="register-text">
                        ¿No tienes cuenta? <a href="#">Regístrate</a>
                      </p>
                    </Box>
                  </form>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h4" align="center" className="noticias-title">
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
