'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import BtnDetenerCoccion from '@/components/cocina/cocinar/BtnDetenerCoccion';
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
    const [cronometroActivo, setCronometroActivo] = useState<boolean>(false);
    const [tiempoRestante, setTiempoRestante] = useState<number>(50);


    useEffect(() => {
        if (!cronometroActivo || tiempoRestante <= 0) return;

        const interval = setInterval(() => {
            setTiempoRestante((prev) => {
                if (prev <= 1) {
                    setCronometroActivo(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [cronometroActivo, tiempoRestante]);


    const acciones = {
        formar:  () => console.log("Formando la carne..."),
        coccion_1: () => {
            console.log("Cocción por un lado...");
            setCronometroActivo(true);
            setTiempoRestante(120);
        },
        coccion_2:  () => {
            console.log("Cocción por el otro lado...");
            setCronometroActivo(true);
            setTiempoRestante(120);
        },
    };


    return(
        <main className="relative min-h-screen w-full overflow-hidden">
            <FondoEstacion />
            <Btns />     

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">

                {/* Cronómetro y Botón */}
                {cronometroActivo && (
                    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Cronómetro */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-linear-to-br from-orange-500 to-red-600 opacity-20 blur-xl" />
                                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-orange-500 bg-linear-to-br from-orange-400 to-red-500 shadow-2xl">
                                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.3)"
                                            strokeWidth="8"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="8"
                                            strokeDasharray={`${(tiempoRestante / 120) * 283} 283`}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-linear"
                                        />
                                    </svg>

                                    <span className="relative z-10 text-5xl font-black text-white drop-shadow-lg">
                                        {tiempoRestante}
                                    </span>
                                </div>
                            </div>

                            <span className="rounded-full bg-white/90 px-4 py-1 text-sm font-bold uppercase tracking-wide text-orange-700 shadow-lg">
                                Cocinando...
                            </span>
                        </div>

                        {/* Botón de detener cocción */}
                        <BtnDetenerCoccion accion={() => console.log("Deteniendo cocción...")} />
                    </div>
                )}

                <div className="relative flex items-center gap-8">
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