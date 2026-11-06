# `EstacionLayout`

`EstacionLayout` es el componente visual compartido por las estaciones de papas,
carne y pan. Renderiza el fondo, los botones generales, el cronómetro, la imagen
del ingrediente, los botones de acción y la receta. No implementa las reglas
específicas de preparación: cada página de estación debe proporcionar sus datos y
callbacks.

## Importación

```tsx
import EstacionLayout from '@/components/cocina/EstacionLayout';
```

## Uso

```tsx
<EstacionLayout
  ingredienteSeleccionado={ingredienteSeleccionado}
  estadoIngrediente={estadoVisual}
  cronometro={{
    duracion: cronometro.duracion,
    tiempoRestante: cronometro.tiempoRestante,
    activo: cronometro.activo,
  }}
  tituloCronometro="Friendo"
  acciones={acciones.map((accion) => ({
    ...accion,
    accion: manejadores[accion.id],
    disabled: !puedeRealizar(accion.paso, cronometro.activo),
  }))}
  receta={contenidoRecetas[1].contenido}
  onDetenerCoccion={detenerCoccion}
  onConfirmar={confirmarEstacion}
/>
```

El ejemplo es ilustrativo: cada estación define sus propios datos de acciones,
sus reglas para habilitarlas y la receta que le corresponde.

## Props

| Prop | Tipo | Descripción |
|---|---|---|
| `ingredienteSeleccionado` | `boolean` | Indica si el ingrediente de esta estación está seleccionado. Si es `false`, no se muestra su imagen, se deshabilitan las acciones y también el botón **Listo**. |
| `estadoIngrediente` | `IngredienteEstatusProps` | Variante visual actual del ingrediente: `estatus`, `src` y `alt`. La imagen conserva sus colores originales y se desenfoca mientras el cronómetro está activo. |
| `cronometro` | `{ duracion: number; tiempoRestante: number; activo: boolean }` | Datos que muestra el cronómetro. `duracion` y `tiempoRestante` se expresan en segundos; `activo` determina si se muestra y si bloquea las acciones. |
| `tituloCronometro` | `string` | Texto mostrado como título del cronómetro, por ejemplo `"Friendo"`, `"Cocinando"` o `"Tostando"`. |
| `acciones` | `AccionEstacion[]` | Botones que aparecen en la estación, con su contenido, callback y estado de deshabilitado. |
| `receta` | `ReactNode` | Contenido que se muestra dentro de la pantalla de receta. El diálogo se abre inicialmente y el propio layout gestiona su cierre. |
| `onDetenerCoccion` | `() => void` | Callback ejecutado al pulsar el botón de detener del cronómetro. Debe resolver la regla de cocción específica de la estación. |
| `onConfirmar` | `() => void` | Callback del botón **Listo**, normalmente usado para confirmar la estación en el contexto. Después de ejecutarlo, el layout navega a `/cocina`. |

### Forma de cada acción

Cada elemento de `acciones` tiene esta forma:

```ts
{
  id: string;
  src: string;
  alt: string;
  label: string;
  accion: () => void;
  disabled: boolean;
}
```

- `id`: identificador único usado como `key` de React.
- `src`: ruta de la imagen del botón.
- `alt`: texto alternativo de esa imagen.
- `label`: etiqueta visible.
- `accion`: función ejecutada al pulsar el botón.
- `disabled`: bloqueo específico definido por la estación, por ejemplo si el paso
  ya se realizó. El layout también deshabilita todas las acciones cuando el
  ingrediente no está seleccionado o el cronómetro está activo.

## Comportamiento que aporta el layout

- El botón **Listo** se deshabilita si el ingrediente no está seleccionado o el
  cronómetro está activo.
- El ingrediente solo se renderiza si está seleccionado.
- El ingrediente se desenfoca mientras el cronómetro está activo y recupera su nitidez cuando se detiene.
- No aplica filtros de color al ingrediente, incluido cuando está quemado.
- Todas las acciones se deshabilitan durante la cocción y cuando el ingrediente
  no está seleccionado, además del bloqueo recibido en `acciones`.
- La receta inicia abierta y se puede cerrar desde `PantallaReceta`.

La lógica de transición de estados, el progreso de pasos, los umbrales de
cocción y el inicio o detención del cronómetro pertenecen a la página o a los
módulos de estado de cada estación, no a `EstacionLayout`.
