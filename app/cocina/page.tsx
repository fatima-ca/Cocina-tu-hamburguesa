import FondoCocina from '@/components/general/FondoCocina'
import MostrarRecetas from '@/components/cocina/MostrarRecetas';
import MostrarEstaciones from '@/components/cocina/MostrarEstaciones';

export default function Cocina () {
    return (
        <main className="relative min-h-screen w-full">

            <FondoCocina />

            <MostrarEstaciones />

            <MostrarRecetas />

        </main>
    );
};