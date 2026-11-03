import AlarmasCoccionGlobal from '@/components/cocina/cocinar/AlarmasCoccionGlobal';

export default function CocinaLayout({ children }: LayoutProps<'/cocina'>) {
    return (
        <>
            <AlarmasCoccionGlobal />
            {children}
        </>
    );
}
