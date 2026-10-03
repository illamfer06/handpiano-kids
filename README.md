# HandPiano Kids

Aplicación educativa para aprender notas musicales con gestos de la mano mediante cámara y reconocimiento visual.

## Stack propuesto
- Frontend: React + Vite + TypeScript
- Backend: Spring Boot + Java + PostgreSQL
- Vision: MediaPipe Hands
- Audio: Web Audio API

## Estructura del proyecto

```text
mi-app/
├── backend/
│   ├── pom.xml
│   └── src/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
├── dbv-specs-ops/
├── README.md
├── CLAUDE.md
├── GEMINI.md
├── .windsurfrules
└── .github/
```

## Fases de trabajo
- Spec: definida
- Plan: definido
- Build: en progreso

## Requisitos para arrancar
- Node.js 20+
- Java 21+
- Maven
- PostgreSQL

## Arrancar frontend

```bash
cd frontend
npm install
npm run dev
```

## Arranque unificado en Windows

Después de instalar Node.js, Java 21 y Maven y configurar sus rutas en `PATH`, ejecuta desde la raíz:

```bat
start.bat
```

El script instala las dependencias del frontend si todavía no existen, abre el backend en `http://localhost:8080`, abre el frontend en `http://localhost:5173` y lanza el navegador en la dirección del frontend. El backend necesita además una base de datos PostgreSQL `handpianokids` con las credenciales definidas en `backend/src/main/resources/application.properties`.

## Arrancar backend

```bash
cd backend
mvn spring-boot:run
```

## Endpoints base
- `GET /api/health` para comprobar que el backend responde

## Guía de contribución: cómo añadir pruebas

### 1. Frontend

El frontend usa React + Vite + Vitest + Testing Library.

#### Ejecutar pruebas

```bash
cd frontend
npm install
npm test
```

#### Patrón recomendado

- Coloca los tests junto a la funcionalidad o en `src/` con nombre `*.test.jsx`.
- Para lógica pura, exporta las funciones desde el archivo que las define y prueba el resultado directamente.
- Para componentes, usa `render()` y `screen` de Testing Library.
- Si el componente ejecuta efectos con estado React, usa `act()` al disparar eventos del usuario.

Ejemplo:

```jsx
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renderiza la interfaz principal', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText('HandPiano Kids')).toBeInTheDocument();
  });
});
```

#### Reglas útiles

- No tests de mocks vacíos: valida comportamiento real.
- Si la lógica no depende del DOM, mejor prueba la función directamente.
- Si necesitas audio o cámara, usa mocks livianos y evita depender del navegador real.

### 2. Backend

El backend usa Java + Spring Boot + JUnit 5.

#### Ejecutar pruebas

```bash
cd backend
mvn test
```

#### Patrón recomendado

- Guarda las clases de test bajo `src/test/java/...`.
- Usa `@WebMvcTest` para controladores HTTP.
- Comprueba status HTTP y respuesta esperada.

Ejemplo:

```java
@WebMvcTest(HealthController.class)
class HealthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void healthReturnsBackendStatus() throws Exception {
        mockMvc.perform(get("/api/health"))
            .andExpect(status().isOk());
    }
}
```

### 3. Buenas prácticas generales

- Haz pruebas pequeñas y descriptivas.
- Nombra el test con el comportamiento que valida.
- Si cambias una regla de negocio o una lógica de notas, añade el test que la cubra.
- Antes de cerrar una tarea, ejecuta la suite relevante del frontend o backend.

## Mini checklist de PR

Antes de abrir o aceptar un pull request, revisa este checklist:

- [ ] He identificado claramente el cambio realizado.
- [ ] He añadido o actualizado tests para la funcionalidad modificada.
- [ ] Los tests relevantes del frontend o backend pasan.
- [ ] He verificado que no se rompe el comportamiento previo.
- [ ] He documentado cambios relevantes si hace falta.
- [ ] He revisado el diff para descartar cambios accidentales.

Ejemplos de verificación:

```bash
cd frontend && npm test
cd backend && mvn test
```

## Estado actual
La versión actual es un MVP de diseño con cámara, notas y pentagrama en frontend y una base para el backend en Java/Spring.

## Sobre dbv-specs-ops

`dbv-specs-ops` no es una dependencia que se ejecute con Node o Maven. Es la metodología y documentación local del proyecto: primero se definen las especificaciones, después el plan, la implementación, las validaciones, la simplificación y finalmente la entrega. Sus documentos principales están en `dbv-specs-ops/docs/`, y el estado de tareas en `dbv-specs-ops/task.md`.
