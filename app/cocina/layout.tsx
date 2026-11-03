import AlarmaPapasGlobal from '@/components/cocina/cocinar/AlarmaPapasGlobal';

export default function CocinaLayout({ children }: LayoutProps<'/cocina'>) {
    return (
        <>
            <AlarmaPapasGlobal />
            {children}
        </>
    );
}
