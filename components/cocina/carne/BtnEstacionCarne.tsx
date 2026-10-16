import Link from 'next/link'
import Image from 'next/image'

export default function BtnEstacionCarne () {
    return (
        <Link
          href="/cocina/estacion_carne"
          className="flex flex-col items-center active:scale-95 hover:scale-105 hover:brightness-75 transition-transform duration-200"
        >
            <Image
                src="/cocina/letrero_carne.png"
                alt="Botón para ir a la estación carne"
                width={180}
                height={100}
                priority
                className="w-full h-auto"
            />
            <Image
                src="/cocina/estufa.png"
                alt="Botón para ir a la estación carne"
                width={300}
                height={100}
                priority
            />
        </Link>
    );
};