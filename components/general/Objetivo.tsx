import Image from "next/image"

export default function Objetivo () {
    return (
        <div className="relative inline-block">
            <Image
                src="/general/letrero_objetivo.png"
                alt="Letrero de objetivo"
                width={500}
                height={200}
                priority
                className="object-contain"
            />
  
            <div className="absolute inset-0 flex items-center justify-center p-1">
                <div className="max-w-xs text-center">
                    <p className="text-amber-900 font-bold">
                        Objetivo: Preparar la hamburguesa con sus papas, siguiendo los pasos que se te presentarán a continuación.
                    </p>
                </div>
            </div>
        </div>
    );
};