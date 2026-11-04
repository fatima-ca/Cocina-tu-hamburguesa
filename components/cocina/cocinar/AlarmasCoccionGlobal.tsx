'use client';

import { useEffect, useState } from 'react';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';
import AlarmaCoccion from '@/components/general/AlarmaCoccion';

const TIEMPO_ALARMA_PAPAS = 180;
const TIEMPO_ALARMA_CARNE = 60;

type IngredienteConAlarma = 'papas' | 'carne';

function actualizarLadoCarne(estatus: string, lado: 'a' | 'b', resultado: string) {
    return estatus.replace(
        new RegExp(`${lado}-(crudo|cocido|quemado)`),
        `${lado}-${resultado}`,
    );
}

export default function AlarmasCoccionGlobal() {
    const [recetaAbierta, setRecetaAbierta] = useState<IngredienteConAlarma | null>(null);
    const {
        cronometros,
        detener,
        alarmaPapasAtendida,
        atenderAlarmaPapas,
        alarmaCarneAtendida,
        atenderAlarmaCarne,
        ladoCarneEnCoccion,
    } = useCronometros();
    const { estadosPreparacion, guardarEstadoPreparacion } = useIngredientes();
    const tiempoPapas = cronometros.papas.duracion - cronometros.papas.tiempoRestante;
    const tiempoCarne = cronometros.carne.duracion - cronometros.carne.tiempoRestante;
    const alarmaPapasVisible = !alarmaPapasAtendida
        && (cronometros.papas.activo || cronometros.papas.completado)
        && tiempoPapas >= TIEMPO_ALARMA_PAPAS;
    const alarmaCarneVisible = !alarmaCarneAtendida
        && ladoCarneEnCoccion === 'b'
        && (cronometros.carne.activo || cronometros.carne.completado)
        && tiempoCarne >= TIEMPO_ALARMA_CARNE;
    const ingredienteAlarma = alarmaPapasVisible
        ? 'papas'
        : alarmaCarneVisible
            ? 'carne'
            : null;

    useEffect(() => {
        if (cronometros.papas.completado && estadosPreparacion.papas.endsWith('_cruda')) {
            guardarEstadoPreparacion(
                'papas',
                estadosPreparacion.papas.replace(/_cruda$/, '_quemada'),
            );
        }
    }, [cronometros.papas.completado, estadosPreparacion.papas, guardarEstadoPreparacion]);

    useEffect(() => {
        if (
            cronometros.carne.completado
            && ladoCarneEnCoccion
            && new RegExp(`${ladoCarneEnCoccion}-crudo`).test(estadosPreparacion.carne)
        ) {
            guardarEstadoPreparacion(
                'carne',
                actualizarLadoCarne(estadosPreparacion.carne, ladoCarneEnCoccion, 'quemado'),
            );
        }
    }, [
        cronometros.carne.completado,
        ladoCarneEnCoccion,
        estadosPreparacion.carne,
        guardarEstadoPreparacion,
    ]);

    const atenderAlarma = (ingrediente: IngredienteConAlarma) => {
        if (ingrediente === 'papas') {
            atenderAlarmaPapas();
        } else {
            atenderAlarmaCarne();
        }
    };

    const retirarIngrediente = () => {
        if (ingredienteAlarma === 'papas') {
            const cronometro = cronometros.papas;
            const tiempoCoccion = cronometro.fechaFinalizacion === null
                ? tiempoPapas
                : cronometro.duracion - Math.max(
                    0,
                    Math.ceil((cronometro.fechaFinalizacion - Date.now()) / 1000),
                );
            const resultadoCoccion = tiempoCoccion <= 290
                ? 'cruda'
                : tiempoCoccion <= 300
                    ? 'cocida'
                    : 'quemada';

            atenderAlarma('papas');
            detener('papas');
            guardarEstadoPreparacion(
                'papas',
                estadosPreparacion.papas.replace(/_cruda$/, `_${resultadoCoccion}`),
            );
            return;
        }

        if (ingredienteAlarma === 'carne' && ladoCarneEnCoccion) {
            const cronometro = cronometros.carne;
            const tiempoCoccion = cronometro.fechaFinalizacion === null
                ? tiempoCarne
                : cronometro.duracion - Math.max(
                    0,
                    Math.ceil((cronometro.fechaFinalizacion - Date.now()) / 1000),
                );
            const resultadoCoccion = tiempoCoccion <= 110
                ? 'crudo'
                : tiempoCoccion <= 120
                    ? 'cocido'
                    : 'quemado';

            atenderAlarma('carne');
            detener('carne');
            guardarEstadoPreparacion(
                'carne',
                actualizarLadoCarne(
                    estadosPreparacion.carne,
                    ladoCarneEnCoccion,
                    resultadoCoccion,
                ),
            );
        }
    };

    const abrirReceta = () => {
        if (!ingredienteAlarma) return;
        atenderAlarma(ingredienteAlarma);
        setRecetaAbierta(ingredienteAlarma);
    };

    return (
        <>
            <PantallaReceta
                isOpen={recetaAbierta !== null}
                onClose={() => setRecetaAbierta(null)}
            >
                <div className="w-full max-w-3xl">
                    {recetaAbierta === 'carne'
                        ? contenidoRecetas[2].contenido
                        : contenidoRecetas[1].contenido}
                </div>
            </PantallaReceta>

            {ingredienteAlarma && (
                <AlarmaCoccion
                    ingrediente={ingredienteAlarma}
                    onRetirar={retirarIngrediente}
                    onContinuar={() => atenderAlarma(ingredienteAlarma)}
                    onVerReceta={abrirReceta}
                />
            )}
        </>
    );
}
