import Image from 'next/image'


type BtnCoccionProps = {
    accion: () => void;
    disabled?: boolean;
};

export default function BtnCoccion ({ accion, disabled }: BtnCoccionProps) {
    return (
        <button
            onClick={accion}
            disabled={disabled}
            className="group relative transition-transform duration-200 ease-out hover:scale-110 active:scale-95 animate-[pulse-soft_2s_ease-in-out_infinite]"
        >
            <Image
                src="/general/btn_detener_coccion.png"
                alt="Boton para detener coccion"
                width={200}
                height={100}
                priority
                className="object-contain"
            />
        </button>
    );
};