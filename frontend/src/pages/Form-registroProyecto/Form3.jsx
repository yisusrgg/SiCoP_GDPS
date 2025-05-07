import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SideBar_Detalles from "../../components/SideBar_Detalles";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import HorizontalLinearStepper from "../../components/HorizontalLinearStepper";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Box,
  Typography,
  IconButton,
  CssBaseline,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Metas({ IsRegister = false, handleNext, handleBack }) {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [selectedMetas, setSelectedMetas] = useState([]);

  const onSubmit = (userInfo) => {
    console.log(userInfo);

    IsRegister ? handleNext() : "";
    //navigate('/RegistroProyecto/4');
  };

  const messages = {
    req: "Este campo es obligatorio (0 si no hay)",
  };

  const metas = [
    { id: "MA1", label: "Tesis en desarrollo de licenciatura" },
    {
      id: "MA2",
      label: "Articulos cientificos enviados en revistas arbitradas",
    },
    { id: "MA3", label: "Articulos en memorias de congreso enviados" },
    { id: "MA4", label: "Informe tecnico con aval de empresa" },
    { id: "MB1", label: "Tesis concluidas de licenciatura" },
    {
      id: "MB2",
      label: "Articulos cientificos publicados en revistas arbitradas",
    },
    { id: "MB3", label: "Memorias en extenso en congreso" },
    { id: "MB4", label: "Registro de software (INDAUTOR)" },
    {
      id: "MC1",
      label:
        "Incorporacion de alumnos de licenciatura (servicio social, creditos complementarios, etc)",
    },
    {
      id: "MC2",
      label: "Articulos cientificos enviados en revistas indizadas",
    },
    { id: "MC3", label: "Prototipos" },
    { id: "MC4", label: "Derechos de autor (INDAUTOR)" },
    { id: "MD1", label: "Alumnos residentes participantes en el proyecto" },
    {
      id: "MD2",
      label: "Articulos cientificos publicados en revistas indizadas",
    },
    { id: "MD3", label: "Paquetes tecnologicos" },
    { id: "MD4", label: "Carta de empresa (EMPRESA)" },
  ];
  const steps = ["Step 1", "Step 2", "Step 3"];

  const handleAddMeta = (e) => {
    const metaId = e.target.value;
    if (metaId && !selectedMetas.find((meta) => meta.id === metaId)) {
      const selectedMeta = metas.find((meta) => meta.id === metaId);
      setSelectedMetas([...selectedMetas, selectedMeta]);
    }
  };

  const handleRemoveMeta = (metaId) => {
    setSelectedMetas(selectedMetas.filter((meta) => meta.id !== metaId));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />

      <Box sx={{ display: "flex", flexGrow: 1, mt: 8, mb: 8 }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ paddingBottom: "80px" }}
          >
            <FormControl fullWidth margin="normal">
              <InputLabel id="metaSelect-label">Metas</InputLabel>
              <Select
                labelId="metaSelect-label"
                id="metaSelect"
                value=""
                onChange={handleAddMeta}
                label="Metas"
              >
                <MenuItem value="" disabled>
                  Seleccione una meta
                </MenuItem>
                {metas.map((meta) => (
                  <MenuItem key={meta.id} value={meta.id}>
                    {meta.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedMetas.map((meta) => (
              <Paper key={meta.id} elevation={3} sx={{ p: 2, mb: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>{meta.label}</Typography>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleRemoveMeta(meta.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <TextField
                  type="number"
                  defaultValue={0}
                  InputProps={{ inputProps: { min: 0 } }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register(meta.id, { required: true })}
                  error={!!errors[meta.id]}
                  helperText={errors[meta.id] ? messages.req : ""}
                />
              </Paper>
            ))}
            {/* BOTONES */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
             {IsRegister &&
               <Button
               variant="outlined"
               onClick={handleBack}
               style={{
                 marginLeft: "10px",
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
             }
              <Button
                type="submit"
                variant="contained"
                style={{
                  marginRight: "10px",
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
                {IsRegister?"Siguiente":"Confirmar"}
              </Button>
            </div>
          </form>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
