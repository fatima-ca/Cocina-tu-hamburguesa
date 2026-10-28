import { contenidoRecetas } from './ContenidoRecetas';
import RecetaCard from '@/components/cocina/RecetaCard';


export default function MostrarRecetas () {
    return(
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-end gap-4 w-full max-w-4xl">
                        
            <RecetaCard titulo={contenidoRecetas[0].titulo}>
                {contenidoRecetas[0].contenido}
            </RecetaCard>
        


            <RecetaCard titulo={contenidoRecetas[1].titulo}>
                {contenidoRecetas[1].contenido}
            </RecetaCard>
        


            <RecetaCard titulo={contenidoRecetas[2].titulo}>
                {contenidoRecetas[2].contenido}
            </RecetaCard>
        


            <RecetaCard titulo={contenidoRecetas[3].titulo}>
                {contenidoRecetas[3].contenido}
            </RecetaCard>



            <RecetaCard titulo={contenidoRecetas[4].titulo}>
                {contenidoRecetas[4].contenido}
            </RecetaCard>
        
        </div>
    );
};