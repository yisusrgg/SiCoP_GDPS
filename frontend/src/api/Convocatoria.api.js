import axios from "axios";

//verifucar link de backend
const ConvocatoriaUrl = axios.create({
    baseURL: "http://localhost:8000/call/addCall",
});

export const getAllConovocatorias = () => {
    return ConvocatoriaUrl.get("/");
};

export const getAllCall = () => ConvocatoriaUrl.get("http://127.0.0.1:8000/call/");

export const getCall = (id) =>ConvocatoriaUrl.get(`/${id}/`);

export const createCall = (call) => ConvocatoriaUrl.post("http://127.0.0.1:8000/call/", call);

export const deleteCall = (id) => ConvocatoriaUrl.delete(`http://127.0.0.1:8000/call/addCall/${id}/`);

export const updateCall = (id,call) => ConvocatoriaUrl.put(`/${id}/`,call,'/');
//Verificar con backend el acceso
