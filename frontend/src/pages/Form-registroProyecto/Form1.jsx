import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid, Box, CssBaseline, InputAdornment } from "@mui/material";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import LineaInvestigacion from "../../components/LineaInvestigacion";
import ErrorIcon from '@mui/icons-material/Error';
import HorizontalLinearStepper from '../../components/HorizontalLinearStepper';

export default function Form1({handleNext}) {
  const navigate = useNavigate();

  const messages = {
    req: "Este campo es obligatorio",
  };

  const steps = ['Step 1', 'Step 2', 'Step 3'];

  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = (userInfo) => {
    Object.entries(userInfo).forEach(([key, value]) => {
      localStorage.setItem(key, value);
      console.log(`${key}: ${value}`);
    });
    //navigate("/RegistroProyecto/2");
    handleNext();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column',  }}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexGrow: 1,}}>
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6" align="center" sx={{ mb: 4 }} style={{ marginTop: "20px" }}>
            Captura los campos con la información correspondiente, valida la información antes de seguir
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: '80px' }}>
            <Grid container spacing={3}>
              {/* NOMBRE DEL PROYECTO */}
              <Grid item xs={12} container alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="h6">Nombre del proyecto</Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl fullWidth error={!!errors.nombre}>
                    <TextField
                      id="inputNombre"
                      label="Nombre del proyecto"
                      {...register("nombre", { required: true })}
                      error={!!errors.nombre}
                      helperText={errors.nombre && messages.req}
                      InputLabelProps={{ style: { fontSize: "1rem" } }}
                      InputProps={{
                        style: { fontSize: "1rem" },
                        endAdornment: errors.nombre ? (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                          </InputAdornment>
                        ) : null,
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {/* AREA DE INVESTIGACION */}
              <Grid item xs={12} container alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="h6">Área de investigación</Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl fullWidth error={!!errors.area_Investigacion}>
                    <InputLabel id="area-investigacion-label" style={{ fontSize: "1rem" }}>Área de investigación</InputLabel>
                    <Select
                      labelId="area-investigacion-label"
                      id="areaInvestigacion"
                      {...register("area_Investigacion", { required: true })}
                      label="Área de investigación"
                      style={{ fontSize: "1rem" }}
                      endAdornment={errors.area_Investigacion ? (
                        <InputAdornment position="end">
                          <ErrorIcon color="error" />
                        </InputAdornment>
                      ) : null}
                    >
                      <MenuItem value="1">EDUCACIÓN</MenuItem>
                      <MenuItem value="2">ARTES Y HUMANIDADES</MenuItem>
                      <MenuItem value="3">CIENCIAS SOCIALES ADMINISTRACIÓN Y DERECHO</MenuItem>
                      <MenuItem value="4">ADMINISTRACION Y NEGOCIOS</MenuItem>
                      <MenuItem value="5">CIENCIAS NATURALES EXACTAS Y DE LA COMPUTACIÓN</MenuItem>
                      <MenuItem value="6">TECNOLOGÍAS DE LA INFORMACIÓN Y LA COMUNICACIÓN</MenuItem>
                      <MenuItem value="7">INGENIERÍA MANUFACTURA Y CONSTRUCCIÓN</MenuItem>
                      <MenuItem value="8">AGRONOMÍA Y VETERINARIA</MenuItem>
                      <MenuItem value="9">SALUD</MenuItem>
                      <MenuItem value="10">SERVICIOS</MenuItem>
                    </Select>
                    {errors.area_Investigacion && <Typography color="error">{messages.req}</Typography>}
                  </FormControl>
                </Grid>
              </Grid>

              {/* LINEA DE INVESTIGACION */}
              <Grid item xs={12} container alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="h6">Línea de investigación</Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl fullWidth error={!!errors.linea_Investigacion}>
                    <InputLabel id="linea-investigacion-label" style={{ fontSize: "1rem" }}>Línea de investigación</InputLabel>
                    <Select
                      labelId="linea-investigacion-label"
                      id="lineaInvestigacion"
                      {...register("linea_Investigacion")}
                      label="Línea de investigación"
                      style={{ fontSize: "1rem" }}
                      endAdornment={errors.linea_Investigacion ? (
                        <InputAdornment position="end">
                          <ErrorIcon color="error" />
                        </InputAdornment>
                      ) : null}
                    >
                      <LineaInvestigacion />
                    </Select>
                    {errors.linea_Investigacion && <Typography color="error">{messages.req}</Typography>}
                  </FormControl>
                </Grid>
              </Grid>

              {/* FECHA INICIO */}
              <Grid item xs={12} container alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="h6">Fecha de inicio</Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl fullWidth error={!!errors.fecha_Inicio}>
                    <TextField
                      id="start"
                      label="Fecha de inicio"
                      type="date"
                      InputLabelProps={{ shrink: true, style: { fontSize: "1rem" } }}
                      {...register("fecha_Inicio", { required: true })}
                      error={!!errors.fecha_Inicio}
                      helperText={errors.fecha_Inicio && messages.req}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {/* FECHA FIN */}
              <Grid item xs={12} container alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="h6">Fecha de fin (estimada)</Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl fullWidth error={!!errors.fecha_Fin}>
                    <TextField
                      id="end"
                      label="Fecha de fin (estimada)"
                      type="date"
                      InputLabelProps={{ shrink: true, style: { fontSize: "1rem" } }}
                      {...register("fecha_Fin", { required: true })}
                      error={!!errors.fecha_Fin}
                      helperText={errors.fecha_Fin && messages.req}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {/* BOTONES */}
              <Grid item xs={12} container justifyContent="space-between">
                <Button
                  variant="outlined"
                  disabled
                  onClick={() => window.history.back()}
                  style={{
                    marginLeft: "10px",
                    borderColor: "#1B396A",
                    color: "#1B396A",
                    borderRadius: "20px",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#1B396A", e.target.style.color = "#fff")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent", e.target.style.color = "#1B396A")}
                >
                  Regresar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#1B396A",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#162e54")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#1B396A")}
                >
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}