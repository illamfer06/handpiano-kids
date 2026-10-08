# Especificaciones de HandPiano Kids

## 1. Problema y objetivo

Aprender los nombres y la posición de las notas puede resultar abstracto. HandPiano Kids permite explorar las siete notas naturales con gestos, cámara, sonido y una representación visual en pentagrama y teclado.

## 2. Usuarios

- Niños y niñas que practican notas musicales.
- Familias y docentes que facilitan la actividad.

La experiencia debe ser sencilla, visual y adecuada para una práctica supervisada. No se recopilan perfiles personales como parte del MVP actual.

## 3. Alcance funcional actual

### 3.1 Cámara y detección

- El navegador solicita permiso de cámara y procesa los fotogramas en el cliente mediante MediaPipe HandLandmarker.
- Si la inicialización de cámara o del detector falla, la interfaz informa que no pudo acceder a la cámara.
- Los recursos WASM/modelo se descargan desde proveedores externos indicados por el frontend. La aplicación no envía deliberadamente vídeo a un servidor propio.
- No existe una alternativa de práctica sin cámara en la versión actual.

### 3.2 Gestos y notas

La mano derecha asigna estas posturas a las notas:

| Nota | Gesto |
|---|---|
| DO | Puño |
| RE | Solo pulgar |
| MI | Pulgar e índice |
| FA | Pulgar, índice y medio |
| SOL | Pulgar, índice, medio y anular |
| LA | Mano abierta |
| SI | Pulgar y meñique |

Los gestos ambiguos que no coinciden con una postura reconocida no seleccionan una nota.

### 3.3 Alteraciones, volumen y audio

- La mano izquierda puede activar sostenido o bemol con los gestos específicos de pulgar solo o meñique solo.
- Los dedos levantados de la mano izquierda controlan el volumen en pasos de 25%; el puño corresponde a 0%.
- El audio se sintetiza en el navegador mediante Web Audio API.
- El nombre de nota y la representación visual reflejan la nota activa y la alteración seleccionada.

### 3.4 Visualización y evaluación

- Se muestra la nota actual en texto, en el pentagrama y en el teclado de siete notas naturales con teclas de alteración.
- La evaluación genera tres objetivos de nota y compara la respuesta gestual de la mano derecha; proporciona feedback y permite cancelar.
- La evaluación y sus resultados viven solo en la sesión actual.

## 4. Requisitos no funcionales

- La interfaz debe adaptarse al tamaño de pantalla y mantener visibles la nota, el pentagrama y el teclado en escritorio cuando el espacio vertical disponible lo permita.
- Debe informar claramente de fallos de acceso a la cámara.
- La cámara y el reconocimiento deben ejecutarse con permiso del usuario; no almacenar imágenes ni crear perfiles sin una especificación nueva.
- Mantener compatibilidad con navegadores modernos con cámara y Web Audio API.

## 5. Criterios de aceptación y estado

| ID | Criterio | Estado actual |
|---|---|---|
| AC-01 | La aplicación muestra su interfaz principal y solicita la cámara al iniciar. | Implementado; validar dispositivo real aparte de pruebas simuladas. |
| AC-02 | Un gesto reconocido selecciona una nota y actualiza su representación. | Implementado; hay pruebas unitarias de mapeos y prueba de renderizado. |
| AC-03 | Una nota activa puede reproducirse mediante síntesis de audio. | Implementado mediante Web Audio API. |
| AC-04 | El usuario ve la nota en el pentagrama y teclado. | Implementado; el diseño responsivo sigue en validación visual. |
| AC-05 | Se puede iniciar y responder a una evaluación de tres rondas. | Implementado; ampliar cobertura de respuestas y estados. |
| AC-06 | Si no hay cámara disponible, se muestra una explicación y se puede practicar de otro modo. | Pendiente: se muestra un mensaje de error, pero no hay modo alternativo. |
| AC-07 | Perfiles o progreso se conservan entre sesiones. | Fuera del MVP actual: no hay API ni almacenamiento de progreso. |
| AC-08 | El sitio ofrece metadatos estáticos seguros para descubrimiento del producto. | Implementado en `frontend/public`; validar forma en CI. Cabecera HTTP depende del hosting. |

## 6. Fuera de alcance hasta una nueva decisión

- Identidad, edad, perfiles infantiles, autenticación y almacenamiento de progreso.
- Persistir resultados de evaluación o telemetría.
- Envío de vídeo/imágenes a servicios propios o de terceros.
- Modo de juego sin cámara, secuencias musicales y niveles avanzados.
- Uso de la API backend para funcionalidades del frontend.
- Servidores MCP del producto; Agent Readiness no concede acceso a cámara ni a información de usuario.
- Autorización OAuth y firmas HTTP, no presentes en la aplicación.

## 7. Descubrimiento de contenido web

- La aplicación puede exponer metadatos estáticos legibles por asistentes sobre HandPiano Kids, sus funciones públicas y su acceso.
- El plugin publicado es informativo y no ofrece herramientas ejecutables/MCP ni acceso a cámara.
- El frontend y el backend son orígenes separados. El catálogo del frontend no debe anunciar `/api/health` como API del sitio.
- No se publicarán metadatos OAuth ni de firmas HTTP mientras el producto no implemente autorización o firmas.
- No se inventará un dominio canónico ni un sitemap con URLs ficticias. Sitemap y cabecera HTTP `Link` requieren configurar el dominio/hosting.
- Los metadatos no deben solicitar imágenes, landmarks, progreso, nombres ni otra información personal de menores.

## 8. Decisiones que requieren especificación antes de construir

- Qué experiencia alternativa se ofrece al denegar la cámara.
- Si se desea guardar progreso y, de ser así, qué datos mínimos se almacenan y durante cuánto tiempo.
- Si el backend se mantiene como demostración de salud o se convierte en una API de producto.
- Dominio canónico y plataforma de hosting para publicar sitemap absoluto y cabeceras de descubrimiento.
- Si se incorpora OAuth o firmas HTTP en el futuro, documentar esos protocolos antes de publicar sus metadatos.
