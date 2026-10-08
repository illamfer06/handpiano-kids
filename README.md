# HandPiano Kids

Prototipo educativo web para practicar las notas DO–SI mediante gestos frente a la cámara. El frontend muestra la nota en un pentagrama y teclado, sintetiza audio y ofrece una evaluación breve.

## Funcionalidad disponible

- Reconocimiento de posturas de la mano con MediaPipe en el navegador.
- Selección de notas, sostenidos/bemoles y control de volumen mediante gestos.
- Audio sintetizado con Web Audio API.
- Pentagrama, teclado musical y evaluación de tres rondas.
- Backend independiente con `GET /api/health`.

El backend no implementa perfiles ni persistencia de progreso; la configuración PostgreSQL/JPA es infraestructura preparada. El frontend no consume actualmente el backend. La cámara requiere permiso y no existe todavía una modalidad de práctica sin cámara.

## Stack

- Frontend: React 18, Vite 5 y JavaScript.
- Visión: `@mediapipe/tasks-vision`.
- Audio: Web Audio API.
- Backend: Spring Boot 3.3.4, Java 21, Spring Web y Spring Data JPA.
- Base de datos configurada para el backend: PostgreSQL.
- Pruebas frontend: Vitest y React Testing Library; backend: Maven/Spring Boot Test.

## Inicio rápido

### Frontend

Requiere Node.js y npm:

```powershell
cd frontend
npm install
npm run dev
```

Abre <http://localhost:5173>. Para reconocimiento de manos, usa un navegador con cámara y concede permiso. MediaPipe descarga WASM y el modelo desde las URLs externas configuradas en el frontend.

### Backend (opcional para la interfaz actual)

Requiere Java 21, Maven y una instancia PostgreSQL que coincida con la configuración local:

```powershell
cd backend
mvn spring-boot:run
```

El endpoint de estado está en <http://localhost:8080/api/health>. El script `start.bat` intenta iniciar tanto el frontend como el backend; el frontend puede usarse por separado.

## Pruebas

```powershell
cd frontend
npm test
npm run build
```

```powershell
cd backend
mvn test
```

## Desarrollo guiado por especificaciones

El proyecto adapta el ciclo completo de `dbv-specs-ops` a VS Code/Copilot: **Spec → Plan → Build → Test → Simplify → Ship**, además de Maintain manual. En Copilot Chat, los prompts de fase se invocan como `/spec`, `/plan`, `/build`, `/test`, `/code-simplify`, `/ship` y `/maintain`.

- [Especificaciones](dbv-specs-ops/docs/SPECIFICATIONS.md)
- [Arquitectura actual](dbv-specs-ops/docs/ARCHITECTURE.md)
- [Guía de diseño](dbv-specs-ops/docs/DESIGN.md)
- [Evals de gestos](dbv-specs-ops/docs/EVALS.md)
- [Pases de revisión](dbv-specs-ops/docs/REVIEW.md)
- [Guardarraíles y CI](dbv-specs-ops/docs/GUARDRAILS.md)
- [Plan de evolución](dbv-specs-ops/implementation_plan.md)
- [Tareas y backlog](dbv-specs-ops/task.md)
- [Memoria de decisiones](dbv-specs-ops/memory.md)
- [Maintain y métricas](dbv-specs-ops/docs/MAINTAIN.md), [métricas SDD](dbv-specs-ops/docs/METRICS.md)
- [Changelog](dbv-specs-ops/CHANGELOG.md)

Para activar el hook de commit en este clon, ejecuta `.\scripts\install-hooks.ps1`. CI corre en GitHub Actions; configura `quality / frontend` y `quality / backend` como checks requeridos en protección de rama. El dominio/sitemap y la cabecera de descubrimiento en producción dependen de configurar el hosting. Consulta `dbv-specs-ops/docs/MASTER_PROMPT.md` y `.github/copilot-instructions.md` para las reglas del agente.
