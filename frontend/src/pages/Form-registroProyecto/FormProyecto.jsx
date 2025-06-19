"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  Divider,
} from "@mui/material"
import SideBarAdmin from "../../components/SideBarAdmin"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

function FormProyecto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    projectName: "",
    objetives: "",
    summary: "",
    invArea: "CN",
    dateBegin: "",
    dateEnd: "",
    financing: false,
    amount: 0,
    rfcCall: "",
    rfcCom: "",
    lgac_Linea: "",
    projectLeader: "",
    linked: false,
    projectcol: "",
  })

  const [calls, setCalls] = useState([])
  const [companies, setCompanies] = useState([])
  const [lgacs, setLgacs] = useState([])
  const [leaders, setLeaders] = useState([])
  const [errors, setErrors] = useState({})

  // Cargar datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const callsResponse = await axios.get("http://127.0.0.1:8000/call/")
        const companiesResponse = await axios.get("http://127.0.0.1:8000/company/addCompany/")
        const lgacsResponse = await axios.get("http://127.0.0.1:8000/lgac/")
        const leadersResponse = await axios.get("http://127.0.0.1:8000/researcher/")

        setCalls(callsResponse.data)
        setCompanies(companiesResponse.data)
        setLgacs(lgacsResponse.data)
        setLeaders(leadersResponse.data)
      } catch (error) {
        console.error("Error al cargar datos:", error)
        alert("Hubo un error al cargar los datos. Por favor, inténtalo más tarde.")
      }
    }

    fetchData()
  }, [])

  // Cargar datos del proyecto si se está editando
  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/projects/projects/${id}/`)
          setFormData(response.data)
        } catch (error) {
          console.error("Error al cargar el proyecto:", error)
          alert("Hubo un error al cargar los datos del proyecto.")
        }
      }
      fetchProject()
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "financing") {
      setFormData((prev) => ({
        ...prev,
        financing: checked,
        amount: checked ? 1000 : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Validación de campos requeridos antes de avanzar
  const validateFields = () => {
    const newErrors = {};
    if (!formData.projectName) newErrors.projectName = "Campo requerido";
    if (!formData.objetives) newErrors.objetives = "Campo requerido";
    if (!formData.summary) newErrors.summary = "Campo requerido";
    if (!formData.invArea) newErrors.invArea = "Campo requerido";
    if (!formData.dateBegin) newErrors.dateBegin = "Campo requerido";
    if (!formData.dateEnd) newErrors.dateEnd = "Campo requerido";
    if (formData.dateBegin && formData.dateEnd && formData.dateEnd < formData.dateBegin) {
      newErrors.dateEnd = "La fecha de fin no puede ser anterior a la de inicio";
    }
    if (formData.financing && (!formData.amount || formData.amount < 1000)) newErrors.amount = "Monto mínimo $1000";
    if (!formData.rfcCall) newErrors.rfcCall = "Campo requerido";
    if (!formData.rfcCom) newErrors.rfcCom = "Campo requerido";
    if (!formData.lgac_Linea) newErrors.lgac_Linea = "Campo requerido";
    if (!formData.projectLeader) newErrors.projectLeader = "Campo requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const caracteresValidos = /^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñüÜ\s]+$/;

  // Botón "Regresar" a Proyectos
  const handleBack = () => {
    navigate("/Administracion/Proyectos");
  };

  // Botón "Siguiente" a Metas, solo si todo es válido
  const handleNext = (e) => {
    e.preventDefault();
    if (!validateFields()) {
      alert("Por favor, completa todos los campos obligatorios correctamente.");
      return;
    }
    if (!caracteresValidos.test(formData.projectName)) {
      alert("El Nombre del Proyecto no debe contener caracteres especiales.");
      return;
    }
    // Aquí podrías guardar temporalmente el formData si lo necesitas
    navigate("/Metas");
  };

  return (
    <Box>
      <nav>
        <SideBarAdmin />
      </nav>
      <Box sx={{ marginTop: "5vh", marginLeft: "2vw", p: 5 }}>
        <Typography variant="h3" sx={{ mb: 3, textAlign: "center"}}>
          {id ? "Editar líneas de investigación" : "Registrar líneas de investigación"}
        </Typography>

        <Paper elevation={3} sx={{ p: 4, maxWidth: "900px", mx: "auto" }}>
          <Typography variant="subtitle1" sx={{ mb: 3, textAlign: "center" }}>
            {id ? "Modifica los datos de la línea de investigación" : "Ingresa los datos de la línea de investigación"}
          </Typography>

          <form onSubmit={handleNext} noValidate>
            <Grid container spacing={3}>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>Nombre del Proyecto:</Typography>
                  <TextField
                    fullWidth
                    name="projectName"
                    value={formData.projectName}
                    onChange={e => {
                      setFormData({ ...formData, projectName: e.target.value });
                      setErrors({ ...errors, projectName: undefined });
                    }}
                    required
                    variant="outlined"
                    inputProps={{ maxLength: 254 }}
                    helperText={errors.projectName || " "}
                    error={!!errors.projectName}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={{ ml: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {`${formData.projectName.length}/254`}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px", mt: 2 }}>Objetivos:</Typography>
                  <TextField
                    fullWidth
                    name="objetives"
                    value={formData.objetives}
                    onChange={e => {
                      setFormData({ ...formData, objetives: e.target.value });
                      setErrors({ ...errors, objetives: undefined });
                    }}
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    inputProps={{ maxLength: 1000 }}
                    helperText={errors.objetives || " "}
                    error={!!errors.objetives}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={{ ml: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {`${formData.objetives.length}/1000`}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px", mt: 2 }}>Resumen:</Typography>
                  <TextField
                    fullWidth
                    name="summary"
                    value={formData.summary}
                    onChange={e => {
                      setFormData({ ...formData, summary: e.target.value });
                      setErrors({ ...errors, summary: undefined });
                    }}
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    inputProps={{ maxLength: 1000 }}
                    helperText={errors.summary || " "}
                    error={!!errors.summary}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={{ ml: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {`${formData.summary.length}/1000`}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>Área de Investigación:</Typography>
                  <FormControl fullWidth error={!!errors.invArea}>
                    <Select name="invArea" value={formData.invArea} onChange={handleChange} required displayEmpty>
                      <MenuItem value="">Seleccione un área</MenuItem>
                      <MenuItem value="ED">Educación</MenuItem>
                      <MenuItem value="AH">Artes y Humanidades</MenuItem>
                      <MenuItem value="SC">Ciencias Sociales Administración y Derecho</MenuItem>
                      <MenuItem value="AN">Administración y Negocios</MenuItem>
                      <MenuItem value="CN">Ciencias Naturales Exactas y de la Computación</MenuItem>
                      <MenuItem value="TICs">Tecnología de la Información y la Comunicación</MenuItem>
                      <MenuItem value="IMC">Ingeniería Manufactura y Construcción</MenuItem>
                      <MenuItem value="AV">Agronomía y Veterinaria</MenuItem>
                      <MenuItem value="SD">Salud</MenuItem>
                      <MenuItem value="SV">Servicios</MenuItem>
                    </Select>
                    <Typography variant="caption" color="error">{errors.invArea}</Typography>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>Fecha de Inicio:</Typography>
                  <TextField
                    fullWidth
                    name="dateBegin"
                    type="date"
                    value={formData.dateBegin}
                    onChange={e => {
                      setFormData({ ...formData, dateBegin: e.target.value });
                      setErrors({ ...errors, dateBegin: undefined });
                    }}
                    required
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    helperText={errors.dateBegin || " "}
                    error={!!errors.dateBegin}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>Fecha de Fin:</Typography>
                  <TextField
                    fullWidth
                    name="dateEnd"
                    type="date"
                    value={formData.dateEnd}
                    onChange={e => {
                      setFormData({ ...formData, dateEnd: e.target.value });
                      setErrors({ ...errors, dateEnd: undefined });
                    }}
                    required
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    inputProps={{
                      min: formData.dateBegin || undefined,
                    }}
                    helperText={errors.dateEnd || " "}
                    error={!!errors.dateEnd}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>Financiamiento:</Typography>
                  <FormControlLabel
                    control={<Checkbox name="financing" checked={formData.financing} onChange={handleChange} />}
                    label=""
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>Monto:</Typography>
                  <TextField
                    fullWidth
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={e => {
                      setFormData({ ...formData, amount: e.target.value });
                      setErrors({ ...errors, amount: undefined });
                    }}
                    disabled={!formData.financing}
                    variant="outlined"
                    inputProps={{ min: 1000, max: 99999999 }}
                    helperText={errors.amount || " "}
                    error={!!errors.amount}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={{ ml: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {`${formData.amount}/99999999`}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>RFC Convocatoria:</Typography>
                  <FormControl fullWidth error={!!errors.rfcCall}>
                    <Select name="rfcCall" value={formData.rfcCall} onChange={handleChange} required displayEmpty>
                      <MenuItem value="">Seleccione una convocatoria</MenuItem>
                      {calls.map((call) => (
                        <MenuItem key={call.id} value={call.id}>
                          {call.rfcCall}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="caption" color="error">{errors.rfcCall}</Typography>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>RFC Compañía:</Typography>
                  <FormControl fullWidth error={!!errors.rfcCom}>
                    <Select name="rfcCom" value={formData.rfcCom} onChange={handleChange} required displayEmpty>
                      <MenuItem value="">Seleccione una compañía</MenuItem>
                      {companies.map((company) => (
                        <MenuItem key={company.id} value={company.id}>
                          {company.rfc}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="caption" color="error">{errors.rfcCom}</Typography>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>LGAC Línea:</Typography>
                  <FormControl fullWidth error={!!errors.lgac_Linea}>
                    <Select name="lgac_Linea" value={formData.lgac_Linea} onChange={handleChange} required displayEmpty>
                      <MenuItem value="">Seleccione una LGAC</MenuItem>
                      {lgacs.map((lgac) => (
                        <MenuItem key={lgac.id} value={lgac.id}>
                          {lgac.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="caption" color="error">{errors.lgac_Linea}</Typography>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>Líder del Proyecto:</Typography>
                  <FormControl fullWidth error={!!errors.projectLeader}>
                    <Select
                      name="projectLeader"
                      value={formData.projectLeader}
                      onChange={handleChange}
                      required
                      displayEmpty
                    >
                      <MenuItem value="">Seleccione un líder</MenuItem>
                      {leaders.map((leader) => (
                        <MenuItem key={leader.id} value={leader.id}>
                          {leader.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="caption" color="error">{errors.projectLeader}</Typography>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>Vinculado:</Typography>
                  <FormControlLabel
                    control={<Checkbox name="linked" checked={formData.linked} onChange={handleChange} />}
                    label=""
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ minWidth: "200px" }}>Proyecto Col:</Typography>
                  <TextField
                    fullWidth
                    name="projectcol"
                    value={formData.projectcol}
                    onChange={e => setFormData({ ...formData, projectcol: e.target.value })}
                    variant="outlined"
                    inputProps={{ maxLength: 50 }}
                    helperText=" "
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={{ ml: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {`${formData.projectcol.length}/50`}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}    
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={{ bgcolor: "#003366" }}
                  >
                    Regresar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<NavigateNextIcon />}
                    sx={{ bgcolor: "#003366" }}
                  >
                    Siguiente
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}

export default FormProyecto