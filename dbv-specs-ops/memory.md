# Memory

## Contexto actual
- Proyecto base de demostración para usar el framework `dbv-specs-ops`.
- La aplicación es una API mínima en Node.js con Express.
- El objetivo es mantener un flujo de trabajo estructurado con documentación y no saltarse la especificación.

## Decisiones
- Se usa una arquitectura mínima y clara para facilitar la comprensión.
- La raíz del proyecto conserva la app y el framework vive dentro de `dbv-specs-ops/`.
- El arranque local se coordina desde `start.bat`: frontend Vite en el puerto 5173 y backend Spring Boot en el puerto 8080.
- `dbv-specs-ops` funciona como metodología documental local, no como dependencia ejecutable.
