import Image from 'next/image'

export default function FondoCocina () {
    return(
        <Image
            src="/general/fondo_cocina.jpg"
            alt="Fondo de cocina"
            fill
            className="object-cover -z-20"
            priority
        />
    );
}