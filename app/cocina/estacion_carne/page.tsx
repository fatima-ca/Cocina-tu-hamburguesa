'use client';
import { useState } from 'react';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/public/ingredientes/papas_variantes/ContenidoRecetas';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';
import { DataAccionCarne } from '@/components/DATA/DataText';
import { carneEstatusData } from '@/components/DATA/DataText';
import IngredienteEstatus from '@/components/cocina/cocinar/IngredienteEstatus';
import Cronometro from '@/components/cocina/cocinar/Cronometro';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';


type LadoCarne = 'a' | 'b';
type ResultadoCoccion = 'crudo' | 'cocido' | 'quemado';

function actualizarLadoCarne(estatus: string, lado: LadoCarne, resultado: ResultadoCoccion) {
    return estatus.replace(
        new RegExp(`${lado}-(crudo|cocido|quemado)`),
        `${lado}-${resultado}`,
    );
}



export default function EstacionCarne() {
    const [abierta, setAbierta] = useState<boolean>(true);
    const { cronometros, iniciar, detener } = useCronometros();
    const cronometro = cronometros.carne;

    const [estatusActual, setEstatusActual] = useState<string>("carne_noformada_a-crudo_b-crudo");
    const [pasoActual, setPasoActual] = useState(0);
    const [ladoEnCoccion, setLadoEnCoccion] = useState<LadoCarne | null>(null);
    const estatusVisible = cronometro.completado && ladoEnCoccion
            ? actualizarLadoCarne(estatusActual, ladoEnCoccion, "quemado")
            : estatusActual;
    const estadoActualData = carneEstatusData.find(p => p.estatus === estatusVisible)!;


    const detenerCoccion = () => {
        const tiempoTranscurrido = cronometro.fechaFinalizacion === null
            ? cronometro.duracion - cronometro.tiempoRestante
            : cronometro.duracion - Math.max(
                0,
                Math.ceil((cronometro.fechaFinalizacion - Date.now()) / 1000),
            );

        const resultado: ResultadoCoccion = tiempoTranscurrido <= 110
            ? "crudo"
            : tiempoTranscurrido <= 120
                ? "cocido"
                : "quemado";

        if (ladoEnCoccion) {
            setEstatusActual(actualizarLadoCarne(estatusActual, ladoEnCoccion, resultado));
        }
        detener('carne');
    };


    const acciones = {
        formar:  () => {
            if (cronometro.activo || pasoActual >= 1) return;
            setPasoActual(1);
            setEstatusActual(estatusActual.replace("noformada", "formada"));
        },
        coccion_1: () => {
            if (cronometro.activo || pasoActual >= 2) return;
            setPasoActual(2);
            setLadoEnCoccion('a');
            setEstatusActual(actualizarLadoCarne(estatusActual, 'a', "cocido"));
            iniciar('carne');
        },
        coccion_2:  () => {
            if (cronometro.activo || pasoActual >= 3) return;
            setPasoActual(3);
            setLadoEnCoccion('b');
            setEstatusActual(actualizarLadoCarne(estatusActual, 'b', "cocido"));
            iniciar('carne');
        },
    };


    return(
        <main className="relative min-h-screen w-full overflow-hidden">
            <FondoEstacion />
            <Btns />     

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 gap-5">

                <div className='absolute left-32 top-1/2 -translate-y-1/2 z-30'>
                <Cronometro
                    tiempoInicial={cronometro.duracion}
                    tiempoRestante={cronometro.tiempoRestante}
                    activo={cronometro.activo}
                    titulo={"Cocinando"}
                    onDetener={detenerCoccion}
                />   
                </div>

                <div className="relative flex items-center gap-8">
                    <div className="relative w-full max-w-4xl rounded-3xl bg-amber-800 p-8">
                        <div className="relative z-10 flex flex-col items-center gap-8">

                            <div className="relative">
                                <div className="relative flex items-center justify-center rounded-2xl bg-white p-6">
                                    <IngredienteEstatus 
                                        estatus={estadoActualData.estatus}
                                        src={estadoActualData.src}
                                        alt={estadoActualData.alt}
                                        blur={cronometro.activo}
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
                                        disabled={
                                            cronometro.activo ||
                                            (item.id === "formar" && pasoActual >= 1) ||
                                            (item.id === "coccion_1" && pasoActual >= 2) ||
                                            (item.id === "coccion_2" && pasoActual >= 3)
                                        }
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