# Registro de tareas

## Estado actual

- [x] Aprobar ampliación a los mecanismos aplicables del framework.
- [x] Definir especificación, riesgos, reversión y dependencias antes de construir.
- [x] Añadir prompts, guardarraíles, CI y procedimientos del framework.
- [x] Publicar recursos estáticos de descubrimiento sin añadir APIs de producto.
- [x] Validar artefactos, pruebas/build y activación del hook.

## Revisión adversarial del plan

<architect_review>
  <builder>Adoptaremos el flujo de trabajo en VS Code, CI y Git, además de metadatos estáticos de HandPiano Kids, sin tocar su lógica educativa ni añadir servicios de runtime.</builder>
  <adversary>Si los metadatos de la cámara o del backend de HandPiano Kids prometen procesamiento local absoluto, APIs públicas o permisos OAuth que no existen, exponen una afirmación engañosa; un catálogo que apunte a /api/health del servicio separado también sería incorrecto.</adversary>
  <builder>Los recursos describirán solo funcionalidad pública comprobada, advertirán que los assets de MediaPipe provienen de CDN, usarán un catálogo vacío para el origen frontend y omitirán OAuth, firmas, sitemap y dominio canónico hasta que existan. CI y el validador comprobarán los artefactos.</builder>
</architect_review>

## Aprobación y límites

- Aprobación del usuario: adaptación completa de los mecanismos aplicables manteniendo HandPiano Kids como aplicación.
- Riesgo aceptado: recursos estáticos informativos quedan servibles desde el frontend; no contienen secretos, datos personales, vídeo ni herramientas MCP.
- No se habilitan despliegue/merge autónomos ni Maintain automático.

## Snapshot de contexto

Proyecto HandPiano Kids: frontend React/Vite/JavaScript con MediaPipe y Web Audio; Spring Boot expone únicamente `/api/health`; no hay persistencia de progreso ni perfiles. La configuración PostgreSQL no equivale a una funcionalidad implementada. Las especificaciones, el plan y el backlog están en `docs/SPECIFICATIONS.md`, `implementation_plan.md` y este archivo. Antes de nueva funcionalidad, seguir `docs/MASTER_PROMPT.md`; consultar también `docs/ARCHITECTURE.md`, `docs/DESIGN.md` y `memory.md`.

## Backlog priorizado

### Próxima validación

- [ ] Probar permiso concedido/denegado y ausencia de cámara en navegadores reales.
- [ ] Probar precisión/estabilidad del reconocimiento bajo condiciones habituales de iluminación y distancia.
- [ ] Verificar tamaños de escritorio, tablet y móvil, incluyendo orientación horizontal.
- [ ] Ampliar pruebas de evaluación para respuesta correcta/incorrecta, rondas y cancelación.

### Decisiones de producto pendientes

- [ ] Definir alternativa educativa cuando el navegador no permita usar la cámara.
- [ ] Decidir si se guarda progreso entre sesiones y especificar minimización/retención de datos antes de implementarlo.
- [ ] Definir si el backend seguirá siendo una comprobación de salud o tendrá una función de producto.
- [ ] Decidir el destino del prototipo Express de la raíz antes de retirarlo o conectarlo.

### Tarea en planificación

- [x] AC-09: hacer visible la línea del pentagrama atravesando las cabezas de nota situadas en una línea.
- [x] AC-10: añadir confeti breve y accesible solo al acertar en evaluación.
- [x] Añadir cobertura automatizada para acierto/error y comprobar visualmente pentagrama y animación.

## Historial reciente

- 2026-10-08: organización documental del proyecto conforme al ciclo SDD, aprobada por el usuario. No incluye cambios al código de ejecución.
- Validación: frontend `npm test` (5 pruebas) y `npm run build` correctos; backend `mvn test` (3 pruebas) correcto. Maven informa que la versión del plugin Spring Boot no está fijada en `pom.xml`.
- 2026-10-08: adaptación completa de los mecanismos aplicables; se instaló el hook en este clon. El runtime educativo permanece sin cambios; se añadieron metadatos estáticos y cobertura sintética de gestos.
- Validación de esta fase: 6 pruebas frontend, build frontend, 3 pruebas Maven, validador de prompts/plugin y hook pre-commit con un índice temporal pasaron. Los cinco recursos web devuelven HTTP 200. El workflow de Actions no puede ejecutarse en remoto hasta publicarlo; la protección de rama requiere configuración remota.
- El usuario aprobó el plan de arreglo del pentagrama y confeti; se implementó en React/CSS y se añadieron pruebas de acierto/error.
- Validación de los arreglos: 8 pruebas frontend pasan, build y validador de plugin pasan, sin errores de editor. En navegador, el trazo de pentagrama se ve cruzando la nota DO y su línea adicional.
