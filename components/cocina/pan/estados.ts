import type { EstatusPan, PreparacionPan } from '@/components/DATA/types';

const estadosValidos: readonly EstatusPan[] = [
  'pan_completo',
  'pan_tostado',
  'pan_quemado',
  'pan_cortado',
  'pan_cortado_tostado',
  'pan_cortado_quemado',
];

export function validarEstatusPan(estatus: string): EstatusPan {
  if (!estadosValidos.includes(estatus as EstatusPan)) {
    throw new Error(`Estatus de pan no válido: "${estatus}"`);
  }
  return estatus as EstatusPan;
}

export function cortarPan(estatus: string): EstatusPan {
  const preparacion = obtenerPreparacionPan(estatus);
  return preparacion === 'cortado' ? validarEstatusPan(estatus) : 'pan_cortado';
}

export function obtenerPreparacionPan(estatus: string): PreparacionPan {
  return validarEstatusPan(estatus).startsWith('pan_cortado') ? 'cortado' : 'completo';
}

export function obtenerEstatusTostado(
  estatusBase: string,
  segundosTranscurridos: number,
): EstatusPan {
  const preparacion = obtenerPreparacionPan(estatusBase);
  const prefijo = `pan_${preparacion}`;

  if (segundosTranscurridos > 120) {
    return `${prefijo}_quemado` as EstatusPan;
  }
  if (segundosTranscurridos >= 110) {
    return `${prefijo}_tostado` as EstatusPan;
  }
  return validarEstatusPan(estatusBase);
}
