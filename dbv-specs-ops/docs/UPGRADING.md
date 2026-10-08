# Actualizar los mecanismos SDD

Procedimiento local para actualizar la adaptación de `dbv-specs-ops` sin sobrescribir el producto ni el contexto del proyecto.

1. Confirmar la versión/tag y leer el changelog/documentación upstream; no tratar `master` como versión estable.
2. Revisar `project.config.md`, especificaciones, decisiones y archivos existentes antes de traer cambios.
3. Comparar los archivos de framework con esta instalación y clasificar cada cambio como aplicable, opcional o no aplicable a VS Code/Copilot y HandPiano Kids.
4. No copiar encima `docs/SPECIFICATIONS.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `implementation_plan.md`, `memory.md`, `task.md` ni `CHANGELOG.md`; fusionar cualquier guía sin perder datos del producto.
5. Mantener instrucciones personalizadas en `.github/copilot-instructions.md` y prompts propios; no añadir activadores de agentes que no se utilicen.
6. Actualizar versión/origen en `project.config.md`, registrar decisiones y ejecutar `npm test`, `npm run build`, `mvn test`, el validador de plugin y los checks del workflow según alcance.
7. Registrar la actualización en changelog y task; no hacer commit/tag automáticamente.

Pide aprobación para cambios de runtime, nuevas dependencias, recopilación de datos, exposición de APIs o configuración remota de rama.
