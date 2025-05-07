import axios from "axios";

const proyectoUrl = axios.create({
    baseURL: "http://127.0.0.1:8000/api/projects/", // Asegúrate de que esta URL coincida con el backend
});

export const getAllProyects = async () => {
    return await axios.get("http://127.0.0.1:8000/projects/projects/"); // Asegúrate de usar la URL correcta
  };


//Verificar con backend el acceso

export const getProject = (id) => 
    axios.get(`http://127.0.0.1:8000/projects/projects/${id}/`);
export const createProject = (project) => proyectoUrl.post("/", project);
export const deleteProject = (id) => 
    axios.delete(`http://127.0.0.1:8000/projects/projects/${id}/`); // Asegúrate de incluir la barra final
export const updateProject = (id, project) => 
    axios.put(`http://127.0.0.1:8000/projects/projects/${id}/`, project);