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
export type EstacionRecetaId = 'ingredientes' | TipoPreparacion | 'ensamblaje';

type EstadosPreparacion = Record<TipoPreparacion, string>;
type VersionesReinicio = Record<TipoPreparacion, number>;
type ProgresoPreparacion = Record<TipoPreparacion, number>;
type RecetasInicialesMostradas = Record<EstacionRecetaId, boolean>;

const PASOS_MAXIMOS: ProgresoPreparacion = {
  carne: 3,
  pan: 2,
  papas: 3,
};

export const ESTADOS_PREPARACION_INICIALES: EstadosPreparacion = {
  carne: 'carne_noformada_a-crudo_b-crudo',
  pan: 'pan_completo',
  papas: 'papas_sucia_entera_cruda',
};

interface IngredientesContextValue {
  ingredientesSeleccionados: IngredienteId[];
  guardarIngredientes: (seleccionados: IngredienteId[]) => void;
  estadosPreparacion: EstadosPreparacion;
  guardarEstadoPreparacion: (tipo: TipoPreparacion, estatus: string) => void;
  estacionesListas: Record<TipoPreparacion, boolean>;
  confirmarEstacion: (tipo: TipoPreparacion) => void;
  recetasInicialesMostradas: RecetasInicialesMostradas;
  marcarRecetaInicialMostrada: (estacion: EstacionRecetaId) => void;
  progresoPreparacion: ProgresoPreparacion;
  avanzarProgreso: (tipo: TipoPreparacion, paso: number) => void;
  versionesReinicio: VersionesReinicio;
  reiniciarEstacion: (tipo: TipoPreparacion) => void;
  reiniciarSeleccion: () => void;
}

const IngredientesContext = createContext<IngredientesContextValue | null>(null);

export function IngredientesProvider({ children }: { children: ReactNode }) {
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<IngredienteId[]>([]);
  const [estadosPreparacion, setEstadosPreparacion] = useState<EstadosPreparacion>(
    ESTADOS_PREPARACION_INICIALES,
  );
  const [estacionesListas, setEstacionesListas] = useState<Record<TipoPreparacion, boolean>>({
    carne: false,
    pan: false,
    papas: false,
  });
  const [recetasInicialesMostradas, setRecetasInicialesMostradas] =
    useState<RecetasInicialesMostradas>({
      ingredientes: false,
      papas: false,
      carne: false,
      pan: false,
      ensamblaje: false,
    });
  const [progresoPreparacion, setProgresoPreparacion] = useState<ProgresoPreparacion>({
    carne: 0,
    pan: 0,
    papas: 0,
  });
  const [versionesReinicio, setVersionesReinicio] = useState<VersionesReinicio>({
    carne: 0,
    pan: 0,
    papas: 0,
  });

  const guardarIngredientes = useCallback((seleccionados: IngredienteId[]) => {
    const ingredientesUnicos = [...new Set(seleccionados)];
    setIngredientesSeleccionados(ingredientesUnicos);
  }, []);

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

  const marcarRecetaInicialMostrada = useCallback((estacion: EstacionRecetaId) => {
    setRecetasInicialesMostradas((mostradas) => (
      mostradas[estacion] ? mostradas : { ...mostradas, [estacion]: true }
    ));
  }, []);

  const avanzarProgreso = useCallback((tipo: TipoPreparacion, paso: number) => {
    if (!Number.isInteger(paso) || paso < 1 || paso > PASOS_MAXIMOS[tipo]) {
      throw new Error(`Paso inválido "${paso}" para la estación "${tipo}"`);
    }

    setProgresoPreparacion((progresoActual) => ({
      ...progresoActual,
      [tipo]: Math.max(progresoActual[tipo], paso),
    }));
  }, []);

  const reiniciarEstacion = useCallback((tipo: TipoPreparacion) => {
    setEstadosPreparacion((estadosActuales) => ({
      ...estadosActuales,
      [tipo]: ESTADOS_PREPARACION_INICIALES[tipo],
    }));
    setEstacionesListas((estacionesActuales) => ({
      ...estacionesActuales,
      [tipo]: false,
    }));
    setProgresoPreparacion((progresoActual) => ({
      ...progresoActual,
      [tipo]: 0,
    }));
    setVersionesReinicio((versionesActuales) => ({
      ...versionesActuales,
      [tipo]: versionesActuales[tipo] + 1,
    }));
  }, []);

  const reiniciarSeleccion = useCallback(() => {
    setIngredientesSeleccionados([]);
    setEstadosPreparacion(ESTADOS_PREPARACION_INICIALES);
    setEstacionesListas({ carne: false, pan: false, papas: false });
    setProgresoPreparacion({ carne: 0, pan: 0, papas: 0 });
    setVersionesReinicio((versionesActuales) => ({
      carne: versionesActuales.carne + 1,
      pan: versionesActuales.pan + 1,
      papas: versionesActuales.papas + 1,
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
      recetasInicialesMostradas,
      marcarRecetaInicialMostrada,
      progresoPreparacion,
      avanzarProgreso,
      versionesReinicio,
      reiniciarEstacion,
      reiniciarSeleccion,
    }),
    [
      ingredientesSeleccionados,
      guardarIngredientes,
      estadosPreparacion,
      guardarEstadoPreparacion,
      estacionesListas,
      confirmarEstacion,
      recetasInicialesMostradas,
      marcarRecetaInicialMostrada,
      progresoPreparacion,
      avanzarProgreso,
      versionesReinicio,
      reiniciarEstacion,
      reiniciarSeleccion,
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
