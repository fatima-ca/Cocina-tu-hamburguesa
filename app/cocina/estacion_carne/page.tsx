'use client';

import { useEffect } from 'react';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import { carneEstatusData, DataAccionCarne } from '@/components/DATA/DataText';
import type { AccionCarne } from '@/components/DATA/types';
import EstacionLayout from '@/components/cocina/EstacionLayout';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';
import { calcularTiempoTranscurrido } from '@/components/cocina/cocinar/tiempoCoccion';
import useEstacionPreparacion from '@/components/cocina/cocinar/useEstacionPreparacion';
import {
  actualizarLadoCarne,
  formarCarne,
  obtenerResultadoCoccionCarne,
  validarEstatusCarne,
} from '@/components/cocina/carne/estados';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';

export default function EstacionCarne() {
  const { versionesReinicio } = useIngredientes();
  return <ContenidoEstacionCarne key={versionesReinicio.carne} />;
}

function ContenidoEstacionCarne() {
  const { cronometros, iniciarCarne, detener, ladoCarneEnCoccion } = useCronometros();
  const estacion = useEstacionPreparacion('carne');
  const { estatus, guardarEstado } = estacion;
  const cronometro = cronometros.carne;
  const estatusActual = validarEstatusCarne(estatus);
  const estatusVisible = cronometro.completado && ladoCarneEnCoccion
    ? actualizarLadoCarne(estatusActual, ladoCarneEnCoccion, 'quemado')
    : estatusActual;
  const estadoCarne = carneEstatusData.find((estado) => estado.estatus === estatusVisible);

  useEffect(() => {
    if (cronometro.completado && ladoCarneEnCoccion) {
      const estatusQuemado = actualizarLadoCarne(
        estatus,
        ladoCarneEnCoccion,
        'quemado',
      );
      if (estatusQuemado !== estatus) guardarEstado(estatusQuemado);
    }
  }, [cronometro.completado, estatus, guardarEstado, ladoCarneEnCoccion]);

  if (!estadoCarne) {
    throw new Error(`No hay una variante visual para la carne con estatus "${estatusVisible}"`);
  }

  const detenerCoccion = () => {
    if (!cronometro.activo) return;
    const tiempoCoccion = calcularTiempoTranscurrido(
      cronometro.duracion,
      cronometro.tiempoRestante,
      cronometro.fechaFinalizacion,
    );

    if (ladoCarneEnCoccion) {
      guardarEstado(
        actualizarLadoCarne(
          estatusActual,
          ladoCarneEnCoccion,
          obtenerResultadoCoccionCarne(tiempoCoccion),
        ),
      );
    }
    detener('carne');
  };

  const manejadores: Record<AccionCarne, () => void> = {
    formar: () => {
      if (!estacion.puedeRealizar(1, cronometro.activo)) return;
      guardarEstado(formarCarne(estatusActual));
      estacion.avanzar(1);
    },
    coccion_1: () => {
      if (!estacion.puedeRealizar(2, cronometro.activo)) return;
      estacion.avanzar(2);
      iniciarCarne('a');
    },
    coccion_2: () => {
      if (!estacion.puedeRealizar(3, cronometro.activo)) return;
      estacion.avanzar(3);
      iniciarCarne('b');
    },
  };
  const pasos: Record<AccionCarne, number> = { formar: 1, coccion_1: 2, coccion_2: 3 };

  return (
    <EstacionLayout
      ingredienteSeleccionado={estacion.ingredienteSeleccionado}
      estadoIngrediente={estadoCarne}
      cronometro={cronometro}
      tituloCronometro="Cocinando"
      acciones={DataAccionCarne.map((accion) => ({
        ...accion,
        accion: manejadores[accion.id],
        disabled: !estacion.puedeRealizar(pasos[accion.id], cronometro.activo),
      }))}
      receta={contenidoRecetas[2].contenido}
      onDetenerCoccion={detenerCoccion}
      onConfirmar={estacion.confirmar}
    />
  );
}
