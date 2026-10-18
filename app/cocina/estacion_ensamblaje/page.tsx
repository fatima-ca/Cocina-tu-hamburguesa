'use client';
import { useState } from 'react';
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import PantallaReceta from '@/components/cocina/PantallaReceta';
import { contenidoRecetas } from '@/components/cocina/DataText';



export default function EstacionEnsamblaje() {
    const [abierta, setAbierta] = useState<boolean>(true);

    return(
        <main className="relative min-h-screen w-full">
                    
            <div className="flex items-center justify-center h-screen">
                <h1 >
                    Estación de Ensamblaje
                </h1> 
            </div>
        
            <MostrarRecetas />
                   
            <PantallaReceta isOpen={abierta} onClose={() => setAbierta(false)}>
                <div className="max-w-4/6 w-full">
                    {contenidoRecetas[4].contenido}
                </div>
            </PantallaReceta>
                    
        </main>
    );
};