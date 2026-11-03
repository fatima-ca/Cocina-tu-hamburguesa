'use client';
import { useEffect, useState } from 'react';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';
import { DataAccionPapas } from '@/components/DATA/DataText';
import { papasEstatusData } from '@/components/DATA/DataText';
import IngredienteEstatus from '@/components/cocina/cocinar/IngredienteEstatus';
import Cronometro from '@/components/cocina/cocinar/Cronometro';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';



export default function EstacionPapas() {
    const [abierta, setAbierta] = useState<boolean>(true);
    const { cronometros, iniciar, detener } = useCronometros();
    const {
        ingredientesSeleccionados,
        estadosPreparacion,
        guardarEstadoPreparacion,
        confirmarEstacion,
    } = useIngredientes();
    const papasSeleccionadas = ingredientesSeleccionados.includes('papas');
    const cronometro = cronometros.papas;

    const estatusActual = estadosPreparacion.papas;
    const [estatusBaseCoccion, setEstatusBaseCoccion] = useState(estatusActual);
    const [pasoActual, setPasoActual] = useState(0);
    const estatusVisible = cronometro.completado
        ? estatusBaseCoccion.replace(/_cruda$/, "_quemada")
        : estatusActual;
    const estadoActualData = papasEstatusData.find(p => p.estatus === estatusVisible)!;

    useEffect(() => {
        if (cronometro.completado) {
            guardarEstadoPreparacion('papas', estatusVisible);
        }
    }, [cronometro.completado, estatusVisible, guardarEstadoPreparacion]);

    const detenerCoccion = () => {
        const tiempoTranscurrido = cronometro.fechaFinalizacion === null
            ? cronometro.duracion - cronometro.tiempoRestante
            : cronometro.duracion - Math.max(
                0,
                Math.ceil((cronometro.fechaFinalizacion - Date.now()) / 1000),
            );

        detener('papas');
        const resultadoCoccion = tiempoTranscurrido <= 290
            ? "cruda"
            : tiempoTranscurrido <= 300
                ? "cocida"
                : "quemada";
        guardarEstadoPreparacion('papas', estatusBaseCoccion.replace(/_cruda$/, `_${resultadoCoccion}`));
    };

    const acciones = {
        lavar:  () => {
            if (cronometro.activo || pasoActual >= 1) return;
            setPasoActual(1);
            const nuevoEstatus = estatusActual.replace("_sucia_", "_limpia_");
            guardarEstadoPreparacion('papas', nuevoEstatus);
            setEstatusBaseCoccion(nuevoEstatus);
        },
        cortar: () => {
            if (cronometro.activo || pasoActual >= 2) return;
            setPasoActual(2);
            const nuevoEstatus = estatusActual.replace("_entera_cruda", "_cortada_cruda");
            guardarEstadoPreparacion('papas', nuevoEstatus);
            setEstatusBaseCoccion(nuevoEstatus);
        },
        freir:  () => {
            if (cronometro.activo || pasoActual >= 3) return;
            setPasoActual(3);
            setEstatusBaseCoccion(estatusActual);
            iniciar('papas');
        },
    };

    return(
        <main className="relative min-h-screen w-full overflow-hidden">
            <FondoEstacion />
            <Btns
                accionListo={() => confirmarEstacion('papas')}
                listoDeshabilitado={!papasSeleccionadas || cronometro.activo}
            />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">

                <div className='absolute left-32 top-1/2 -translate-y-1/2 z-30'>
                    <Cronometro
                        tiempoInicial={cronometro.duracion}
                        tiempoRestante={cronometro.tiempoRestante}
                        activo={cronometro.activo}
                        titulo={"Friendo"}
                        onDetener={detenerCoccion}
                    />   
                </div>

                <div className="relative w-full max-w-4xl rounded-3xl bg-amber-800 p-8">
                    <div className="relative z-10 flex flex-col items-center gap-8">

                        <div className="relative">
                            <div className="relative flex items-center justify-center rounded-2xl bg-white p-6">
                                {papasSeleccionadas && (
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
                            {DataAccionPapas.map((item) => (
                                <BtnAccionIngredientes
                                    key={item.id}
                                    src={item.src}
                                    alt={item.alt}
                                    label={item.label}
                                    accion={acciones[item.id as keyof typeof acciones] || (() => {})}
                                    disabled={
                                        !papasSeleccionadas ||
                                        cronometro.activo ||
                                        (item.id === "lavar" && pasoActual >= 1) ||
                                        (item.id === "cortar" && pasoActual >= 2) ||
                                        (item.id === "freir" && pasoActual >= 3)
                                    }
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