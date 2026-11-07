import Image from 'next/image'


type BtnListoProps = {
    accion: () => void;
    disabled?: boolean;
    esEnsamblaje?: boolean;
};

export default function BtnListo ({ accion, disabled, esEnsamblaje = false }: BtnListoProps) {
    return (
        <button
            type="button"
            onClick={accion}
            disabled={disabled}
            className="group relative transition-transform duration-200 ease-out hover:scale-110 active:scale-95 animate-[pulse-soft_2s_ease-in-out_infinite]"
        >
            <Image
                src={esEnsamblaje ? "/general/btn_enviar_orden.png" : "/general/btn_listo.png"}
                alt={esEnsamblaje ? "Botón Enviar orden" : "Botón Listo"}
                width={esEnsamblaje ? 300 : 200}
                height={esEnsamblaje ? 200 : 100}
                priority
                className="object-contain"
            />
        </button>
    );
};