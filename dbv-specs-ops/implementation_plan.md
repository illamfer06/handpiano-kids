# Implementation Plan

## 1. Visión general
Se construirá una aplicación web educativa para niños que usa la cámara para detectar gestos de la mano y convertirlos en notas musicales. La experiencia estará enfocada en la claridad visual, la retroalimentación inmediata y la progresión lúdica.

## 2. Arquitectura propuesta

### Frontend
- React + Vite + TypeScript
- Tailwind CSS para una UI rápida y amigable
- Componentes para:
  - cámara
  - juego
  - pentagrama
  - panel de notas
  - progreso

### Backend
- Spring Boot 3 + Java 21
- REST API para:
  - usuarios
  - sesiones
  - progreso
  - estadísticas
  - lecciones

### Base de datos
- PostgreSQL
- Tablas sugeridas:
  - usuarios
  - perfiles
  - sesiones_juego
  - progreso_nota
  - logros
  - lecciones

### Reconocimiento de gestos
- MediaPipe Hands para detectar landmarks de la mano desde la cámara web.
- Un algoritmo simple de mapeo entre posición de dedos y nota.
- Validación para evitar falsos positivos.

### Audio
- Web Audio API para sintetizar notas con sonidos suaves de piano.
- Opción de usar sonido generado localmente para evitar depender de archivos grandes.

## 3. Flujo del MVP
1. El usuario entra a la app.
2. Se solicita acceso a la cámara.
3. Aparece un modal con instrucciones simples.
4. El sistema inicia detección de mano.
5. Cuando se reconoce un gesto, se reproduce la nota y se muestra su nombre.
6. La nota aparece en el pentagrama.
7. El sistema valida la respuesta y actualiza el progreso.

## 4. Modelo de datos

### Usuario
- id
- nombre
- edad
- nivel
- fecha_creacion

### SesionJuego
- id
- usuario_id
- tipo_modo
- inicio
- fin
- puntuacion

### ProgresoNota
- id
- usuario_id
- nota
- aciertos
- fallos
- ultima_fecha

## 5. Regla de negocio principal
- Un gesto válido desencadena exactamente una nota.
- Un gesto ambiguo no debe producir sonido.
- Cada nota debe asociarse a una representación visual clara.

## 6. Módulos funcionales
- Módulo de cámara y detector
- Módulo de audio
- Módulo de pentagrama
- Módulo de aprendizaje
- Módulo de progreso
- Módulo de autenticación/usuarios

## 7. Riesgos y mitigación
- Detección inestable por mala iluminación: usar guía visual y ajustes de brillo.
- Aceptación por parte de niños: simplificar la interfaz y ofrecer animaciones.
- Latencia de audio: usar síntesis local y evitar carga excesiva.
- Complejidad del gesto: empezar con un conjunto pequeño y controlado de notas.

## 8. Fase de construcción sugerida
### Fase 1: MVP
- 5 notas iniciales
- detección básica de mano
- audio de nota
- visual en pentagrama

### Fase 2: Gamificación
- retos y secuencias
- niveles
- recompensas visuales

### Fase 3: Progreso y analítica
- historial y métricas
- perfíl por niño
- posibles sesiones de profesor

## 9. Criterios de éxito
- El niño puede reproducir un gesto identificado por la cámara.
- La nota se escucha y se ve de forma inmediata.
- La experiencia es intuitiva sin instrucciones complejas.
- El sistema guarda el progreso para futuras sesiones.

## 10. Decisión técnica
Se recomienda priorizar una solución web con React en frontend y Spring Boot en backend, porque permite una interfaz visual muy amigable para niños y un backend robusto para guardar progreso, estadísticas y futuras extensiones.
