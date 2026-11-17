# SmartQuest

App móvil para aprender inglés de nivel intermedio.

Guía principal del proyecto: qué es SmartQuest, cómo levantarlo y cómo trabajamos. Si nunca usaste React Native, sigue la [sección 4](#4-cómo-levantar-el-proyecto-paso-a-paso) paso a paso.

## Índice

1. [Sobre SmartQuest](#1-sobre-smartquest)
2. [Stack tecnológico y advertencias](#2-stack-tecnológico-y-advertencias)
3. [Requisitos previos](#3-requisitos-previos)
4. [Cómo levantar el proyecto (paso a paso)](#4-cómo-levantar-el-proyecto-paso-a-paso)
5. [Solución de problemas comunes](#5-solución-de-problemas-comunes)
6. [Estructura del proyecto](#6-estructura-del-proyecto)
7. [Flujo de trabajo con Git](#7-flujo-de-trabajo-con-git)
8. [Scripts disponibles](#8-scripts-disponibles)
9. [Equipo](#9-equipo)

## 1. Sobre SmartQuest

SmartQuest es una app móvil para que estudiantes de secundaria practiquen inglés de nivel intermedio.

Los estudiantes avanzan por unidades y lecciones, resuelven cuestionarios, consultan un glosario de vocabulario (palabra, definición, pronunciación, tiempo verbal, audio y ejemplo) y siguen su progreso.

Tiene dos roles: **estudiante** y **docente**. El docente cuenta con un panel para ver el avance de sus estudiantes.

## 2. Stack tecnológico y advertencias

| Tecnología | Versión en el proyecto | Por qué |
|---|---|---|
| React Native con Expo | Expo SDK 58 (`expo ~58.0.23`), React Native 0.88.1 | Permite probar en el celular con Expo Go, sin instalar Android Studio ni Xcode. |
| JavaScript | — | Lo exige el ERS; por eso no se usa TypeScript. |
| npm | — | Un solo gestor de paquetes evita diferencias de versiones. |
| React Navigation | `@react-navigation/native ^7.5.1`, `@react-navigation/native-stack ^7.21.0` | Es la navegación elegida para el proyecto, en lugar de expo-router. |
| axios | `^1.21.0` | Centraliza las llamadas a la API. |
| AsyncStorage | `@react-native-async-storage/async-storage 2.2.0` | Guarda en el celular datos locales que no son sensibles. |
| expo-secure-store | `~58.0.2` | Guarda de forma cifrada datos sensibles, como el token de sesión. |
| ESLint + Prettier | `eslint ^9.39.5`, `prettier ^3.9.10` | Detectan errores y mantienen el mismo formato de código. |

> [!WARNING]
> - **No instales expo-router.** La navegación se hace con React Navigation.
> - **No uses TypeScript.** Todo el código va en `.js` o `.jsx`.
> - **No uses yarn ni pnpm.** Solo npm.
> - **No instales librerías con `npm install <paquete>`.** Usa `npx expo install <paquete>` para mantener versiones compatibles con el SDK. (`npm install` sin nombre de paquete sí es correcto: instala lo que el proyecto ya tiene definido).
> - **Consulta con el equipo antes de agregar una dependencia nueva.**

## 3. Requisitos previos

| Herramienta | Detalle | Cómo verificar |
|---|---|---|
| [Node.js](https://nodejs.org/) LTS | El proyecto admite `^22.13.0`, `^24.3.0` o `26` en adelante. Incluye npm. | `node -v` |
| [Git](https://git-scm.com/) | Para clonar y subir cambios. | `git --version` |
| [VS Code](https://code.visualstudio.com/) | Con las extensiones recomendadas **ESLint** (`dbaeumer.vscode-eslint`) y **Prettier** (`esbenp.prettier-vscode`). | `code --version` |
| Expo Go en el celular | [Android 12 o superior](https://play.google.com/store/apps/details?id=host.exp.exponent) o [iPhone](https://apps.apple.com/app/expo-go/id982107779). | Abre la app en el celular. |
| Cuenta en [expo.dev](https://expo.dev/signup) | Es gratuita y se usa en la computadora y en el celular. | `npx expo whoami` (dentro del proyecto) |

## 4. Cómo levantar el proyecto (paso a paso)

Los comandos son iguales en Windows, Mac y Linux.

**1. Clona el repositorio y entra a la carpeta:**

```bash
git clone https://github.com/Ruben-Cordero/SmartQuest.git
```

```bash
cd SmartQuest
```

**2. Cámbiate a la rama de integración:**

```bash
git checkout develop
```

**3. Instala las dependencias:**

```bash
npm install
```

**4. Inicia sesión en Expo en la computadora:**

```bash
npx expo login
```

Inicia sesión también en la app Expo Go del celular, **con la misma cuenta**. Si no lo haces, aparece el error `You need to be signed in to Expo Go and Expo CLI`.

**5. Inicia el servidor de desarrollo:**

```bash
npx expo start
```

Deja esa terminal abierta mientras trabajas. Aparecerá un código QR.

**6. Escanea el código QR:**

- **Android:** desde la app Expo Go.
- **iPhone:** con la cámara del celular.

**7. Comprueba el resultado.** Si todo salió bien, verás la pantalla de inicio de sesión de SmartQuest en el celular.

**8. Recarga la app cuando la necesites.** Tienes dos formas:

- Sacude el celular y elige **Reload**.
- Presiona la tecla `r` en la terminal donde corre el servidor.

### Usuarios de prueba (mock)

Mientras `USE_MOCK = true` en `src/config/apiConfig.js`, el login no llama a la API y acepta solo estas cuentas:

| Rol | Usuario | Contraseña | Nombre |
|---|---|---|---|
| Estudiante | `alumno1` | `Estudiante123!` | Sofía Valenzuela (4to de Secundaria A) |
| Docente | `profesor1` | `Docente123!` | Prof. Carlos Mendoza (4to A y 4to B) |

En modo mock, el login también muestra los botones **Entrar como estudiante** y **Entrar como docente**. Para usar la API real, cambia `USE_MOCK` a `false` y pon la URL en `API_BASE_URL`.

## 5. Solución de problemas comunes

| Problema | Solución |
|---|---|
| `Local Network Access Needed` en iPhone | Da permiso a Expo Go en **Ajustes > Privacidad y seguridad > Red local**. |
| El celular no encuentra el servidor | Conecta el celular y la computadora a la misma red Wi-Fi. Si no funciona (por ejemplo, con el Wi-Fi de la universidad), usa `npx expo start --tunnel`. |
| `You need to be signed in to Expo Go and Expo CLI` | Ejecuta `npx expo login` e inicia sesión en Expo Go con la misma cuenta. |
| `localhost` no funciona desde el celular | En `src/config/apiConfig.js` usa la IP local de la compu (por ejemplo, `http://192.168.1.20:3000`) o la URL de producción. En el celular, `localhost` apunta al propio celular, no a tu computadora. |
| Puerto 8081 ocupado | Cierra el otro servidor de Expo, o responde que sí cuando la terminal pregunte si quieres usar otro puerto. |
| Errores raros después de un `git pull` | Ejecuta `npm install` de nuevo. Si persisten, limpia la caché con `npx expo start -c`. |
| Expo Go dice que la versión del SDK no es compatible | Actualiza Expo Go desde la tienda de tu celular. |
| Mensaje `Using src/app as the root directory for Expo Router` | Es solo informativo: ignóralo. Expo lo muestra porque existe la carpeta `src/app`, pero el proyecto no usa expo-router. |
| Windows: PowerShell no deja ejecutar `npx` o `npm` (scripts deshabilitados) | Usa la terminal **Símbolo del sistema (cmd)**, o ejecuta una vez `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` en PowerShell. |

## 6. Estructura del proyecto

El punto de entrada es `index.js`, que carga `App.js`, y este renderiza `src/app/App.jsx`. El código del proyecto va dentro de `src/`:

```text
src/
├── app/                         # Componente raíz y pantallas generales
│   ├── App.jsx                  # AuthProvider + elige AuthNavigator o AppNavigator según la sesión
│   └── screens/
│       ├── LoginScreen.jsx      # Inicio de sesión (con acceso rápido en modo mock)
│       ├── StudentHomeScreen.jsx # Inicio del estudiante
│       ├── TeacherHomeScreen.jsx # Inicio del docente
│       └── ProfileScreen.jsx    # Perfil del usuario y botón "Cerrar sesión"
├── config/                      # Configuración compartida
│   ├── apiConfig.js             # URL base de la API, USE_MOCK y timeout
│   ├── roles.js                 # ROLES y ROL_LABELS
│   └── theme.js                 # Colores, tipografía, espaciados y medidas
├── navigation/                  # Navegadores de la app
│   ├── AppNavigator.jsx         # Con sesión: elige StudentNavigator o TeacherNavigator según el rol
│   ├── AuthNavigator.jsx        # Sin sesión: pantalla de login
│   ├── StudentNavigator.jsx     # Stack exclusivo del estudiante
│   ├── TeacherNavigator.jsx     # Stack exclusivo del docente
│   └── screenOptions.js         # Estilo común del header
├── features/                    # Funcionalidades de la app (cada una con screens/, components/ y services/)
│   ├── lessons/                 # Unidades y lecciones de inglés
│   ├── quiz/                    # Cuestionarios
│   ├── vocabulary/              # Glosario: palabra, definición, pronunciación, tiempo verbal, audio y ejemplo
│   ├── progress/                # Progreso del estudiante
│   └── teacher-dashboard/       # Panel del docente
└── shared/                      # Código común a varias funcionalidades
    ├── components/              # Componentes UI reutilizables
    │   ├── Button.jsx           # Botón con estados normal, deshabilitado y cargando
    │   ├── LoadingView.jsx      # Pantalla de carga
    │   └── ProfileHeaderButton.jsx # Botón "Perfil" del header
    ├── context/
    │   └── AuthContext.jsx      # AuthProvider y useAuth(): usuario, token, rol, login, logout...
    └── services/
        ├── apiClient.js         # Cliente axios central
        └── authService.js       # login, getMe y logout (mock o API real)
```

### Sesión y roles

- `useAuth()` expone `usuario`, `token`, `rol`, `estaAutenticado`, `cargando`, `login(username, password)` y `logout()`.
- El token se guarda cifrado con `expo-secure-store`. La contraseña nunca se guarda.
- Si el usuario tiene un rol que no es `ESTUDIANTE` ni `DOCENTE`, se cierra la sesión y el login muestra "Rol no reconocido".

Cada funcionalidad tiene la misma organización:

```text
src/features/lessons/
├── components/   # Componentes propios de la funcionalidad
├── screens/      # Pantallas
└── services/     # Llamadas a la API
```

### Convenciones

- Usa siempre los colores y tamaños de `src/config/theme.js` y los componentes compartidos de `src/shared/components/` (por ejemplo, `Button`). No escribas colores a mano ni crees botones propios.
- La URL de la API se toma solo de `src/config/apiConfig.js`.
- Nombres:
  - Carpetas en minúscula, sin tildes y con guiones (`teacher-dashboard`).
  - Componentes en PascalCase con extensión `.jsx` (`QuizCard.jsx`).
  - Funciones y servicios en camelCase con extensión `.js` (`authService.js`).

### Requisitos del ERS

- Texto de cuerpo de al menos 16 sp.
- Contraste mínimo de 4.5:1.
- Pantallas desde 360 dp de ancho, sin scroll horizontal.
- Indicador de carga si algo tarda más de 1 segundo.
- Mensajes de error comprensibles.
- Funcionamiento en Android 12 o superior.

## 7. Flujo de trabajo con Git

### Ramas

| Rama | Para qué sirve |
|---|---|
| `main` | Versión estable, la que se presenta. |
| `develop` | Integración del trabajo de todo el equipo. |
| `feature/<código-de-tarjeta>` | Trabajo de una tarjeta, por ejemplo `feature/SQ-01`. |

### Crear tu rama

Crea siempre tu rama desde `develop` actualizado:

```bash
git checkout develop
```

```bash
git pull
```

```bash
git checkout -b feature/SQ-01
```

### Mensajes de commit

Se usa Conventional Commits en español, con el código de la tarjeta entre paréntesis: `tipo(CÓDIGO): descripción`.

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Funcionalidad nueva |
| `fix` | Corrección de un error |
| `chore` | Configuración y mantenimiento |
| `docs` | Documentación |
| `style` | Formato, sin cambiar el comportamiento |
| `refactor` | Reorganización del código, sin cambiar el comportamiento |

Ejemplos:

```text
feat(SQ-01): pantalla de lista de unidades
fix(SQ-08): corregir el cálculo del puntaje del cuestionario
docs(SQ-03): agregar guía de instalación al README
```

### Antes de subir tus cambios

Estos dos comandos deben terminar sin errores:

```bash
npm run format
```

```bash
npm run lint
```

Después, prueba la app en tu celular.

### Pull Requests

- Todo PR va **siempre hacia `develop`**. Nunca se sube código directo a `main` ni a `develop`.
- El título lleva el código de la tarjeta, por ejemplo `feat(SQ-01): pantalla de lista de unidades`.
- La descripción explica qué se hizo y cómo probarlo.
- Lo revisa y aprueba **otro integrante** del equipo antes de integrarlo.

Plantilla de descripción:

```markdown
## Tarjeta
SQ-01

## Qué se hizo
- 

## Cómo probarlo
1. 

## Checklist
- [ ] `npm run lint` pasa sin errores
- [ ] `npm run format` aplicado
- [ ] Probado en el celular
```

### Mantener tu rama actualizada

Trae los cambios de `develop` con frecuencia para evitar conflictos:

```bash
git pull origin develop
```

Si aparece un conflicto, pide ayuda al equipo y no borres código ajeno.

## 8. Scripts disponibles

Se ejecutan con `npm run <script>`, por ejemplo `npm run lint`. `start` también funciona como `npm start`.

| Script | Comando | Para qué sirve |
|---|---|---|
| `start` | `expo start` | Inicia el servidor de desarrollo y muestra el código QR. |
| `android` | `expo start --android` | Inicia el servidor y abre la app en un emulador o dispositivo Android conectado a la computadora. Con Expo Go no lo necesitas. |
| `ios` | `expo start --ios` | Inicia el servidor y abre la app en el simulador de iOS (solo en Mac con Xcode). Con Expo Go no lo necesitas. |
| `web` | `expo start --web` | Abre la versión web. SmartQuest es una app móvil y este modo no está configurado. |
| `lint` | `eslint .` | Revisa el código y el formato, sin modificar archivos. |
| `format` | `prettier --write .` | Da formato al código. Modifica los archivos. Los `README.md` están excluidos. |

## 9. Equipo

| Integrante | Rol |
|---|---|
|  |  |
|  |  |
|  |  |
