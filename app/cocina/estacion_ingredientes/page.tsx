'use client';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import FondoEstacion from '@/components/general/FondoEstacion';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import useRecetaInicial from '@/components/cocina/useRecetaInicial';
import Btns from '@/components/general/Btns';
import { contenidoRecetas } from '@/components/DATA/ContenidoRecetas';
import { useIngredientes, type IngredienteId } from '@/components/cocina/ingredientes/IngredientesContext';

const ingredientesDisponibles: IngredienteCardProps[] = [
    { id: 'papas', src: "/ingredientes/papas_variantes/papas_sucia_entera_cruda.png", nombre: "Papas", alt: "Seleccionar papas" },
    { id: 'pina', src: "/ingredientes/piña.png", nombre: "Piña", alt: "Seleccionar piña" },
    { id: 'lechuga', src: "/ingredientes/lechuga.png", nombre: "Lechuga", alt: "Seleccionar lechuga" },
    { id: 'mostaza', src: "/ingredientes/mostaza.png", nombre: "Mostaza", alt: "Seleccionar mostaza" },
    { id: 'tomate', src: "/ingredientes/tomate.png", nombre: "Tomate", alt: "Seleccionar tomate" },
    { id: 'carne', src: "/ingredientes/carne_variantes/carne_cruda.png", nombre: "Carne", alt: "Seleccionar carne cruda" },
    { id: 'tocino', src: "/ingredientes/tocino.png", nombre: "Tocino", alt: "Seleccionar tocino" },
    { id: 'pan', src: "/ingredientes/pan_variantes/pan.png", nombre: "Pan", alt: "Seleccionar pan" },
    { id: 'mayonesa', src: "/ingredientes/mayonesa.png", nombre: "Mayonesa", alt: "Seleccionar mayonesa" },
    { id: 'huevo', src: "/ingredientes/huevo.png", nombre: "Huevo", alt: "Seleccionar huevo" },
    { id: 'queso', src: "/ingredientes/queso.png", nombre: "Queso", alt: "Seleccionar queso" },
    { id: 'frijoles', src: "/ingredientes/frijoles.png", nombre: "Frijoles", alt: "Seleccionar frijoles" },
];

export default function EstacionIngredientes() {
    const pathname = usePathname();

    return <ContenidoEstacionIngredientes key={pathname} />;
}

function ContenidoEstacionIngredientes() {
    const router = useRouter();
    const recetaInicial = useRecetaInicial('ingredientes');
    const { ingredientesSeleccionados, guardarIngredientes } = useIngredientes();
    const [seleccionBorrador, setSeleccionBorrador] = useState<IngredienteId[]>(ingredientesSeleccionados);

    function alternarIngrediente(id: IngredienteId) {
        setSeleccionBorrador((seleccionActual) =>
            seleccionActual.includes(id)
                ? seleccionActual.filter((ingrediente) => ingrediente !== id)
                : [...seleccionActual, id],
        );
    }

    return(
        <main className="grid min-h-screen w-full grid-cols-6">
            <FondoEstacion />

            
            <div className="flex relative col-start-2 col-end-6  top-10 justify-center">
                
                <div className="flex flex-col items-center gap-6 p-6">

                    <div className="flex shrink-0">
                        <Image
                            src="/recetas/Selecciona_los_ingredientes.png"
                            alt="Icono de ingredientes"
                            width={600}
                            height={700}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <div className='grid grid-cols-4 gap-4'>
                        {ingredientesDisponibles.map((ingrediente) => (
                            <IngredienteCard
                                key={ingrediente.id}
                                {...ingrediente}
                                seleccionado={seleccionBorrador.includes(ingrediente.id)}
                                onClick={() => alternarIngrediente(ingrediente.id)}
                            />
                        ))}
                    </div>
                </div>  
            </div>

            <Btns accionListo={() => {
                guardarIngredientes(seleccionBorrador);
                router.push('/cocina');
            }} />

            
    
            <MostrarRecetas />
           
            <PantallaReceta isOpen={recetaInicial.abierta} onClose={recetaInicial.cerrar}>
                <div className="max-w-4/6 w-full">
                    {contenidoRecetas[0].contenido}
                </div>
            </PantallaReceta>
            
        </main>
    );
};








interface IngredienteCardProps {
  id: IngredienteId;
  src: string;
  alt: string;
  nombre: string;
  seleccionado?: boolean;
  onClick?: () => void;
}


function IngredienteCard({
  src,
  alt,
  nombre,
  seleccionado = false,
  onClick,
}: IngredienteCardProps) {
    return(
        <button 
            type="button"
            onClick={onClick}
            aria-pressed={seleccionado}
            className={`flex flex-col items-center justify-between w-45 h-40 rounded-2xl p-3 transition-all duration-200 shadow-md hover:shadow-lg bg-amber-300
                        ${seleccionado ? 'ring-4 ring-green-600 scale-102' : ' hover:bg-amber-400 hover:scale-102 active:scale-95'}`}
        >
                        
            <div className="w-35 h-35 rounded-xl flex items-center justify-center shadow-inner transition-colors duration-200 bg-white">
                <Image
                    src={src}
                    alt={alt}
                    width={100}
                    height={100}
                    priority
                    className="object-contain"
                />
            </div>

            <p className="text-2xl font-bold text-amber-900 text-center">{nombre}</p>

            {seleccionado && (
                <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full p-1 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
            )}
        </button>        
    );
};
