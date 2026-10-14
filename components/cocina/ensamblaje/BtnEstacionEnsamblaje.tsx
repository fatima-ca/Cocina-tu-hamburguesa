import Link from 'next/link'
import Image from 'next/image'

export default function BtnEstacionEnsamblaje () {
    return (
        <Link
          href="/cocina/estacion_ensamblaje"
          className="flex flex-col items-center active:scale-95 hover:scale-105 hover:brightness-75 transition-transform duration-200"
        >
            <Image
                src="/cocina/letrero_ensamblaje.png"
                alt="Botón para ir a la estación ensamblaje"
                width={180}
                height={100}
                priority
            />
            <Image
                src="/cocina/mesa.png"
                alt="Botón para ir a la estación ensamblaje"
                width={270}
                height={100}
                priority
            />
        </Link>
    );
};