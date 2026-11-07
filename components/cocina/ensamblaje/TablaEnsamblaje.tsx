'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IngredienteProps } from '@/components/DATA/types';
import {
    carneEnsamblaje,
    panEnsamblaje,
    papasEnsamblaje,
    papasEstatusData,
} from '@/components/DATA/DataText';
import { useIngredientes, type IngredienteId } from '@/components/cocina/ingredientes/IngredientesContext';

type TablaEnsamblajeProps = {
    vistaResultado?: boolean;
    onRegresar: () => void;
    onTerminar: () => void;
};

const ingredientesFijos: Record<
    Exclude<IngredienteId, 'carne' | 'pan' | 'papas'>,
    Omit<IngredienteProps, 'id'>
> = {
    pina: { nombre: 'Piña', imagen: '/ingredientes/piña.png', ensamblaje: '/ingredientes/piña_e.png', alt: 'Piña' },
    lechuga: { nombre: 'Lechuga', imagen: '/ingredientes/lechuga.png', ensamblaje: '/ingredientes/lechuga_e.png', alt: 'Lechuga' },
    mostaza: { nombre: 'Mostaza', imagen: '/ingredientes/mostaza.png', ensamblaje: '/ingredientes/mostaza_e.png', alt: 'Mostaza' },
    tomate: { nombre: 'Tomate', imagen: '/ingredientes/tomate.png', ensamblaje: '/ingredientes/tomate_e.png', alt: 'Tomate' },
    tocino: { nombre: 'Tocino', imagen: '/ingredientes/tocino.png', ensamblaje: '/ingredientes/tocino_e.png', alt: 'Tocino' },
    mayonesa: { nombre: 'Mayonesa', imagen: '/ingredientes/mayonesa.png', ensamblaje: '/ingredientes/mayonesa_e.png', alt: 'Mayonesa' },
    huevo: { nombre: 'Huevo', imagen: '/ingredientes/huevo.png', ensamblaje: '/ingredientes/huevo_e.png', alt: 'Huevo' },
    queso: { nombre: 'Queso', imagen: '/ingredientes/queso.png', ensamblaje: '/ingredientes/queso_e.png', alt: 'Queso' },
    frijoles: { nombre: 'Frijoles', imagen: '/ingredientes/frijoles.png', ensamblaje: '/ingredientes/frijoles_e.png', alt: 'Frijoles' },
};

function obtenerOpcionesEnsamblaje(
    ingredientesSeleccionados: IngredienteId[],
    estadosPreparacion: { carne: string; pan: string; papas: string },
    estacionesListas: { carne: boolean; pan: boolean; papas: boolean },
): IngredienteProps[] {
    const ingredientesDisponibles = [
        ...new Set([
            ...ingredientesSeleccionados,
            ...(['carne', 'pan', 'papas'] as const).filter((tipo) => estacionesListas[tipo]),
        ]),
    ];

    return ingredientesDisponibles.flatMap<IngredienteProps>((id) => {
        if (id === 'carne') {
            if (!estacionesListas.carne) return [];
            const variante = carneEnsamblaje.find(({ estatus }) => estatus === estadosPreparacion.carne);
            if (!variante) throw new Error(`No existe una variante de ensamblaje para ${estadosPreparacion.carne}`);
            return [{
                id,
                nombre: 'Carne',
                imagen: variante.src,
                ensamblaje: variante.src,
                alt: variante.alt,
            }];
        }

        if (id === 'papas') {
            if (!estacionesListas.papas) return [];
            const estado = papasEstatusData.find(({ estatus }) => estatus === estadosPreparacion.papas);
            if (!estado) throw new Error(`No existe un estado de papas para ${estadosPreparacion.papas}`);

            const variante = papasEnsamblaje.find(({ estatus }) => estatus === estadosPreparacion.papas);
            if (!variante) throw new Error(`No existe una variante de ensamblaje para ${estadosPreparacion.papas}`);
            return [{
                id,
                nombre: 'Papas',
                imagen: estado.src,
                ensamblaje: variante.src,
                alt: estado.alt,
            }];
        }

        if (id === 'pan') {
            if (!estacionesListas.pan) return [];
            const variantes = panEnsamblaje.filter(({ estatus }) => estatus === estadosPreparacion.pan);
            if (variantes.length === 0) {
                throw new Error(`No existe una variante de ensamblaje para ${estadosPreparacion.pan}`);
            }

            return variantes.map((variante, index) => {
                const panSeparado = variantes.length > 1;
                return {
                    id: panSeparado ? (index === 0 ? 'pan_base' : 'pan_tapa') : id,
                    nombre: panSeparado ? (index === 0 ? 'Pan Base' : 'Pan Tapa') : 'Pan',
                    imagen: variante.src,
                    ensamblaje: variante.src,
                    alt: variante.alt,
                };
            });
        }

        return [{ id, ...ingredientesFijos[id] }];
    });
}

export default function TablaEnsamblaje({
    vistaResultado = false,
    onRegresar,
    onTerminar,
}: TablaEnsamblajeProps) {
    const [ingredientesAgregados, setIngredientesAgregados] = useState<IngredienteProps[]>([]);
    const [papasAgregadas, setPapasAgregadas] = useState(false);
    const { ingredientesSeleccionados, estadosPreparacion, estacionesListas } = useIngredientes();
    const opcionesDisponibles = obtenerOpcionesEnsamblaje(
        ingredientesSeleccionados,
        estadosPreparacion,
        estacionesListas,
    );
    const opcionesEnsamblaje = opcionesDisponibles.filter(({ id }) => id !== 'papas');
    const opcionPapas = opcionesDisponibles.find(({ id }) => id === 'papas');
    const ingredientesAgregadosVisibles = ingredientesAgregados.filter((agregado) =>
        opcionesDisponibles.some(({ id }) => id === agregado.id),
    );
    const ingredientesPendientes = ingredientesSeleccionados.filter(
        (id): id is 'carne' | 'pan' | 'papas' =>
            (id === 'carne' || id === 'pan' || id === 'papas') && !estacionesListas[id],
    );

    if (vistaResultado) {
        return (
            <section className="relative flex min-h-screen w-full flex-col items-center justify-center gap-2 overflow-y-auto p-4">
                <div className="relative aspect-1392/912 w-full max-w-6xl">
                    <Image
                        src="/general/letrero.png"
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 1200px) 100vw, 1152px"
                        className="object-contain"
                    />

                    <div className="absolute left-[15%] right-[15%] top-[15%] h-[14%]">
                        <Image
                            src="/general/ya_terminaste.png"
                            alt="¿Ya terminaste?"
                            fill
                            priority
                            sizes="(max-width: 1200px) 70vw, 806px"
                            className="object-contain"
                        />
                    </div>

                    <div className="absolute inset-[30%_8%_12%] grid min-h-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-1 sm:gap-4">
                        <div className="flex min-h-0 flex-col items-center rounded-xl bg-black/10 p-1 sm:rounded-2xl sm:p-3">
                            <p className="shrink-0 text-center text-[clamp(0.55rem,1.5vw,1.125rem)] font-bold text-white [text-shadow:0_1px_3px_#333]">
                                Ejemplo
                            </p>
                            <div className="grid min-h-0 flex-1 w-full grid-cols-2 items-center justify-items-center gap-1">
                                <Image
                                    src="/general/hamburguesa_lista.png"
                                    alt="Hamburguesa de ejemplo"
                                    width={150}
                                    height={150}
                                    priority
                                    className="max-h-full max-w-full object-contain"
                                />
                                <Image
                                    src="/ingredientes/papas_variantes/ensamblaje/papas_e_limpia_cortada_cocida.png"
                                    alt="Papas de ejemplo"
                                    width={200}
                                    height={200}
                                    priority
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <Image
                                src="/general/vs.png"
                                alt="contra"
                                width={120}
                                height={120}
                                priority
                                className="h-auto w-[clamp(1.5rem,6vw,5rem)] object-contain"
                            />
                        </div>

                        <div className="flex min-h-0 flex-col items-center rounded-xl bg-black/10 p-1 sm:rounded-2xl sm:p-3">
                            <p className="shrink-0 text-center text-[clamp(0.55rem,1.5vw,1.125rem)] font-bold text-white [text-shadow:0_1px_3px_#333]">
                                Tu ensamble
                            </p>
                            <div className="grid min-h-0 flex-1 w-full grid-cols-2 items-center justify-items-center gap-1">
                                <div className="flex h-full min-h-0 w-full flex-col-reverse items-center justify-center overflow-hidden">
                                    {ingredientesAgregadosVisibles.map((ingrediente, index) => (
                                        <div
                                            key={`${ingrediente.id}-${index}`}
                                            className="relative -mb-3 w-full max-w-32 animate-in fade-in slide-in-from-bottom-2 duration-300 sm:-mb-5"
                                        >
                                            <Image
                                                src={ingrediente.ensamblaje}
                                                alt={ingrediente.alt}
                                                width={400}
                                                height={400}
                                                className=" object-contain "
                                            />
                                        </div>
                                    ))}
                                    {ingredientesAgregadosVisibles.length === 0 && (
                                        <p className="text-center text-[clamp(0.5rem,1.2vw,0.875rem)] font-semibold text-white [text-shadow:0_1px_3px_#333]">
                                            Sin ingredientes
                                        </p>
                                    )}
                                </div>

                                {opcionPapas ? (
                                    <Image
                                        src={opcionPapas.ensamblaje}
                                        alt={opcionPapas.alt}
                                        width={200}
                                        height={200}
                                        priority
                                        className="max-h-full max-w-full object-contain"
                                    />
                                ) : (
                                    <p className="text-center text-[clamp(0.5rem,1.2vw,0.875rem)] font-semibold text-white [text-shadow:0_1px_3px_#333]">
                                        Sin papas
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={onRegresar}
                        className="transition-transform duration-200 ease-out hover:scale-110 active:scale-95"
                    >
                        <Image
                            src="/general/btn_regresar.png"
                            alt="Regresar al ensamblaje"
                            width={220}
                            height={100}
                            priority
                            className="object-contain"
                        />
                    </button>
                    <button
                        type="button"
                        onClick={onTerminar}
                        className="transition-transform duration-200 ease-out hover:scale-110 active:scale-95"
                    >
                        <Image
                            src="/general/btn_terminar.png"
                            alt="Terminar"
                            width={220}
                            height={100}
                            priority
                            className="object-contain"
                        />
                    </button>
                </div>
            </section>
        );
    }

    const agregarIngrediente = (ingrediente: IngredienteProps) => {
        setIngredientesAgregados((prev) => [...prev, ingrediente]);
    };

    const removerUltimoIngrediente = () => {
        setIngredientesAgregados((prev) => prev.slice(0, -1));
    };

    const reiniciarEnsamblaje = () => {
        setIngredientesAgregados([]);
    };

    const estaUsado = (id: string) => ingredientesAgregados.some((ing) => ing.id === id);

    return (
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-6xl rounded-3xl bg-amber-800 p-8">
                <div className="relative z-10 grid grid-cols-1 items-start gap-6 xl:grid-cols-2">


                    {/* Ensamblaje de hamburguesa */}
                    <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
                        <div className="relative flex h-125 min-w-0 flex-col-reverse items-center justify-center overflow-hidden rounded-2xl border-4 border-amber-900/30 bg-amber-200 p-6">
                            {ingredientesAgregadosVisibles.map((ingrediente, index) => (
                                <div
                                    key={`${ingrediente.id}-${index}`}
                                    className="relative -mb-7 w-full max-w-50 animate-in fade-in slide-in-from-bottom-2 duration-300"
                                >
                                    <Image
                                        src={ingrediente.ensamblaje}
                                        alt={ingrediente.alt}
                                        width={200}
                                        height={100}
                                        priority
                                        className="h-auto w-full object-contain"
                                    />
                                </div>
                            ))}

                            {ingredientesAgregadosVisibles.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-center text-amber-900/50 font-semibold">
                                        Agrega ingredientes<br />para comenzar
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex min-w-0 flex-col gap-4 rounded-2xl bg-white/90 p-6">
                            <h3 className="text-xl font-bold text-amber-900 text-center">
                                Ingredientes seleccionados
                            </h3>

                            {opcionesEnsamblaje.length === 0 ? (
                                <p className="max-w-56 text-center text-sm text-amber-900">
                                   Sin ingredientes.
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    {opcionesEnsamblaje.map((ingrediente) => {
                                        const usado = estaUsado(ingrediente.id);

                                        return (
                                            <button
                                                key={ingrediente.id}
                                                onClick={() => !usado && agregarIngrediente(ingrediente)}
                                                disabled={usado}
                                                className={`
                                                    group relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all
                                                    ${usado
                                                        ? 'border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed'
                                                        : 'border-amber-300 bg-amber-50 hover:scale-105 hover:border-amber-500 hover:bg-amber-100 active:scale-95'
                                                    }
                                                `}
                                            >
                                                <Image
                                                    src={ingrediente.imagen}
                                                    alt={ingrediente.alt}
                                                    width={100}
                                                    height={100}
                                                    className="object-contain transition-transform"
                                                />

                                                <span className={`text-sm font-semibold ${usado ? 'text-gray-500' : 'text-amber-900'}`}>
                                                    {ingrediente.nombre}
                                                </span>

                                                {usado && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="rounded-full bg-green-500 p-2 shadow-lg">
                                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            

                            
                            <button
                                onClick={removerUltimoIngrediente}
                                disabled={ingredientesAgregados.length === 0}
                                className="rounded-lg bg-orange-500 px-4 py-2 font-bold text-white shadow-md transition-all hover:bg-orange-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Quitar último
                            </button>
                           
                        </div>
                    </div>

                    {/* Ensamblaje de las papas */}
                    <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
                        <div className="relative flex h-125 min-w-0 flex-col-reverse items-center justify-center overflow-hidden rounded-2xl border-4 border-amber-900/30 bg-amber-200 p-6">
                            {papasAgregadas && opcionPapas && (
                                <div
                                    key={opcionPapas.id}
                                    className="relative -mb-6 w-full max-w-50 animate-in fade-in slide-in-from-bottom-2 duration-300"
                                >
                                    <Image
                                        src={opcionPapas.ensamblaje}
                                        alt={opcionPapas.alt}
                                        width={200}
                                        height={100}
                                        priority
                                        className="h-auto w-full object-contain"
                                    />
                                </div>
                            )}

                            {!papasAgregadas && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image
                                        src="/ingredientes/papas_base.png"
                                        alt="Base de las papas"
                                        width={200}
                                        height={100}
                                        priority
                                        className="max-w-full object-contain"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex min-w-0 flex-col gap-4 rounded-2xl bg-white/90 p-6">
                            <h3 className="text-xl font-bold text-amber-900 text-center">
                                Papas seleccionadas
                            </h3>

                            {!opcionPapas ? (
                                <p className="max-w-56 text-center text-sm text-amber-900">
                                    Sin ingredientes.
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        key={opcionPapas.id}
                                        onClick={() => setPapasAgregadas(true)}
                                        disabled={papasAgregadas}
                                        className={`
                                                    group relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all
                                                    ${papasAgregadas
                                                        ? 'border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed'
                                                        : 'border-amber-300 bg-amber-50 hover:scale-105 hover:border-amber-500 hover:bg-amber-100 active:scale-95'
                                                    }
                                                `}
                                    >
                                        <Image
                                            src={opcionPapas.imagen}
                                            alt={opcionPapas.alt}
                                            width={100}
                                            height={100}
                                            className="object-contain transition-transform"
                                        />

                                        <span className={`text-sm font-semibold ${papasAgregadas ? 'text-gray-500' : 'text-amber-900'}`}>
                                            {opcionPapas.nombre}
                                        </span>

                                        {papasAgregadas && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="rounded-full bg-green-500 p-2 shadow-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            )}

                           
                            <button
                                onClick={() => setPapasAgregadas(false)}
                                disabled={!papasAgregadas}
                                className="rounded-lg bg-orange-500 px-4 py-2 font-bold text-white shadow-md transition-all hover:bg-orange-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Quitar último
                            </button>
                            
                        </div>
                    </div>




                </div>
            </div>
        </div>
    );
}
