import api from './axiosInstance';

const BASE = '/convocatoria/convocatorias';

export const getAllConovocatorias = () => api.get(`${BASE}/`);

export const getAllConvocatorias = async () => {
    const resp = await api.get(`${BASE}/`);
    return resp.data;
};

export const getCall = (id) => api.get(`${BASE}/${id}/`);

export const getConvocatoria = async (id) => {
    const resp = await api.get(`${BASE}/${id}/`);
    return resp.data;
};

export const createCall = (formData) =>
    api.post(`${BASE}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const createConvocatoria = (formData) => createCall(formData);

export const deleteCall = (id) => api.delete(`${BASE}/${id}/`);

export const updateCall = (id, call) => api.put(`${BASE}/${id}/`, call);
