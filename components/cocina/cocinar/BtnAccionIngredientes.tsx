import Image from 'next/image';

type BtnAccionProps = {
  src: string;
  alt: string;
  accion: () => void; 
  label: string;      
  disabled?: boolean;
};

{/* Boton para definir acciones de las papas */}
export default function BtnAccionIngredientes({ src, alt, accion, label, disabled = false }: BtnAccionProps) {
  return (
    <button
      type="button"
      onClick={accion}
      disabled={disabled}
      className={`
        group relative flex flex-col items-center justify-center
        rounded-3xl border-4 border-amber-900
        bg-amber-400 p-3 shadow-[0_8px_0_0_rgb(120,53,15)]
        transition-all duration-150 ease-out
        hover:-translate-y-1 hover:shadow-[0_12px_0_0_rgb(120,53,15)]
      hover:from-amber-200 hover:via-amber-300 hover:to-amber-400
        active:translate-y-1 active:shadow-[0_2px_0_0_rgb(120,53,15)]
        disabled:cursor-not-allowed disabled:opacity-50 
      `}
    >
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          width={180}
          height={100}
          priority
          className="object-contain"
        />
      </div>
      <span className="mt-1 rounded-full bg-amber-900/90 px-4 py-1 text-sm font-bold uppercase tracking-wide text-amber-50 shadow-inner">
        {label}
      </span>
    </button>
  );
}