'use client';
import { useState } from 'react';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/cocina/ContenidoRecetas';
import TablaEnsamblaje from '@/components/cocina/ensamblaje/TablaEnsamblaje';



export default function EstacionEnsamblaje() {
  const [abierta, setAbierta] = useState<boolean>(true);
  

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <FondoEstacion />
      <Btns />  


      <TablaEnsamblaje />
      

      <div className="absolute right-4 top-4 z-20">
        <MostrarRecetas />
      </div>
             
      <PantallaReceta isOpen={abierta} onClose={() => setAbierta(false)}>
        <div className="w-full max-w-3xl">
          {contenidoRecetas[4].contenido}
        </div>
      </PantallaReceta>
    </main>
  );
}