import Image from "next/image";
import { papasEstatusData, carneEstatusData} from "@/components/DATA/DataText";


export default function page () {
    return(
        <div className="flex flex-col gap-4">
        {papasEstatusData.map(paso =>
            <div key={paso.alt} className="flex items-center gap-4">
                <Image
                    src={paso.src}
                    width={500}
                    height={500}
                    alt={paso.alt}
                />
                <span>{paso.src.split("/").pop()}</span>
                <span>{paso.estatus.split("/").pop()}</span>
            </div>
        )}
        {carneEstatusData.map(paso =>
            <div key={paso.alt} className="flex items-center gap-4">
                <Image
                    src={paso.src}
                    width={500}
                    height={500}
                    alt={paso.alt}
                />
                <span>{paso.src.split("/").pop()}</span>
                <span>{paso.estatus.split("/").pop()}</span>
            </div>
        )}
        </div>
    );
};