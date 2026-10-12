
import FondoCocina from '@/components/general/FondoCocina'
import LogoJuego from '@/components/general/LogoJuego'
import BtnComenzar from '@/components/general/BtnComenzar'

export default function Comenzar() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      <FondoCocina />

      
      <div className="absolute inset-0 bg-black/60 -z-10" />

      
      <div className="flex flex-col items-center gap-8 p-8">
        <LogoJuego />
        <BtnComenzar />
        
        
      </div>
    </main>
  )
}