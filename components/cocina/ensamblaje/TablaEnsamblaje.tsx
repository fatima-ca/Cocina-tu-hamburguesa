'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IngredienteProps } from '@/components/DATA/types';
import { INGREDIENTES_DISPONIBLES } from '@/components/DATA/DataText';



export default function TablaEnsamblaje () {
    const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<IngredienteProps[]>([]);
    
    // Agregar ingrediente a la pila
    const agregarIngrediente = (ingrediente: IngredienteProps) => {
        setIngredientesSeleccionados((prev) => [...prev, ingrediente]);
        console.log(`Agregado: ${ingrediente.nombre}`);
    };
    
    // Remover último ingrediente agregado
    const removerUltimoIngrediente = () => {
        setIngredientesSeleccionados((prev) => prev.slice(0, -1));
        console.log('Removido último ingrediente');
    };
    
    // Reiniciar todo
    const reiniciarEnsamblaje = () => {
        setIngredientesSeleccionados([]);
        console.log('Ensamblaje reiniciado');
    };
    
    // Verificar si un ingrediente ya fue usado
    const estaUsado = (id: string) => {
        return ingredientesSeleccionados.some((ing) => ing.id === id);
    };



    return(
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-6xl rounded-3xl bg-amber-800 p-8">
                <div className="relative z-10 flex flex-col items-center gap-8">
                    
                    {/* Área de ensamblaje */}
                    <div className="relative flex items-center gap-8">
                      
                        {/* Plato/Área de apilamiento */}
                        <div className="relative flex flex-col-reverse items-center justify-center min-h-125 w-100 rounded-2xl border-4 border-amber-900/30 bg-amber-200 p-6">
                        
                            {/* Ingredientes apilados */}
                            {ingredientesSeleccionados.map((ingrediente, index) => (
                                <div
                                    key={`${ingrediente.id}-${index}`}
                                    className="relative -mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
                                >
                                    <Image
                                        src={ingrediente.ensamblaje}
                                        alt={ingrediente.alt}
                                        width={200}
                                        height={100}
                                        priority
                                        className="object-contain"
                                    />
                                </div>
                            ))}
        
                            {/* Mensaje cuando está vacío */}
                            {ingredientesSeleccionados.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-center text-amber-900/50 font-semibold">
                                        Agrega ingredientes<br />para comenzar
                                    </p>
                                </div>
                            )}    
                        </div>
                      
        
                        {/* Panel de ingredientes disponibles */}
                        <div className="flex flex-col gap-4 rounded-2xl bg-white/90 p-6">
                            <h3 className="text-xl font-bold text-amber-900 text-center">
                                Ingredientes
                            </h3>
                        
                            <div className="grid grid-cols-2 gap-3">
                                {INGREDIENTES_DISPONIBLES.map((ingrediente) => {
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
                                                className="object-contain transition-transform "
                                            />

                                            <span className={`text-sm font-semibold ${usado ? 'text-gray-500' : 'text-amber-900'}`}>
                                                {ingrediente.nombre}
                                            </span>
                                
                                            {/* Checkmark cuando está usado */}
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

        
                            {/* Botones de control */}
                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    onClick={removerUltimoIngrediente}
                                    disabled={ingredientesSeleccionados.length === 0}
                                    className="rounded-lg bg-orange-500 px-4 py-2 font-bold text-white shadow-md transition-all hover:bg-orange-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Quitar último
                                </button>
                          
                                <button
                                    onClick={reiniciarEnsamblaje}
                                    disabled={ingredientesSeleccionados.length === 0}
                                    className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all hover:bg-red-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Reiniciar
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};