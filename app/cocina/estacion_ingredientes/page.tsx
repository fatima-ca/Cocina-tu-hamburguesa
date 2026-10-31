'use client';
import { useState } from 'react';
import Image from 'next/image';
import FondoEstacion from '@/components/general/FondoEstacion';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import Btns from '@/components/general/Btns';
import { contenidoRecetas } from '@/public/ingredientes/papas_variantes/ContenidoRecetas';
import { ingredientes } from '@/components/DATA/DataText';

const ingredientesExtendidos = [
  ...ingredientes,
  { src: "/ingredientes/piña.png", nombre: "Piña" }, // 8 - piña
  { src: "/ingredientes/tocino.png", nombre: "Tocino" }, // 9 - tocino
  { src: "/ingredientes/huevo.png", nombre: "Huevo" }, // 10 - huevo
];

export default function EstacionIngredientes() {
    const [abierta, setAbierta] = useState<boolean>(true);

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
                        {/* papas */}
                        <IngredienteCard
                            src={ingredientesExtendidos[7].src}
                            alt="Seleccionar papas"
                            nombre={ingredientesExtendidos[7].nombre}
                        />

                        {/* piña */}
                        <IngredienteCard
                            src={ingredientesExtendidos[8].src}
                            alt="Seleccionar piña"
                            nombre={ingredientesExtendidos[8].nombre}
                        />

                        {/* lechuga */}
                        <IngredienteCard
                            src={ingredientesExtendidos[0].src}
                            alt="Seleccionar lechuga"
                            nombre={ingredientesExtendidos[0].nombre}
                        />

                        {/* mostaza */}
                        <IngredienteCard
                            src={ingredientesExtendidos[4].src}
                            alt="Seleccionar mostaza"
                            nombre={ingredientesExtendidos[4].nombre}
                        />

                        {/* tomate */}
                        <IngredienteCard
                            src={ingredientesExtendidos[2].src}
                            alt="Seleccionar tomate"
                            nombre={ingredientesExtendidos[2].nombre}
                        />

                        {/* carne */}
                        <IngredienteCard
                            src={ingredientesExtendidos[1].src}
                            alt="Seleccionar carne cruda"
                            nombre={ingredientesExtendidos[1].nombre}
                        />

                        {/* tocino */}
                        <IngredienteCard
                            src={ingredientesExtendidos[9].src}
                            alt="Seleccionar tocino"
                            nombre={ingredientesExtendidos[9].nombre}
                        />

                        {/* pan */}
                        <IngredienteCard
                            src={ingredientesExtendidos[6].src}
                            alt="Seleccionar pan"
                            nombre={ingredientesExtendidos[6].nombre}
                        />

                        {/* mayonesa */}
                        <IngredienteCard
                            src={ingredientesExtendidos[3].src}
                            alt="Seleccionar mayonesa"
                            nombre={ingredientesExtendidos[3].nombre}
                        />

                        {/* huevo */}
                        <IngredienteCard
                            src={ingredientesExtendidos[10].src}
                            alt="Seleccionar huevo"
                            nombre={ingredientesExtendidos[10].nombre}
                        />

                        {/* queso */}
                        <IngredienteCard
                            src={ingredientesExtendidos[5].src}
                            alt="Seleccionar queso"
                            nombre={ingredientesExtendidos[5].nombre}
                        />
                    </div>
                </div>  
            </div>

            <Btns />

            
    
            <MostrarRecetas />
           
            <PantallaReceta isOpen={abierta} onClose={() => setAbierta(false)}>
                <div className="max-w-4/6 w-full">
                    {contenidoRecetas[0].contenido}
                </div>
            </PantallaReceta>
            
        </main>
    );
};








interface IngredienteCardProps {
  src: string;
  alt: string;
  nombre: string;
}


function IngredienteCard ( {
  src,
  alt,
  nombre
} : IngredienteCardProps ) {

    const [seleccionado, setSeleccionado] = useState<boolean>(false);
 
    function handleClick() {
        setSeleccionado((prev) => !prev);
    }
    
    return(
        <button 
            onClick={handleClick}
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
