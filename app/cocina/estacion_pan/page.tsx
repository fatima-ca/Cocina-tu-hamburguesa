'use client';
import { useState } from 'react';
import Image from 'next/image';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/cocina/ContenidoRecetas';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';


{/* Datos de las acciones disponibles para el pan */}
const DataAccionPan = [
  { id: "cortar",  label: "Cortar",   src: "/ingredientes/icono_cuchillo.png",   alt: "Boton para cortar el pan" },
  { id: "tostar", label: "Tostar",  src: "/ingredientes/icono_tostadora.png",      alt: "Boton para tostar el pan" },
];


export default function EstacionPan() {
    const [abierta, setAbierta] = useState<boolean>(true);

    const acciones = {
        cortar:  () => console.log("Cortando el pan..."),
        tostar: () => console.log("Tostando el pan..."),
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
                                <PanState />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 rounded-2xl bg-white p-6">
                            {DataAccionPan.map((item) => (
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
                <div className="max-w-4/6 w-full">
                    {contenidoRecetas[3].contenido}
                </div>
            </PantallaReceta>      
        </main>
    );
};




{/* Manejar estado de las papas */}
function PanState() {
    return(
        <Image
            src="/ingredientes/pan.png"
            alt="Estado actual del pan"
            width={400}
            height={400}
            priority
            className="object-contain drop-shadow-2xl"
        />
    );
}