'use client';
import { useState } from 'react';
import Image from 'next/image';
import FondoCocina from '@/components/general/FondoCocina';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/cocina/DataText';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';

{/* Datos de las acciones disponibles para la carne */}
const DataAccionCarne = [
  { id: "formar",  label: "Formar",   src: "/ingredientes/icono_formar_carne.png",   alt: "Boton para formar la carne" },
  { id: "coccion_1", label: "Cocción lado 1",  src: "/ingredientes/icono_coccion_1.png",      alt: "Boton de coccion por un lado" },
  { id: "coccion_2",  label: "Cocción lado 2", src: "/ingredientes/icono_coccion_2.png", alt: "Boton de coccion por el otro lado" },
];



export default function EstacionCarne() {
    const [abierta, setAbierta] = useState<boolean>(true);

    const acciones = {
        formar:  () => console.log("Formando la carne..."),
        coccion_1: () => console.log("Cocción por un lado..."),
        coccion_2:  () => console.log("Cocción por el otro lado..."),
    };


    return(
        <main className="relative min-h-screen w-full overflow-hidden">
            <FondoCocina />
            <Btns />     

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-4xl rounded-3xl bg-amber-800 p-8">
                    <div className="relative z-10 flex flex-col items-center gap-8">

                        <div className="relative">
                            <div className="relative flex items-center justify-center rounded-2xl bg-white p-6">
                                <CarneState />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 rounded-2xl bg-white p-6">
                            {DataAccionCarne.map((item) => (
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
                    {contenidoRecetas[2].contenido}
                </div>
            </PantallaReceta> 
        </main>
    );
};


{/* Manejar estado de las papas */}
function CarneState() {
    return(
        <Image
            src="/ingredientes/carne_cruda.png"
            alt="Estado actual de la carne"
            width={400}
            height={400}
            priority
            className="object-contain drop-shadow-2xl"
        />
    );
}