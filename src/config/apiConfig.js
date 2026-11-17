// URL base de la API. Desde el celular, "localhost" apunta al propio celular:
// usa la IP local de la compu (por ejemplo, http://192.168.1.20:3000) o la URL de producción.
export const API_BASE_URL = 'https://api.example.com';

// true: el login usa datos simulados (ver src/shared/services/authService.js).
// false: el login llama a la API real en API_BASE_URL.
export const USE_MOCK = true;

// Tiempo máximo de espera de cada petición, en milisegundos.
export const API_TIMEOUT_MS = 10000;
