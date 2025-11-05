import axios from "axios";

// Usar la ruta real del backend: /convocatoria/convocatorias/
const ConvocatoriaUrl = axios.create({
    baseURL: "http://127.0.0.1:8000/convocatoria/convocatorias/",
});

export const getAllConovocatorias = () => ConvocatoriaUrl.get("/");

// Correct function name and return only the data array
export const getAllConvocatorias = async () => {
    const resp = await ConvocatoriaUrl.get("/");
    return resp.data;
};

export const getCall = (id) => ConvocatoriaUrl.get(`/${id}/`);

export const getConvocatoria = async (id) => {
    const resp = await ConvocatoriaUrl.get(`/${id}/`);
    return resp.data;
};

// createCall acepta FormData (multipart/form-data) cuando se envía un archivo
export const createCall = (formData) =>
    ConvocatoriaUrl.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// Alias con nombre esperado en algunos componentes
export const createConvocatoria = (formData) => createCall(formData);

export const deleteCall = (id) => ConvocatoriaUrl.delete(`/${id}/`);

export const updateCall = (id, call) => ConvocatoriaUrl.put(`/${id}/`, call);
