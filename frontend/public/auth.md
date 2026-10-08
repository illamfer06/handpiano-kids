# Acceso a HandPiano Kids

HandPiano Kids no requiere cuenta para usar la aplicación web. La función interactiva solicita permiso de cámara al navegador; el usuario puede rechazarlo desde los controles del navegador.

Este origen frontend no publica una API de producto autenticada. El endpoint de salud de Spring Boot es un servicio separado y no se anuncia como API pública del sitio.

El repositorio no implementa OAuth, autorización de agentes ni firmas HTTP. No envíes credenciales, imágenes, landmarks ni datos de menores a través de este recurso.

Los recursos de MediaPipe se descargan de proveedores CDN especificados por la aplicación; no se debe inferir que todo el tráfico del navegador permanece en el dispositivo.
