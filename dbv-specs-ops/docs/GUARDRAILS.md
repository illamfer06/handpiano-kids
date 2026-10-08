# Guardarraíles deterministas

Los avisos del agente son orientación; CI y Git añaden controles que pueden ejecutarse sin depender del modelo.

## Activos

| Control | Estado | Alcance |
|---|---|---|
| GitHub Actions | Activo al publicar/usar el workflow | Pull requests y pushes ejecutan tests/build del frontend, tests del backend y validación del Agent Plugin. |
| Hook pre-commit | Disponible; instalación local por clon | Cambios de runtime requieren changelog y pasan las validaciones del área modificada. |
| Protección de rama | Pendiente de configuración remota | El administrador del repositorio debe exigir `quality / frontend` y `quality / backend`. |
| CODEOWNERS / hooks nativos del agente | No configurados | No hay una lista de propietarios ni enforcement nativo Copilot equivalente portable. |

## Instalar el hook

En Windows, desde PowerShell en cualquier carpeta del proyecto:

```powershell
.\scripts\install-hooks.ps1
```

La configuración es local a ese clon (`core.hooksPath=.githooks`) y no cambia la configuración global. Para desactivarla, usar `git config --local --unset core.hooksPath`.

Si hay cambios staged en `frontend/src/` o `backend/src/`, el hook exige incluir `dbv-specs-ops/CHANGELOG.md` en el mismo commit y ejecuta los tests/build del área afectada. No exige un test file separado para cambios puramente CSS/docs; CI cubre tests existentes.

El hook no es una frontera de seguridad (se puede omitir con `--no-verify`); CI y los checks requeridos deben ser la condición de merge. No bloquea commits de documentación sin cambios de runtime.

## Mantenimiento

- Si el workflow modifica nombres de jobs, actualizar la lista de checks requeridos en la plataforma.
- Los tests Maven escriben resultados en un directorio ignorado específico para no modificar informes versionados.
- El pre-commit frontend construye a una carpeta dentro de `node_modules`, que no se versiona.
