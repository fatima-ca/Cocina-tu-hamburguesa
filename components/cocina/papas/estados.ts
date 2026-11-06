import type { CoccionPapas, CortePapas, EstatusPapas, LimpiezaPapas } from '@/components/DATA/types';

type AtributosPapas = {
  limpieza: LimpiezaPapas;
  corte: CortePapas;
  coccion: CoccionPapas;
};

function esLimpiezaPapas(valor: string): valor is LimpiezaPapas {
  return valor === 'sucia' || valor === 'limpia';
}

function esCortePapas(valor: string): valor is CortePapas {
  return valor === 'entera' || valor === 'cortada';
}

function esCoccionPapas(valor: string): valor is CoccionPapas {
  return valor === 'cruda' || valor === 'cocida' || valor === 'quemada';
}

export function validarEstatusPapas(estatus: string): EstatusPapas {
  const [ingrediente, limpieza, corte, coccion, ...resto] = estatus.split('_');

  if (
    ingrediente !== 'papas'
    || !esLimpiezaPapas(limpieza)
    || !esCortePapas(corte)
    || !esCoccionPapas(coccion)
    || resto.length > 0
  ) {
    throw new Error(`Estatus de papas no válido: "${estatus}"`);
  }

  return crearEstatusPapas({ limpieza, corte, coccion });
}

function crearEstatusPapas({ limpieza, corte, coccion }: AtributosPapas): EstatusPapas {
  return `papas_${limpieza}_${corte}_${coccion}`;
}

function leerAtributosPapas(estatus: string): AtributosPapas {
  const estatusValido = validarEstatusPapas(estatus);
  const [, limpieza, corte, coccion] = estatusValido.split('_');

  if (!esLimpiezaPapas(limpieza) || !esCortePapas(corte) || !esCoccionPapas(coccion)) {
    throw new Error(`No se pudieron leer los atributos del estatus: "${estatusValido}"`);
  }

  return { limpieza, corte, coccion };
}

export function lavarPapas(estatus: string): EstatusPapas {
  const atributos = leerAtributosPapas(estatus);
  if (atributos.coccion !== 'cruda') {
    throw new Error(`No se pueden lavar papas con estatus "${estatus}"`);
  }

  return crearEstatusPapas({ ...atributos, limpieza: 'limpia' });
}

export function cortarPapas(estatus: string): EstatusPapas {
  const atributos = leerAtributosPapas(estatus);
  if (atributos.coccion !== 'cruda') {
    throw new Error(`No se pueden cortar papas con estatus "${estatus}"`);
  }

  return crearEstatusPapas({ ...atributos, corte: 'cortada' });
}

export function aplicarResultadoCoccion(
  estatus: string,
  resultado: CoccionPapas,
): EstatusPapas {
  return crearEstatusPapas({ ...leerAtributosPapas(estatus), coccion: resultado });
}

export function obtenerResultadoCoccion(tiempoEnSegundos: number): CoccionPapas {
  if (tiempoEnSegundos <= 290) return 'cruda';
  if (tiempoEnSegundos <= 300) return 'cocida';
  return 'quemada';
}
