import axios from "axios";

// Define el enlace base como una variable constante
const BASE_URL = "https://localhost:7257/api/persona";


export const InsertarRegistro = async (body) => {
    return await insertar(body);
};



const insertar = async (body) => {
    const data = axios.post(`${BASE_URL}`, body).then((r) => r.data);
    return data;
};