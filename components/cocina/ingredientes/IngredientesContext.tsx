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

interface IngredientesContextValue {
  ingredientesSeleccionados: IngredienteId[];
  guardarIngredientes: (seleccionados: IngredienteId[]) => void;
}

const IngredientesContext = createContext<IngredientesContextValue | null>(null);

export function IngredientesProvider({ children }: { children: ReactNode }) {
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<IngredienteId[]>([]);

  const guardarIngredientes = useCallback((seleccionados: IngredienteId[]) => {
    setIngredientesSeleccionados([...new Set(seleccionados)]);
  }, []);

  const valor = useMemo(
    () => ({ ingredientesSeleccionados, guardarIngredientes }),
    [ingredientesSeleccionados, guardarIngredientes],
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
