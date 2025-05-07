import axios from "axios";

const invUrl = axios.create({
    baseURL: "http://127.0.0.1:8000/researcher/researcher/",
});

export const getAllInvestigadores = () => invUrl.get("http://127.0.0.1:8000/researcher/researcher/");

export const getInvestigador = (id) => invUrl.get(`/${id}`)

export const createInvestigador = (Investigador) => invUrl.post("http://127.0.0.1:8000/researcher/researcher/", Investigador);

export const deleteProject = (id) => invUrl.delete(`http://127.0.0.1:8000/researcher/researcher/${id}`)

export const updateProject = (id,Investigador) => invUrl.put(`/${id}/`,Investigador)