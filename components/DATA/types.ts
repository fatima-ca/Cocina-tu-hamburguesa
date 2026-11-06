export type IngredienteProps = {
  id: string;
  nombre: string;
  imagen: string;
  ensamblaje: string;
  alt: string;
};


export type IngredienteEstatusProps = {
  estatus: string;
  src: string;
  alt: string;
  blur?: boolean;
};


// Los tipos de estatus de las papas se definen como una combinación de limpieza, corte y cocción. Esto permite representar de manera precisa el estado actual de las papas en la aplicación.
export type LimpiezaPapas = 'sucia' | 'limpia';
export type CortePapas = 'entera' | 'cortada';
export type CoccionPapas = 'cruda' | 'cocida' | 'quemada';
export type EstatusPapas = `papas_${LimpiezaPapas}_${CortePapas}_${CoccionPapas}`;
export type AccionPapas = 'lavar' | 'cortar' | 'freir';

export type FormaCarne = 'noformada' | 'formada';
export type LadoCarneEstatus = 'crudo' | 'cocido' | 'quemado';
export type EstatusCarne = `carne_${FormaCarne}_a-${LadoCarneEstatus}_b-${LadoCarneEstatus}`;
export type AccionCarne = 'formar' | 'coccion_1' | 'coccion_2';

export type PreparacionPan = 'completo' | 'cortado';
export type ResultadoPan = 'tostado' | 'quemado';
export type EstatusPan =
  | 'pan_completo'
  | 'pan_tostado'
  | 'pan_quemado'
  | 'pan_cortado'
  | `pan_cortado_${ResultadoPan}`;
export type AccionPan = 'cortar' | 'tostar';
