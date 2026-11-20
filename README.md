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
| Bottom Tabs | `@react-navigation/bottom-tabs ^7.22.0` | Barra de navegación inferior de la app autenticada. |
| Íconos | `@expo/vector-icons ^15.0.2` | Íconos de la barra inferior y de las pantallas (Ionicons). |
| Fuentes | `expo-font ~58.0.12`, `@expo-google-fonts/space-grotesk` y `@expo-google-fonts/inter` | Space Grotesk (títulos) e Inter (texto). |
| Splash | `expo-splash-screen ~58.0.14` | Mantiene el splash visible hasta que cargan las fuentes. |
| Pronunciación | `expo-speech ~58.0.4` y `expo-audio ~58.0.12` | `expo-speech` lee en voz alta las palabras del glosario (texto a voz del teléfono); `expo-audio` configura el audio para que suene aunque el iPhone esté en modo silencio. |
| Gráficos | `react-native-svg 15.16.0` | Fondo de estrellas y nebulosas, planetas y caminos del mapa. |
| Animaciones | `react-native-reanimated 4.7.1` y `react-native-worklets` | Pulso del planeta actual, nave y esqueletos de carga, en el hilo de UI. Expo configura el plugin de babel solo. |
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

### API y usuarios de prueba

La app usa la API central de Virtu: `https://backend-virtu.onrender.com/api` (documentación interactiva en [`/api/docs`](https://backend-virtu.onrender.com/api/docs/)). La configuración está en `src/config/apiConfig.js`:

- `API_BASE_URL`: URL de la API.
- `APP_SLUG = 'ingles'`: slug de la materia, usado en `GET /contenidos/{slug}` y `GET /glosarios/{materia}`.
- `USE_MOCK = false`: el login llama a la API real. Con `true` usa datos simulados sin conexión y muestra los botones **Enter as student** y **Enter as teacher**.

Cuentas de prueba de la API:

| Rol | Usuario | Contraseña |
|---|---|---|
| Estudiante | `alumno1` | `Estudiante123!` |
| Docente | `profesor1` | `Docente123!` |

## 5. Solución de problemas comunes

| Problema | Solución |
|---|---|
| `Local Network Access Needed` en iPhone | Da permiso a Expo Go en **Ajustes > Privacidad y seguridad > Red local**. |
| El celular no encuentra el servidor | Conecta el celular y la computadora a la misma red Wi-Fi. Si no funciona (por ejemplo, con el Wi-Fi de la universidad), usa `npx expo start --tunnel`. |
| `You need to be signed in to Expo Go and Expo CLI` | Ejecuta `npx expo login` e inicia sesión en Expo Go con la misma cuenta. |
| `localhost` no funciona desde el celular | En `src/config/apiConfig.js` usa la IP local de la compu (por ejemplo, `http://192.168.1.20:3000`) o la URL de producción. En el celular, `localhost` apunta al propio celular, no a tu computadora. |
| El primer login tarda mucho (hasta ~1 minuto) | Es normal: el servidor gratuito de Render se "duerme" si nadie lo usa y tarda en despertar. Espera con el indicador de carga; las siguientes peticiones son rápidas. |
| Puerto 8081 ocupado | Cierra el otro servidor de Expo, o responde que sí cuando la terminal pregunte si quieres usar otro puerto. |
| Errores raros después de un `git pull` | Ejecuta `npm install` de nuevo. Si persisten, limpia la caché con `npx expo start -c`. |
| Expo Go dice que la versión del SDK no es compatible | Actualiza Expo Go desde la tienda de tu celular. |
| Mensaje `Using src/app as the root directory for Expo Router` | Es solo informativo: ignóralo. Expo lo muestra porque existe la carpeta `src/app`, pero el proyecto no usa expo-router. |
| Windows: PowerShell no deja ejecutar `npx` o `npm` (scripts deshabilitados) | Usa la terminal **Símbolo del sistema (cmd)**, o ejecuta una vez `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` en PowerShell. |

## 6. Estructura del proyecto

El punto de entrada es `index.js`, que carga `App.js`, y este renderiza `src/app/App.jsx`. El código del proyecto va dentro de `src/`:

```text
src/
├── app/                         # Arranque de la app
│   ├── App.jsx                  # Carga las fuentes con el splash visible y luego monta AppContent
│   ├── AppContent.jsx           # Proveedores globales: zona segura, sesión (AuthProvider) y navegación
│   └── fonts.js                 # Archivos de fuente por familia (para useFonts)
├── config/                      # Configuración compartida
│   ├── apiConfig.js             # URL de la API, APP_SLUG, USE_MOCK y timeout
│   ├── roles.js                 # ROLES y ROL_LABELS
│   └── theme.js                 # Tema espacial: paleta, fuentes, tipografía, espaciados y medidas
├── navigation/                  # Navegación global
│   ├── RootNavigator.jsx        # Con sesión → AppNavigator; sin sesión → AuthNavigator
│   ├── AppNavigator.jsx         # Valida el rol y monta MainTabNavigator
│   ├── AuthNavigator.jsx        # Pantalla de login
│   ├── MainTabNavigator.jsx     # Barra inferior. Estudiante: Galaxy · Glossary · Profile. Docente: Dashboard · Profile
│   ├── tabRoutes.js             # Nombres de las pestañas (MAIN_TABS)
│   ├── screenOptions.js         # Estilo común de las cabeceras
│   └── navigationTheme.js       # Colores base de React Navigation
├── features/                    # Una carpeta por funcionalidad; cada una expone lo público en su index.js
│   ├── auth/                    # Sesión: AuthContext (useAuth), LoginScreen, authService (+ mock y mensajes)
│   ├── profile/                 # ProfileScreen
│   ├── teacher-dashboard/       # TeacherDashboardScreen (pestaña Dashboard)
│   ├── lessons/                 # Módulo de Inglés: mapa de galaxias, lección, glosario (ver más abajo)
│   ├── quiz/                    # Cuestionarios (reservado)
│   ├── vocabulary/              # Vocabulario (reservado)
│   └── progress/                # Progreso del estudiante (reservado)
└── shared/                      # Código común a varias funcionalidades
    ├── components/
    │   ├── ErrorState.jsx       # Mensaje de error + botón "Retry"
    │   ├── LoadingView.jsx      # Pantalla de carga completa
    │   └── space/               # Tema espacial: SpaceBackground, Planet, Astronaut, SpaceCard, LightCard,
    │                            # SpaceButton, ScreenTitle, MessageBubble, ProgressBar y Avatar (index.js)
    ├── hooks/
    │   └── useAsyncResource.js  # Carga de datos con estados loading / success / error y retry()
    ├── services/
    │   └── apiClient.js         # Cliente axios central (token y mensajes de error)
    └── styles/
        └── layout.js            # screenContent: contenedor estándar de pantalla
```

### Reglas de arquitectura

- **Por funcionalidad:** cada pantalla vive en `src/features/<funcionalidad>/` junto a sus componentes y servicios. Desde fuera se importa solo lo que expone su `index.js` (por ejemplo, `import { useAuth } from '../features/auth'`).
- **Capas:** las pantallas no llaman a `axios` ni a `fetch`; usan los servicios de su funcionalidad (`inglesApi.js`, `authService.js`), que usan `apiClient.js`. La lógica pura (cálculos, adaptar datos de la API) va en `services/` sin React, para poder probarla.
- **Sin duplicar:** para cargar datos usa `useAsyncResource`; para errores, `ErrorState`; para el contenedor de pantalla, `screenContent`; para la UI, los componentes de `shared/components/space`.
- **`shared/`** solo contiene lo que usan dos o más funcionalidades.

### Idioma de la app

- **Todo el texto que ve el usuario va en inglés** (botones, títulos, pestañas, mensajes de error y etiquetas de accesibilidad): es una app para aprender inglés.
- Los comentarios del código y la documentación del equipo siguen en español.

### Estilo visual (tema espacial)

La app es un universo: cada **unidad** es una **galaxia** y cada **lección** un **planeta**.

- Todo sale de `src/config/theme.js`. No escribas colores, fuentes ni tamaños a mano.
- Fuentes: `fonts.display` / `fonts.heading` (Space Grotesk) para títulos, botones y pestañas; `fonts.body`, `fonts.bodyMedium` y `fonts.bodyBold` (Inter) para el texto de lectura (mínimo 16). Con fuentes personalizadas no uses `fontWeight`: usa la familia correspondiente.
- Colores: fondo oscuro (`colors.background`), tarjetas (`colors.surface`), dorado (`colors.primary`) para estrellas y la acción principal, verde energía (`colors.energy`) para aciertos y progreso. `colors.danger` es **solo** para errores, respuestas incorrectas o salir.
- El contenido de lectura de las lecciones va en una tarjeta **clara**: `LightCard` con texto `colors.onLessonCard`.
- Usa los componentes de `src/shared/components/space` (`SpaceBackground`, `Planet`, `Astronaut`, `SpaceCard`, `LightCard`, `SpaceButton`, `ScreenTitle`, `MessageBubble`, `ProgressBar`, `Avatar`).
- Animaciones con `react-native-reanimated` y respetando "reducir movimiento" (`useReducedMotion()` o `.reduceMotion(ReduceMotion.System)`).
- Botones y planetas tocables de al menos 48 px y con `accessibilityLabel`.
- XP, rachas, ranking y nivel del usuario **no se muestran**: la API todavía no los tiene (no se inventan).

### Estructura del módulo de Inglés

El módulo vive en `src/features/lessons/` (las guías antiguas dicen `src/modules/ingles/`: es la misma cosa). Todos los archivos ya existen y están conectados; al integrar, cada uno solo edita el suyo, sin crear archivos nuevos ni cambiar importaciones.

```text
src/features/lessons/
├── components/
│   ├── galaxy/                  # Rubén · piezas del mapa: GalaxyHeader, GalaxySection, GalaxyCard, PlanetPath, SpaceShip,
│   │                            #   BlackHole, MapSkeleton y useCenterOnCurrentPlanet
│   ├── LessonExample.jsx        # Liam (T12) · ejemplo de una lección en una LightCard
│   └── PronunciationButton.jsx  # Liam (T20) · pronunciación por voz (expo-speech)
├── navigation/
│   ├── EnglishNavigator.jsx     # Rubén · stack mapa de galaxias → detalle del planeta
│   └── routes.js                # Rubén · nombres de rutas (ENGLISH_ROUTES)
├── screens/
│   ├── GalaxyMapScreen.jsx      # Rubén (T06, T07, T08, T16) · mapa de galaxias y planetas
│   ├── LessonDetailScreen.jsx   # Estrella (T09–T11) · detalle de lección (recibe route.params.lessonId)
│   └── GlossaryScreen.jsx       # Liam (T14, T15, T20) · glosario (pestaña Glossary)
├── services/
│   ├── inglesApi.js             # Marvin (T03) · ÚNICO servicio de la API del módulo
│   ├── lessons.js               # Rubén · normalizeUnits(): adapta la respuesta de /contenidos
│   └── galaxy.js                # Rubén · buildGalaxies() y geometría del camino del mapa
└── index.js                     # Rubén · exporta EnglishNavigator, ENGLISH_ROUTES y GlossaryScreen
```

La tab bar (`src/navigation/MainTabNavigator.jsx`, de Rubén) monta `EnglishNavigator` en la pestaña **Galaxy** y `GlossaryScreen` en la pestaña **Glossary**.

Funciones de `inglesApi.js` (todas usan el cliente central con token, devuelven `data` y lanzan un `Error` con el `message` de la API):

| Función | Endpoint |
|---|---|
| `getContenidoIngles()` | `GET /contenidos/ingles` |
| `getLeccion(id)` | `GET /lecciones/:id` |
| `marcarEstudiado(id)` | `POST /lecciones/:id/marcar-estudiado` |
| `buscarGlosario(q)` | `GET /glosarios/ingles` (con `?q=` solo si hay texto) |

> **Regla:** cada uno edita solo sus archivos. Si necesitas una llamada nueva a la API, pídesela a Marvin para que la agregue en `inglesApi.js`.

### Sesión y roles

- `useAuth()` expone `usuario`, `token`, `rol`, `estaAutenticado`, `cargando`, `login(username, password)` y `logout()`.
- El token se guarda cifrado con `expo-secure-store`. La contraseña nunca se guarda.
- Si el usuario tiene un rol que no es `ESTUDIANTE` ni `DOCENTE`, se cierra la sesión y el login muestra "Unrecognized role".

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
