import Image from 'next/image'


type BtnDetectarErrorProps = {
  accion: () => void;
    disabled?: boolean;
};

export default function BtnDetectarError ({ accion, disabled }: BtnDetectarErrorProps) {
    return (
        <button
            onClick={accion}
            disabled={disabled}
            className="group relative transition-transform duration-200 ease-out hover:scale-110 active:scale-95 animate-[pulse-soft_2s_ease-in-out_infinite]"
        >
            <Image
                src="/general/btn_detectar_error.png"
                alt="Boton para detectar error"
                width={200}
                height={100}
                priority
                className="object-contain"
            />
        </button>
    );
};