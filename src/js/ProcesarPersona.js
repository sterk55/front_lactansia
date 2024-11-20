import axios from "axios";

// Define el enlace base como una variable constante
const BASE_URL = "https://localhost:7257/api/persona";

export const InsertarPer = async (body) => {
    return await insertar(body);
};

export const listaPerTodos = async () => {
    return await listaPer();
};

export const eliminarPerId = async (id) => {
    return await eliminar(id);
};

export const buscarPerId = async (id) => {
    return await buscarDPersonaPorID(id);
};

export const actualizarPer = async (id, body) => {
    return await actualizar(id, body);
};

const insertar = async (body) => {
    const data = axios.post(`${BASE_URL}`, body).then((r) => r.data);
    return data;
};

const listaPer = async () => {
    const data = axios.get(`${BASE_URL}`).then((r) => r.data);
    console.log(data);
    return data;
};

const eliminar = async (id) => {
    const data = axios.delete(`${BASE_URL}/${id}`).then((r) => r.data);
    return data;
};

const buscarDPersonaPorID = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data; // Si encuentra la persona, devuelve los datos.
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null; // Si recibe un 404, devuelve null.
        }
        throw error; // Si ocurre otro tipo de error, lanza la excepción.
    }
};

const actualizar = async (id, body) => {
    const data = axios.put(`${BASE_URL}/${id}`, body).then((r) => r.data);
    return data;
};
