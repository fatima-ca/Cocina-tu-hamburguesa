'use client';

import { useEffect, useState } from 'react';

export type EstacionRecetaId =
  | 'ingredientes'
  | 'papas'
  | 'carne'
  | 'pan'
  | 'ensamblaje';

const PREFIJO_RECETA_VISTA = 'cocina:receta-inicial-vista:';

export default function useRecetaInicial(estacion: EstacionRecetaId) {
  const clave = `${PREFIJO_RECETA_VISTA}${estacion}`;
  const [abierta, setAbierta] = useState(
    () => typeof window !== 'undefined' && window.sessionStorage.getItem(clave) !== 'true',
  );

  useEffect(() => {
    if (abierta) window.sessionStorage.setItem(clave, 'true');
  }, [abierta, clave]);

  return {
    abierta,
    cerrar: () => setAbierta(false),
  };
}
