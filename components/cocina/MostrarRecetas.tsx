import RecetaCard from '@/components/cocina/RecetaCard';

const contenidoRecetas=[
    //Info Receta Elegir Ingredientes
    {
        titulo: "Lista de Ingredientes",
        contenido: (
            <div className="bg-gray-50 rounded-2xl p-8 text-left space-y-4">
                <p className="text-lg text-gray-700">
                    <strong>Paso 1:</strong> 
                 </p>
            </div>
        )

    },

    //Info Receta Papas
    {
        titulo: "Cómo preparar las papas",
        contenido: (
            <div className="bg-gray-50 rounded-2xl p-8 text-left space-y-4">
                <p className="text-lg text-gray-700">
                    <strong>Paso 1:</strong> 
                 </p>
            </div>
        )
    },

    //Info Receta Carne
    {
        titulo: "Cómo preprar la carne",
        contenido: (
            <div className="bg-gray-50 rounded-2xl p-8 text-left space-y-4">
                <p className="text-lg text-gray-700">
                    <strong>Paso 1:</strong> 
                 </p>
            </div>
        )
    },

    //Info Receta Pan
    {
        titulo: "Cómo preparar el pan",
        contenido: (
            <div className="bg-gray-50 rounded-2xl p-8 text-left space-y-4">
                <p className="text-lg text-gray-700">
                    <strong>Paso 1:</strong> 
                 </p>
            </div>
        )
    },

    //Info Receta Ensamblar
    {
        titulo: "Cómo ensamblar los ingredientes",
        contenido: (
            <div className="bg-gray-50 rounded-2xl p-8 text-left space-y-4">
                <p className="text-lg text-gray-700">
                    <strong>Paso 1:</strong> 
                 </p>
            </div>
        )
    }
]

export default function MostrarRecetas () {
    return(
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-end gap-4 w-[90%] max-w-4xl">
                        
            <RecetaCard titulo={contenidoRecetas[0].titulo}>
                <div className="max-w-2xl w-full text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">{contenidoRecetas[0].titulo}</h1>
                    {contenidoRecetas[0].contenido}
                </div>
            </RecetaCard>
        
            <RecetaCard titulo={contenidoRecetas[1].titulo}>
                <div className="max-w-2xl w-full text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">{contenidoRecetas[1].titulo}</h1>
                    {contenidoRecetas[1].contenido}
                </div>
            </RecetaCard>
        
            <RecetaCard titulo={contenidoRecetas[2].titulo}>
                <div className="max-w-2xl w-full text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">{contenidoRecetas[2].titulo}</h1>
                    {contenidoRecetas[2].contenido}
                </div>
            </RecetaCard>
        
            <RecetaCard titulo={contenidoRecetas[3].titulo}>
                <div className="max-w-2xl w-full text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">{contenidoRecetas[3].titulo}</h1>
                    {contenidoRecetas[3].contenido}
                </div>
            </RecetaCard>
        
        </div>
    );
};