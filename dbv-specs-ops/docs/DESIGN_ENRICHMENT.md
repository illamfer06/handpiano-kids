# Enriquecimiento visual opcional

La guía de diseño fuente es `docs/DESIGN.md`. Impeccable (auditoría/pulido) y SkillUI (extracción de tokens desde una URL de referencia) son herramientas de terceros opcionales.

- No se instalan paquetes mediante `npx` ni se ejecutan CLIs externos sin consentimiento expreso del usuario.
- SkillUI requiere una URL de referencia proporcionada/aprobada por el usuario; no se inventa una.
- Impeccable puede escribir instrucciones específicas de otros agentes; si se aprueba, limitar providers a los activos y revisar el diff antes de conservar sus archivos.
- La salida de diseño debe actualizar primero `docs/DESIGN.md`; cualquier copia a la raíz debe identificarse como generada y mantenerse sincronizada.
- Validar contraste, foco, controles táctiles y contenido real en navegador. Una auditoría asistida no reemplaza pruebas accesibles.
