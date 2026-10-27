'use client';
import { useState } from 'react';
import FondoEstacion from '@/components/general/FondoEstacion';
import Btns from '@/components/general/Btns';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/cocina/DataText';
import Image from 'next/image';

type Ingrediente = {
  id: string;
  nombre: string;
  imagen: string;
  alt: string;
};

const INGREDIENTES_DISPONIBLES: Ingrediente[] = [
    { id: 'lechuga', nombre: 'Lechuga', imagen: '/ingredientes/lechuga.png', alt: 'Lechuga' },
    { id: 'pan_base', nombre: 'Pan Base', imagen: '/ingredientes/pan_base_tostado.png', alt: 'Pan base de hamburguesa' },  
    { id: 'carne', nombre: 'Carne', imagen: '/ingredientes/carne_preparada.png', alt: 'Carne de hamburguesa' },
    { id: 'tomate', nombre: 'Tomate', imagen: '/ingredientes/tomate.png', alt: 'Tomate' },
    { id: 'mayonesa', nombre: 'Mayonesa', imagen: '/ingredientes/mayonesa.png', alt: 'Tomate' },
    { id: 'mostaza', nombre: 'Mostaza', imagen: '/ingredientes/mostaza.png', alt: 'Tomate' },
    { id: 'queso', nombre: 'Queso', imagen: '/ingredientes/queso.png', alt: 'Queso' },
    { id: 'pan_tapa', nombre: 'Pan Tapa', imagen: '/ingredientes/pan_tapa_tostado.png', alt: 'Pan superior' },
];

export default function EstacionEnsamblaje() {
  const [abierta, setAbierta] = useState<boolean>(true);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<Ingrediente[]>([]);

  // Agregar ingrediente a la pila
  const agregarIngrediente = (ingrediente: Ingrediente) => {
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

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <FondoEstacion />
      <Btns />  
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-6xl rounded-3xl bg-amber-800 p-8">
          <div className="relative z-10 flex flex-col items-center gap-8">
            
            {/* Área de ensamblaje */}
            <div className="relative flex items-center gap-8">
              
              {/* Plato/Área de apilamiento */}
              <div className="relative flex flex-col-reverse items-center justify-end min-h-125 w-100 rounded-2xl border-4 border-amber-900/30 bg-linear-to-b from-amber-100 to-amber-200 p-6 shadow-2xl">
                
                {/* Ingredientes apilados */}
                {ingredientesSeleccionados.map((ingrediente, index) => (
                  <div
                    key={`${ingrediente.id}-${index}`}
                    className="relative -mb-20 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <Image
                      src={ingrediente.imagen}
                      alt={ingrediente.alt}
                      width={200}
                      height={100}
                      priority
                      className="object-contain drop-shadow-xl"
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

                {/* Plato base decorativo */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-87.5 h-7.5 rounded-full bg-amber-900/20 blur-md" />
              </div>

              {/* Panel de ingredientes disponibles */}
              <div className="flex flex-col gap-4 rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm">
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
                          group relative flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all
                          ${usado 
                            ? 'border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed' 
                            : 'border-amber-300 bg-amber-50 hover:scale-105 hover:border-amber-500 hover:bg-amber-100 hover:shadow-lg active:scale-95'
                          }
                        `}
                      >
                        <Image
                          src={ingrediente.imagen}
                          alt={ingrediente.alt}
                          width={80}
                          height={80}
                          className={`object-contain drop-shadow-md transition-transform ${!usado && 'group-hover:scale-110'}`}
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

            {/* Contador de ingredientes */}
            <div className="rounded-full bg-white/90 px-6 py-2 shadow-lg">
              <span className="text-lg font-bold text-amber-900">
                Ingredientes: {ingredientesSeleccionados.length} / {INGREDIENTES_DISPONIBLES.length}
              </span>
            </div>

          </div>
        </div>
      </div>
  
      <div className="absolute right-4 top-4 z-20">
        <MostrarRecetas />
      </div>
             
      <PantallaReceta isOpen={abierta} onClose={() => setAbierta(false)}>
        <div className="w-full max-w-3xl">
          {contenidoRecetas[4].contenido}
        </div>
      </PantallaReceta>
    </main>
  );
}