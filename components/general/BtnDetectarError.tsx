'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useCronometros } from '@/components/cocina/cocinar/CronometroContext';
import { useIngredientes } from '@/components/cocina/ingredientes/IngredientesContext';

const estaciones = [
    {
        destino: 'seleccion',
        src: '/general/btn_volver_seleccionar.png',
        alt: 'Volver a seleccionar ingredientes',
        ruta: '/cocina/estacion_ingredientes',
    },
    {
        destino: 'papas',
        src: '/general/btn_volver_papas.png',
        alt: 'Reiniciar la estación de papas',
        ruta: '/cocina/estacion_papas',
    },
    {
        destino: 'carne',
        src: '/general/btn_volver_carne.png',
        alt: 'Reiniciar la estación de carne',
        ruta: '/cocina/estacion_carne',
    },
    {
        destino: 'pan',
        src: '/general/btn_volver_pan.png',
        alt: 'Reiniciar la estación de pan',
        ruta: '/cocina/estacion_pan',
    },
] as const;

export default function BtnDetectarError() {
    const [abierto, setAbierto] = useState(false);
    const router = useRouter();
    const { reiniciarEstacion, reiniciarSeleccion } = useIngredientes();
    const { reiniciar, reiniciarTodos } = useCronometros();

    useEffect(() => {
        if (!abierto) return;

        const overflowAnterior = document.body.style.overflow;
        const cerrarConEscape = (evento: KeyboardEvent) => {
            if (evento.key === 'Escape') setAbierto(false);
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', cerrarConEscape);

        return () => {
            document.body.style.overflow = overflowAnterior;
            window.removeEventListener('keydown', cerrarConEscape);
        };
    }, [abierto]);

    const volverAEstacion = (estacion: (typeof estaciones)[number]) => {
        if (estacion.destino === 'seleccion') {
            reiniciarSeleccion();
            reiniciarTodos();
        } else {
            reiniciarEstacion(estacion.destino);
            reiniciar(estacion.destino);
        }

        setAbierto(false);
        router.push(estacion.ruta);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setAbierto(true)}
                aria-label="Detectar un error y reiniciar una estación"
                aria-haspopup="dialog"
                aria-expanded={abierto}
                className="group relative transition-transform duration-200 ease-out hover:scale-110 active:scale-95 animate-[pulse-soft_2s_ease-in-out_infinite]"
            >
                <Image
                    src="/general/btn_detectar_error.png"
                    alt=""
                    width={200}
                    height={100}
                    priority
                    className="object-contain"
                />
            </button>

            {abierto && createPortal(
                <div
                    className="fixed inset-0 z-10000 flex items-center justify-center bg-black/70 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Selecciona la estación que quieres reiniciar"
                    onClick={() => setAbierto(false)}
                >
                    <div
                        className="relative w-full max-w-5xl"
                        onClick={(evento) => evento.stopPropagation()}
                    >
                        <Image
                            src="/general/letrero.png"
                            alt=""
                            width={1390}
                            height={900}
                            priority
                            className="h-auto w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setAbierto(false)}
                            aria-label="Cerrar pantalla"
                            className="absolute right-[7%] top-[6%] z-10 flex size-10 items-center justify-center rounded-full border-4 border-amber-950 bg-red-600 text-3xl font-bold leading-none text-white shadow-lg transition-transform hover:scale-110 hover:bg-red-700 active:scale-95 sm:size-14 sm:text-4xl"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-[12%] py-[14%] sm:gap-4">
                            <Image
                                src="/cocina/cual_estacion_regresar.png"
                                alt="¿A cuál estación quieres regresar?"
                                width={1374}
                                height={322}
                                priority
                                className="h-auto w-[90%] max-w-3xl"
                            />
                            <div className="grid w-full grid-cols-4 items-center justify-items-center gap-1 sm:gap-4">
                            {estaciones.map((estacion) => (
                                <button
                                    key={estacion.destino}
                                    type="button"
                                    onClick={() => volverAEstacion(estacion)}
                                    aria-label={estacion.alt}
                                    className="w-full max-w-16 transition-transform hover:scale-105 active:scale-95 sm:max-w-28 lg:max-w-40"
                                >
                                    <Image
                                        src={estacion.src}
                                        alt=""
                                        width={308}
                                        height={340}
                                        priority
                                        className="h-auto w-full object-contain"
                                    />
                                </button>
                            ))}
                            </div>
                            
                        </div>
                    </div>
                </div>,
                document.body,
            )}
        </>
    );
}
