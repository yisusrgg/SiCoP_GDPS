import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Grid,
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Footer from "./components/Footer";
import { useState } from "react";

function VinculacionFinanciamiento() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [openModal, setOpenModal] = useState(false); // State for modal

  const tieneFinanciamiento = watch("tieneFinanciamiento", "no");

  // Opciones de ejemplo para los combobox
  const convocatorias = [
    { value: "conv1", label: "Convocatoria 2025" },
    { value: "conv2", label: "Convocatoria 2024" },
    { value: "conv3", label: "Convocatoria Especial" },
  ];

  const financiadores = [
    { value: "empresa", label: "Empresa" },
    { value: "gobierno", label: "Gobierno" },
    { value: "universidad", label: "Universidad" },
    { value: "otro", label: "Otro" },
  ];

  const onSubmit = (data) => {
    console.log(data);
    setOpenModal(true); // Show modal on form submission
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/Proyectos"); // Navigate to Proyectos after closing modal
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mt: 3 }}>
            Vinculación y Financiamiento
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2, mb: 3 }}>
            Captura los campos con la información correspondiente, valida la información antes de registrar
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Convocatoria (Combobox) */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Convocatoria</FormLabel>
                  <Select defaultValue="" {...register("convocatoria")}>
                    <MenuItem value="" disabled>
                      Selecciona una convocatoria
                    </MenuItem>
                    {convocatorias.map((c) => (
                      <MenuItem key={c.value} value={c.value}>
                        {c.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Tiene financiamiento */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">¿Tiene financiamiento?</FormLabel>
                  <RadioGroup row defaultValue="no" {...register("tieneFinanciamiento")}>
                    <FormControlLabel
                      value="si"
                      control={<Radio color="primary" />}
                      label="Sí"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            {/* Quién financia (Combobox) */}
            {tieneFinanciamiento === "si" && (
              <Grid container spacing={2} className="p-3">
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel>¿Quién financia?</FormLabel>
                    <Select defaultValue="" {...register("quienFinancia")}>
                      <MenuItem value="" disabled>
                        Selecciona quién financia
                      </MenuItem>
                      {financiadores.map((f) => (
                        <MenuItem key={f.value} value={f.value}>
                          {f.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}

            {/* Monto */}
            {tieneFinanciamiento === "si" && (
              <Grid container spacing={2} className="p-3">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Monto ($)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...register("monto")}
                  />
                </Grid>
              </Grid>
            )}

            {/* Fechas de financiamiento */}
            {tieneFinanciamiento === "si" && (
              <Grid container spacing={2} className="p-3">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha de inicio"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("fechaInicio")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha de fin"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("fechaFin")}
                  />
                </Grid>
              </Grid>
            )}

            {/* Botones */}
            <Grid container spacing={2} className="p-3">
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/Empresas")} // Navigate to Empresas
                  style={{
                    borderColor: "#1B396A",
                    color: "#1B396A",
                    borderRadius: "20px",
                  }}
                  onMouseEnter={(e) => (
                    (e.target.style.backgroundColor = "#1B396A"),
                    (e.target.style.color = "#fff")
                  )}
                  onMouseLeave={(e) => (
                    (e.target.style.backgroundColor = "transparent"),
                    (e.target.style.color = "#1B396A")
                  )}
                >
                  Regresar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#1B396A",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#162e54")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#1B396A")
                  }
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Modal */}
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Registro Exitoso</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Proyecto registrado
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary" autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 4, color: "#666" }}
          >
            En caso de que registre un dato mal, podrá modificarlo posteriormente, sin embargo, se recomienda verificar la información antes de registrar el proyecto
          </Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default VinculacionFinanciamiento;