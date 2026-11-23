import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { FloatingWa } from './FloatingWa';
import { Header } from './Header';

function ScrollManager() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const target = document.getElementById(location.hash.slice(1));
            if (target) {
                window.requestAnimationFrame(() =>
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                );
                return;
            }
        }
        window.scrollTo({ top: 0 });
    }, [location.pathname, location.hash]);

    return null;
}

export function PublicLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-cream">
            <ScrollManager />
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <FloatingWa />
        </div>
    );
}
