import Link from 'next/link'
import Image from 'next/image'

export default function BtnRegresar () {
    return (
        <Link
          href="/cocina"
        >
            <Image
                src="/general/btn_regresar.png"
                alt="Boton para regresar"
                width={200}
                height={100}
                priority
                className="relative transition-transform duration-200 ease-out hover:scale-110 active:scale-95 animate-[pulse-soft_2s_ease-in-out_infinite]"
            />
        </Link>
    );
};