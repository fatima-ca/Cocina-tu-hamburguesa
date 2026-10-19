import Image from "next/image";


export const ingredientes = [
  { src: "/ingredientes/lechuga.png", nombre: "Lechuga" }, // 0 - lechuga
  { src: "/ingredientes/carne_cruda.png", nombre: "Carne" }, // 1 - carne cruda
  { src: "/ingredientes/tomate.png", nombre: "Tomate" }, // 2 - tomate
  { src: "/ingredientes/mayonesa.png", nombre: "Mayonesa" }, // 3 - mayonesa
  { src: "/ingredientes/mostaza.png", nombre: "Mostaza" }, // 4 - mostaza
  { src: "/ingredientes/queso.png", nombre: "Queso" }, // 5 - queso
  { src: "/ingredientes/pan.png", nombre: "Pan" }, // 6 - pan
  { src: "/ingredientes/papas_crudas.png", nombre: "Papas" }, // 7 - papas crudas
];

export const pasosPapas = [
    { src: "/ingredientes/papas_lavadas.png", num:"1", instruccion: "Lavar las papas" },
    { src: "/ingredientes/papas_cortadas.png", num:"2", instruccion: "Cortar las papas" },
    { src: "/ingredientes/papas_freidas.png", num:"3", instruccion: "Cocción de papas [5min]" },
];

export const pasosCarne = [
    { src: "/ingredientes/carne_formada.png", num:"1", instruccion: "Formar la carne" },
    { src: "/ingredientes/carne_formada_sarten.png", num:"2", instruccion: "Colocar en sartén" },
    { src: "/ingredientes/carne_formada_mitad_sarten.png", num:"3", instruccion: "Cocción por lado 1 [2min]" },
    { src: "/ingredientes/carne_lista_sarten.png", num:"4", instruccion: "Cocción por lado 2 [2min]" },
];

export const pasosPan = [
    { src: "/ingredientes/pan_cortado.png", num:"1", instruccion: "Cortar el pan" },
    { src: "/ingredientes/pan_cortado_tostado.png", num:"2", instruccion: "Tostar el pan" },
];

export const pasosEnsamblaje = [
    { src: "/ingredientes/pan_base_tostado.png", num:"1", instruccion: "Colocar la base de pan" },
    { src: "/ingredientes/carne_lista.png", num:"2", instruccion: "Colocar la carne preparada" },
    { src: "/ingredientes/queso.png", num:"3", instruccion: "Colocar el queso" },
    { src: "/ingredientes/tomate.png", num:"4", instruccion: "Colocar el tomato" },
    { src: "/ingredientes/lechuga.png", num:"5", instruccion: "Colocar la lechuga" },
    { src: "/ingredientes/mostaza.png", num:"6", instruccion: "Untar la mostaza" },
    { src: "/ingredientes/mayonesa.png", num:"7", instruccion: "Untar la mayonesa" },
    { src: "/ingredientes/pan_tapa_tostado.png", num:"8", instruccion: "Colocar la tapa de pan" },
];




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
            <>
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
                                    <span className="text-3xl text-amber-900 font-semibold text-center">
                                        {paso.instruccion}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </>
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
                                    <span className="text-2xl text-amber-900 font-semibold text-center">
                                        {paso.instruccion}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
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
                                    <span className="text-3xl text-amber-900 font-semibold text-center">
                                        {paso.instruccion}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
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