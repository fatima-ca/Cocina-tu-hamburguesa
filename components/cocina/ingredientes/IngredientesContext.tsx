'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export type IngredienteId =
  | 'papas'
  | 'pina'
  | 'lechuga'
  | 'mostaza'
  | 'tomate'
  | 'carne'
  | 'tocino'
  | 'pan'
  | 'mayonesa'
  | 'huevo'
  | 'queso'
  | 'frijoles';

export type TipoPreparacion = 'carne' | 'pan' | 'papas';

type EstadosPreparacion = Record<TipoPreparacion, string>;

interface IngredientesContextValue {
  ingredientesSeleccionados: IngredienteId[];
  guardarIngredientes: (seleccionados: IngredienteId[]) => void;
  estadosPreparacion: EstadosPreparacion;
  guardarEstadoPreparacion: (tipo: TipoPreparacion, estatus: string) => void;
  estacionesListas: Record<TipoPreparacion, boolean>;
  confirmarEstacion: (tipo: TipoPreparacion) => void;
}

const IngredientesContext = createContext<IngredientesContextValue | null>(null);

export function IngredientesProvider({ children }: { children: ReactNode }) {
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<IngredienteId[]>([]);
  const [estadosPreparacion, setEstadosPreparacion] = useState<EstadosPreparacion>({
    carne: 'carne_noformada_a-crudo_b-crudo',
    pan: 'pan_completo',
    papas: 'papas_sucia_entera_cruda',
  });
  const [estacionesListas, setEstacionesListas] = useState<Record<TipoPreparacion, boolean>>({
    carne: false,
    pan: false,
    papas: false,
  });

  const guardarIngredientes = useCallback((seleccionados: IngredienteId[]) => {
    const ingredientesUnicos = [...new Set(seleccionados)];
    const cambiaronIngredientes = ingredientesSeleccionados.length !== ingredientesUnicos.length
      || ingredientesSeleccionados.some((ingrediente) => !ingredientesUnicos.includes(ingrediente));

    if (cambiaronIngredientes) {
      setEstacionesListas({ carne: false, pan: false, papas: false });
    }

    setIngredientesSeleccionados(ingredientesUnicos);
  }, [ingredientesSeleccionados]);

  const guardarEstadoPreparacion = useCallback((tipo: TipoPreparacion, estatus: string) => {
    setEstadosPreparacion((estadosActuales) => ({
      ...estadosActuales,
      [tipo]: estatus,
    }));
    setEstacionesListas((estacionesActuales) => ({
      ...estacionesActuales,
      [tipo]: false,
    }));
  }, []);

  const confirmarEstacion = useCallback((tipo: TipoPreparacion) => {
    setEstacionesListas((estacionesActuales) => ({
      ...estacionesActuales,
      [tipo]: true,
    }));
  }, []);

  const valor = useMemo(
    () => ({
      ingredientesSeleccionados,
      guardarIngredientes,
      estadosPreparacion,
      guardarEstadoPreparacion,
      estacionesListas,
      confirmarEstacion,
    }),
    [
      ingredientesSeleccionados,
      guardarIngredientes,
      estadosPreparacion,
      guardarEstadoPreparacion,
      estacionesListas,
      confirmarEstacion,
    ],
  );

  return (
    <IngredientesContext.Provider value={valor}>
      {children}
    </IngredientesContext.Provider>
  );
}

export function useIngredientes() {
  const context = useContext(IngredientesContext);
  if (!context) {
    throw new Error('useIngredientes debe usarse dentro de IngredientesProvider');
  }
  return context;
}
