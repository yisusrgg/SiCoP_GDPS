import React from "react";
import { Box, Fab, Typography, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "./components/TableViewer";

function Empresas() {
    const navigate = useNavigate();

    // Datos de ejemplo
    const rows = [
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
    ];

    // Se eliminó la columna de acciones
    const columns = [
        { field: "rfc", headerName: "RFC", flex: 1 },
        { field: "razonSocial", headerName: "Razón Social", flex: 1 },
        { field: "sector", headerName: "Sector", flex: 1 },
        { field: "tipoEmpresa", headerName: "Tipo de Empresa", flex: 1 },
    ];

    return (
        <Box>
            <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
                <Typography variant="h3">Empresas del Proyecto</Typography>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ right: "-82vw", marginBottom: "10px" }}
                >
                    <Link to={"/CrudEmpresas"} className="text-white link-underline-primary">
                        <AddIcon sx={{ mr: 1 }} />
                        Añadir Empresa
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
                            onClick={() => navigate("/VinculacionFinanciamiento")}
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

export default Empresas;