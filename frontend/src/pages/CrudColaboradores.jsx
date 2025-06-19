import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableViewer from "../components/TableViewer";

function CrudColaboradores() {
    const navigate = useNavigate();

    // Datos de ejemplo
    const rows = [
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
    ];

    // Se eliminó la columna de acciones
    const columns = [
        { field: "curp", headerName: "CURP", flex: 1 },
        { field: "nombre", headerName: "Nombre(s)", flex: 1 },
        { field: "apellidos", headerName: "Apellido(s)", flex: 1 },
        { field: "carrera", headerName: "Carrera", flex: 1 },
    ];

    return (
        <Box>
            <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
                <Typography variant="h3">Colaboradores</Typography>
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
                            onClick={() => navigate("/Colaboradores")}
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

export default CrudColaboradores;