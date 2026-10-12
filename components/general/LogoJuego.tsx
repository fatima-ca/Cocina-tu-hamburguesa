import Image from 'next/image'

export default function LogoJuego () {
    return(
        <Image
            src="/general/logo_juego.png"
            alt="Logo del juego"
            width={1200}
            height={1200}
            priority
            className="object-contain drop-shadow-2xl"
        />
    );
}