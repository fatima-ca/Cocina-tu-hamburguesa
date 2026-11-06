'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import type { IngredienteEstatusProps } from '@/components/DATA/types';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';
import Cronometro from '@/components/cocina/cocinar/Cronometro';
import IngredienteEstatus from '@/components/cocina/cocinar/IngredienteEstatus';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import Btns from '@/components/general/Btns';
import FondoEstacion from '@/components/general/FondoEstacion';

type AccionEstacion = {
  id: string;
  src: string;
  alt: string;
  label: string;
  accion: () => void;
  disabled: boolean;
};

type EstacionLayoutProps = {
  ingredienteSeleccionado: boolean;
  estadoIngrediente: IngredienteEstatusProps;
  cronometro: {
    duracion: number;
    tiempoRestante: number;
    activo: boolean;
  };
  tituloCronometro: string;
  acciones: AccionEstacion[];
  receta: ReactNode;
  onDetenerCoccion: () => void;
  onConfirmar: () => void;
};

export default function EstacionLayout({
  ingredienteSeleccionado,
  estadoIngrediente,
  cronometro,
  tituloCronometro,
  acciones,
  receta,
  onDetenerCoccion,
  onConfirmar,
}: EstacionLayoutProps) {
  const router = useRouter();
  const [recetaAbierta, setRecetaAbierta] = useState(true);

  const confirmarEstacion = () => {
    onConfirmar();
    router.push('/cocina');
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <FondoEstacion />
      <Btns
        accionListo={confirmarEstacion}
        listoDeshabilitado={!ingredienteSeleccionado || cronometro.activo}
        mostrarDetectarError
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div className="absolute left-32 top-1/2 z-30 -translate-y-1/2">
          <Cronometro
            tiempoInicial={cronometro.duracion}
            tiempoRestante={cronometro.tiempoRestante}
            activo={cronometro.activo}
            titulo={tituloCronometro}
            onDetener={onDetenerCoccion}
          />
        </div>

        <div className="relative w-full max-w-4xl rounded-3xl bg-amber-800 p-8">
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="flex items-center justify-center rounded-2xl bg-white p-6">
              {ingredienteSeleccionado && (
                <IngredienteEstatus
                  estatus={estadoIngrediente.estatus}
                  src={estadoIngrediente.src}
                  alt={estadoIngrediente.alt}
                  blur={cronometro.activo}
                />
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 rounded-2xl bg-white p-6">
              {acciones.map((accion) => (
                <BtnAccionIngredientes
                  key={accion.id}
                  src={accion.src}
                  alt={accion.alt}
                  label={accion.label}
                  accion={accion.accion}
                  disabled={accion.disabled || !ingredienteSeleccionado || cronometro.activo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-4 z-20">
        <MostrarRecetas />
      </div>

      <PantallaReceta
        isOpen={recetaAbierta}
        onClose={() => setRecetaAbierta(false)}
      >
        <div className="w-full max-w-3xl">{receta}</div>
      </PantallaReceta>
    </main>
  );
}
