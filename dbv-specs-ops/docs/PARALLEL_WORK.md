# Trabajo paralelo

La colaboración paralela es opcional. Usa worktrees solo cuando las tareas sean independientes (por ejemplo, documentación y pruebas que no editen los mismos archivos); no crees worktrees como requisito para una corrección pequeña.

## Límites

- Este workspace puede contener cambios de usuario sin commit; inspecciona `git status` antes de cualquier creación/limpieza de worktree.
- No asignes el mismo archivo a dos sesiones.
- Cada tarea delegada debe tener objetivo, rutas delimitadas, criterio de salida y prohibición de commit/merge si no se solicita.
- Integra los cambios mediante revisión del diff y tests; resuelve conflictos sin descartar cambios ajenos.
- El entorno actual permite sesiones Copilot, pero no asume el CLI `claude`, `gemini` u orquestación autónoma de fondo.

Para comandos de git worktree, registra rama y ruta exactas en task antes de ejecutarlos. No borres un worktree con cambios sin autorización.
