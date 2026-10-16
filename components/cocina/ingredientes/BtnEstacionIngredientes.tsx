import Link from 'next/link'
import Image from 'next/image'

export default function BtnEstacionIngredientes () {
    return (
        <Link
          href="/cocina/estacion_ensamblaje"
          className="flex flex-col items-center active:scale-95 hover:scale-105 hover:brightness-75 transition-transform duration-200"
        >
            <Image
                src="/cocina/estacion_ingredientes.png"
                alt="Botón para comenzar a cocinar"
                width={280}
                height={100}
                priority
                className="w-full h-auto"
            />
        </Link>
    );
};