import axios from "axios";

// Usar la ruta real del backend: /convocatoria/convocatorias/
const ConvocatoriaUrl = axios.create({
    baseURL: "http://127.0.0.1:8000/convocatoria/convocatorias/",
});

export const getAllConovocatorias = () => ConvocatoriaUrl.get("/");

export const getCall = (id) => ConvocatoriaUrl.get(`/${id}/`);

// createCall acepta FormData (multipart/form-data) cuando se envía un archivo
export const createCall = (formData) =>
    ConvocatoriaUrl.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// Alias con nombre esperado en algunos componentes
export const createConvocatoria = (formData) => createCall(formData);

export const deleteCall = (id) => ConvocatoriaUrl.delete(`/${id}/`);

export const updateCall = (id, call) => ConvocatoriaUrl.put(`/${id}/`, call);
