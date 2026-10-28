import { IngredienteProps } from "./types";

export const INGREDIENTES_DISPONIBLES: IngredienteProps[] = [
    { id: 'lechuga', nombre: 'Lechuga', imagen: '/ingredientes/lechuga.png', ensamblaje: '/ingredientes/lechuga_e.png', alt: 'Lechuga' },
    { id: 'pan_base', nombre: 'Pan Base', imagen: '/ingredientes/pan_base_tostado.png', ensamblaje: '/ingredientes/pan_base_tostado.png', alt: 'Pan base de hamburguesa' },  
    { id: 'carne', nombre: 'Carne', imagen: '/ingredientes/carne_preparada.png', ensamblaje: '/ingredientes/carne_e.png', alt: 'Carne de hamburguesa' },
    { id: 'tomate', nombre: 'Tomate', imagen: '/ingredientes/tomate.png', ensamblaje: '/ingredientes/tomate_e.png', alt: 'Tomate' },
    { id: 'mayonesa', nombre: 'Mayonesa', imagen: '/ingredientes/mayonesa.png' ,ensamblaje: '/ingredientes/mayonesa_e.png', alt: 'Tomate' },
    { id: 'mostaza', nombre: 'Mostaza', imagen: '/ingredientes/mostaza.png', ensamblaje: '/ingredientes/mostaza_e.png', alt: 'Tomate' },
    { id: 'queso', nombre: 'Queso', imagen: '/ingredientes/queso.png', ensamblaje: '/ingredientes/queso_e.png', alt: 'Queso' },
    { id: 'pan_tapa', nombre: 'Pan Tapa', imagen: '/ingredientes/pan_tapa_tostado.png', ensamblaje: '/ingredientes/pan_tapa_tostado.png', alt: 'Pan superior' },
];

export const ingredientes = [
  { src: "/ingredientes/lechuga.png", nombre: "Lechuga" }, // 0 - lechuga
  { src: "/ingredientes/carne_cruda.png", nombre: "Carne" }, // 1 - carne cruda
  { src: "/ingredientes/tomate.png", nombre: "Tomate" }, // 2 - tomate
  { src: "/ingredientes/mayonesa.png", nombre: "Mayonesa" }, // 3 - mayonesa
  { src: "/ingredientes/mostaza.png", nombre: "Mostaza" }, // 4 - mostaza
  { src: "/ingredientes/queso.png", nombre: "Queso" }, // 5 - queso
  { src: "/ingredientes/pan.png", nombre: "Pan" }, // 6 - pan
  { src: "/ingredientes/papas_crudas.png", nombre: "Papas" }, // 7 - papas crudas
];

export const pasosPapas = [
    { src: "/ingredientes/papas_lavadas.png", num:"1", instruccion: "Lavar las papas" },
    { src: "/ingredientes/papas_cortadas.png", num:"2", instruccion: "Cortar las papas" },
    { src: "/ingredientes/papas_freidas.png", num:"3", instruccion: "Cocción de papas [5min]" },
];

export const pasosCarne = [
    { src: "/ingredientes/carne_formada.png", num:"1", instruccion: "Formar la carne" },
    { src: "/ingredientes/carne_formada_mitad_sarten.png", num:"2", instruccion: "Cocción por lado 1 [2min]" },
    { src: "/ingredientes/carne_lista_sarten.png", num:"3", instruccion: "Cocción por lado 2 [2min]" },
];

export const pasosPan = [
    { src: "/ingredientes/pan_cortado.png", num:"1", instruccion: "Cortar el pan" },
    { src: "/ingredientes/pan_cortado_tostado.png", num:"2", instruccion: "Tostar el pan" },
];

export const pasosEnsamblaje = [
    { src: "/ingredientes/pan_base_tostado.png", num:"1", instruccion: "Colocar la base de pan" },
    { src: "/ingredientes/carne_lista.png", num:"2", instruccion: "Colocar la carne preparada" },
    { src: "/ingredientes/queso.png", num:"3", instruccion: "Colocar el queso" },
    { src: "/ingredientes/tomate.png", num:"4", instruccion: "Colocar el tomato" },
    { src: "/ingredientes/lechuga.png", num:"5", instruccion: "Colocar la lechuga" },
    { src: "/ingredientes/mostaza.png", num:"6", instruccion: "Untar la mostaza" },
    { src: "/ingredientes/mayonesa.png", num:"7", instruccion: "Untar la mayonesa" },
    { src: "/ingredientes/pan_tapa_tostado.png", num:"8", instruccion: "Colocar la tapa de pan" },
];




{/* Accion ingredientes */}

{/* Datos de las acciones disponibles para las papas*/}
export const DataAccionPapas = [
    { id: "lavar",  label: "Lavar",   src: "/ingredientes/icono_lavar_papas.png",   alt: "Boton para lavar las papas" },
    { id: "cortar", label: "Cortar",  src: "/ingredientes/icono_cuchillo.png",      alt: "Boton para cortar las papas" },
    { id: "freir",  label: "Cocción", src: "/ingredientes/icono_coccion_papas.png", alt: "Boton para freir las papas" },
];

{/* Datos de las acciones disponibles para la carne */}
export const DataAccionCarne = [
  { id: "formar",    label: "Formar",         src: "/ingredientes/icono_formar_carne.png",   alt: "Boton para formar la carne" },
  { id: "coccion_1", label: "Cocción lado 1", src: "/ingredientes/icono_coccion_1.png",      alt: "Boton de coccion por un lado" },
  { id: "coccion_2", label: "Cocción lado 2", src: "/ingredientes/icono_coccion_2.png",      alt: "Boton de coccion por el otro lado" },
];

{/* Datos de las acciones disponibles para el pan */}
export const DataAccionPan = [
  { id: "cortar",  label: "Cortar",   src: "/ingredientes/icono_cuchillo.png",   alt: "Boton para cortar el pan" },
  { id: "tostar", label: "Tostar",  src: "/ingredientes/icono_tostadora.png",      alt: "Boton para tostar el pan" },
];




{/* Estatus ingredientes */}

{/* Estatus papas */}
export const papasEstatusData = [
    { estatus: "papas_sucias",      src: "/ingredientes/papas_crudas.png",      alt: "Estado actual de las papas: sucias" },
    { estatus: "papas_limpias",     src: "/ingredientes/papas_limpias.png",     alt: "Estado actual de las papas: limpias" },
    { estatus: "papas_cortadas",    src: "/ingredientes/papas_cortadas.png",    alt: "Estado actual de las papas: cortadas" },
    { estatus: "papas_friendo",      src: "/ingredientes/papas_freidas.png",      alt: "Estado actual de las papas: friendo" },
]

{/* Estatus carne */}
export const carneEstatusData = [
  { estatus: "carne_cruda",   src: "/ingredientes/carne_cruda.png",         alt: "Estado actual de la carne: cruda" },
  { estatus: "carne_formada", src: "/ingredientes/carne_formada.png",       alt: "Estado actual de la carne: formada" },
  { estatus: "coccion_1",     src: "/ingredientes/carne_formada_mitad_sarten.png",  alt: "Estado actual de la carne: coccion por un lado uwu" },
  { estatus: "coccion_2",     src: "/ingredientes/carne_lista_sarten.png",  alt: "Estado actual de la carne: coccion por los dos lados" },
];

{/* Estatus pan */}
export const panEstatusData = [
    { estatus: "pan_completo",      src: "/ingredientes/pan.png",      alt: "Estado actual del pan: completo" },
    { estatus: "pan_cortado",     src: "/ingredientes/pan_cortado.png",     alt: "Estado actual del pan: cortado" },
    { estatus: "pan_tostado",    src: "/ingredientes/pan_cortado_tostado.png",    alt: "Estado actual del: tostado" },
]