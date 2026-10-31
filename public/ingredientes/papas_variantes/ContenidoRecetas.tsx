import Image from "next/image";
import { ingredientes, pasosPapas, pasosCarne, pasosPan, pasosEnsamblaje } from "../../../components/DATA/DataText";
import CronometroReceta from "../../../components/cocina/cocinar/CronometroReceta";


export const contenidoRecetas=[

    //Info Receta Elegir Ingredientes
    {
        titulo: "Lista de Ingredientes",
        contenido: (
            <>
                <div className="grid grid-cols-2 gap-8 items-center">
    
                    <div className="flex flex-col items-center justify-center space-y-10">
                        <Image
                            src="/recetas/Ingredientes.png"
                            alt="Icono de ingredientes"
                            width={400}
                            height={400}
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                        <Image
                            src="/ingredientes/platillo.png"
                            alt="Hamburguesa con papas terminada"
                            width={500}
                            height={500}
                            priority
                            className="object-contain"
                        />
                    </div>


                    <div className="grid grid-cols-2 gap-3">
                        {ingredientes.map((ingrediente, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col items-center justify-center p-4 bg-white circular rounded-4xl"
                            >   
                                <Image
                                    src={ingrediente.src}
                                    alt={ingrediente.nombre}
                                    width={120}
                                    height={100}
                                    priority
                                    className="object-contain"
                                />

                                <span className="text-sm text-amber-900 font-semibold text-center">
                                    {ingrediente.nombre}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </>
        )

    },

    //Info Receta Papas
    {
        titulo: "Cómo preparar las papas",
        contenido: (
            <div className="relative">
                <div className="grid grid-cols-2 gap-8 items-center">
    
                    <div className="flex flex-col items-center justify-center space-y-10">
                        <Image
                            src="/recetas/Preparar_las_papas.png"
                            alt="Titulo Preparar las papas"
                            width={400}
                            height={400}
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                        <Image
                            src="/ingredientes/papas_listas.png"
                            alt="Imagen de las papas listas"
                            width={350}
                            height={350}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {pasosPapas.map((paso, index) => (
                            <div 
                                key={index} 
                                className="grid flex-col items-center justify-center p-4 bg-white circular rounded-4xl grid-cols-5"
                            >   
                                <div className="col-start-1 col-end-2 flex justify-center">
                                    <p className="text-5xl font-bold text-amber-900">{paso.num}</p>
                                </div>

                                <div className="col-start-2 col-end-4 flex flex-col items-center"> 
                                    <Image
                                        src={paso.src}
                                        alt={paso.instruccion}
                                        width={150}
                                        height={150}
                                        priority
                                        className="object-contain"
                                    />
                                </div>

                                <div className="col-start-4 col-end-6 flex flex-col items-center">

                                    {paso.tiempo!=null ? (
                                        <div className="grid grid-flow-col grid-rows-2">
                                            <span className="text-3xl text-amber-900 font-semibold text-center">
                                                {paso.instruccion}
                                            </span>
                                            <span className="text-lg text-amber-900 font-light text-center">
                                                Retirar entre <br/>{paso.tiempo}
                                            </span>
                                        </div> 
                                    ): (
                                        <>
                                            <span className="text-3xl text-amber-900 font-semibold text-center">
                                                {paso.instruccion}
                                            </span>
                                        </> 
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='absolute left-50 top-1/2 z-30'>
                    <CronometroReceta tipo="papas" />
                </div>
            </div>
        )
    },

    //Info Receta Carne
    {
        titulo: "Cómo preprar la carne",
        contenido: (
            <>
                <div className="grid grid-cols-2 gap-8 items-center">
    
                    <div className="flex flex-col items-center justify-center space-y-10">
                        <Image
                            src="/recetas/Preparar_la_carne.png"
                            alt="Titulo Preprar la carne"
                            width={400}
                            height={400}
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                        <Image
                            src="/ingredientes/carne_preparada.png"
                            alt="Imagen de la carne preparada"
                            width={390}
                            height={390}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {pasosCarne.map((paso, index) => (
                            <div 
                                key={index} 
                                className="grid flex-col items-center justify-center p-4 bg-white circular rounded-4xl grid-cols-5 gap-4"
                            >   
                                <div className="col-start-1 col-end-2 flex justify-center">
                                    <p className="text-5xl font-bold text-amber-900">{paso.num}</p>
                                </div>

                                <div className="col-start-2 col-end-4 flex flex-col items-center"> 
                                    <Image
                                        src={paso.src}
                                        alt={paso.instruccion}
                                        width={500}
                                        height={200}
                                        priority
                                        className="object-contain"
                                    />
                                </div>

                                <div className="col-start-4 col-end-6 flex flex-col items-center"> 
                                    {paso.tiempo!=null ? (
                                        <div className="grid grid-flow-col grid-rows-2">
                                            <span className="text-3xl text-amber-900 font-semibold text-center">
                                                {paso.instruccion}
                                            </span>
                                            <span className="text-lg text-amber-900 font-light text-center">
                                                Retirar entre <br/>{paso.tiempo}
                                            </span>
                                        </div> 
                                    ): (
                                        <>
                                            <span className="text-3xl text-amber-900 font-semibold text-center">
                                                {paso.instruccion}
                                            </span>
                                        </> 
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className='absolute left-120 top-1/2 z-30'>
                    <CronometroReceta tipo="carne" />
                </div>
            </>
        )
    },

    //Info Receta Pan
    {
        titulo: "Cómo preparar el pan",
        contenido: (
            <>
                <div className="grid grid-cols-2 gap-8 items-center">
    
                    <div className="flex flex-col items-center justify-center space-y-10">
                        <Image
                            src="/recetas/Preparar_el_pan.png"
                            alt="Titulo Preparar el pan"
                            width={400}
                            height={400}
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                        <Image
                            src="/ingredientes/pan.png"
                            alt="Imagen del pan cortado"
                            width={380}
                            height={380}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {pasosPan.map((paso, index) => (
                            <div 
                                key={index} 
                                className="grid flex-col items-center justify-center p-4 bg-white circular rounded-4xl grid-cols-5"
                            >   
                                <div className="col-start-1 col-end-2 flex justify-center">
                                    <p className="text-5xl font-bold text-amber-900">{paso.num}</p>
                                </div>

                                <div className="col-start-2 col-end-4 flex flex-col items-center"> 
                                    <Image
                                        src={paso.src}
                                        alt={paso.instruccion}
                                        width={150}
                                        height={150}
                                        priority
                                        className="object-contain"
                                    />
                                </div>

                                <div className="col-start-4 col-end-6 flex flex-col items-center"> 
                                    {paso.tiempo!=null ? (
                                        <div className="grid grid-flow-col grid-rows-2">
                                            <span className="text-3xl text-amber-900 font-semibold text-center">
                                                {paso.instruccion}
                                            </span>
                                            <span className="text-lg text-amber-900 font-light text-center">
                                                Retirar entre <br/>{paso.tiempo}
                                            </span>
                                        </div> 
                                    ): (
                                        <>
                                            <span className="text-3xl text-amber-900 font-semibold text-center">
                                                {paso.instruccion}
                                            </span>
                                        </> 
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className='absolute left-120 top-1/2 z-30'>
                    <CronometroReceta tipo="pan" />
                </div>
            </>
        )
    },

    //Info Receta Ensamblar
    {
        titulo: "Cómo ensamblar los ingredientes",
        contenido: (
            <>
                <div className="grid grid-cols-2 gap-8 items-center">
    
                    <div className="flex flex-col items-center justify-center space-y-10">
                        <Image
                            src="/recetas/Ensamblar_los_ingredientes.png"
                            alt="Titulo Ensamblar los ingredientes"
                            width={400}
                            height={400}
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                        <Image
                            src="/ingredientes/platillo.png"
                            alt="Hamburguesa con papas terminada"
                            width={500}
                            height={500}
                            priority
                            className="object-contain"
                        />
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                    {pasosEnsamblaje.map((paso, index) => (
                        <div 
                            key={index} 
                            className="grid items-center justify-center p-4 bg-white circular rounded-4xl grid-cols-4"
                        >
                            <div className="col-start-1 col-end-2 flex justify-center">
                                <p className="text-5xl font-bold text-amber-900">{paso.num}</p>
                            </div>

                            <div className="col-start-2 col-end-5 flex flex-col items-center gap-2"> 
                                <Image
                                    src={paso.src}
                                    alt={paso.instruccion}
                                    width={120}
                                    height={100}
                                    priority
                                    className="object-contain"
                                />
                                <span className="text-sm text-amber-900 font-semibold text-center">
                                    {paso.instruccion}
                                </span>
                            </div>
                        </div>
                    ))}
                    </div>

                </div>
            </>
        )
    }
]