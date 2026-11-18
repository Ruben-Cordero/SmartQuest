// API central (backend Virtu). Documentación interactiva: https://backend-virtu.onrender.com/api/docs/
// Para probar con un backend local desde el celular, "localhost" apunta al propio celular:
// usa la IP local de la compu (por ejemplo, http://192.168.1.20:3000/api).
export const API_BASE_URL = 'https://backend-virtu.onrender.com/api';

// Slug de la materia de esta app en la API: se usa en rutas como
// GET /contenidos/{APP_SLUG} y GET /glosarios/{APP_SLUG}.
export const APP_SLUG = 'ingles';

// true: el login usa datos simulados (ver src/shared/services/authService.js).
// false: el login llama a la API real en API_BASE_URL.
export const USE_MOCK = false;

// Tiempo máximo de espera de cada petición, en milisegundos. Es alto porque el
// servidor gratuito de Render "se duerme" y la primera petición puede tardar ~50 s.
export const API_TIMEOUT_MS = 60000;
