# Configuración del proyecto

- Nombre: `HandPiano Kids`
- Tipo: Aplicación educativa web de notas musicales mediante gestos
- Versión del frontend: `0.1.0`
- Metodología: SDD (`Spec → Plan → Build → Test → Simplify → Ship`)
- Framework de proceso: adaptación local de `dbv-specs-ops` v2.9.0; no es una dependencia de runtime.
- Interfaz del agente: Copilot Instructions y prompt files VS Code en `.github/prompts/`.

## Stack comprobado

- Frontend: React 18, Vite 5 y JavaScript (no TypeScript).
- Visión: `@mediapipe/tasks-vision` (HandLandmarker en el navegador).
- Audio: Web Audio API.
- Pruebas frontend: Vitest, jsdom y React Testing Library.
- Backend: Spring Boot 3.3.4, Java 21, Spring Web y Spring Data JPA.
- Base de datos configurada para el backend: PostgreSQL. La aplicación frontend no depende de ella.
- Servidor Express raíz: prototipo separado; el frontend Vite no consume ese servidor.

## Estado y límites

- Estado: prototipo/MVP educativo en validación.
- El frontend reconoce gestos, actualiza nota/accidental/volumen, representa el pentagrama y el teclado y ofrece una evaluación de tres rondas.
- El backend implementa actualmente solo `GET /api/health`; no hay API de perfiles, sesiones o progreso implementada.
- JPA y PostgreSQL están en el stack del backend, pero no hay entidades ni persistencia de progreso implementadas.
- Los assets y el modelo de MediaPipe se solicitan a CDN externos; la detección ocurre en el navegador.
- Agent Readiness (Web): metadatos estáticos públicos de producto; sin herramientas MCP, API pública desde el frontend, OAuth ni firmas HTTP. Dominio canónico pendiente.
- MCP: no existen servidores MCP del producto. El Agent Plugin publicado contiene una skill informativa y descriptor vacío.
- Diseño externo: Impeccable y SkillUI no instalados; requieren aprobación expresa.
- Maintain: deshabilitado hasta disponer de métricas reales y un CLI de IA headless autorizado.

## Mecanismos y validación

- CI: `.github/workflows/quality.yml`, en pull requests y push; Node 20/Java 21, tests/build frontend, tests backend y validación plugin.
- Hook local: `.githooks/pre-commit`, configurable con `scripts/install-hooks.ps1`; cada clon debe habilitarlo.
- Branch protection: requiere configuración en la plataforma Git remota, fuera del repositorio local.
- Fases: `/spec`, `/plan`, `/build`, `/test`, `/code-simplify`, `/ship` y `/maintain` en `.github/prompts/`.

## Comandos de validación

Desde `frontend/`: `npm test` y `npm run build`.

Desde `backend/`: `mvn test`.

Desde la raíz: `node scripts/validate-agent-plugin.mjs`.

Suite Evals gestuales: pruebas sintéticas en `frontend/src/App.test.jsx`; evaluación del detector con cámara real descrita en `dbv-specs-ops/docs/EVALS.md`.

El frontend puede iniciarse con `npm run dev`. `start.bat` también intenta iniciar el backend, que puede requerir PostgreSQL local.
