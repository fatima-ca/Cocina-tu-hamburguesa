import Image from "next/image";
import { IngredienteEstatusProps } from "@/components/DATA/types";


export default function IngredienteEstatus({ estatus, src, alt }: IngredienteEstatusProps) {
    return(
        <Image
            key={estatus}
            src={src}
            alt={alt}
            width={400}
            height={400}
            priority
            className="object-contain drop-shadow-2xl"
        />
    );
}