// Datos SIMULADOS de autenticación. Solo se usan con USE_MOCK = true
// (src/config/apiConfig.js), para trabajar sin conexión. Tienen el mismo formato
// que el contrato de la API: data: { token, usuario }.
import { AUTH_ERRORS } from './authErrors';

const MOCK_DELAY_MS = 600;

// Cuentas de prueba, también usadas por los botones de acceso rápido del login.
export const MOCK_ACCOUNTS = {
  ESTUDIANTE: { username: 'alumno1', password: 'Estudiante123!' },
  DOCENTE: { username: 'profesor1', password: 'Docente123!' },
};

const MOCK_SESSIONS = [
  {
    ...MOCK_ACCOUNTS.ESTUDIANTE,
    data: {
      token: 'mock-token-estudiante',
      usuario: {
        id: 2,
        username: 'alumno1',
        nombreCompleto: 'Sofía Valenzuela',
        rol: 'ESTUDIANTE',
        colegio: { id: 1, nombre: 'Colegio SmartQuest' },
        curso: { id: 1, nombre: '4to de Secundaria A' },
      },
    },
  },
  {
    ...MOCK_ACCOUNTS.DOCENTE,
    data: {
      token: 'mock-token-docente',
      usuario: {
        id: 1,
        username: 'profesor1',
        nombreCompleto: 'Prof. Carlos Mendoza',
        rol: 'DOCENTE',
        colegio: { id: 1, nombre: 'Colegio SmartQuest' },
        cursos: [
          { id: 1, nombre: '4to de Secundaria A' },
          { id: 2, nombre: '4to de Secundaria B' },
        ],
      },
    },
  },
];

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Copia profunda para que nadie modifique los datos del mock por accidente.
function copiar(valor) {
  return JSON.parse(JSON.stringify(valor));
}

/** Simula POST /auth/login. */
export async function mockLogin(username, password) {
  await esperar(MOCK_DELAY_MS);
  const sesion = MOCK_SESSIONS.find((s) => s.username === username && s.password === password);
  if (!sesion) {
    throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
  }
  return copiar(sesion.data);
}

/** Simula GET /auth/me para un token del mock. */
export async function mockGetMe(token) {
  await esperar(MOCK_DELAY_MS);
  const sesion = MOCK_SESSIONS.find((s) => s.data.token === token);
  if (!sesion) {
    throw new Error(AUTH_ERRORS.SESSION_EXPIRED);
  }
  return copiar(sesion.data.usuario);
}
