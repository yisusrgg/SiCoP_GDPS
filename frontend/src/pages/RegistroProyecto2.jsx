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
import Footer from "../components/Footer";

function RegistroProyecto2() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    // Aquí puedes manejar el registro del proyecto
    console.log(data);
    navigate("/Detalles/Metas");
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            Registro de Proyecto
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Captura los campos con la información correspondiente, valida la información antes de seguir
          </Typography>

          <form onSubmit={onSubmit}>
            {/* Resumen */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label htmlFor="resumen" className="col-form-label">
                  Resumen
                </label>
                <TextField
                  label="Resumen"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}
                  {...register("resumen", { required: true })}
                  error={!!errors.resumen}
                />
              </Grid>
            </Grid>

            {/* Objetivos */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label htmlFor="objetivos" className="col-form-label">
                  Objetivos
                </label>
                <TextField
                  label="Objetivos"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}
                  {...register("objetivos", { required: true })}
                  error={!!errors.objetivos}
                />
              </Grid>
            </Grid>

            {/* Líder de Proyecto */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label className="col-form-label">Líder de Proyecto</label>
                <FormControl fullWidth error={!!errors.liderProyecto}>
                  <InputLabel>Líder de Proyecto</InputLabel>
                  <Select
                    label="Líder de Proyecto"
                    defaultValue=""
                    {...register("liderProyecto", { required: true })}
                  >
                    <MenuItem value="Juan Pérez">Juan Pérez</MenuItem>
                    <MenuItem value="María Gómez">María Gómez</MenuItem>
                    <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                    <MenuItem value="Ana López">Ana López</MenuItem>
                    <MenuItem value="Luis Martínez">Luis Martínez</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Botones */}
            <Grid container spacing={2} className="p-3">
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/RegistroProyecto1")}
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

export default RegistroProyecto2;