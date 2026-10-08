# Pases de revisión — HandPiano Kids

Usa esta revisión en `/code-simplify` y antes de `/ship`. Revisa solo el diff de producto y los artefactos de la tarea; no reportes archivos generados ni checks deterministas ya pasados.

## Pases obligatorios

1. **Bugs:** regresiones, estados incompletos, errores de layout, recursos sin enlazar y casos límite de cámara/gestos/evaluación.
2. **Seguridad:** secretos, datos de menores, permisos, transporte de imágenes, dependencias, inputs, plugin y metadatos que anuncien endpoints inexistentes. Nunca inspecciones ni copies valores de secretos al informe.
3. **Cumplimiento:** compara con `docs/SPECIFICATIONS.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `implementation_plan.md` y convenciones reales del lenguaje. No apliques mecánicamente reglas para TypeScript a este frontend JavaScript.

## Severidades

| Nivel | Significado | Bloquea entrega |
|---|---|---|
| Crítico | Comportamiento principal roto, filtración/privacidad, fallo de seguridad o incumplimiento de política. | Sí; resolver antes de ship. |
| Importante | Regresión o mantenibilidad significativa sin exposición crítica inmediata. | Registrar en changelog y resolver o documentar aceptación. |
| Nit | Estilo menor. Máximo cinco ejemplos; resumir el resto. | No. |

Salida sugerida:

```markdown
## Revisión — AAAA-MM-DD
### Bugs
- [Crítico] ...
### Seguridad
- [Importante] ...
### Cumplimiento
- [Nit] ...
```

Una revisión limpia también debe declararse como tal; no inventes hallazgos para llenar secciones.
