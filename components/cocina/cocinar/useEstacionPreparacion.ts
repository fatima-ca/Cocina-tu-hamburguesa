'use client';

import { useCallback } from 'react';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';
import type { TipoPreparacion } from '@/components/cocina/ingredientes/IngredientesContext';

export default function useEstacionPreparacion(tipo: TipoPreparacion) {
  const {
    ingredientesSeleccionados,
    estadosPreparacion,
    guardarEstadoPreparacion,
    confirmarEstacion,
    progresoPreparacion,
    avanzarProgreso,
  } = useIngredientes();

  const ingredienteSeleccionado = ingredientesSeleccionados.includes(tipo);
  const progreso = progresoPreparacion[tipo];
  const guardarEstado = useCallback(
    (estatus: string) => guardarEstadoPreparacion(tipo, estatus),
    [guardarEstadoPreparacion, tipo],
  );
  const avanzar = useCallback(
    (paso: number) => avanzarProgreso(tipo, paso),
    [avanzarProgreso, tipo],
  );
  const confirmar = useCallback(
    () => confirmarEstacion(tipo),
    [confirmarEstacion, tipo],
  );
  const puedeRealizar = useCallback(
    (paso: number, cronometroActivo: boolean) => (
      ingredienteSeleccionado && !cronometroActivo && progreso < paso
    ),
    [ingredienteSeleccionado, progreso],
  );

  return {
    ingredienteSeleccionado,
    estatus: estadosPreparacion[tipo],
    progreso,
    guardarEstado,
    avanzar,
    confirmar,
    puedeRealizar,
  };
}
