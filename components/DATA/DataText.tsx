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

