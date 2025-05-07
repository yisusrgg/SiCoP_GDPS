import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
  CssBaseline,
} from '@mui/material';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ErrorIcon from '@mui/icons-material/Error';
import HorizontalLinearStepper from '../../components/HorizontalLinearStepper';

const Form2 = ({handleNext, handleBack}) => {
  const navigate = useNavigate();

  const messages = {
    req: 'Este campo es obligatorio',
  };

  const steps = ['Step 1', 'Step 2', 'Step 3']; 

  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = (userInfo) => {
    Object.entries(userInfo).forEach(([key, value]) => {
      localStorage.setItem(key, value);
      console.log(`${key}: ${value}`);
    });
    //navigate('/RegistroProyecto/3'); 
    handleNext();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
     
      <Container component="main" sx={{ flexGrow: 1, py: 4, mt: 8, mb: 8 }}>
        
        <Typography variant="h6" align="center" sx={{ mb: 4 }} style={{ marginTop: "20px" }}>
          Captura los campos con la información correspondiente, valida la información antes de seguir
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* RESUMEN */}
          <div className="p-3 row" style={{ marginTop: "5px" }}>
            <label className="col-sm-2 col-form-label" style={{ fontSize: "1.25rem" }}>Resumen</label>
            <div className="col-sm-10">
              <TextField
                label="Resumen"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                {...register("resumen", { required: true })}
                error={!!errors.resumen}
                InputLabelProps={{ style: { fontSize: "1rem" } }}
                InputProps={{
                  style: { fontSize: "1rem" },
                  endAdornment: errors.resumen ? (
                    <InputAdornment position="end">
                      <ErrorIcon color="error" />
                    </InputAdornment>
                  ) : null,
                }}
              />
              {errors.resumen && <Typography color="error">{messages.req}</Typography>}
            </div>
          </div>

          {/* OBJETIVOS */}
          <div className="p-3 row">
            <label className="col-sm-2 col-form-label" style={{ fontSize: "1.25rem" }}>Objetivos</label>
            <div className="col-sm-10">
              <TextField
                label="Objetivos"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                {...register("objetivos", { required: true })}
                error={!!errors.objetivos}
                InputLabelProps={{ style: { fontSize: "1rem" } }}
                InputProps={{
                  style: { fontSize: "1rem" },
                  endAdornment: errors.objetivos ? (
                    <InputAdornment position="end">
                      <ErrorIcon color="error" />
                    </InputAdornment>
                  ) : null,
                }}
              />
              {errors.objetivos && <Typography color="error">{messages.req}</Typography>}
            </div>
          </div>

          {/* LÍDER */}
          <div className="p-3 row">
            <label className="col-sm-2 col-form-label" style={{ fontSize: "1.25rem" }}>Líder de proyecto</label>
            <div className="col-sm-10">
              <FormControl fullWidth error={!!errors.lider}>
                <InputLabel style={{ fontSize: "1rem" }}>Líder de proyecto</InputLabel>
                <Select
                  defaultValue=""
                  {...register("lider", { required: true })}
                  error={!!errors.lider}
                  style={{ fontSize: "1rem" }}
                  endAdornment={errors.lider ? (
                    <InputAdornment position="end">
                      <ErrorIcon color="error" />
                    </InputAdornment>
                  ) : null}
                >
                  <MenuItem value="0">Juan Perez</MenuItem>
                </Select>
                {errors.lider && <Typography color="error">{messages.req}</Typography>}
              </FormControl>
            </div>
          </div>

          {/* BOTONES */}
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={handleBack}
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
          </div>
        </form>
      </Container>
      <Footer />
    </Box>
  );
};

export default Form2;