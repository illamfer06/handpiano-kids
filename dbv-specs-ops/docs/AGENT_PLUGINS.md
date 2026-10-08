# Agent Plugin y descubrimiento web

## Estado

El sitio publica un manifest informativo y una skill de producto en `frontend/public/.well-known/agent-plugin/`. No hay servidores MCP ni herramientas invocables: `mcp.json` tiene una lista vacía. No uses el plugin para obtener acceso a cámara, estado local del navegador o datos de menores.

Las instrucciones para el ciclo de desarrollo también están disponibles como prompts nativos VS Code en `.github/prompts/`; los archivos web no sustituyen esos prompts.

## Agent Readiness estática

- `robots.txt`, `llms.txt` y `auth.md` describen el producto y sus límites.
- `.well-known/api-catalog` es un catálogo JSON vacío para el origen frontend; el backend Spring local/separado no se presenta como API del frontend.
- `.well-known/agent-plugin/plugin.json`, `mcp.json` y `skills/handpiano-kids/SKILL.md` forman el paquete de descubrimiento.
- El HTML anuncia los recursos mediante relaciones `api-catalog` y `agent-plugin`; `frontend/public/_headers` configura Link/content type para hosts estáticos compatibles.
- No se publica `robots.txt` con una URL sitemap de ejemplo: falta dominio canónico. Añádela como URI absoluta al elegir el hosting.
- No existen endpoints OAuth ni firmas HTTP; no publicar documentos `.well-known` que simulen esos protocolos.
- El sitemap absoluto y la cabecera HTTP `Link` requieren dominio canónico y plataforma de hosting. Completar en el plan de despliegue; el archivo `_headers` es una configuración compatible con algunos hosts estáticos, no garantía universal.

## Validación

Ejecuta `node scripts/validate-agent-plugin.mjs` desde la raíz. Verifica JSON, campos obligatorios, rutas internas y ausencia de servidores MCP no aprobados. Al añadir una herramienta, actualizar primero especificaciones y revisión de seguridad; no introducir rutas absolutas/secretos en `mcp.json`.

## Referencia

La especificación original se describe en [dbv-specs-ops](https://github.com/davidbuenov/dbv-specs-ops/blob/master/docs/AGENT_PLUGINS.md) y [Agent Plugins 1.0.0](https://agent-plugins.org/specification). Este paquete es deliberadamente solo informativo.
