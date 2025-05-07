import axios from "axios";

//verifucar link de backend
const InvestigacionUrl = axios.create({
    baseURL: "http://localhost:8000/",
});

export const getAllInvestigacion = () => {
    return InvestigacionUrl.get("/");
};

//Verificar con backend el acceso
