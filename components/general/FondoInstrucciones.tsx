import Image from 'next/image'

export default function FondoInstrucciones () {
    return(
        <Image
            src="/general/fondo_instrucciones.png"
            alt="Fondo de cocina"
            fill
            className="object-cover -z-20"
            priority
        />
    );
}