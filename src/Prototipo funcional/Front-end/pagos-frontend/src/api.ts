// src/api.ts - VERSIÓN SIMPLIFICADA
import axios from "axios";
import { getToken, removeToken } from "./utils/auth";
import { mockDB } from "./utils/mockDB";

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔥 SIMPLE MOCK WRAPPER
const createApiWithMockFallback = () => {
  const shouldMock = !process.env.REACT_APP_API_BASE_URL;
  
  if (!shouldMock) {
    return api; // Usar API normal si hay backend
  }
  
  // Retornar objeto con misma interface pero que usa mock
  return {
    get: async (url: string, config?: any) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (url.includes('/pagos/listar')) {
        const inscripciones = await mockDB.inscripciones.getAll();
        return { data: inscripciones };
      }
      
      throw new Error(`Mock no implementado para GET ${url}`);
    },
    
    post: async (url: string, data?: any, config?: any) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (url.includes('/auth/register')) {
        const { nombre, email, password } = data;
        const existingUser = await mockDB.users.findByEmail(email);
        if (existingUser) {
          throw { response: { data: { error: "El usuario ya existe" } } };
        }
        
        const user = await mockDB.users.create({ nombre, email, password });
        return { data: { message: "Usuario registrado exitosamente", user } };
      }
      
      if (url.includes('/auth/login')) {
        const { email, password } = data;
        const user = await mockDB.users.findByEmail(email);
        if (!user || user.password !== password) {
          throw { response: { data: { error: "Credenciales inválidas" } } };
        }
        
        const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
        return { data: { token, user: { id: user.id, nombre: user.nombre, email: user.email } } };
      }
      
      if (url.includes('/pagos/inscribir')) {
        const inscripcion = await mockDB.inscripciones.create(data);
        return { data: inscripcion };
      }
      
      throw new Error(`Mock no implementado para POST ${url}`);
    }
  };
};

export default createApiWithMockFallback();