'use client';
import { useState } from "react";

import Image from "next/image";
import FondoInstrucciones from "@/components/general/FondoInstrucciones";
import BtnEntendido from "@/components/general/BtnEntendido";

const paso1="1.- Para preparar tu hamburguesa deberás pasar por cada una de las estaciones como se muestra a continuación, desde la selección de ingredientes hasta el ensamblaje final de la hamburguesa con papas. En cada una de estas, se presentan los pasos a seguir para seleccionar y preparar cada ingrediente de la forma correcta.";
const nota="Nota: Cuando lo necesites, puedes consultar los pasos en todo momento, haciendo clic en alguna de las recetas que se te muestran en las pestañas que están colocadas en la parte inferior izquierda, según la estación que desees revisar. ";
const paso2="2.- Si detectas que realizaste un error al seguir las instrucciones, da clic en el botón de “Detecté un error” y elige la estación a la cual deseas regresar para mejorar tu procedimiento. En caso de que el error sea en la misma estación y necesites volver a iniciar da clic en “Reiniciar”.";
const paso3="3.- Algunos pasos requieren de cierto tiempo para que los ingredientes se cocinen y estén listos, Es importante que se cumpla este lapso adecuadamente para garantizar una cocción adecuada de los alimentos. Puedes consultar el tiempo restante haciendo clic en alguna de las recetas que se te muestran en las pestañas que están colocadas en la parte inferior izquierda, según el tiempo de la estación que desees revisar.";
const paso4="4.- Cuando finalices cada paso en cada estación, haz clic en el botón de “Listo”.";
const paso5="5.- Para finalizar tu hamburguesa con papas, da clic en el botón de “Enviar orden”.";

const formato_paso="text-3xl text-amber-900 font-extrabold";

export default function (){
    const [pagina, setPagina] = useState<1 | 2>(1);

    return(
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/*Fondo*/}
            <FondoInstrucciones />

            <div className="grid grid-cols-7">
                <div className="flex items-center p-10 h-200 overflow-y-auto col-start-2 col-end-7 z-10 relative">
                    <div className="space-y-10 text-gray-800">

                        {pagina === 1 && (
                            <>
                                <div>
                                    <p className={formato_paso}>
                                        {paso1}
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
                                        {nota}
                                    </p>
                                </div>

                                <div>
                                    <p className={formato_paso}>
                                        {paso2}
                                    </p>
                                </div>

                                <div className="absolute bottom-10 right-10">
                                    <button 
                                        onClick={() => setPagina(2)}
                                        className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                                    >
                                        <span>Siguiente</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}

                        {pagina === 2 && (
                            <>
                                <div>
                                    <p className={formato_paso}>
                                        {paso3}
                                    </p>
                                </div>

                                <div>
                                    <p className={formato_paso}>
                                        {paso4}
                                    </p>
                                </div>

                                <div>
                                    <p className={formato_paso}>
                                        {paso5}
                                    </p>
                                </div>

                                <div className="absolute bottom-10 left-10">
                                    <button 
                                        onClick={() => setPagina(1)}
                                        className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>
                                        <span>Anterior</span>
                                    </button>
                                </div>
                            </>
                        )}
                        

                        
                    </div>
                </div>
            </div>

            <div className="absolute bottom-5 right-5 z-20">
                <BtnEntendido />
            </div>
        </main>
    );
};