import FondoCocina from '@/components/general/FondoCocina'
import BtnEstacionPapas from '@/components/cocina/papas/BtnEstacionPapas';
import BtnEstacionCarne from '@/components/cocina/carne/BtnEstacionCarne';
import BtnEstacionEnsamblaje from '@/components/cocina/ensamblaje/BtnEstacionEnsamblaje';
import BtnEstacionPan from '@/components/cocina/pan/BtnEstacionPan';
import BtnEstacionIngredientes from '@/components/cocina/ingredientes/BtnEstacionIngredientes';
import RecetaCard from '@/components/cocina/pan/RecetaCard';


export default function Cocina () {
    return (
        <main className="relative min-h-screen w-full">

            <FondoCocina />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 pb-60">
                <BtnEstacionPapas />
                <BtnEstacionCarne />
                <BtnEstacionPan />
                <BtnEstacionEnsamblaje />
                <BtnEstacionIngredientes />
            </div>

            

        
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-end gap-4 w-[90%] max-w-4xl">
                <RecetaCard titulo="Receta: Cómo preparar el pan">
                    <div className="max-w-2xl w-full text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Cómo preparar el pan</h1>
                        <div className="bg-gray-50 rounded-2xl p-8 text-left space-y-4">
                            <p className="text-lg text-gray-700">
                                <strong>Paso 1:</strong> 
                            </p>
        
                        </div>
                    </div>
                </RecetaCard>

                <RecetaCard titulo="Receta: Cómo preparar las papas">
                    <div className="max-w-2xl w-full text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Cómo preparar las</h1>
                        <div className="bg-gray-50 rounded-2xl p-8 text-left space-y-4">
                            <p className="text-lg text-gray-700">
                                <strong>Paso 1:</strong> 
                            </p>
        
                        </div>
                    </div>
                </RecetaCard>
            </div>
        </main>
    );
};