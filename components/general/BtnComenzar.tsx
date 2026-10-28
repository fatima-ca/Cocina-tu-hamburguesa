import Link from 'next/link'
import Image from 'next/image'

export default function BtnComenzar () {
    return (
        <Link
          href="/cocina"
          className="active:scale-95 text-white font-bold py-4 px-12 rounded-xl text-2xl transition-all duration-200"
        >
            <Image
                src="/general/btn_comenzar.png"
                alt="Boton para entrar en el juego"
                width={500}
                height={100}
                priority
                className="object-contain drop-shadow-2xl"
            />
        </Link>
    );
};