// Endereço do backend. Em produção defina VITE_API_URL (veja .env.example).
export const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');
