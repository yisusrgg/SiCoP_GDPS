import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Box,
  CssBaseline,
} from "@mui/material";

function RegistrarLGAC() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Cambia la ruta a la correcta
  const onSubmit = (data) => {
    navigate("/Administracion/LGAC");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            Registro de LGAC
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Captura los campos con la información correspondiente, valida la información antes de registrar.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label htmlFor="inputNombre" className="col-form-label">
                  Nombre
                </label>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  {...register("nombre", { required: true })}
                  error={!!errors.nombre}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="inputInstituto" className="col-form-label">
                  Instituto de registro
                </label>
                <TextField
                  label="Instituto de registro"
                  variant="outlined"
                  fullWidth
                  {...register("instituto", { required: true })}
                  error={!!errors.instituto}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Carrera</label>
                <FormControl fullWidth error={!!errors.carrera}>
                  <InputLabel>Carrera</InputLabel>
                  <Select
                    label="Carrera"
                    defaultValue=""
                    {...register("carrera", { required: true })}
                  >
                    <MenuItem value="Sistemas">Ingeniería en Sistemas Computacionales</MenuItem>
                    <MenuItem value="Industrial">Ingeniería Industrial</MenuItem>
                    <MenuItem value="Civil">Ingeniería Civil</MenuItem>
                    <MenuItem value="Biología">Lic. en Biología</MenuItem>
                    <MenuItem value="Computación">Lic. en Ciencias de la Computación</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">LineaID</label>
                <TextField
                  label="LineaID"
                  variant="outlined"
                  fullWidth
                  {...register("lineaID", { required: true })}
                  error={!!errors.lineaID}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className="p-3">
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/Administracion/LGAC")}
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
        </Container>
      </Box>
    </Box>
  );
}

export default RegistrarLGAC;