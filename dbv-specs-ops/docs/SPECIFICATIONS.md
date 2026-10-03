# Especificaciones

## 1. Problema
Los niños y niñas de 5 a 10 años tienen dificultad para aprender teoría musical y reconocer notas sin una experiencia práctica y motivadora. El aprendizaje suele ser abstracto y poco interactivo, por lo que la comprensión de notas y pentagrama se vuelve menos efectiva.

## 2. Objetivo
Crear una aplicación educativa que permita aprender notas musicales mediante gestos con la mano frente a la cámara. La app detecta la posición de la mano y asocia el gesto con una nota musical, reproduciendo el sonido correspondiente y mostrando la nota en pantalla y en un pentagrama.

## 3. Usuarios objetivo
- Niños y niñas de 5 a 10 años.
- Maestros o familias que quieren un recurso didáctico visual y musical.
- Usuarios que necesitan una experiencia intuitiva, segura y motivadora.

## 4. Propuesta de valor
- Aprendizaje activo y visual.
- Feedback inmediato con audio y representación gráfica.
- Interfaz simple, alegre y accesible para edades tempranas.
- Motivación mediante progresión y juegos simples.

## 5. Requisitos funcionales

### 5.1 Acceso y cámara
- La aplicación debe solicitar acceso a la cámara del usuario.
- Si la cámara no está disponible, debe mostrar un mensaje claro y una alternativa o guía.
- Debe detectar manos en tiempo real con una resolución aceptable para navegador.

### 5.2 Reconocimiento gestual
- Debe asociar cada configuración de mano o dedo a una nota musical concreta.
- La detección debe ser suficientemente estable para permitir un uso sencillo por parte de niños.
- Debe ignorar gestos ambiguos o poco definidos.

### 5.3 Sonido y respuesta musical
- Cuando se detecta un gesto válido, debe sonar la nota asociada.
- Debe reproducir audio con una calidad suficiente para piano o sintetizador suave.
- Debe evitar que varios sonidos se solapen de forma caótica.

### 5.4 Visualización
- La pantalla debe mostrar el nombre de la nota (por ejemplo, Do, Re, Mi).
- Debe mostrar la nota también en un pentagrama visual.
- Debe utilizar una interfaz clara con colores amigables para niños.

### 5.5 Aprendizaje y progresión
- La app debe poder ofrecer niveles o ejercicios básicos: nota individual, secuencia, reconocimiento auditivo, etc.
- Debe indicar si la respuesta es correcta o incorrecta.
- Debe guardar el progreso del usuario por sesión y/o por perfil.

### 5.6 Gestión de usuarios
- Debe permitir identificar al usuario (nombre o perfil infantil).
- Debe guardar progreso, logros y niveles alcanzados.
- Debe mantener una base de datos para resultados y estadísticas.

## 6. Requisitos no funcionales
- La interfaz debe ser responsiva y compatible con navegador moderno.
- La latencia entre gesto y sonido debe ser baja.
- La experiencia debe ser segura para niños: sin anuncios, sin uso de datos sensibles y sin pantallas complejas.
- El sistema debe ser extensible para añadir más notas o modos de juego en futuras versiones.

## 7. Criterios de aceptación
1. La app inicia correctamente y solicita acceso a la cámara.
2. Un gesto válido activa un sonido asociado y muestra la nota en pantalla.
3. La nota aparece en el pentagrama con representación visual clara.
4. El sistema identifica un error o gesto indefinido y responde con una retroalimentación adecuada.
5. Un usuario puede completar un nivel básico de reconocimiento de notas.
6. El progreso queda registrado para futuras sesiones.

## 8. Alcance inicial
- Versión MVP con un número limitado de notas.
- Modo básico de juego con detección en tiempo real.
- Persistencia mínima de progreso del usuario.

## 9. Fuera de alcance para la versión 1
- Reconocimiento de múltiples personas simultáneas.
- Generación de música completa con armonías complejas.
- Personalización avanzada del perfil del estudiante.
- Integración con redes sociales o cuentas externas.
