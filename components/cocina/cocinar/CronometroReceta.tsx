'use client';

import Cronometro from './Cronometro';
import { TipoCronometro, useCronometros } from './CronometroContext';

const etiquetas: Record<TipoCronometro, string> = {
  papas: 'Friendo',
  carne: 'Cocinando',
  pan: 'Tostando',
};

export default function CronometroReceta({ tipo }: { tipo: TipoCronometro }) {
  const { cronometros } = useCronometros();
  const cronometro = cronometros[tipo];

  if (!cronometro.activo) return null;

  return (
    <div className="mt-6 flex justify-center">
      <Cronometro
        tiempoInicial={cronometro.duracion}
        tiempoRestante={cronometro.tiempoRestante}
        activo={cronometro.activo}
        titulo={etiquetas[tipo]}
        mostrarBotonDetener={false}
      />
    </div>
  );
}
