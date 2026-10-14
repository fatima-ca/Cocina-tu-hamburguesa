import FondoCocina from '@/components/general/FondoCocina'
import BtnEstacionPapas from '@/components/cocina/papas/BtnEstacionPapas';
import BtnEstacionCarne from '@/components/cocina/carne/BtnEstacionCarne';
import BtnEstacionEnsamblaje from '@/components/cocina/ensamblaje/BtnEstacionEnsamblaje';
import BtnEstacionPan from '@/components/cocina/pan/BtnEstacionPan';
import BtnEstacionIngredientes from '@/components/cocina/ingredientes/BtnEstacionIngredientes';

export default function Cocina () {
    return (
        <main className="relative min-h-screen w-full overflow-hidden">

            <FondoCocina />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 pb-60">
                <BtnEstacionPapas />
                <BtnEstacionCarne />
                <BtnEstacionPan />
                <BtnEstacionEnsamblaje />
                <BtnEstacionIngredientes />
            </div>
        </main>
    );
};