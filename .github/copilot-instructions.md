Para tareas de este repositorio, sigue el ciclo SDD adaptado descrito en `dbv-specs-ops/docs/MASTER_PROMPT.md`.

Usa los prompt files en `.github/prompts/` como fases invocables desde Copilot Chat: `/spec`, `/plan`, `/build`, `/test`, `/code-simplify`, `/ship`, `/maintain`.

Antes de cambios de producto, lee `dbv-specs-ops/project.config.md`, `dbv-specs-ops/docs/SPECIFICATIONS.md`, `dbv-specs-ops/docs/ARCHITECTURE.md`, `dbv-specs-ops/docs/DESIGN.md`, `dbv-specs-ops/task.md` y `dbv-specs-ops/memory.md` según corresponda.

Trata los documentos como el acuerdo de producto y el código/pruebas como evidencia del comportamiento actual. Si difieren, no inventes funcionalidades: señala y corrige la discrepancia. Especifica antes de implementar, actualiza tareas/memoria/changelog cuando aplique y valida los cambios con las pruebas existentes. Solicita aprobación para planes complejos según `MASTER_PROMPT.md`. Conserva el stack existente y no instales dependencias ni cambies runtime sin una necesidad aprobada.

Para revisión, sigue `dbv-specs-ops/docs/REVIEW.md`; para CI/hooks, `docs/GUARDRAILS.md`. No afirmes que Maintain automático, OAuth, servidores MCP, perfiles de usuario o progreso persistente están activos.
