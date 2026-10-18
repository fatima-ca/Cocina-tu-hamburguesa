import Image from "next/image";


export const ingredientes = [
  { src: "/ingredientes/lechuga.png", nombre: "Lechuga" },
  { src: "/ingredientes/carne_cruda.png", nombre: "Carne" },
  { src: "/ingredientes/tomate.png", nombre: "Tomate" },
  { src: "/ingredientes/mayonesa.png", nombre: "Mayonesa" },
  { src: "/ingredientes/mostaza.png", nombre: "Mostaza" },
  { src: "/ingredientes/queso.png", nombre: "Queso" },
  { src: "/ingredientes/pan.png", nombre: "Pan" },
  { src: "/ingredientes/papas_crudas.png", nombre: "Papas" },
];

export const pasosPapas = [
    { src: "/ingredientes/papas_lavadas.png", instruccion: "Lavar las papas" },
    { src: "/ingredientes/papas_cuchillo.png", instruccion: "Cortar las papas" },
    { src: "/ingredientes/papas_freidas.png", instruccion: "Cocción de papas [5min]" },
];

export const pasosCarne = [
    { src: "/ingredientes/carne_formada.png", instruccion: "Formar la carne" },
    { src: "/ingredientes/carne_cruda.png", instruccion: "Colocar en sartén" },
    { src: "/ingredientes/carne_cruda.png", instruccion: "Cocción por lado 1 [2min]" },
    { src: "/ingredientes/carne_cruda.png", instruccion: "Cocción por lado 2 [2min]" },
];

export const pasosPan = [
    { src: "/ingredientes/pan_cortado.png", instruccion: "Cortar el pan" },
    { src: "/ingredientes/icono_tostadora.png", instruccion: "Tostar el pan" },
];

export const pasosEnsamblaje = [
    { src: "/ingredientes/pan_base_tostado.png", instruccion: "1.- Colocar la base de pan" },
    { src: "/ingredientes/carne_lista.png", instruccion: "2.- Colocar la carne preparada" },
    { src: "/ingredientes/queso.png", instruccion: "3.- Colocar el queso" },
    { src: "/ingredientes/tomate.png", instruccion: "4.- Colocar el tomato" },
    { src: "/ingredientes/lechuga.png", instruccion: "5.- olocar la lechuga" },
    { src: "/ingredientes/mostaza.png", instruccion: "6.- Untar la mostaza" },
    { src: "/ingredientes/mayonesa.png", instruccion: "7.- Untar la mayonesa" },
    { src: "/ingredientes/pan_tapa_tostado.png", instruccion: "8.- Colocar la tapa de pan" },
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
                            alt="Icono de ingredientes"
                            width={400}
                            height={400}
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                        <Image
                            src="/ingredientes/papas_listas.png"
                            alt="Hamburguesa con papas terminada"
                            width={500}
                            height={500}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {pasosPapas.map((paso, index) => (
                            <div 
                                key={index} 
                                className="grid flex-col items-center justify-center p-4 bg-white circular rounded-4xl grid-cols-2 gap-3"
                            >
                                <Image
                                    src={paso.src}
                                    alt={paso.instruccion}
                                    width={200}
                                    height={200}
                                    priority
                                    className="object-contain"
                                />
                                <span className="text-sm text-amber-900 font-semibold text-center">
                                    {paso.instruccion}
                                </span>
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
                            alt="Icono de ingredientes"
                            width={400}
                            height={400}
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                        <Image
                            src="/ingredientes/carne_lista.png"
                            alt="Hamburguesa con papas terminada"
                            width={500}
                            height={500}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {pasosCarne.map((paso, index) => (
                            <div 
                                key={index} 
                                className="grid flex-col items-center justify-center p-4 bg-white circular rounded-4xl grid-cols-2 gap-3"
                            >
                                <Image
                                    src={paso.src}
                                    alt={paso.instruccion}
                                    width={200}
                                    height={200}
                                    priority
                                    className="object-contain"
                                />
                                <span className="text-sm text-amber-900 font-semibold text-center">
                                    {paso.instruccion}
                                </span>
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
                            alt="Icono de ingredientes"
                            width={400}
                            height={400}
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                        <Image
                            src="/ingredientes/pan.png"
                            alt="Hamburguesa con papas terminada"
                            width={500}
                            height={500}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {pasosPan.map((paso, index) => (
                            <div 
                                key={index} 
                                className="grid flex-col items-center justify-center p-4 bg-white circular rounded-4xl grid-cols-2 gap-3"
                            >
                                <Image
                                    src={paso.src}
                                    alt={paso.instruccion}
                                    width={200}
                                    height={200}
                                    priority
                                    className="object-contain"
                                />
                                <span className="text-sm text-amber-900 font-semibold text-center">
                                    {paso.instruccion}
                                </span>
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


                    <div className="grid grid-cols-2 gap-4">
                    {pasosEnsamblaje.map((paso, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center justify-center p-4 bg-white circular rounded-4xl gap-2"
                        >
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
                    ))}
                    </div>

                </div>
            </>
        )
    }
]