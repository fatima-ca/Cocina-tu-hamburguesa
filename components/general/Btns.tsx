import BtnRegresar from '@/components/general/BtnRegresar';
import BtnDetectarError from '@/components/general/BtnDetectarError';
import BtnListo from '@/components/general/BtnListo';

interface BtnsProps {
    accionListo?: () => void;
    listoDeshabilitado?: boolean;
    mostrarDetectarError?: boolean;
}

export default function Btns({
    accionListo = () => console.log("Se ha completado la tarea"),
    listoDeshabilitado = false,
    mostrarDetectarError = false,
}: BtnsProps) {
    return (
        <>
        <div className="fixed right-7 top-7 z-50 flex flex-col gap-13">
            <BtnRegresar />
            {mostrarDetectarError && <BtnDetectarError />}
        </div>
        <div className="fixed right-7 bottom-7 z-50 flex flex-col gap-13">
            <BtnListo accion={accionListo} disabled={listoDeshabilitado} />
        </div>
        </>
    );
};