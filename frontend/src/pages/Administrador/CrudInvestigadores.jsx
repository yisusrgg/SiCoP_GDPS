import React from "react";
import TableViewer from "../../components/TableViewer";
import { Box, Fab, Typography } from "@mui/material";
import SideBarAdmin from "../../components/SideBarAdmin";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "id", flex: 1 },
  { field: "Nombre", headerName: "Nombre(s)", flex: 1 },
  { field: "Apellido", headerName: "Apellido(s)", flex: 1 },
  { field: "Correo", headerName: "Correo", flex: 1 },
  { field: "Carrera", headerName: "Carrera", flex: 1 },
  { field: "Proyectos", headerName: "Proyectos", flex: 1 },
];

const rows = [
  {
    id: 1,
    Nombre: "Snow",
    Apellido: "Jon",
    Correo: "Jonm@Mail.com",
    Carrera: "Ing. Sistemas Computacionales",
    Proyectos: 3,
  },
  {
    id: 2,
    Nombre: "Stark",
    Apellido: "Tony",
    Correo: "tonystark@tech.com",
    Carrera: "Ing. Mecánica",
    Proyectos: 5,
  },
  {
    id: 3,
    Nombre: "Parker",
    Apellido: "Peter",
    Correo: "peterparker@web.com",
    Carrera: "Fotografía",
    Proyectos: 2,
  },
  {
    id: 4,
    Nombre: "Wayne",
    Apellido: "Bruce",
    Correo: "brucewayne@bat.com",
    Carrera: "Administración",
    Proyectos: 4,
  },
  {
    id: 5,
    Nombre: "Kent",
    Apellido: "Clark",
    Correo: "clarkkent@dailyplanet.com",
    Carrera: "Periodismo",
    Proyectos: 3,
  },
  {
    id: 6,
    Nombre: "Banner",
    Apellido: "Bruce",
    Correo: "brucebanner@science.com",
    Carrera: "Biología",
    Proyectos: 6,
  },
  {
    id: 7,
    Nombre: "Wade",
    Apellido: "Deadpool",
    Correo: "deadpool@mercwithamouth.com",
    Carrera: "Cine",
    Proyectos: 1,
  },
  {
    id: 8,
    Nombre: "Rogers",
    Apellido: "Steve",
    Correo: "captain@avengers.com",
    Carrera: "Historia",
    Proyectos: 7,
  },
  {
    id: 9,
    Nombre: "Danvers",
    Apellido: "Carol",
    Correo: "carol@marvel.com",
    Carrera: "Aeroespacial",
    Proyectos: 4,
  },
  {
    id: 10,
    Nombre: "T'Challa",
    Apellido: "Black Panther",
    Correo: "blackpanther@wakanda.com",
    Carrera: "Ciencias Políticas",
    Proyectos: 3,
  },
  {
    id: 11,
    Nombre: "Poppins",
    Apellido: "Mary",
    Correo: "marypoppins@chimney.com",
    Carrera: "Educación",
    Proyectos: 2,
  },
];

function CrudInvestigadores() {
  const navigate = useNavigate();

  // Agrega la columna de acciones dinámicamente para usar navigate
  const columnsWithNavigate = [
    ...columns,
    {
      field: "Acciones",
      type: "actions",
      headerName: "Acciones",
      width: 160,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          sx={{ color: "primary.main" }}
          onClick={() => navigate("/Administracion/RegistroInvestigador")}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => console.log("Eliminar " + id)}
          color="error"
        />,
      ],
    },
  ];

  return (
    <Box>
      <nav>
        <SideBarAdmin />
      </nav>
      <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
        <Typography variant="h3" sx={{}}>
          Investigadores
        </Typography>
        <Fab
          variant="extended"
          color="primary"
          sx={{ right: "-82vw", marginBottom: "10px" }}
          onClick={() => navigate("/Administracion/RegistroInvestigador")}
        >
          <AddIcon sx={{ mr: 1 }} />
          Agregar nuevo
        </Fab>
        <TableViewer columns={columnsWithNavigate} rows={rows} />
      </div>
    </Box>
  );
}

export default CrudInvestigadores;