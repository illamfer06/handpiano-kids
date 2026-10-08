# Arquitectura actual

## Vista general

```text
Navegador
├── React + Vite (frontend/src)
│   ├── cámara getUserMedia → MediaPipe HandLandmarker
│   ├── landmarks → lógica de gesto → nota/alteración/volumen
│   ├── nota → Web Audio API
│   └── estado → interfaz, pentagrama, teclado y evaluación
└── Backend independiente (backend/)
    └── Spring Boot → GET /api/health
```

El frontend no llama actualmente al backend. No existe persistencia de sesión o progreso, aunque el backend incluya dependencias y configuración para PostgreSQL/JPA.

El frontend sirve metadata estática bajo `public/` (`robots.txt`, `llms.txt`, `auth.md`, catálogo Linkset vacío y plugin informativo). No expone herramientas MCP ni anuncia el backend independiente. La configuración `_headers` sirve como ejemplo para hosts estáticos que soporten ese formato; debe traducirse al hosting elegido para garantizar la cabecera HTTP `Link` y el content type Linkset.

## Frontend

- Punto de entrada: `frontend/src/main.jsx`.
- Componente de aplicación y lógica actual: `frontend/src/App.jsx`.
- Estilos de interfaz: `frontend/src/styles.css`.
- La captura se solicita mediante `navigator.mediaDevices.getUserMedia`; MediaPipe procesa fotogramas en el navegador.
- Los helpers exportados de lógica musical y sus pruebas están en `App.jsx` y `App.test.jsx`.
- El audio es local a la sesión del navegador y se sintetiza con Web Audio API.
- La descarga de WASM y modelo usa proveedores externos; revisar URLs y tratamiento de cámara antes de cambiar esta frontera.

## Backend

- Aplicación Spring Boot en `backend/`, Java 21.
- `HealthController` implementa únicamente `GET /api/health`.
- La configuración de JPA/PostgreSQL es infraestructura preparada, no evidencia de modelos, migraciones o persistencia funcional.

## Prototipo adicional

`server.js` y el `package.json` raíz forman un prototipo Express separado del frontend. No asumir que sus rutas sirven la aplicación React ni trasladar responsabilidades entre servicios sin una decisión documentada.

## Fronteras de datos y privacidad

- Los permisos y la captura de cámara pertenecen al navegador.
- No se deben añadir almacenamiento, telemetría ni transporte de vídeo/landmarks sin especificación de producto, evaluación de privacidad y pruebas.
- Cualquier integración futura con perfiles/progreso debe definir el modelo mínimo de datos y la política de retención antes de crear entidades o endpoints.
