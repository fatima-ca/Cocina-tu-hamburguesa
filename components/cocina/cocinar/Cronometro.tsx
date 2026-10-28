'use client';
import { useState, useEffect } from 'react';
import BtnDetenerCoccion from './BtnDetenerCoccion';

interface CronometroProps {
  tiempoInicial: number;       // Tiempo con el que inicia (ej: 120)
  activo: boolean;             // Controla si está corriendo
  titulo: string;
  onDetener?: () => void;      // Callback cuando el usuario lo detiene
  onFinalizar?: () => void;    // Callback cuando llega a 0
}

export default function Cronometro( {tiempoInicial, activo, onDetener, titulo, onFinalizar}: CronometroProps) {
  const [tiempoRestante, setTiempoRestante] = useState<number>(tiempoInicial);

  // Resetear el tiempo cuando se activa el cronómetro
  useEffect(() => {
    if (activo) {
      setTiempoRestante(tiempoInicial);
    }
  }, [activo, tiempoInicial]);

  // Lógica del intervalo
  useEffect(() => {
    if (!activo || tiempoRestante <= 0) return;

    const interval = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          onFinalizar?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activo, tiempoRestante, onFinalizar]);

  const handleDetener = () => {
    onDetener?.();
  };

  // Progreso del círculo (usamos tiempoInicial como máximo)
  const progreso = (tiempoRestante / tiempoInicial) * 283;

  if (!activo) return null;

  return (
    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
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

            <span className="relative z-10 text-5xl font-black text-white drop-shadow-lg">
              {tiempoRestante}
            </span>
          </div>
        </div>

        <span className="rounded-full bg-white/90 px-4 py-1 text-sm font-bold uppercase tracking-wide text-orange-700 shadow-lg">
          {titulo}
        </span>
      </div>

      {/* Botón de detener cocción */}
      <BtnDetenerCoccion accion={handleDetener} />
    </div>
  );
}