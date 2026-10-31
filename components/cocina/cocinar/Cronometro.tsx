'use client';
import BtnDetenerCoccion from './BtnDetenerCoccion';

interface CronometroProps {
  tiempoInicial: number;
  tiempoRestante: number;
  activo: boolean;
  titulo: string;
  onDetener?: () => void;
  mostrarBotonDetener?: boolean;
}

export default function Cronometro({
  tiempoInicial,
  tiempoRestante,
  activo,
  onDetener,
  titulo,
  mostrarBotonDetener = true,
}: CronometroProps) {
  const handleDetener = () => {
    onDetener?.();
  };

  const tiempoTranscurrido = Math.max(0, tiempoInicial - tiempoRestante);
  const minutos = Math.floor(tiempoTranscurrido / 60).toString().padStart(2, '0');
  const segundos = (tiempoTranscurrido % 60).toString().padStart(2, '0');
  const progreso = (tiempoTranscurrido / tiempoInicial) * 283;

  if (!activo) return null;

  return (
    <div className="flex flex-col items-center gap-6 animate-in duration-300">
      {/* Cronómetro */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-orange-500 to-red-600 opacity-20 blur-xl" />
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-orange-500 bg-linear-to-br from-orange-400 to-red-500 shadow-2xl">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeDasharray={`${progreso} 283`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>

            <span className="relative z-10 text-5xl font-black tabular-nums text-white drop-shadow-lg">
              {minutos}:{segundos}
            </span>
          </div>
        </div>

        <span className="rounded-full bg-white/90 px-4 py-1 text-sm font-bold uppercase tracking-wide text-orange-700 shadow-lg">
          {titulo}
        </span>
      </div>

      {mostrarBotonDetener && <BtnDetenerCoccion accion={handleDetener} />}
    </div>
  );
}