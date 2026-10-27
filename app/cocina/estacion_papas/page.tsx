'use client';
import { useState } from 'react';
import Image from 'next/image';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/cocina/ContenidoRecetas';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';


{/* Datos de las acciones disponibles para las papas *¿*/}
const DataAccionPapas = [
  { id: "lavar",  label: "Lavar",   src: "/ingredientes/icono_lavar_papas.png",   alt: "Boton para lavar las papas" },
  { id: "cortar", label: "Cortar",  src: "/ingredientes/icono_cuchillo.png",      alt: "Boton para cortar las papas" },
  { id: "freir",  label: "Cocción", src: "/ingredientes/icono_coccion_papas.png", alt: "Boton para freir las papas" },
];


export default function EstacionPapas() {
    const [abierta, setAbierta] = useState<boolean>(true);

    const acciones = {
        lavar:  () => console.log("Lavando papas..."),
        cortar: () => console.log("Cortando papas..."),
        freir:  () => console.log("Friendo papas..."),
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
                                <PapasState />
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


{/* Manejar estado de las papas */}
function PapasState() {
    return(
        <Image
            src="/ingredientes/papas_crudas.png"
            alt="Estado actual de las papas"
            width={400}
            height={400}
            priority
            className="object-contain drop-shadow-2xl"
        />
    );
}


