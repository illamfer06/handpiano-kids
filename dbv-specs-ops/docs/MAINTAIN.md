# Maintain — diagnóstico sin producción

Maintain cierra el ciclo cuando una señal medida descubre una regresión, pero no debe inventar incidencias ni editar el producto automáticamente.

## Configuración actual

- Habilitado: no.
- Métrica vigilada: ninguna serie histórica de producción disponible.
- Ventana/base de referencia: no definida.
- CLI de IA no interactivo: ninguno; no almacenar ni solicitar credenciales para habilitarlo.
- Umbrales y acciones automáticas: no configurados.

Hay CI, pero este workflow no tiene monitor de producción, línea base estadística ni autorización para un invocador headless. Por eso no se crea un workflow programado ficticio.

## Activación futura

Antes de habilitarlo, especificar fuente/datos de métrica, ventana y umbrales, privacidad/retención, invocador headless disponible en el entorno, permisos mínimos y ruta de revisión humana. El detector puede escribir un hallazgo `[Detectado]` en `docs/SPECIFICATIONS.md`; diagnóstico de IA siempre de solo lectura; una persona aprueba todo plan/cambio. Nunca mergear ni desplegar automáticamente.

Para la metodología de bandas 1σ/2σ/3σ y decisiones de activación, consultar la versión original y registrar aquí la adaptación concreta antes de introducir una automatización.
