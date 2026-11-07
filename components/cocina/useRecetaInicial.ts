'use client';

import { useEffect, useState } from 'react';
import {
  useIngredientes,
  type EstacionRecetaId,
} from '@/components/cocina/ingredientes/IngredientesContext';

export default function useRecetaInicial(estacion: EstacionRecetaId) {
  const { recetasInicialesMostradas, marcarRecetaInicialMostrada } = useIngredientes();
  const [abierta, setAbierta] = useState(() => !recetasInicialesMostradas[estacion]);

  useEffect(() => {
    if (!recetasInicialesMostradas[estacion]) {
      marcarRecetaInicialMostrada(estacion);
    }
  }, [estacion, marcarRecetaInicialMostrada, recetasInicialesMostradas]);

  return {
    abierta,
    cerrar: () => setAbierta(false),
  };
}
