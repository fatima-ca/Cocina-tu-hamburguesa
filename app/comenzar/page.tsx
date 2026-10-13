'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import FondoCocina from '@/components/general/FondoCocina'
import LogoJuego from '@/components/general/LogoJuego'
import Objetivo from '@/components/general/Objetivo'


export default function Comenzar() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setMensaje('Guardando...')

    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nombre, edad: parseInt(edad) }])
      .select() 
    
    if (error) {
      console.error('Error de Supabase:', error)
      setMensaje(`Error: ${error.message}`)
    } else {
      console.log('Guardado con éxito:', data)
      setMensaje('¡Usuario guardado correctamente!')
      setNombre('')
      setEdad('')

      router.push('/instrucciones')
    }
  }
  

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/*Fondo*/}
      <FondoCocina />


      
      {/* Logo y boton para comenzar juego*/}
      <div className="flex flex-col items-center gap-2 p-8">
        <LogoJuego />
        <Objetivo />
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
          <input
            type="text"
            placeholder="Tu Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 bg-amber-200 rounded-lg text-black text-center font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
            required
          />
          
          <input
            type="number"
            placeholder="Tu Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="w-full p-3 bg-amber-200 rounded-lg text-black text-center font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
            required
          />
          
          <button
            type="submit"
            className="hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <Image
              src="/general/btn_comenzar.png"
              alt="Botón comenzar juego"
              width={200}
              height={100}
              priority
              className="object-contain drop-shadow-2xl"
            />
          </button>
        </form>

        {mensaje && (
          <p className={`mt-4 text-center font-bold text-xl drop-shadow-md ${
            mensaje.includes('Error') ? 'text-red-400' : 'text-green-400'
          }`}>
            {mensaje}
          </p>
        )}
      </div>

      

    </main>
  )
}