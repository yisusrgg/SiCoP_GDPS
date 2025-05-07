import React, { useEffect, useState } from "react";
import { getAllProyects, deleteProject } from "../../api/proyecto.api";
import TableViewer from "../../components/TableViewer";
import { Box, Fab, Typography } from "@mui/material";
import SideBarAdmin from "../../components/SideBarAdmin";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function CrudProyectos() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir

  // Función para manejar la eliminación
  const handleDelete = async (id) => {
    console.log("Eliminar proyecto con ID:", id);
    if (window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
      try {
        await deleteProject(id); // Llama a la API para eliminar el proyecto
        alert("Proyecto eliminado exitosamente");
        setRows((prevRows) => prevRows.filter((row) => row.id !== id)); // Actualiza la tabla eliminando la fila
      } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
        alert("Hubo un error al eliminar el proyecto");
      }
    }
  };

  const handleEdit = (id) => {
    console.log("Modificar proyecto con ID:", id);
    navigate(`/EditarProyecto/${id}`); // Redirige al formulario de edición
  };

  // Definición de las columnas
  const columns = [
    { field: "id", headerName: "id", width: 80 },
    { field: "Nombre", headerName: "Nombre(s)", width: 300 },
    { field: "Empresa", headerName: "Empresa", width: 300 },
    { field: "LGAC", headerName: "LGAC", width: 300 },
    { field: "Lider", headerName: "Lider", width: 300 },
    { field: "Estatus", headerName: "Estatus", width: 300 },
    {
      field: "Acciones",
      type: "actions",
      headerName: "Acciones",
      width: 160,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Modificar"
            sx={{
              color: "primary.main",
            }}
            onClick={() => handleEdit(id)} // Llama correctamente a handleEdit
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => handleDelete(id)} // Llama a handleDelete con el ID
            color="error"
          />,
        ];
      },
    },
  ];

  // Cargar los datos de los proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProyects();
        console.log("Datos del backend:", response.data);

        const projects = response.data.map((project) => ({
          id: project.id,
          Nombre: project.projectName,
          Empresa: project.company_name,
          LGAC: project.rfc_call,
          Lider: project.leader_name,
          Estatus: project.linked ? "Vinculado" : "No vinculado",
        }));

        setRows(projects);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box>
      <nav>
        <SideBarAdmin />
      </nav>
      <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
        <Typography variant="h3">Proyectos</Typography>
        <Fab
          variant="extended"
          color="primary"
          sx={{ right: "-82vw", marginBottom: "10px" }}
        >
          <Link to={"/RegistroProyecto"} className="text-white link-underline-primary">
            <AddIcon sx={{ mr: 1 }} />
            Agregar nuevo
          </Link>
        </Fab>
        <TableViewer columns={columns} rows={rows} />
      </div>
    </Box>
  );
}

export default CrudProyectos;