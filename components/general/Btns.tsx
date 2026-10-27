import BtnRegresar from '@/components/general/BtnRegresar';
import BtnDetectarError from '@/components/general/BtnDetectarError';

export default function Btns() {
    return (
        <div className="fixed right-7 top-7 z-50 flex flex-col gap-13">
            <BtnRegresar />
            <BtnDetectarError accion={() => console.log("Se detectó un error")} />
        </div>
    );
};