'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import TablaEnsamblaje from '@/components/cocina/ensamblaje/TablaEnsamblaje';



export default function EstacionEnsamblaje() {
  const [abierta, setAbierta] = useState<boolean>(true);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const router = useRouter();

  return (
    <main className={`relative min-h-screen w-full ${mostrarResultado ? '' : 'overflow-hidden'}`}>
      <TablaEnsamblaje
        vistaResultado={mostrarResultado}
        onRegresar={() => setMostrarResultado(false)}
        onTerminar={() => router.push('/cocina/terminada')}
      />

      {!mostrarResultado && (
        <>
          <FondoEstacion />
          <Btns
            accionListo={() => setMostrarResultado(true)}
            mostrarDetectarError
          />

          <div className="absolute right-4 top-4 z-20">
            <MostrarRecetas />
          </div>

          <PantallaReceta isOpen={abierta} onClose={() => setAbierta(false)}>
            <div className="w-full max-w-3xl">
              {contenidoRecetas[4].contenido}
            </div>
          </PantallaReceta>
        </>
      )}
    </main>
  );
}