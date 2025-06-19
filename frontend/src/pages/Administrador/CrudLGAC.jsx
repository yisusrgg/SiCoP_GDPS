import React, { useState } from "react";
import TableViewer from "../../components/TableViewer";
import { Box, Fab, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button as MuiButton } from "@mui/material";
import SideBarAdmin from "../../components/SideBarAdmin";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Link, useNavigate } from "react-router-dom";

const initialRows = [
  {
    id: 1,
    Nombre: "Los niños del sotano",
    Carrera: "Ing. Sistemas Computacionales",
    Instituto: "Instituto Tecnologico Superior del Sur de Guanajuato",
  },
  {
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
  const navigate = useNavigate();
  const [rows, setRows] = useState(initialRows);
  const [openDelete, setOpenDelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setRowToDelete(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setRowToDelete(null);
  };

  const handleConfirmDelete = () => {
    setRows(rows.filter((row) => row.id !== rowToDelete));
    setOpenDelete(false);
    setRowToDelete(null);
  };

  const columns = [
    { field: "id", headerName: "id", flex: 1 },
    { field: "Nombre", headerName: "Nombre(s)", flex: 1 },
    { field: "Carrera", headerName: "Carrera", flex: 1 },
    { field: "Instituto", headerName: "Instituto", flex: 1 },
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
          onClick={() => navigate("/Administracion/RegistroLGAC")}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => handleDeleteClick(id)}
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
          Lineas de Investigación
        </Typography>
        <Fab
          variant="extended"
          color="primary"
          sx={{ right: "-82vw", marginBottom: "10px" }}
        >
          <Link to={"/Administracion/RegistroLGAC"} className="text-white link-underline-primary">
            <AddIcon sx={{ mr: 1 }} />
            Agregar nueva
          </Link>
        </Fab>
        <TableViewer columns={columns} rows={rows} />
      </div>
      {/* Modal de confirmación de eliminación */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseDelete} color="secondary">
            Cancelar
          </MuiButton>
          <MuiButton onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CrudLGAC;