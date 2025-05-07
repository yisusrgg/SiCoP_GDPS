import axios from "axios";

const EmpresaUrl = axios.create({
  baseURL: "http://127.0.0.1:8000/company/addCompany/",
});

export const getAllEmpresas = () =>
  EmpresaUrl.get("/");

export const getEmpresas = (id) => EmpresaUrl.get(`/${id}`);

export const createEmpresa = (Empresa) =>
  EmpresaUrl.post("/", Empresa);

export const deleteEmpresa = (id) => EmpresaUrl.delete(`/${id}`);

export const updateEmpresa = (id, Empresa) =>
  EmpresaUrl.put(`/${id}/`, Empresa);
