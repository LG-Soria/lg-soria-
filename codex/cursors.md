# Custom Cursors

El proyecto usa dos variantes de cursor personalizado: `InversionCursor` y `DotCursor`.
Ambas se montan globalmente en `SiteLayout` dentro de `MouseProvider`, y se activan segun el atributo `data-cursor` del elemento bajo el puntero.

## Arquitectura

- `src/shared/context/MouseContext.tsx` centraliza la posicion global del mouse, el tipo de cursor activo y el contenedor activo.
- `cursorType` puede ser `none`, `inversion` o `dot`.
- En cada `mousemove`, el contexto busca `element.closest("[data-cursor]")`.
- Si encuentra un contenedor con `data-cursor`, toma su valor y lo guarda como cursor activo.
- Si no encuentra un contenedor, vuelve a `none`, salvo cuando el mouse esta sobre la navbar.
- `SiteLayout` no monta los cursores en viewports chicos o dispositivos touch.

## Activacion Por Seccion

- `data-cursor="inversion"` activa `InversionCursor`.
- `data-cursor="dot"` activa `DotCursor`.
- La clase `cursor-none` se usa en las zonas interactivas para ocultar el cursor nativo.
- En mobile/touch, `src/styles/index.css` fuerza el cursor nativo con `cursor: auto !important`.

## Navbar

La navbar usa un estado especial: `isOverNavbar`.

- `Navbar` llama `setIsOverNavbar(true)` en `onMouseEnter`.
- `Navbar` llama `setIsOverNavbar(false)` en `onMouseLeave`.
- Mientras `isOverNavbar` es `true`, `DotCursor` se muestra aunque la seccion de fondo use `inversion`.
- `InversionCursor` se oculta cuando `isOverNavbar` es `true`.

## InversionCursor

Archivo: `src/shared/components/Cursor/InversionCursor.tsx`

Visible cuando:

- `cursorType === "inversion"`
- `isOverNavbar === false`

Estados:

- Normal: circulo blanco grande con `mix-blend-difference`.
- Clickable: cambia de tamano, agrega borde celeste, glow y ondas internas.
- Pressed: reduce la escala interactiva a `0.8`.
- Entrada: cuando empieza a mostrarse, arranca al `35%` de escala y crece hasta su escala final con un timer corto.
- Movimiento rapido: escala dinamicamente segun velocidad del mouse.
- Cerca del borde vertical del contenedor activo: se achica usando `boundaryScale`.

Notas:

- El contenedor activo viene de `MouseContext.activeContainer`.
- El efecto de borde usa `activeContainer.getBoundingClientRect()`.
- El cursor oculta el cursor nativo escribiendo `document.body.style.cursor = "none"` mientras esta visible.

## DotCursor

Archivo: `src/shared/components/Cursor/DotCursor.tsx`

Visible cuando:

- `cursorType === "dot"`
- o `isOverNavbar === true`

Estados:

- Normal: punto celeste pequeno con glow.
- Clickable: se transforma en capsula con gradiente y etiqueta.
- Click: crea un ripple global en la posicion del click.

Etiquetas actuales:

- Enlaces a PDF: `VER`
- Enlaces `mailto:`: `ENVIAR`
- Resto de enlaces o botones: `IR A`

Notas:

- Detecta clickables con `a`, `button` y `[role="button"]`.
- Evita transformarse en mobile usando `window.innerWidth < 768`.
- Cuando el cursor activo es `inversion`, solo entra en estado clickable si esta sobre navbar.

## Versiones Archivadas

Existen implementaciones anteriores en:

- `src/shared/components/Cursor/archive/LegacyDotCursor.tsx`
- `src/shared/components/Cursor/archive/LegacyInversionCursor.tsx`

Estas versiones dependian de `containerRef`. Las versiones actuales son globales y se controlan con `data-cursor`.

## Puntos De Cuidado

- `DotCursor` e `InversionCursor` escriben `document.body.style.cursor`; si se modifica la visibilidad, conviene evitar condiciones donde una limpieza restaure el cursor nativo mientras otro cursor sigue activo.
- `MouseContext` reinstala listeners cuando cambia `isOverNavbar`, porque esta en las dependencias del `useEffect`.
- `DotCursor.getLabel` calcula texto del elemento, pero actualmente siempre devuelve una etiqueta fija segun tipo de enlace.
