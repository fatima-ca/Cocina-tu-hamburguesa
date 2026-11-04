'use client';
import { useEffect, useState } from 'react';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import BtnAccionIngredientes from '@/components/cocina/cocinar/BtnAccionIngredientes';
import { DataAccionPan } from '@/components/DATA/DataText';
import { panEstatusData } from '@/components/DATA/DataText';
import IngredienteEstatus from '@/components/cocina/cocinar/IngredienteEstatus';
import Cronometro from '@/components/cocina/cocinar/Cronometro';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';



export default function EstacionPan() {
    const { versionesReinicio } = useIngredientes();
    return <ContenidoEstacionPan key={versionesReinicio.pan} />;
}

function ContenidoEstacionPan() {
    const [abierta, setAbierta] = useState<boolean>(true);
    const { cronometros, iniciar, detener } = useCronometros();
    const {
        ingredientesSeleccionados,
        estadosPreparacion,
        guardarEstadoPreparacion,
        confirmarEstacion,
    } = useIngredientes();
    const panSeleccionado = ingredientesSeleccionados.includes('pan');
    const cronometro = cronometros.pan;

    const estatusActual = estadosPreparacion.pan;
    const [pasoActual, setPasoActual] = useState(0);
    const tiempoTranscurrido = cronometro.duracion - cronometro.tiempoRestante;
    const esPanCompleto = estatusActual === "pan_completo"
        || estatusActual === "pan_tostado"
        || estatusActual === "pan_quemado";
    const obtenerEstatusTostado = (segundosTranscurridos: number) => {
        if (segundosTranscurridos > 120) {
            return esPanCompleto ? "pan_quemado" : "pan_cortado_quemado";
        }
        if (segundosTranscurridos >= 110) {
            return esPanCompleto ? "pan_tostado" : "pan_cortado_tostado";
        }
        return estatusActual;
    };
    const estatusVisible = cronometro.activo || cronometro.completado
        ? obtenerEstatusTostado(tiempoTranscurrido)
        : estatusActual;
    const estadoActualData = panEstatusData.find(p => p.estatus === estatusVisible)!;

    useEffect(() => {
        if (cronometro.completado) {
            guardarEstadoPreparacion('pan', estatusVisible);
        }
    }, [cronometro.completado, estatusVisible, guardarEstadoPreparacion]);

    const detenerTostado = () => {
        const tiempoExacto = cronometro.fechaFinalizacion === null
            ? tiempoTranscurrido
            : cronometro.duracion - Math.max(
                0,
                Math.ceil((cronometro.fechaFinalizacion - Date.now()) / 1000),
            );
        detener('pan');
        guardarEstadoPreparacion('pan', obtenerEstatusTostado(tiempoExacto));
    };

    const acciones = {
        cortar:  () => {
            if (cronometro.activo || pasoActual >= 1) return;
            setPasoActual(1);
            guardarEstadoPreparacion('pan', "pan_cortado");
        },
        tostar: () => {
            if (cronometro.activo || pasoActual >= 2) return;
            setPasoActual(2);
            iniciar('pan');
        },
    };    

    return(
        <main className="relative min-h-screen w-full overflow-hidden">
            <FondoEstacion />
            <Btns
                accionListo={() => confirmarEstacion('pan')}
                listoDeshabilitado={!panSeleccionado || cronometro.activo}
                mostrarDetectarError
            />
            
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
                <div className='absolute left-32 top-1/2 -translate-y-1/2 z-30'>
                    <Cronometro
                        tiempoInicial={cronometro.duracion}
                        tiempoRestante={cronometro.tiempoRestante}
                        activo={cronometro.activo}
                        titulo={"Tostando"}
                        onDetener={detenerTostado}
                    />  
                </div>
                
                <div className="relative w-full max-w-4xl rounded-3xl bg-amber-800 p-8">
                    <div className="relative z-10 flex flex-col items-center gap-8">

                        <div className="relative">
                            <div className="relative flex items-center justify-center rounded-2xl bg-white p-6">
                                {panSeleccionado && (
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
                            {DataAccionPan.map((item) => (
                                <BtnAccionIngredientes
                                    key={item.id}
                                    src={item.src}
                                    alt={item.alt}
                                    label={item.label}
                                    accion={acciones[item.id as keyof typeof acciones] || (() => {})}
                                    disabled={
                                        !panSeleccionado ||
                                        cronometro.activo ||
                                        (item.id === "cortar" && pasoActual >= 1) ||
                                        (item.id === "tostar" && pasoActual >= 2)
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
                <div className="max-w-4/6 w-full">
                    {contenidoRecetas[3].contenido}
                </div>
            </PantallaReceta>      
        </main>
    );
};
