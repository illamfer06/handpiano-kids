# Memoria del proyecto

## Contexto actual

HandPiano Kids es un prototipo web que permite explorar las notas DO–SI con gestos de mano, cámara, audio sintetizado y una evaluación de tres rondas. El frontend está implementado en React/Vite/JavaScript. El backend Spring Boot solo ofrece un endpoint de salud. La persistencia de progreso y los perfiles no están implementados.

## Decisiones vigentes

- Mantener el stack existente: React + Vite + JavaScript, MediaPipe y Web Audio API en cliente; Spring Boot/Java en backend.
- Mantener el backend separado. No conectar funcionalidades al backend ni activar PostgreSQL/JPA para datos del usuario sin requisito y diseño aprobados.
- La detección de manos se hace en navegador; WASM/modelo se descargan de URLs externas. No afirmar que la cámara nunca sale del dispositivo sin reevaluar futuras dependencias y flujos.
- No almacenar vídeo, landmarks, perfiles infantiles ni resultados de progreso por defecto.
- La guía SDD está adaptada a Copilot; las siete fases se invocan mediante prompt files VS Code en `.github/prompts/`, no comandos propietarios de Claude.
- Agent Readiness expone únicamente metadatos estáticos de producto y una skill informativa; no se conecta a herramientas MCP inexistentes.
- Maintain permanece deshabilitado: no hay despliegue productivo, serie de métricas ni CLI de IA headless autorizado.
- Sitemap y cabecera HTTP `Link` requieren un dominio y hosting configurados; no publicar hostnames de ejemplo.
- OAuth y firmas no se declaran porque el producto no implementa esos protocolos.
- Impeccable/SkillUI son opcionales y no se instalan sin permiso expreso.
- Las especificaciones y el backlog reflejan de forma explícita las diferencias entre el estado actual y las ideas anteriores de arquitectura.

## Registro de decisiones

### 2026-10-08 — Alinear documentos sin reescribir la aplicación

El usuario aprobó actualizar los artefactos de SDD y las instrucciones del asistente, preservando frontend, backend y dependencias. Se priorizó corregir documentación inexacta sobre stack, perfiles y progreso; los elementos ausentes quedan como decisiones/backlog y no como funcionalidades asumidas.

### 2026-10-08 — Adoptar mecanismos aplicables del framework

El usuario aprobó completar la adaptación. Se acepta exponer metadatos públicos estáticos no sensibles del producto; el plugin no ejecuta herramientas. Se excluyen por ahora los mecanismos que necesitan hosting, dominio, autorización, telemetría o credenciales headless. La cámara, la lógica educativa y el runtime funcional de HandPiano Kids no deben cambiar por esta adopción.
