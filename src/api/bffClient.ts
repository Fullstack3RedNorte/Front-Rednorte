// Solución: Usamos 'import type' para separar la interfaz del módulo ejecutable de axios
import axios from 'axios';
import type { AxiosInstance } from 'axios';

const BFF_URL: string = (import.meta.env.VITE_BFF_URL as string) || 'http://localhost:8090';

const bffClient: AxiosInstance = axios.create({
  baseURL: BFF_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// Interceptor básico simplificado para evitar errores de tipado implícitos
bffClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default bffClient;