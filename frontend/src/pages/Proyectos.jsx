import React, { useEffect, useState } from "react";
import TableViewer from "../components/TableViewer";
import { Box, Fab, Typography, Button } from "@mui/material";
import SideBar from "../components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid";

const STORAGE_KEY = "proyectosRows";
const EDITABLES_KEY = "proyectosEditables";

export default function Proyectos() {
  const [rows, setRows] = useState([]);
  const [editables, setEditables] = useState({});
  const navigate = useNavigate();

  // Carga los editables de localStorage
  useEffect(() => {
    const stored = localStorage.getItem(EDITABLES_KEY);
    if (stored) setEditables(JSON.parse(stored));
  }, []);

  // Carga los proyectos de localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRows(JSON.parse(stored));
    } else {
      const mockProjects = [
        {
          id: 1,
          Nombre: "Sistema de Gestión de Inventarios",
          Empresa: "Tech Solutions S.A.",
          LGAC: "Innovación Tecnológica",
          Lider: "Juan Pérez",
          Estatus: "Completado",
        },
        {
          id: 2,
          Nombre: "Plataforma de E-Learning",
          Empresa: "EducaOnline",
          LGAC: "Educación Digital",
          Lider: "María Gómez",
          Estatus: "No Completado",
        },
        {
          id: 3,
          Nombre: "Aplicación Móvil de Salud",
          Empresa: "HealthCare Inc.",
          LGAC: "Tecnología Médica",
          Lider: "Carlos Rodríguez",
          Estatus: "Completado",
        },
        {
          id: 4,
          Nombre: "Automatización de Procesos",
          Empresa: "AutoSys Corp.",
          LGAC: "Automatización Industrial",
          Lider: "Ana López",
          Estatus: "No Completado",
        },
        {
          id: 5,
          Nombre: "Sistema de Monitoreo Ambiental",
          Empresa: "GreenTech",
          LGAC: "Sostenibilidad",
          Lider: "Luis Martínez",
          Estatus: "Completado",
        },
      ];
      setRows(mockProjects);
    }
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "Nombre", headerName: "Nombre(s)", width: 300 },
    { field: "Empresa", headerName: "Empresa", width: 300 },
    { field: "LGAC", headerName: "LGAC", width: 300 },
    { field: "Lider", headerName: "Líder", width: 300 },
    {
      field: "Estatus",
      headerName: "Estatus",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          disabled
          sx={{
            minWidth: 150,
            height: 36,
            backgroundColor: params.row.Estatus === "Completado" ? "#1976d2" : "#757575",
            color: "#fff",
            "&:hover": {
              backgroundColor: params.row.Estatus === "Completado" ? "#115293" : "#616161",
            },
            textTransform: "none",
            fontWeight: 600,
            padding: 0,
          }}
        >
          {params.row.Estatus === "Completado" ? "Completado" : "No Completado"}
        </Button>
      ),
    },
    {
      field: "Acciones",
      type: "actions",
      headerName: "Acciones",
      width: 120,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Modificar"
          sx={{ color: editables[id] ? "primary.main" : "grey.500" }}
          onClick={() => editables[id] && navigate("/EditarProyecto", { state: { proyecto: rows.find(r => r.id === id) } })}
          disabled={!editables[id]}
        />,
      ],
    },
  ];

  return (
    <Box>
      <nav>
        <SideBar />
      </nav>
      <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
        <Typography variant="h3">Mis Proyectos</Typography>
        <Fab
          variant="extended"
          color="primary"
          sx={{ right: "-82vw", marginBottom: "10px" }}
        >
          <Link to={"/RegistroProyecto1"} className="text-white link-underline-primary">
            <AddIcon sx={{ mr: 1 }} />
            Registrar proyecto
          </Link>
        </Fab>
        <TableViewer columns={columns} rows={rows} />
      </div>
    </Box>
  );
}