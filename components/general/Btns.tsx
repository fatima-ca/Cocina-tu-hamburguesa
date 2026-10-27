import BtnRegresar from '@/components/general/BtnRegresar';
import BtnDetectarError from '@/components/general/BtnDetectarError';
import BtnListo from '@/components/general/BtnListo';

export default function Btns() {
    return (
        <>
        <div className="fixed right-7 top-7 z-50 flex flex-col gap-13">
            <BtnRegresar />
            <BtnDetectarError accion={() => console.log("Se detectó un error")} />
        </div>
        <div className="fixed right-7 bottom-7 z-50 flex flex-col gap-13">
            <BtnListo accion={() => console.log("Se ha completado la tarea")} />
        </div>
        </>
    );
};