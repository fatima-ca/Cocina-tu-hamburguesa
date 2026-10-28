'use client';
import { useState } from 'react';
import Image from 'next/image';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/cocina/ContenidoRecetas';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';
import { DataAccionPapas } from '@/components/DATA/DataText';
import { papasEstatusData } from '@/components/DATA/DataText';



export default function EstacionPapas() {
    const [abierta, setAbierta] = useState<boolean>(true);
    const [estatusActual, setEstatusActual] = useState<string>("papas_sucias");

    const estadoActualData = papasEstatusData.find(p => p.estatus === estatusActual)!;

    const acciones = {
        lavar:  () => {
            console.log("Lavando papas...");
            setEstatusActual("papas_limpias");
        },
        cortar: () => {
            console.log("Cortando papas...");
            setEstatusActual("papas_cortadas");
        },
        freir:  () => {
            console.log("Friendo papas...");
            setEstatusActual("papas_friendo");
        },
    };

    return(
        <main className="relative min-h-screen w-full overflow-hidden">
            <FondoEstacion />
            <Btns />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-4xl rounded-3xl bg-amber-800 p-8">
                    <div className="relative z-10 flex flex-col items-center gap-8">

                        <div className="relative">
                            <div className="relative flex items-center justify-center rounded-2xl bg-white p-6">
                                <PapasEstatus
                                    estatus={estadoActualData.estatus}
                                    src={estadoActualData.src}
                                    alt={estadoActualData.alt}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 rounded-2xl bg-white p-6">
                            {DataAccionPapas.map((item) => (
                                <BtnAccionIngredientes
                                    key={item.id}
                                    src={item.src}
                                    alt={item.alt}
                                    label={item.label}
                                    accion={acciones[item.id as keyof typeof acciones] || (() => {})}
                                />
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
  
            <div className="absolute right-4 top-4 z-20">
                <MostrarRecetas />
            </div>
             
            <PantallaReceta isOpen={abierta} onClose={() => setAbierta(false)}>
                <div className="w-full max-w-3xl">
                    {contenidoRecetas[1].contenido}
                </div>
            </PantallaReceta>
        </main>
    );
};



export type PapasEstatusProps = {
  estatus: string;
  src: string;
  alt: string;
};

function PapasEstatus({ estatus, src, alt }: PapasEstatusProps) {
    return(
        <Image
            key={estatus}
            src={src}
            alt={alt}
            width={400}
            height={400}
            priority
            className="object-contain drop-shadow-2xl"
        />
    );
}

