'use client';
import { useState } from "react";
import IngredienteEstatus from "./IngredienteEstatus";
import BtnAccionIngredientes from "./BtnAccionIngredientes";

// Tipos para los datos
export type EstatusData = {
  estatus: string;
  src: string;
  alt: string;
};

export type AccionData = {
  id: string;
  label: string;
  src: string;
  alt: string;
};

interface TablaAccionesProps {
  estatusInicial: string;
  estatusData: EstatusData[];
  accionesData: AccionData[];
  acciones: Record<string, () => void>;
}

export default function TablaAcciones({ 
  estatusInicial, 
  estatusData, 
  accionesData, 
  acciones 
}: TablaAccionesProps) {
  const [estatusActual, setEstatusActual] = useState<string>(estatusInicial);
  
  const estadoActualData = estatusData.find(p => p.estatus === estatusActual) ?? estatusData[0];

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
      <div className="relative w-full max-w-4xl rounded-3xl bg-amber-800 p-8">
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="relative flex items-center justify-center rounded-2xl bg-white p-6">
              <IngredienteEstatus
                estatus={estadoActualData.estatus}
                src={estadoActualData.src}
                alt={estadoActualData.alt}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 rounded-2xl bg-white p-6">
            {accionesData.map((item) => (
              <BtnAccionIngredientes
                key={item.id}
                src={item.src}
                alt={item.alt}
                label={item.label}
                accion={acciones[item.id] || (() => {})}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}