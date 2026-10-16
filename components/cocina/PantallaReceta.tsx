'use client';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PantallaRecetaProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function PantallaReceta({ isOpen, onClose, children }: PantallaRecetaProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;


  return createPortal(
    <div className="fixed inset-0 z-9999 bg-white/40 backdrop-blur-md overflow-auto">
      

      <div className="min-h-screen flex flex-col items-center justify-center p-2">
        {children}


        <button
        onClick={onClose}
        className="p-4 bg-gray-100 hover:bg-gray-200 rounded-full shadow-lg transition-colors"
        aria-label="Cerrar receta"
      >
        <strong>Cerrar</strong>
      </button>
      </div>
      
    </div>,
    document.body 
  );
}