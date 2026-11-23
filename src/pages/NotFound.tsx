import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LogoMark, Wordmark } from '../components/Logo';

export function NotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-cream">
            <header className="border-b border-ink/10">
                <div className="container-page flex h-[4.25rem] items-center sm:h-[5rem]">
                    <Link to="/" className="flex items-center gap-3">
                        <LogoMark />
                        <Wordmark />
                    </Link>
                </div>
            </header>

            <main className="flex flex-1 items-center justify-center px-6 py-20">
                <div className="w-full max-w-xl">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/35">Error 404</p>
                    <p className="mt-4 text-[5.5rem] font-semibold leading-none tracking-[-0.05em] text-ink/10 sm:text-[7rem]">
                        404
                    </p>
                    <h1 className="display-lg mt-2 text-ink">Halaman tidak ditemukan.</h1>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                        Mungkin tautannya berubah atau halaman sudah dipindahkan. Mari kembali menjelajah.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Link to="/" className="btn-primary gap-2.5 px-6">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke beranda
                        </Link>
                        <Link to="/informasi" className="link-arrow">
                            <Compass className="h-3.5 w-3.5" />
                            Lihat informasi
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="border-t border-ink/10">
                <div className="container-page py-5 text-[11px] text-ink/35">
                    © {new Date().getFullYear()} TPQ Hidayatul Mubtadiin
                </div>
            </footer>
        </div>
    );
}
