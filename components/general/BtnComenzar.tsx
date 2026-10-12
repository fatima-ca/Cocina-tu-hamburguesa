import Link from 'next/link'

export default function BtnComenzar () {
    return (
        <Link
          href="/cocina"
          className="bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold py-4 px-12 rounded-xl text-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          ¡JUGAR!
        </Link>
    );
};