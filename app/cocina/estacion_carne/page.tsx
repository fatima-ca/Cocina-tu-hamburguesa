'use client';
import { useState, useEffect } from 'react';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/cocina/ContenidoRecetas';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';
import { DataAccionCarne } from '@/components/DATA/DataText';
import { carneEstatusData } from '@/components/DATA/DataText';
import IngredienteEstatus from '@/components/cocina/cocinar/IngredienteEstatus';
import Cronometro from '@/components/cocina/cocinar/Cronometro';



export default function EstacionCarne() {
    const [abierta, setAbierta] = useState<boolean>(true);
    const [cronometroActivo, setCronometroActivo] = useState<boolean>(false);

    const [estatusActual, setEstatusActual] = useState<string>("carne_cruda");
    const estadoActualData = carneEstatusData.find(p => p.estatus === estatusActual)!;


    const acciones = {
        formar:  () => {
            setEstatusActual("carne_formada");
        },
        coccion_1: () => {
            setCronometroActivo(true);
            setEstatusActual("coccion_1");
        },
        coccion_2:  () => {
            setCronometroActivo(true);
            setEstatusActual("coccion_2");
        },
    };


    return(
        <main className="relative min-h-screen w-full overflow-hidden">
            <FondoEstacion />
            <Btns />     

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 gap-5">

                <Cronometro
                    tiempoInicial={120}
                    activo={cronometroActivo}
                    titulo={"Cocinando"}
                    onDetener={() => {
                        console.log("Deteniendo cocción...");
                        setCronometroActivo(false);
                    }}
                    onFinalizar={() => {
                        console.log("¡Cocción terminada!");
                        setCronometroActivo(false);
                        setEstatusActual("papas_fritas");
                    }}
                />   

                <div className="relative flex items-center gap-8">
                    <div className="relative w-full max-w-4xl rounded-3xl bg-amber-800 p-8">
                        <div className="relative z-10 flex flex-col items-center gap-8">

                            <div className="relative">
                                <div className="relative flex items-center justify-center rounded-2xl bg-white p-6">
                                    <IngredienteEstatus 
                                        estatus={estadoActualData.estatus}
                                        src={estadoActualData.src}
                                        alt={estadoActualData.alt}
                                    />
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