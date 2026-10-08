# Guía de diseño de HandPiano Kids

## Objetivo visual

Interfaz amable, clara y lúdica para aprender notas sin perder legibilidad. La nota activa, el pentagrama y el teclado son la información principal; cámara, controles y evaluación dan contexto.

## Sistema visual existente

- Fondo azul muy claro con paneles blancos/translúcidos.
- Azul intenso para acciones principales y azul/cian para la nota o tecla activa.
- Texto principal azul marino; texto secundario azul grisáceo.
- Bordes redondeados y sombras suaves para separar paneles.
- Tipografía del sistema (Arial/Helvetica) y tipografía serif únicamente para símbolos musicales.

## Jerarquía y distribución

- Cabecera compacta con nombre y propósito.
- En escritorio amplio, cámara en un panel y nota/controles/pentagrama/evaluación/teclado en el otro; mantenerlos en la primera pantalla cuando la altura disponible lo permita.
- El pentagrama debe mostrar completas clave, líneas, nota y líneas adicionales; posiciones y tamaños pueden compactarse en escritorio.
- Las siete etiquetas del teclado blanco deben permanecer centradas y legibles, sin quedar ocultas por teclas negras.
- En pantallas estrechas se permite apilar las secciones para conservar legibilidad; no reducir texto a tamaños ilegibles para forzar una sola fila.

## Interacción y accesibilidad

- Comunicar claramente el estado de cámara, la nota activa y el resultado de evaluación.
- Mantener etiquetas textuales; no depender solo del color para indicar una nota.
- Los botones deben conservar áreas de interacción utilizables y estados distinguibles.
- Respetar movimiento/transiciones discretas; no introducir animación que dificulte leer las notas.
- El confeti de acierto es decorativo, breve, no bloquea interacciones y respeta `prefers-reduced-motion`.

## Validación visual

Para cambios de interfaz, comprobar navegador en escritorio y móvil, al menos una nota baja con línea adicional (DO) y notas en las líneas/espacios superiores. Confirmar que el contenido no se recorta ni se solapa y que el nombre de cada tecla queda visible.
