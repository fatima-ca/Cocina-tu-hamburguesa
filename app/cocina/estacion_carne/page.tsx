'use client';
import { useState } from 'react';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';
import { DataAccionCarne } from '@/components/DATA/DataText';
import { carneEstatusData } from '@/components/DATA/DataText';
import IngredienteEstatus from '@/components/cocina/cocinar/IngredienteEstatus';
import Cronometro from '@/components/cocina/cocinar/Cronometro';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';


type ResultadoCoccion = 'crudo' | 'cocido' | 'quemado';

function actualizarLadoCarne(estatus: string, lado: 'a' | 'b', resultado: ResultadoCoccion) {
    return estatus.replace(
        new RegExp(`${lado}-(crudo|cocido|quemado)`),
        `${lado}-${resultado}`,
    );
}



export default function EstacionCarne() {
    const { versionesReinicio } = useIngredientes();
    return <ContenidoEstacionCarne key={versionesReinicio.carne} />;
}

function ContenidoEstacionCarne() {
    const [abierta, setAbierta] = useState<boolean>(true);
    const { cronometros, iniciarCarne, detener, ladoCarneEnCoccion } = useCronometros();
    const {
        ingredientesSeleccionados,
        estadosPreparacion,
        guardarEstadoPreparacion,
        confirmarEstacion,
    } = useIngredientes();
    const carneSeleccionada = ingredientesSeleccionados.includes('carne');
    const cronometro = cronometros.carne;

    const estatusActual = estadosPreparacion.carne;
    const [pasoActual, setPasoActual] = useState(0);
    const estatusVisible = cronometro.completado && ladoCarneEnCoccion
            ? actualizarLadoCarne(estatusActual, ladoCarneEnCoccion, "quemado")
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

        if (ladoCarneEnCoccion) {
            guardarEstadoPreparacion('carne', actualizarLadoCarne(estatusActual, ladoCarneEnCoccion, resultado));
        }
        detener('carne');
    };


    const acciones = {
        formar:  () => {
            if (cronometro.activo || pasoActual >= 1) return;
            setPasoActual(1);
            guardarEstadoPreparacion('carne', estatusActual.replace("noformada", "formada"));
        },
        coccion_1: () => {
            if (cronometro.activo || pasoActual >= 2) return;
            setPasoActual(2);
            iniciarCarne('a');
        },
        coccion_2:  () => {
            if (cronometro.activo || pasoActual >= 3) return;
            setPasoActual(3);
            iniciarCarne('b');
        },
    };


    return(
        <main className="relative min-h-screen w-full overflow-hidden">
            <FondoEstacion />
            <Btns
                accionListo={() => confirmarEstacion('carne')}
                listoDeshabilitado={!carneSeleccionada || cronometro.activo}
                mostrarDetectarError
            />

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
                                    {carneSeleccionada && (
                                        <IngredienteEstatus 
                                            estatus={estadoActualData.estatus}
                                            src={estadoActualData.src}
                                            alt={estadoActualData.alt}
                                            blur={cronometro.activo}
                                        />
                                    )}
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
                                            !carneSeleccionada ||
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