import axios from 'axios';
import type { AxiosInstance } from 'axios';

const BFF_URL = '/api'; // Apunta al proxy de Vite

const bffClient: AxiosInstance = axios.create({
  baseURL: BFF_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default bffClient;