import axios from "axios";

const API_URL = "http://127.0.0.1:8000/estudiante/estudiantes/";

// Obtener todos los estudiantes
export const getEstudiantes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Obtener un estudiante por ID
export const getEstudiante = async (id) => {
  const res = await axios.get(`${API_URL}${id}/`);
  return res.data;
};

// Crear un nuevo estudiante
export const createEstudiante = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Actualizar un estudiante existente
export const updateEstudiante = async (id, data) => {
  const res = await axios.put(`${API_URL}${id}/`, data);
  return res.data;
};

// Eliminar un estudiante
export const deleteEstudiante = async (id) => {
  await axios.delete(`${API_URL}${id}/`);
  return true;
};