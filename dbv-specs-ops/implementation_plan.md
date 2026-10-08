---
dependencies:
  - Existing frontend and backend toolchains; no new runtime dependency for this documentation alignment.
risks:
  - Existing planning documents described proposed features and a different frontend stack as if they were current.
  - Camera behavior and responsive presentation require validation in real browsers and devices.
rollback_strategy: Revert only the approved SDD/documentation changes; preserve application source and existing user changes.
---

# Plan de implementación y evolución

## 1. Objetivo

Mantener un MVP educativo funcional y evolucionarlo mediante el ciclo SDD. Este plan distingue la arquitectura comprobada de las propuestas futuras y no autoriza por sí solo a añadir perfiles, persistencia ni nuevas dependencias.

## 2. Arquitectura implementada

### Frontend

- React 18 + Vite 5 + JavaScript; aplicación y flujo de interfaz en `frontend/src/App.jsx`.
- MediaPipe Tasks Vision inicializa el detector de manos y procesa vídeo en el navegador.
- Funciones de dominio locales mapean landmarks a notas, alteraciones y volumen.
- Web Audio API sintetiza el sonido; CSS implementa pentagrama, teclado y diseño adaptable.
- Vitest, React Testing Library y jsdom cubren lógica de gestos y estados básicos de interfaz.

### Backend

- Spring Boot 3.3.4 y Java 21 en `backend/`.
- Único endpoint actual: `GET /api/health`.
- PostgreSQL/JPA están configurados, pero no hay entidades, repositorios de progreso ni API de perfiles.
- El frontend no consume el backend.

### Servicios adicionales

- El servidor Express de la raíz es un prototipo independiente y no forma parte del flujo funcional del frontend.
- MediaPipe WASM y el modelo se obtienen de URLs externas configuradas en el frontend.

## 3. Plan por hitos

### Hito 0 — Establecer una base documental cierta

- [x] Alinear stack, requisitos, arquitectura, diseño, memoria y backlog con el código actual.
- [x] Añadir instrucciones SDD para Copilot y un changelog.
- [x] Mantener intactos el runtime, las dependencias y el comportamiento de la aplicación.

### Hito 1 — Incorporar mecanismos aplicables de dbv-specs-ops

- [x] Confirmar versión de referencia y adaptar instrucciones al stack real.
- [x] Añadir comandos del ciclo como prompt files de VS Code/Copilot.
- [x] Incorporar tests/build en GitHub Actions y hook pre-commit opt-in.
- [x] Añadir revisión por pases, procedimiento de upgrade, métricas, Evals, paralelismo y límites de Maintain.
- [x] Publicar metadatos estáticos seguros sin inventar endpoint, OAuth, firma ni dominio canónico.
- [x] Validar la integración y configurar el hook local.

### Hito 2 — Validar el MVP en navegadores y dispositivos

- [ ] Probar permiso concedido/denegado, cámara ausente y carga fallida de MediaPipe en navegadores objetivo.
- [ ] Comprobar gestos con cámara real, iluminación y distancias variadas.
- [ ] Validar la distribución responsive en varias dimensiones y orientación.
- [ ] Añadir pruebas automatizadas para el flujo de respuestas y cierre de evaluación.

### Hito 3 — Decidir el producto antes de ampliar la arquitectura

- [ ] Acordar una actividad alternativa cuando la cámara no esté disponible.
- [ ] Decidir si se necesita persistir progreso; definir minimización, retención y privacidad antes de guardar datos infantiles.
- [ ] Decidir si Spring Boot/PostgreSQL se mantienen como demostración o se amplían para el producto.
- [ ] Configurar dominio canónico, sitemap y cabeceras de hosting antes de un despliegue público.

### Hito 4 — Implementar solo alcance aprobado

Desglosar en un plan aprobado y actualizar las especificaciones antes de añadir un modo sin cámara, perfiles, persistencia o nuevas rutas de API. No migrar el frontend a TypeScript/Tailwind ni añadir descubrimiento para agentes sin una decisión explícita.

## 4. Validación por cambio

- Frontend: `cd frontend; npm test` y `npm run build`.
- Backend: `cd backend; mvn test`.
- Quality gate: `.github/workflows/quality.yml` valida frontend/backend en CI; protección de rama requiere configuración del repositorio remoto.
- Git local: `scripts/install-hooks.ps1` configura el hook pre-commit.
- Agent Plugin: `node scripts/validate-agent-plugin.mjs`.
- Para cambios visuales, verificar el resultado en navegador a resolución de escritorio y móvil; las pruebas unitarias no sustituyen la prueba de cámara física.
- Revisar el diff por errores, seguridad y cumplimiento de las especificaciones antes de cerrar una tarea.

## Plan aprobado — Arreglos finales de pentagrama y evaluación

- **Dependencias:** estilos y componentes React existentes; sin paquetes nuevos.
- **Riesgos:** el relleno blanco tapa actualmente las líneas musicales; disparar confeti desde el bucle de cámara generaría animación en cada fotograma. El confeti debe depender exclusivamente de una respuesta correcta.
- **Reversión:** revertir cambios acotados a `App.jsx`, `styles.css`, `App.test.jsx` y documentación de esta tarea, conservando los cambios previos del usuario.
- **Implementación:** dibujar el trazo de pentagrama por encima de la cabeza de nota manteniendo el borde ovalado; añadir partículas decorativas accesibles/reducidas en el panel de evaluación y activarlas solo en el camino correcto.
- **Validación:** tests del frontend, build, captura visual del pentagrama y evaluación; verificar nota en línea, nota DO con línea adicional, confeti al acertar y ausencia al fallar.
