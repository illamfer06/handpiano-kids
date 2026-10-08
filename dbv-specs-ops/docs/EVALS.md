# Evals de reconocimiento gestual

MediaPipe es un componente de visión no determinista. La evaluación se divide entre una suite reproducible de mapeo (CI) y una prueba manual de cámara; CI no usa ni almacena vídeo de personas.

## Suite reproducible

`frontend/src/App.test.jsx` construye landmarks sintéticos y verifica:

- Cada una de las siete posturas admitidas mapea a exactamente la nota especificada.
- Una postura no admitida no selecciona nota (`null`).
- Las suites existentes verifican estados de volumen/alteraciones y síntesis de audio con un contexto simulado.

Estos fixtures evalúan el clasificador de gestos, no la precisión del modelo MediaPipe ni las variaciones anatómicas/ambientales.

## Protocolo manual de cámara

Antes de declarar estabilidad en un navegador/dispositivo:

1. Usa una mano adulta voluntaria, sin grabar ni guardar imagen, landmarks o identificadores.
2. Prueba las siete posturas bajo luz habitual, con cámara permitida; incluye ausencia de mano y una postura no admitida.
3. Anota solo navegador/dispositivo, condiciones generales y conteos correctos/ambiguos por gesto en `task.md`; no anotes nombres, edad ni artefactos biométricos.
4. Repite tras cambios de detector/umbrales. Compara cada nota y los falsos positivos por separado; reporta limitaciones en vez de afirmar una precisión no medida.

El proyecto todavía no tiene dataset consentido, línea base, umbral de aceptación aprobado ni prueba automática del modelo sobre una cámara real. No añadas datasets de menores para completar esta evaluación.
