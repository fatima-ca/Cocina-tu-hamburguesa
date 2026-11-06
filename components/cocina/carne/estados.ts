import type { EstatusCarne, FormaCarne, LadoCarneEstatus } from '@/components/DATA/types';
import type { LadoCarne } from '@/components/cocina/cocinar/CronometroContext';

const patronEstatusCarne = /^carne_(noformada|formada)_a-(crudo|cocido|quemado)_b-(crudo|cocido|quemado)$/;

export function validarEstatusCarne(estatus: string): EstatusCarne {
  if (!patronEstatusCarne.test(estatus)) {
    throw new Error(`Estatus de carne no válido: "${estatus}"`);
  }
  return estatus as EstatusCarne;
}

export function formarCarne(estatus: string): EstatusCarne {
  const estatusValido = validarEstatusCarne(estatus);
  return estatusValido.replace('noformada', 'formada') as EstatusCarne;
}

export function actualizarLadoCarne(
  estatus: string,
  lado: LadoCarne,
  resultado: LadoCarneEstatus,
): EstatusCarne {
  const estatusValido = validarEstatusCarne(estatus);
  const expresionLado = new RegExp(`(${lado}-)(crudo|cocido|quemado)`);
  return estatusValido.replace(expresionLado, `$1${resultado}`) as EstatusCarne;
}

export function obtenerResultadoCoccionCarne(tiempoEnSegundos: number): LadoCarneEstatus {
  if (tiempoEnSegundos <= 110) return 'crudo';
  if (tiempoEnSegundos <= 120) return 'cocido';
  return 'quemado';
}

export function esCarneFormada(estatus: string): boolean {
  return validarEstatusCarne(estatus).startsWith('carne_formada_');
}

export function obtenerFormaCarne(estatus: string): FormaCarne {
  return esCarneFormada(estatus) ? 'formada' : 'noformada';
}
