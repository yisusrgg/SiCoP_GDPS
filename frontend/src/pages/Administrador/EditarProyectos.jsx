import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Divider,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "../../components/TableViewer";

function EditarProyectos() {
  const [financiamiento, setFinanciamiento] = useState(false);
  const navigate = useNavigate();

  // Metas
  const metas = [
    { id: "MA1", label: "Tesis en desarrollo de licenciatura" },
    { id: "MA2", label: "Articulos cientificos enviados en revistas arbitradas" },
    { id: "MA3", label: "Articulos en memorias de congreso enviados" },
    { id: "MA4", label: "Informe tecnico con aval de empresa" },
    { id: "MB1", label: "Tesis concluidas de licenciatura" },
    { id: "MB2", label: "Articulos cientificos publicados en revistas arbitradas" },
    { id: "MB3", label: "Memorias en extenso en congreso" },
    { id: "MB4", label: "Registro de software (INDAUTOR)" },
    { id: "MC1", label: "Incorporacion de alumnos de licenciatura (servicio social, creditos complementarios, etc)" },
    { id: "MC2", label: "Articulos cientificos enviados en revistas indizadas" },
    { id: "MC3", label: "Prototipos" },
    { id: "MC4", label: "Derechos de autor (INDAUTOR)" },
    { id: "MD1", label: "Alumnos residentes participantes en el proyecto" },
    { id: "MD2", label: "Articulos cientificos publicados en revistas indizadas" },
    { id: "MD3", label: "Paquetes tecnologicos" },
    { id: "MD4", label: "Carta de empresa (EMPRESA)" },
  ];
  const [selectedMetas, setSelectedMetas] = useState([]);

  // Manejo de metas seleccionadas y cantidades
  const handleAddMeta = (e) => {
    const metaId = e.target.value;
    if (
      metaId &&
      !selectedMetas.find((meta) => meta.id === metaId)
    ) {
      const selectedMeta = metas.find((meta) => meta.id === metaId);
      setSelectedMetas([
        ...selectedMetas,
        { ...selectedMeta, cantidad: 0 },
      ]);
    }
  };

  const handleRemoveMeta = (metaId) => {
    setSelectedMetas(selectedMetas.filter((meta) => meta.id !== metaId));
  };

  const handleCantidadChange = (metaId, value) => {
    setSelectedMetas(
      selectedMetas.map((meta) =>
        meta.id === metaId
          ? { ...meta, cantidad: value < 0 ? 0 : value }
          : meta
      )
    );
  };

  // CRUD tablas
  const [rowsEstudiantes, setRowsEstudiantes] = useState([
    {
      id: 1,
      noControl: "A12345",
      nombre: "Juan",
      apellidos: "Pérez",
      carrera: "Ingeniería en Sistemas",
      semestre: "6",
    },
    {
      id: 2,
      noControl: "B67890",
      nombre: "Ana",
      apellidos: "López",
      carrera: "Ingeniería Industrial",
      semestre: "8",
    },
  ]);
  const [rowsEmpresas, setRowsEmpresas] = useState([
    {
      id: 1,
      rfc: "ABC123456789",
      razonSocial: "Empresa Uno S.A. de C.V.",
      sector: "Industrial",
      tipoEmpresa: "Grande",
    },
    {
      id: 2,
      rfc: "XYZ987654321",
      razonSocial: "Servicios Integrales",
      sector: "Servicios",
      tipoEmpresa: "Mediana",
    },
  ]);
  const [rowsColaboradores, setRowsColaboradores] = useState([
    {
      id: 1,
      curp: "PEPJ800101HDFLLL01",
      nombre: "Pedro",
      apellidos: "Pérez Jiménez",
      carrera: "Ingeniería en Sistemas",
    },
    {
      id: 2,
      curp: "LOAA900202MDFRRR02",
      nombre: "Laura",
      apellidos: "López Andrade",
      carrera: "Ingeniería Industrial",
    },
  ]);

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    type: "", // 'agregar' | 'editar' | 'eliminar'
    entity: "", // 'colaborador' | 'estudiante' | 'empresa'
    row: null,
  });

  // Abrir modal de acción
  const openModal = (type, entity, row = null) => {
    setModal({ open: true, type, entity, row });
  };

  // Cerrar modal
  const closeModal = () => setModal({ open: false, type: "", entity: "", row: null });

  const confirmModal = () => {
  if (modal.type === "eliminar" && modal.row) {
    if (modal.entity === "colaborador") setRowsColaboradores(rowsColaboradores.filter(r => r.id !== modal.row.id));
    if (modal.entity === "estudiante") setRowsEstudiantes(rowsEstudiantes.filter(r => r.id !== modal.row.id));
    if (modal.entity === "empresa") setRowsEmpresas(rowsEmpresas.filter(r => r.id !== modal.row.id));
    closeModal();
  } else if (modal.type === "editar" && modal.row) {
    // Redirige a los formularios de registro/edición según las rutas de App.jsx
    if (modal.entity === "colaborador") navigate("/Administracion/RegistroColaborador");
    if (modal.entity === "estudiante") navigate("/RegistroAlumnos");
    if (modal.entity === "empresa") navigate("/RegistroEmpresa");
    closeModal();
  } else if (modal.type === "agregar") {
    // Redirige a los CRUD correspondientes
    if (modal.entity === "colaborador") navigate("/Colaboradores");
    if (modal.entity === "estudiante") navigate("/Estudiantes");
    if (modal.entity === "empresa") navigate("/Empresas");
    closeModal();
  }
};


  // Columnas con acciones
  const columnsEstudiantes = [
    { field: "noControl", headerName: "No.Control", width: 120 },
    { field: "nombre", headerName: "Nombre(s)", width: 200 },
    { field: "apellidos", headerName: "Apellido(s)", width: 200 },
    { field: "carrera", headerName: "Carrera", width: 200 },
    { field: "semestre", headerName: "Semestre", width: 120 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton color="primary" onClick={() => openModal("editar", "estudiante", params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => openModal("eliminar", "estudiante", params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const columnsEmpresas = [
    { field: "rfc", headerName: "RFC", width: 150 },
    { field: "razonSocial", headerName: "Razón Social", width: 250 },
    { field: "sector", headerName: "Sector", width: 150 },
    { field: "tipoEmpresa", headerName: "Tipo de Empresa", width: 180 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton color="primary" onClick={() => openModal("editar", "empresa", params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => openModal("eliminar", "empresa", params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const columnsColaboradores = [
    { field: "curp", headerName: "CURP", width: 180 },
    { field: "nombre", headerName: "Nombre(s)", width: 180 },
    { field: "apellidos", headerName: "Apellido(s)", width: 180 },
    { field: "carrera", headerName: "Carrera", width: 180 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton color="primary" onClick={() => openModal("editar", "colaborador", params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => openModal("eliminar", "colaborador", params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  // Texto para el modal según la acción
  const getModalText = () => {
    if (modal.type === "agregar") {
      if (modal.entity === "colaborador") return "¿Desea agregar un nuevo colaborador?";
      if (modal.entity === "estudiante") return "¿Desea agregar un nuevo estudiante?";
      if (modal.entity === "empresa") return "¿Desea agregar una nueva empresa?";
    }
    if (modal.type === "editar" && modal.row) {
      return `¿Desea editar a ${modal.row.nombre || modal.row.razonSocial || modal.row.curp}?`;
    }
    if (modal.type === "eliminar" && modal.row) {
      return `¿Desea eliminar a ${modal.row.nombre || modal.row.razonSocial || modal.row.curp}?`;
    }
    return "";
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100vw", bgcolor: "#f5f5f5" }}>
      <Box
        className="p-5"
        sx={{
          marginTop: "5vh",
          marginLeft: { xs: 0, md: "2vw" },
          width: { xs: "100vw", md: "calc(100vw - 240px)" },
          minHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ mb: 3, width: "100%" }}>
          Editar Proyecto
        </Typography>
        <Paper sx={{ p: 3, width: "100%", maxWidth: 1100 }}>
          <form>
            <Grid container spacing={2}>
              {/* Formulario principal */}
              <Grid item xs={12}>
                <TextField
                  label="Nombre del proyecto"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Área de investigación</InputLabel>
                  <Select label="Área de investigación" defaultValue="">
                    <MenuItem value="area1">Área 1</MenuItem>
                    <MenuItem value="area2">Área 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Línea de investigación</InputLabel>
                  <Select label="Línea de investigación" defaultValue="">
                    <MenuItem value="linea1">Línea 1</MenuItem>
                    <MenuItem value="linea2">Línea 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de inicio"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de finalización (estimada)"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Resumen"
                  multiline
                  rows={3}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Objetivos"
                  multiline
                  rows={3}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Líder de proyecto</InputLabel>
                  <Select label="Líder de proyecto" defaultValue="">
                    <MenuItem value="lider1">Líder 1</MenuItem>
                    <MenuItem value="lider2">Líder 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Metas</InputLabel>
                  <Select label="Metas" multiple defaultValue={[]}>
                    <MenuItem value="meta1">Meta 1</MenuItem>
                    <MenuItem value="meta2">Meta 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Metas dinámicas */}
              <Grid item xs={12}>
                <Card sx={{ mb: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Metas
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="metaSelect-label">Agregar meta</InputLabel>
                      <Select
                        labelId="metaSelect-label"
                        value=""
                        onChange={handleAddMeta}
                        label="Agregar meta"
                      >
                        <MenuItem value="" disabled>
                          Seleccione una meta
                        </MenuItem>
                        {metas
                          .filter((meta) => !selectedMetas.find((m) => m.id === meta.id))
                          .map((meta) => (
                            <MenuItem key={meta.id} value={meta.id}>
                              {meta.label}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Meta</TableCell>
                            <TableCell align="center">Cantidad</TableCell>
                            <TableCell align="center">Eliminar</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedMetas.map((meta) => (
                            <TableRow key={meta.id}>
                              <TableCell>{meta.label}</TableCell>
                              <TableCell align="center" sx={{ width: 120 }}>
                                <TextField
                                  type="number"
                                  size="small"
                                  value={meta.cantidad}
                                  inputProps={{ min: 0, style: { textAlign: "center" } }}
                                  onChange={(e) =>
                                    handleCantidadChange(meta.id, parseInt(e.target.value) || 0)
                                  }
                                  sx={{ width: 80 }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  color="error"
                                  onClick={() => handleRemoveMeta(meta.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                          {selectedMetas.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={3} align="center">
                                No hay metas agregadas.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Tablas CRUD con acciones */}
              <Grid item xs={12}>
                <Card sx={{ mb: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6">Colaboradores</Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        size="small"
                        onClick={() => openModal("agregar", "colaborador")}
                      >
                        Agregar colaborador
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <TableViewer columns={columnsColaboradores} rows={rowsColaboradores} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ mb: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6">Estudiantes</Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        size="small"
                        onClick={() => openModal("agregar", "estudiante")}
                      >
                        Agregar estudiante
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <TableViewer columns={columnsEstudiantes} rows={rowsEstudiantes} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ mb: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6">Empresas</Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        size="small"
                        onClick={() => openModal("agregar", "empresa")}
                      >
                        Agregar empresa
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <TableViewer columns={columnsEmpresas} rows={rowsEmpresas} />
                  </CardContent>
                </Card>
              </Grid>

              {/* Resto del formulario */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Empresa</InputLabel>
                  <Select label="Empresa" defaultValue="">
                    <MenuItem value="empresa1">Empresa 1</MenuItem>
                    <MenuItem value="empresa2">Empresa 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Convocatoria</InputLabel>
                  <Select label="Convocatoria" defaultValue="">
                    <MenuItem value="conv1">Convocatoria 1</MenuItem>
                    <MenuItem value="conv2">Convocatoria 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={financiamiento}
                      onChange={e => setFinanciamiento(e.target.checked)}
                    />
                  }
                  label="¿Tiene financiamiento?"
                />
              </Grid>
              {financiamiento && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="¿Quién financia?"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Monto ($)"
                      type="number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fecha de inicio de financiación"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fecha de fin de financiación"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to="/Administracion/Proyectos"
                >
                  Regresar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Confirmar cambios
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      {/* Modal de confirmación */}
      <Dialog open={modal.open} onClose={closeModal}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          {getModalText()}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="inherit">Cancelar</Button>
          <Button onClick={confirmModal} color="primary" variant="contained">
            Sí, confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditarProyectos;