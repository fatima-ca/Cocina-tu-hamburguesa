import Image from 'next/image';

interface AlarmaPapasProps {
    onRetirar: () => void;
    onContinuar: () => void;
    onVerReceta: () => void;
}

const opcionesAlarma = [
    { src: '/general/btn_retirar.png', alt: 'Retirar las papas', accion: 'retirar' },
    {
        src: '/general/btn_continuar_cocinando.png',
        alt: 'Continuar cocinando',
        accion: 'continuar',
    },
    { src: '/general/btn_ver_receta.png', alt: 'Ver receta de las papas', accion: 'receta' },
] as const;

export default function AlarmaPapas({
    onRetirar,
    onContinuar,
    onVerReceta,
}: AlarmaPapasProps) {
    const acciones = {
        retirar: onRetirar,
        continuar: onContinuar,
        receta: onVerReceta,
    };

    return (
        <div
            className="fixed inset-0 z-10000 flex items-center justify-center bg-black/70 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Alarma de las papas"
        >
            <div className="relative w-full max-w-5xl">
                <Image
                    src="/general/letrero.png"
                    alt=""
                    width={1390}
                    height={900}
                    priority
                    className="h-auto w-full"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-[10%] py-[12%]">
                    <Image
                        src="/general/alarma.png"
                        alt="¡Ya están listas las papas!"
                        width={1390}
                        height={400}
                        priority
                        className="h-auto w-full max-w-3xl"
                    />
                    <div className="flex w-full flex-wrap items-center justify-center gap-4">
                        {opcionesAlarma.map((opcion) => (
                            <button
                                key={opcion.accion}
                                type="button"
                                onClick={acciones[opcion.accion]}
                                aria-label={opcion.alt}
                                className="transition-transform hover:scale-105 active:scale-95"
                            >
                                <Image
                                    src={opcion.src}
                                    alt={opcion.alt}
                                    width={300}
                                    height={110}
                                    priority
                                    className="h-auto w-56 object-contain sm:w-64"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
