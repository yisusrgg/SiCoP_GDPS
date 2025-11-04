import axios from "axios";

const AlumnoUrl = axios.create({
  baseURL: "http://127.0.0.1:8000/estudiante/estudiantes/",
});

export const getAllAlumnos = () => AlumnoUrl.get("/");

export const getAlumnos = (id) => AlumnoUrl.get(`/${id}/`);

export const createAlumno = (Alumno) => AlumnoUrl.post("/", Alumno);

export const deleteAlumno = (id) => AlumnoUrl.delete(`/${id}/`);

export const updateAlumno = (id, Alumno) => AlumnoUrl.put(`/${id}/`, Alumno);
