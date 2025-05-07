import React from "react";
import TableViewer from "../../components/TableViewer";
import { Box, Fab, Typography } from "@mui/material";
import SideBarAdmin from "../../components/SideBarAdmin";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "react-bootstrap";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "id", width: 80 },
  { field: "Nombre", headerName: "Nombre(s)", width: 300 },
  { field: "Carrera", headerName: "Carrera", width: 300 },
  { field: "Instituto", headerName: "Instituto", width: 300 },
  {
    field: "Acciones",
    type: "actions",
    headerName: "Acciones",
    width: 160,
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          sx={{
            color: "primary.main",
          }}
          onClick={() => console.log("Editar " + id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => console.log("Eliminar " + id)}
          color="error"
        />,
      ];
    },
  },
];

const rows = [
  {
    id: 1,
    Nombre: "Los niños del sotano",
    Carrera: "Ing. Sistemas Computacionales",
    Instituto: "Instituto Tecnologico Superior del Sur de Guanajuato",
  },{
    id: 2,
    Nombre: "Misterio en la biblioteca",
    Carrera: "Ing. Industrial",
    Instituto: "Universidad Autónoma de Querétaro"
},
{
    id: 3,
    Nombre: "La máquina del tiempo",
    Carrera: "Lic. en Ciencias de la Computación",
    Instituto: "Universidad de Guadalajara"
},
{
    id: 4,
    Nombre: "El secreto del puente",
    Carrera: "Ing. Civil",
    Instituto: "Instituto Politécnico Nacional"
},
{
    id: 5,
    Nombre: "Aventura en la selva",
    Carrera: "Lic. en Biología",
    Instituto: "Universidad Nacional Autónoma de México"
}
  
];

function CrudLGAC() {
  return (
    <Box>
      <nav>
        <SideBarAdmin />
      </nav>
      <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
        <Typography variant="h3" sx={{}}>
          Lineas de Investigación
        </Typography>
        <Fab
          variant="extended"
          color="primary"
          sx={{ right: "-82vw", marginBottom: "10px" }}
        >
          <Link to={"/NoTerminada"}  className="text-white link-underline-primary">
            <AddIcon sx={{ mr: 1 }} />
            Agregar nueva
          </Link>
        </Fab>
        <TableViewer columns={columns} rows={rows} />
      </div>
    </Box>
  );
}

export default CrudLGAC;
