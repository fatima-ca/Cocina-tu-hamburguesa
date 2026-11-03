'use client';

import { useEffect, useState } from 'react';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';
import AlarmaPapas from '@/components/general/AlarmaPapas';

const TIEMPO_ALARMA_PAPAS = 10;

export default function AlarmaPapasGlobal() {
    const [mostrarReceta, setMostrarReceta] = useState(false);
    const {
        cronometros,
        detener,
        alarmaPapasAtendida,
        atenderAlarmaPapas,
    } = useCronometros();
    const { estadosPreparacion, guardarEstadoPreparacion } = useIngredientes();
    const cronometro = cronometros.papas;
    const tiempoTranscurrido = cronometro.duracion - cronometro.tiempoRestante;
    const mostrarAlarma = !alarmaPapasAtendida
        && (cronometro.activo || cronometro.completado)
        && tiempoTranscurrido >= TIEMPO_ALARMA_PAPAS;

    useEffect(() => {
        if (cronometro.completado && estadosPreparacion.papas.endsWith('_cruda')) {
            guardarEstadoPreparacion(
                'papas',
                estadosPreparacion.papas.replace(/_cruda$/, '_quemada'),
            );
        }
    }, [cronometro.completado, estadosPreparacion.papas, guardarEstadoPreparacion]);

    const retirarPapas = () => {
        const tiempoCoccion = cronometro.fechaFinalizacion === null
            ? tiempoTranscurrido
            : cronometro.duracion - Math.max(
                0,
                Math.ceil((cronometro.fechaFinalizacion - Date.now()) / 1000),
            );
        const resultadoCoccion = tiempoCoccion <= 290
            ? 'cruda'
            : tiempoCoccion <= 300
                ? 'cocida'
                : 'quemada';

        atenderAlarmaPapas();
        detener('papas');
        guardarEstadoPreparacion(
            'papas',
            estadosPreparacion.papas.replace(/_cruda$/, `_${resultadoCoccion}`),
        );
    };

    return (
        <>
            <PantallaReceta
                isOpen={mostrarReceta}
                onClose={() => setMostrarReceta(false)}
            >
                <div className="w-full max-w-3xl">
                    {contenidoRecetas[1].contenido}
                </div>
            </PantallaReceta>

            {mostrarAlarma && (
                <AlarmaPapas
                    onRetirar={retirarPapas}
                    onContinuar={atenderAlarmaPapas}
                    onVerReceta={() => {
                        atenderAlarmaPapas();
                        setMostrarReceta(true);
                    }}
                />
            )}
        </>
    );
}
