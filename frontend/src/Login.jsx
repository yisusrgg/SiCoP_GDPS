import { useState } from "react";
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
  Alert,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const Footer = () => (
    <Box className="footer">
        <Typography variant="body2">
            © {new Date().getFullYear()} SiCoP - GDPS. Todos los derechos reservados.
        </Typography>
    </Box>
);

function CarouselNoticias() {
  const images = [null, null, null]; 
  const [index, setIndex] = useState(0);

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

const API_URL = 'http://localhost:8000/api'; 

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [authError, setAuthError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setAuthError(null); 
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: data.username,
          password: data.password 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', result.access); 
        localStorage.setItem('refreshToken', result.refresh);
        console.log("Login exitoso. Token de Acceso guardado.");
        navigate("/Detalles/Investigadores"); 
      } else {
        const errorMessage = result.detail || result.non_field_errors?.[0] || "Credenciales incorrectas. Verifique usuario y contraseña.";
        setAuthError(errorMessage);
        console.error("Error de Login:", result);
      }
    } catch (error) {
      setAuthError("Error de conexión con el servidor. Asegúrese de que el Back-End esté corriendo en " + API_URL);
      console.error("Error de red/petición:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <style jsx="true">{`
        /* Estilos Globales de la Página */
        .login-page { 
            min-height: 100vh; 
            display: flex; 
            flex-direction: column; 
            background-color: #f0f4f7;
        }
        .login-main { 
            flex-grow: 1; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            min-height: 80vh; 
            padding-top: 2rem; 
            padding-bottom: 2rem; 
        }
        @media (min-width: 900px) {
            .login-main {
                padding-top: 4rem; 
                padding-bottom: 4rem; 
            }
        }
        .login-paper { 
            padding: 2rem; 
            border-radius: 20px; 
            min-height: 500px; 
            max-width: 900px; 
            width: 100%;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        @media (min-width: 600px) {
            .login-paper {
                padding: 2rem 3rem; 
            }
        }

        /* Estilos del Formulario */
        .login-form { 
            padding: 1rem;
        }
        .login-title { 
            margin-top: 1rem;
            margin-bottom: 2rem;
            font-weight: bold; 
            color: #1B396A; 
        }
        .login-label { 
            font-size: 1.1rem;
            font-weight: 500;
            display: block; 
            margin-bottom: 0.3rem;
            color: black;
        }
        /* La clase login-input se aplica al TextField de MUI, usa !important para margen */
        .login-input { 
            margin-bottom: 1.5rem !important;
        }
        .login-actions {
            display: flex;
            flex-direction: column; 
            gap: 1rem;
            align-items: flex-start;
        }
        /* La clase login-button se aplica al Button de MUI, usa !important para overrides */
        .login-button { 
            background-color: #1B396A !important; 
            color: #fff !important; 
            border-radius: 20px !important; 
            padding: 0.5rem 2rem !important;
            width: 100%; 
        }
        .login-button:hover { 
            background-color: #162e54 !important; 
        } 
        .register-text { 
            font-size: 0.9rem; 
            text-align: center;
            width: 100%;
            margin-top: 0.25rem;
        }
        .register-text a {
            color: #1B396A;
            text-decoration: none;
            font-weight: bold;
        }
        .register-text a:hover {
            text-decoration: underline;
        }

        /* Estilos de Noticias */
        .noticias-title { 
            color: #1B396A; 
            font-weight: bold; 
            margin-bottom: 1rem; 
        }

        /* Estilos del Footer */
        .footer {
            padding: 1rem 0;
            background-color: #1B396A;
            color: white;
            margin-top: auto; 
            text-align: center;
        }
        .footer .MuiTypography-root {
            padding: 1rem; 
        }
        
        /* Estilos del Carrusel */
        .carousel-container { 
            border: 2px solid #222; 
            border-radius: 12px; 
            height: 320px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            background-color: #fff; 
            max-width: 450px;
            margin: auto;
            position: relative;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); 
        }
        .carousel-image { 
            width: 260px; 
            height: 260px; 
            background-color: #eee; 
            border-radius: 12px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 1.8rem; 
            color: #888; 
        }
        /* La clase carousel-arrow se aplica al IconButton, requiere overrides */
        .carousel-arrow { 
            position: absolute !important; 
            top: 50% !important; 
            transform: translateY(-50%) !important; 
            background-color: white !important; 
            color: #222 !important;
            z-index: 10;
        }
        .carousel-arrow:hover { 
            background-color: #f0f0f0 !important; 
        }
        .carousel-arrow.left {
            left: 8px !important;
        }
        .carousel-arrow.right {
            right: 8px !important;
        }

      `}</style>
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

                    {authError && (
                      <Alert severity="error" className="MuiAlert-root" sx={{ mb: 2 }}>
                        {authError}
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Aplicamos la clase 'login-label' directamente */}
                      <label className="login-label">CURP/Matricula (Usuario)</label>
                      <TextField
                        label="CURP/Matricula"
                        variant="outlined"
                        fullWidth
                        placeholder="Ingrese su CURP/Matricula"
                        {...register("username", { required: true })}
                        error={!!errors.username}
                        InputProps={{
                          endAdornment: errors.username && (
                            <InputAdornment position="end">
                              <ErrorIcon color="error" />
                            </InputAdornment>
                          ),
                        }}
                        className="login-input"
                        disabled={isLoading}
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
                        disabled={isLoading}
                      />

                      <Box className="login-actions">
                        <Button 
                          type="submit" 
                          variant="contained" 
                          fullWidth 
                          className="login-button"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                        <Typography variant="body2" className="register-text">
                          ¿No tienes cuenta? 
                          <Box 
                            component="a" 
                            onClick={() => navigate("/Registro")} 
                            sx={{ cursor: 'pointer' }}
                          >
                            Regístrate
                            </Box>
                        </Typography>
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
    </>
  );
}