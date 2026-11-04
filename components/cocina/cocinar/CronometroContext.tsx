'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type TipoCronometro = 'papas' | 'carne' | 'pan';
export type LadoCarne = 'a' | 'b';

interface EstadoCronometro {
  activo: boolean;
  completado: boolean;
  tiempoRestante: number;
  duracion: number;
  fechaFinalizacion: number | null;
}

type Cronometros = Record<TipoCronometro, EstadoCronometro>;

interface CronometroContextValue {
  cronometros: Cronometros;
  iniciar: (tipo: TipoCronometro) => void;
  iniciarCarne: (lado: LadoCarne) => void;
  detener: (tipo: TipoCronometro) => void;
  reiniciar: (tipo: TipoCronometro) => void;
  reiniciarTodos: () => void;
  alarmaPapasAtendida: boolean;
  atenderAlarmaPapas: () => void;
  alarmaCarneAtendida: boolean;
  atenderAlarmaCarne: () => void;
  ladoCarneEnCoccion: LadoCarne | null;
}

const duraciones: Record<TipoCronometro, number> = {
  papas: 360,
  carne: 180,
  pan: 200
};

const estadoInicial: Cronometros = {
  papas: {
    activo: false,
    completado: false,
    tiempoRestante: duraciones.papas,
    duracion: duraciones.papas,
    fechaFinalizacion: null,
  },
  carne: {
    activo: false,
    completado: false,
    tiempoRestante: duraciones.carne,
    duracion: duraciones.carne,
    fechaFinalizacion: null,
  },
  pan: {
    activo: false,
    completado: false,
    tiempoRestante: duraciones.pan,
    duracion: duraciones.pan,
    fechaFinalizacion: null,
  },
};

const CronometroContext = createContext<CronometroContextValue | null>(null);

export function CronometroProvider({ children }: { children: ReactNode }) {
  const [cronometros, setCronometros] = useState<Cronometros>(estadoInicial);
  const [alarmaPapasAtendida, setAlarmaPapasAtendida] = useState(false);
  const [alarmaCarneAtendida, setAlarmaCarneAtendida] = useState(false);
  const [ladoCarneEnCoccion, setLadoCarneEnCoccion] = useState<LadoCarne | null>(null);

  const iniciar = useCallback((tipo: TipoCronometro) => {
    if (tipo === 'papas') {
      setAlarmaPapasAtendida(false);
    }
    if (tipo === 'carne') {
      setAlarmaCarneAtendida(false);
    }

    setCronometros((actuales) => {
      const cronometro = actuales[tipo];
      return {
        ...actuales,
        [tipo]: {
          ...cronometro,
          activo: true,
          completado: false,
          tiempoRestante: cronometro.duracion,
          fechaFinalizacion: Date.now() + cronometro.duracion * 1000,
        },
      };
    });
  }, []);

  const iniciarCarne = useCallback((lado: LadoCarne) => {
    setLadoCarneEnCoccion(lado);
    iniciar('carne');
  }, [iniciar]);

  const detener = useCallback((tipo: TipoCronometro) => {
    setCronometros((actuales) => {
      const cronometro = actuales[tipo];
      const tiempoRestante = cronometro.fechaFinalizacion
        ? Math.max(0, Math.ceil((cronometro.fechaFinalizacion - Date.now()) / 1000))
        : cronometro.tiempoRestante;

      return {
        ...actuales,
        [tipo]: {
          ...cronometro,
          activo: false,
          completado: tiempoRestante === 0,
          tiempoRestante,
          fechaFinalizacion: null,
        },
      };
    });
  }, []);

  const reiniciar = useCallback((tipo: TipoCronometro) => {
    setCronometros((actuales) => ({
      ...actuales,
      [tipo]: { ...estadoInicial[tipo] },
    }));

    if (tipo === 'papas') {
      setAlarmaPapasAtendida(false);
    }
    if (tipo === 'carne') {
      setAlarmaCarneAtendida(false);
      setLadoCarneEnCoccion(null);
    }
  }, []);

  const reiniciarTodos = useCallback(() => {
    setCronometros(estadoInicial);
    setAlarmaPapasAtendida(false);
    setAlarmaCarneAtendida(false);
    setLadoCarneEnCoccion(null);
  }, []);

  const atenderAlarmaPapas = useCallback(() => {
    setAlarmaPapasAtendida(true);
  }, []);

  const atenderAlarmaCarne = useCallback(() => {
    setAlarmaCarneAtendida(true);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCronometros((actuales) => {
        let cambio = false;
        const siguientes = { ...actuales };

        (Object.keys(actuales) as TipoCronometro[]).forEach((tipo) => {
          const cronometro = actuales[tipo];
          if (!cronometro.activo || cronometro.fechaFinalizacion === null) return;

          const tiempoRestante = Math.max(
            0,
            Math.ceil((cronometro.fechaFinalizacion - Date.now()) / 1000),
          );
          const activo = tiempoRestante > 0;

          if (tiempoRestante !== cronometro.tiempoRestante || activo !== cronometro.activo) {
            siguientes[tipo] = {
              ...cronometro,
              activo,
              completado: tiempoRestante === 0,
              tiempoRestante,
              fechaFinalizacion: activo ? cronometro.fechaFinalizacion : null,
            };
            cambio = true;
          }
        });

        return cambio ? siguientes : actuales;
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  const valor = useMemo(
    () => ({
      cronometros,
      iniciar,
      iniciarCarne,
      detener,
      reiniciar,
      reiniciarTodos,
      alarmaPapasAtendida,
      atenderAlarmaPapas,
      alarmaCarneAtendida,
      atenderAlarmaCarne,
      ladoCarneEnCoccion,
    }),
    [
      cronometros,
      iniciar,
      iniciarCarne,
      detener,
      reiniciar,
      reiniciarTodos,
      alarmaPapasAtendida,
      atenderAlarmaPapas,
      alarmaCarneAtendida,
      atenderAlarmaCarne,
      ladoCarneEnCoccion,
    ],
  );

  return <CronometroContext.Provider value={valor}>{children}</CronometroContext.Provider>;
}

export function useCronometros() {
  const context = useContext(CronometroContext);
  if (!context) {
    throw new Error('useCronometros debe usarse dentro de CronometroProvider');
  }
  return context;
}
