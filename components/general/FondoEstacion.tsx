import Image from 'next/image'

export default function FondoEstacion () {
    return(
        <Image
            src="/general/fondo_estacion.png"
            alt="Fondo de cocina"
            fill
            className="object-cover -z-20"
            priority
        />
    );
}