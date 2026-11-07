import Image from 'next/image';
import FondoCocina from '@/components/general/FondoCocina';

export default function HamburguesaTerminada() {
    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-6">
            <FondoCocina />

            <section className="relative z-10 flex flex-col items-center gap-6 rounded-3xl bg-amber-100/90 p-8 text-center shadow-2xl sm:p-12">
                
                <h1 className="text-3xl font-extrabold text-amber-950 sm:text-5xl">
                    ¡Pedido enviado!
                </h1>
            </section>
        </main>
    );
}
