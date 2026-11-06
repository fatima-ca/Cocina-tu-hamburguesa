'use client';

import { useEffect, useState } from 'react';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import { DataAccionPapas, papasEstatusData } from '@/components/DATA/DataText';
import type { AccionPapas, EstatusPapas } from '@/components/DATA/types';
import EstacionLayout from '@/components/cocina/EstacionLayout';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';
import { calcularTiempoTranscurrido } from '@/components/cocina/cocinar/tiempoCoccion';
import useEstacionPreparacion from '@/components/cocina/cocinar/useEstacionPreparacion';
import {
  aplicarResultadoCoccion,
  cortarPapas,
  lavarPapas,
  obtenerResultadoCoccion,
  validarEstatusPapas,
} from '@/components/cocina/papas/estados';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';

export default function EstacionPapas() {
  const { versionesReinicio } = useIngredientes();
  return <ContenidoEstacionPapas key={versionesReinicio.papas} />;
}

function ContenidoEstacionPapas() {
  const { cronometros, iniciar, detener } = useCronometros();
  const estacion = useEstacionPreparacion('papas');
  const { estatus, guardarEstado } = estacion;
  const cronometro = cronometros.papas;
  const estatusActual = validarEstatusPapas(estatus);
  const [estatusBaseCoccion, setEstatusBaseCoccion] = useState<EstatusPapas>(estatusActual);
  const estatusVisible = cronometro.completado
    ? aplicarResultadoCoccion(estatusBaseCoccion, 'quemada')
    : estatusActual;
  const estadoPapas = papasEstatusData.find((estado) => estado.estatus === estatusVisible);

  useEffect(() => {
    if (cronometro.completado && estatusActual !== estatusVisible) {
      guardarEstado(estatusVisible);
    }
  }, [cronometro.completado, estatusActual, estatusVisible, guardarEstado]);

  if (!estadoPapas) {
    throw new Error(`No hay una variante visual para las papas con estatus "${estatusVisible}"`);
  }

  const detenerCoccion = () => {
    if (!cronometro.activo) return;

    const tiempoCoccion = calcularTiempoTranscurrido(
      cronometro.duracion,
      cronometro.tiempoRestante,
      cronometro.fechaFinalizacion,
    );

    detener('papas');
    guardarEstado(
      aplicarResultadoCoccion(estatusBaseCoccion, obtenerResultadoCoccion(tiempoCoccion)),
    );
  };

  const manejadores: Record<AccionPapas, () => void> = {
    lavar: () => {
      if (!estacion.puedeRealizar(1, cronometro.activo)) return;
      const nuevoEstatus = lavarPapas(estatusActual);
      estacion.avanzar(1);
      guardarEstado(nuevoEstatus);
      setEstatusBaseCoccion(nuevoEstatus);
    },
    cortar: () => {
      if (!estacion.puedeRealizar(2, cronometro.activo)) return;
      const nuevoEstatus = cortarPapas(estatusActual);
      estacion.avanzar(2);
      guardarEstado(nuevoEstatus);
      setEstatusBaseCoccion(nuevoEstatus);
    },
    freir: () => {
      if (!estacion.puedeRealizar(3, cronometro.activo)) return;
      setEstatusBaseCoccion(estatusActual);
      estacion.avanzar(3);
      iniciar('papas');
    },
  };

  const pasos: Record<AccionPapas, number> = { lavar: 1, cortar: 2, freir: 3 };

  return (
    <EstacionLayout
      ingredienteSeleccionado={estacion.ingredienteSeleccionado}
      estadoIngrediente={estadoPapas}
      cronometro={cronometro}
      tituloCronometro="Friendo"
      acciones={DataAccionPapas.map((accion) => ({
        ...accion,
        accion: manejadores[accion.id],
        disabled: !estacion.puedeRealizar(pasos[accion.id], cronometro.activo),
      }))}
      receta={contenidoRecetas[1].contenido}
      onDetenerCoccion={detenerCoccion}
      onConfirmar={estacion.confirmar}
    />
  );
}
