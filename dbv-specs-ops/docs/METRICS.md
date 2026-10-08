# Métricas del ciclo SDD

Las métricas son opcionales y no deben recopilar datos de cámara, gestos o menores. No se instala una plataforma de analítica.

| Fase | Indicador posible | Fuente disponible |
|---|---|---|
| Spec | Reescrituras mayores antes de planificar | Diff de `docs/SPECIFICATIONS.md`. |
| Plan | Desviaciones del plan después de iniciar build | Historial de `task.md` y plan. |
| Build | Tests/build correctos a la primera | Salidas de CI y pruebas locales reportadas. |
| Test | Fallos hallados antes de merge | Historial de checks CI. |
| Simplify | Hallazgos críticos resueltos antes de entrega | Registro de revisión. |
| Ship | Tiempo a una versión publicada | Tags/releases, cuando se publiquen. |
| Maintain | Tiempo entre alerta válida y especificación del hallazgo | No disponible hasta activar Maintain con telemetría adecuada. |

No hay métrica numérica de producción o registro de releases habilitado en este MVP. Solo recoger indicadores para una evaluación concreta y aprobada; no añadir telemetría por defecto.
