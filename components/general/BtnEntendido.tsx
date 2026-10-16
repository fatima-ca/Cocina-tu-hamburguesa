import Link from 'next/link'
import Image from 'next/image'

export default function BtnEntendido () {
    return (
        <Link
          href="/instrucciones/pasos"
          className="active:scale-95 text-white font-bold py-4 px-12 rounded-xl text-2xl transition-all duration-200"
        >
            <Image
                src="/general/btn_entendido.png"
                alt="Botón para marcar que se entendieron las instrucciones"
                width={150}
                height={100}
                priority
                className="object-contain drop-shadow-2xl hover:scale-105 active:scale-100 transition-transform duration-200"
            />
        </Link>
    );
};