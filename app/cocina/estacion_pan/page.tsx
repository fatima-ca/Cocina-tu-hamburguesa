'use client';

import { useEffect, useState } from 'react';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import { DataAccionPan, panEstatusData } from '@/components/DATA/DataText';
import type { AccionPan, EstatusPan } from '@/components/DATA/types';
import EstacionLayout from '@/components/cocina/EstacionLayout';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';
import { calcularTiempoTranscurrido } from '@/components/cocina/cocinar/tiempoCoccion';
import useEstacionPreparacion from '@/components/cocina/cocinar/useEstacionPreparacion';
import {
  cortarPan,
  obtenerEstatusTostado,
  validarEstatusPan,
} from '@/components/cocina/pan/estados';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';

export default function EstacionPan() {
  const { versionesReinicio } = useIngredientes();
  return <ContenidoEstacionPan key={versionesReinicio.pan} />;
}

function ContenidoEstacionPan() {
  const { cronometros, iniciar, detener } = useCronometros();
  const estacion = useEstacionPreparacion('pan');
  const { estatus, guardarEstado } = estacion;
  const cronometro = cronometros.pan;
  const estatusActual = validarEstatusPan(estatus);
  const [estatusBaseTostado, setEstatusBaseTostado] = useState<EstatusPan>(estatusActual);
  const tiempoTranscurrido = cronometro.duracion - cronometro.tiempoRestante;
  const estatusVisible = cronometro.activo || cronometro.completado
    ? obtenerEstatusTostado(
      estatusBaseTostado,
      cronometro.completado ? cronometro.duracion : tiempoTranscurrido,
    )
    : estatusActual;
  const estadoPan = panEstatusData.find((estado) => estado.estatus === estatusVisible);

  useEffect(() => {
    if (cronometro.completado) {
      const estatusFinal = obtenerEstatusTostado(estatusBaseTostado, cronometro.duracion);
      if (estatusFinal !== estatus) guardarEstado(estatusFinal);
    }
  }, [
    cronometro.completado,
    cronometro.duracion,
    estatus,
    guardarEstado,
    estatusBaseTostado,
  ]);

  if (!estadoPan) {
    throw new Error(`No hay una variante visual para el pan con estatus "${estatusVisible}"`);
  }

  const detenerTostado = () => {
    if (!cronometro.activo) return;
    const tiempoTostado = calcularTiempoTranscurrido(
      cronometro.duracion,
      cronometro.tiempoRestante,
      cronometro.fechaFinalizacion,
    );

    detener('pan');
    guardarEstado(obtenerEstatusTostado(estatusBaseTostado, tiempoTostado));
  };

  const manejadores: Record<AccionPan, () => void> = {
    cortar: () => {
      if (!estacion.puedeRealizar(1, cronometro.activo)) return;
      const nuevoEstatus = cortarPan(estatusActual);
      guardarEstado(nuevoEstatus);
      setEstatusBaseTostado(nuevoEstatus);
      estacion.avanzar(1);
    },
    tostar: () => {
      if (!estacion.puedeRealizar(2, cronometro.activo)) return;
      setEstatusBaseTostado(estatusActual);
      estacion.avanzar(2);
      iniciar('pan');
    },
  };
  const pasos: Record<AccionPan, number> = { cortar: 1, tostar: 2 };

  return (
    <EstacionLayout
      estacionId="pan"
      ingredienteSeleccionado={estacion.ingredienteSeleccionado}
      estadoIngrediente={estadoPan}
      cronometro={cronometro}
      tituloCronometro="Tostando"
      acciones={DataAccionPan.map((accion) => ({
        ...accion,
        accion: manejadores[accion.id],
        disabled: !estacion.puedeRealizar(pasos[accion.id], cronometro.activo),
      }))}
      receta={contenidoRecetas[3].contenido}
      onDetenerCoccion={detenerTostado}
      onConfirmar={estacion.confirmar}
    />
  );
}
