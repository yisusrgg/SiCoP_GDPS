import React from "react";
import { Box, Fab, Typography, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "./components/TableViewer";

function Estudiantes() {
    const navigate = useNavigate();

    // Ejemplo de datos actualizados
    const rows = [
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
    ];

    // Se eliminó la columna de acciones
    const columns = [
        { field: "noControl", headerName: "No.Control", flex: 1 },
        { field: "nombre", headerName: "Nombre(s)", flex: 1 },
        { field: "apellidos", headerName: "Apellido(s)", flex: 1 },
        { field: "carrera", headerName: "Carrera", flex: 1 },
        { field: "semestre", headerName: "Semestre", flex: 1 },
    ];

    return (
        <Box>
            <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
                <Typography variant="h3">Estudiantes del Proyecto</Typography>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ right: "-82vw", marginBottom: "10px" }}
                >
                    <Link to={"/CrudEstudiantes"} className="text-white link-underline-primary">
                        <AddIcon sx={{ mr: 1 }} />
                        Añadir Estudiante
                    </Link>
                </Fab>
                <TableViewer columns={columns} rows={rows} />
                <Grid container spacing={2} className="p-3" sx={{ mt: 2 }}>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
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
                            variant="contained"
                            style={{
                                backgroundColor: "#1B396A",
                                color: "#fff",
                                borderRadius: "20px",
                            }}
                            onClick={() => navigate("/Empresas")}
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
            </div>
        </Box>
    );
}

export default Estudiantes;