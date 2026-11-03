import Image from 'next/image';

type IngredienteAlarma = 'papas' | 'carne';

interface AlarmaCoccionProps {
    ingrediente: IngredienteAlarma;
    onRetirar: () => void;
    onContinuar: () => void;
    onVerReceta: () => void;
}

const opcionesAlarma = [
    { src: '/general/btn_retirar.png', accion: 'retirar' },
    {
        src: '/general/btn_continuar_cocinando.png',
        accion: 'continuar',
    },
    { src: '/general/btn_ver_receta.png', accion: 'receta' },
] as const;

const contenidoAlarma: Record<IngredienteAlarma, { imagen: string; mensaje: string }> = {
    papas: {
        imagen: '/general/alarma.png',
        mensaje: '¡Ya están listas las papas!',
    },
    carne: {
        imagen: '/general/alarma_carne.png',
        mensaje: '¡Ya está lista la carne!',
    },
};

export default function AlarmaCoccion({
    ingrediente,
    onRetirar,
    onContinuar,
    onVerReceta,
}: AlarmaCoccionProps) {
    const acciones = {
        retirar: onRetirar,
        continuar: onContinuar,
        receta: onVerReceta,
    };
    const textoIngrediente = ingrediente === 'papas' ? 'las papas' : 'la carne';

    return (
        <div
            className="fixed inset-0 z-10000 flex items-center justify-center bg-black/70 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Alarma de ${textoIngrediente}`}
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
                        src={contenidoAlarma[ingrediente].imagen}
                        alt={contenidoAlarma[ingrediente].mensaje}
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
                                aria-label={
                                    opcion.accion === 'retirar'
                                        ? `Retirar ${textoIngrediente}`
                                        : opcion.accion === 'continuar'
                                            ? 'Continuar cocinando'
                                            : `Ver receta de ${textoIngrediente}`
                                }
                                className="transition-transform hover:scale-105 active:scale-95"
                            >
                                <Image
                                    src={opcion.src}
                                    alt=""
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
