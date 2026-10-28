'use client';
import { useState } from "react";

import Image from "next/image";
import FondoInstrucciones from "@/components/general/FondoInstrucciones";
import BtnComenzaCocinar from "@/components/general/BtnComenzarCocinar";

const nota="Recuerda que debes pasar por cada estación en orden, siguiendo los pasos indicados en cada una.";

const formato_paso="text-3xl text-amber-900 font-extrabold";

export default function (){

    return(
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/*Fondo*/}
            <FondoInstrucciones />
            

            <div className="grid grid-cols-7">
                <div className="flex items-center p-10 h-200 overflow-y-auto col-start-2 col-end-7 z-10 relative">
                    <div className="space-y-10 text-gray-800">
                        <p className={formato_paso}>
                            {nota}
                        </p>
                        <Image
                            src="/general/pasos_instrucciones.png"
                            alt="Logo del juego"
                            width={1200}
                            height={200}
                            priority
                            className="mx-auto"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-5 right-5 z-20">
                <BtnComenzaCocinar />
            </div>
        </main>
    );
};