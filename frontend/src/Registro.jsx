import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, TextField, Button, InputAdornment, 
  Grid, Box, CssBaseline, Paper, Alert, MenuItem, Select, FormControl, 
  InputLabel, CircularProgress, IconButton 
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"; 
import { Visibility, VisibilityOff } from "@mui/icons-material";


const API_URL = 'http://localhost:8000/api'; 

const formatDjangoErrors = (result) => {
    let messages = [];

    if (result.non_field_errors) {
        messages = messages.concat(result.non_field_errors.map(err => `Error general: ${err}`));
    }

    const fieldMap = {
        username: 'Usuario (CURP/Matrícula)',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        password2: 'Confirmación Contraseña',
        name: 'Nombres', 
        last_name: 'Apellidos',
        role: 'Rol',
        detail: 'Detalle de la API' 
    };

    Object.keys(fieldMap).forEach(key => {
        if (result[key] && Array.isArray(result[key])) {
            const fieldName = fieldMap[key];
            result[key].forEach(err => {
                messages.push(`${fieldName}: ${err}`);
            });
        }
    });

    if (messages.length === 0) {
        return "Error desconocido. Verifique la consola o el servidor de Django.";
    }

    return messages.map((msg, index) => <div key={index}>{msg}</div>);
};


export default function Registro() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [regError, setRegError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password", ""); 

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault(); };

  const onSubmit = async (data) => {
    setRegError(null);
    setIsLoading(true);

    const roleMap = {
      'Investigador': 'INVESTIGADOR',
      'Administrador': 'ADMIN'
    };
    
    const dataToSend = {
      username: data.username,
      password: data.password,
      password2: data.password2, 
      email: data.email,
      name: data.firstName, 
      last_name: data.lastName,
      role: roleMap[data.role] 
    };


    try {
      const response = await fetch(`${API_URL}/usuario/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("DEBUG FRONTEND: Registro exitoso. Redirigiendo a /");
        navigate("/");
      } else {
        const formattedErrors = formatDjangoErrors(result);
        setRegError(formattedErrors);
        
        console.error("DEBUG FRONTEND: Error de Registro (Resultado API):", result);
        console.error("DEBUG FRONTEND: Estado HTTP:", response.status);
      }
    } catch (error) {
      setRegError(<div>Error de conexión con el servidor. Asegúrese de que el Back-End esté corriendo en `http://localhost:8000`.</div>);
      console.error("DEBUG FRONTEND: Error de red/petición:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <style jsx="true">{`
        /* Estilos Globales de la Página (Reutilizados del Login) */
        .reg-page { 
          min-height: 100vh; 
          display: flex; 
          flex-direction: column; 
          background-color: #f0f4f7;
          font-family: 'Inter', sans-serif;
        }
        .reg-main { 
          flex-grow: 1; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 80vh; 
          padding: 2rem 0; 
        }
        .reg-paper { 
          padding: 2rem; 
          border-radius: 20px; 
          max-width: 500px; 
          width: 100%;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .reg-title { 
          margin-bottom: 2rem;
          font-weight: bold; 
          color: #1B396A; 
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .reg-label { 
          font-size: 1rem;
          font-weight: 500;
          display: block; 
          margin-bottom: 0.3rem;
          color: #333; /* Color ajustado para mejor contraste */
        }
        .reg-input { 
          margin-bottom: 1.5rem !important;
        }
        /* Sobreescribir el input interno para asegurar el estilo de borde redondeado */
        .MuiOutlinedInput-root {
          border-radius: 10px !important;
        }
        .reg-button { 
          background-color: #1B396A !important; 
          color: #fff !important; 
          border-radius: 20px !important; 
          padding: 0.75rem 2rem !important;
          width: 100%; 
          transition: background-color 0.3s ease;
        }
        .reg-button:hover { 
          background-color: #162e54 !important; 
        } 
        .login-text { 
          font-size: 0.9rem; 
          text-align: center;
          width: 100%;
          margin-top: 1rem;
        }
        .login-text a {
          color: #1B396A;
          text-decoration: none;
          font-weight: bold;
        }
        .login-text a:hover {
          text-decoration: underline;
        }
      `}</style>
      <Box className="reg-page">
        <CssBaseline />
        <Box className="reg-main">
          <Container maxWidth="sm">
            <Paper elevation={3} className="reg-paper">
              <Typography variant="h4" align="center" className="reg-title">
                <PersonAddAlt1Icon sx={{ fontSize: 30 }} />
                Registro de Usuario
              </Typography>

              {regError && (
                <Alert severity="error" className="MuiAlert-root" sx={{ mb: 2 }}>
                  {regError}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  
                  <Grid item xs={12}>
                    <label className="reg-label">Rol del Usuario</label>
                    <FormControl fullWidth error={!!errors.role} className="reg-input">
                      <InputLabel>Seleccione Rol</InputLabel>
                      <Select
                        label="Seleccione Rol"
                        defaultValue=""
                        {...register("role", { required: "El rol es obligatorio." })}
                      >
                        <MenuItem value="Investigador">Investigador</MenuItem>
                        <MenuItem value="Administrador">Administrador</MenuItem>
                      </Select>
                      {errors.role && (
                        <Typography color="error" variant="caption">{errors.role.message}</Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* CURP / Matrícula (Username) */}
                  <Grid item xs={12}>
                    <label className="reg-label">CURP/Matrícula (Usuario)</label>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Ingrese su CURP o Matrícula"
                      {...register("username", { required: "El usuario (CURP/Matrícula) es obligatorio." })}
                      error={!!errors.username}
                      helperText={errors.username ? errors.username.message : ''}
                      InputProps={{
                        endAdornment: errors.username && (
                          <InputAdornment position="end"><ErrorIcon color="error" /></InputAdornment>
                        ),
                      }}
                      className="reg-input"
                      disabled={isLoading}
                    />
                  </Grid>
                  
                  {/* Email */}
                  <Grid item xs={12}>
                    <label className="reg-label">Correo Electrónico</label>
                    <TextField
                      variant="outlined"
                      fullWidth
                      type="email"
                      placeholder="ejemplo@correo.com"
                      {...register("email", { 
                        required: "El correo es obligatorio.",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Formato de correo inválido."
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                      className="reg-input"
                      disabled={isLoading}
                    />
                  </Grid>

                  {/* Nombres y Apellidos */}
                  <Grid item xs={12} sm={6}>
                    <label className="reg-label">Nombres</label>
                    <TextField
                      variant="outlined"
                      fullWidth
                      {...register("firstName", { required: "Los nombres son obligatorios." })}
                      error={!!errors.firstName}
                      helperText={errors.firstName ? errors.firstName.message : ''}
                      className="reg-input"
                      disabled={isLoading}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label className="reg-label">Apellidos</label>
                    <TextField
                      variant="outlined"
                      fullWidth
                      {...register("lastName", { required: "Los apellidos son obligatorios." })}
                      error={!!errors.lastName}
                      helperText={errors.lastName ? errors.lastName.message : ''}
                      className="reg-input"
                      disabled={isLoading}
                    />
                  </Grid>

                  {/* Contraseña */}
                  <Grid item xs={12}>
                    <label className="reg-label">Contraseña</label>
                    <TextField
                      variant="outlined"
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingrese una contraseña segura"
                      {...register("password", { 
                        required: "La contraseña es obligatoria.",
                        minLength: { value: 8, message: "Mínimo 8 caracteres." }
                      })}
                      error={!!errors.password}
                      helperText={errors.password ? errors.password.message : ''}
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                      }}
                      className="reg-input"
                      disabled={isLoading}
                    />
                  </Grid>

                  {/* Confirmar Contraseña (Ahora con el nombre de campo 'password2') */}
                  <Grid item xs={12}>
                    <label className="reg-label">Confirmar Contraseña</label>
                    <TextField
                      variant="outlined"
                      fullWidth
                      type="password"
                      placeholder="Confirme su contraseña"
                      {...register("password2", { 
                        required: "Debe confirmar la contraseña.",
                        validate: value => 
                          value === password || "Las contraseñas no coinciden." 
                      })}
                      error={!!errors.password2}
                      helperText={errors.password2 ? errors.password2.message : ''}
                      className="reg-input"
                      disabled={isLoading}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, mb: 1 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth 
                    className="reg-button"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
                  </Button>
                </Box>
                
                <Typography variant="body2" className="login-text">
                  ¿Ya tienes cuenta? 
                  <Box 
                    component="a" 
                    onClick={() => navigate("/")} 
                    sx={{ cursor: 'pointer' }}
                  >
                    Inicia Sesión
                  </Box>
                </Typography>

              </form>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
}