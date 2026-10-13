import Image from "next/image";
import FondoInstrucciones from "@/components/general/FondoInstrucciones";
import BtnComenzaCocinar from "@/components/general/BtnComenzarCocinar";

export default function (){
    return(
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/*Fondo*/}
            <FondoInstrucciones />

            <div className="grid grid-cols-7">
            <div className="p-10 max-h-200 overflow-y-auto col-start-2 col-end-7">
                <div className="space-y-10 text-gray-800">
            
                    <div>
                        <p className="text-2xl text-amber-900 font-extrabold">
                            1.- Para preparar tu hamburguesa deberás pasar por cada una de las estaciones como se muestra a continuación, desde la selección de ingredientes hasta el ensamblaje final de la hamburguesa con papas. En cada una de estas, se presentan los pasos a seguir para seleccionar y preparar cada ingrediente de la forma correcta.
                        </p>

                        <Image
                            src="/general/pasos_instrucciones.png"
                            alt="Logo del juego"
                            width={900}
                            height={200}
                            priority
                            className="mx-auto"
                        />

                        <p className=" text-amber-800 font-extrabold underline">
                            Nota: Cuando lo necesites, puedes consultar los pasos en todo momento, haciendo clic en alguna de las recetas que se te muestran en las pestañas que están colocadas en la parte inferior izquierda, según la estación que desees revisar. 
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl text-amber-900 font-extrabold">
                            2.- Si detectas que realizaste un error al seguir las instrucciones, da clic en el botón de “Detecté un error” y elige la estación a la cual deseas regresar para mejorar tu procedimiento. En caso de que el error sea en la misma estación y necesites volver a iniciar da clic en “Reiniciar”.

                        </p>
                    </div>

                    <div>
                        <p className="text-2xl text-amber-900 font-extrabold">
                            3.- Algunos pasos requieren de cierto tiempo para que los ingredientes se cocinen y estén listos, Es importante que se cumpla este lapso adecuadamente para garantizar una cocción adecuada de los alimentos. Puedes consultar el tiempo restante haciendo clic en alguna de las recetas que se te muestran en las pestañas que están colocadas en la parte inferior izquierda, según el tiempo de la estación que desees revisar.
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl text-amber-900 font-extrabold">
                            4.- Cuando finalices cada paso en cada estación, haz clic en el botón de “Listo”.
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl text-amber-900 font-extrabold">
                            5.- Para finalizar tu hamburguesa con papas, da clic en el botón de “Enviar orden”.
                        </p>
                    </div>
                </div>
            </div>
            </div>

            <div className="absolute bottom-5 right-5 z-20">
                <BtnComenzaCocinar />
            </div>
        </main>
    );
};