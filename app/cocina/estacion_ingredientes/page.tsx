'use client';
import { useState } from 'react';
import Image from 'next/image';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/cocina/DataText';



export default function EstacionIngredientes() {
    const [abierta, setAbierta] = useState<boolean>(true);

    return(
        <main className="grid min-h-screen w-full grid-cols-6">
            
            <div className="col-start-2 col-end-6 bg-amber-50">

                <div className='grid grid-cols-4 gap-4'>

                    <button
                        className='flex justify-center '
                    >
                        <Image
                        src="/ingredientes/carne_cruda.png"
                        alt="Seleccionar carne cruda"
                        width={180}
                        height={180}
                        priority
                        className="bg-amber-300 rounded-full p-2"
                        />
                    </button>

                    <button
                        className='flex justify-center '
                    >
                        <Image
                        src="/ingredientes/huevo.png"
                        alt="Seleccionar carne cruda"
                        width={180}
                        height={180}
                        priority
                        className="bg-amber-300 rounded-full p-2"
                        />
                    </button>

                    <button
                        className='flex justify-center '
                    >
                        <Image
                        src="/ingredientes/lechuga.png"
                        alt="Seleccionar carne cruda"
                        width={180}
                        height={180}
                        priority
                        className="bg-amber-300 rounded-full p-2"
                        />
                    </button>

                    <button
                        className='flex justify-center '
                    >
                        <Image
                        src="/ingredientes/mayonesa.png"
                        alt="Seleccionar carne cruda"
                        width={180}
                        height={180}
                        priority
                        className="bg-amber-300 rounded-full p-2"
                        />
                    </button>

                    <button
                        className='flex justify-center '
                    >
                        <Image
                        src="/ingredientes/mostaza.png"
                        alt="Seleccionar carne cruda"
                        width={180}
                        height={180}
                        priority
                        className="bg-amber-300 rounded-full p-2"
                        />
                    </button>

                    <button
                        className='flex justify-center '
                    >
                        <Image
                        src="/ingredientes/pan.png"
                        alt="Seleccionar carne cruda"
                        width={180}
                        height={180}
                        priority
                        className="bg-amber-300 rounded-full p-2"
                        />
                    </button>
                    
                    
                </div>

                {/* Letrero con instrucciones 
                <div className="absolute top-10">
                    <Image
                        src="/recetas/Selecciona_los_ingredientes.png"
                        alt="Icono de ingredientes"
                        width={700}
                        height={700}
                        priority
                        className="object-contain drop-shadow-2xl"
                    />
                </div>
                */}

                {/* Listado de ingredientes a elegir 
                
                    <button
                        className='bg-amber-300'
                    >
                        <Image
                        src="/ingredientes/carne_cruda.png"
                        alt="Seleccionar carne cruda"
                        width={100}
                        height={100}
                        priority
                        className="object-contain drop-shadow-2xl"
                        />
                    </button>*/}
            </div>

            
                
                
                
                    

                

        

            <MostrarRecetas />
           
            <PantallaReceta isOpen={abierta} onClose={() => setAbierta(false)}>
                <div className="max-w-4/6 w-full">
                    {contenidoRecetas[0].contenido}
                </div>
            </PantallaReceta>
            
        </main>
    );
};