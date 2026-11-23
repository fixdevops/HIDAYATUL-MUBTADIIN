import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn, waLink } from '../lib/utils';
import { useData } from '../lib/store';
import { LogoMark, Wordmark } from './Logo';

const nav = [
    { to: '/', label: 'Beranda' },
    { to: '/informasi', label: 'Informasi' },
    { to: '/profil', label: 'Profil' },
];

export function Header() {
    const location = useLocation();
    const { settings } = useData();
    const [open, setOpen] = useState(false);

    const wa = waLink(settings.whatsapp);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-md">
            <div className="container-page flex h-[4.25rem] items-center justify-between gap-4 sm:h-[5rem]">
                <Link to="/" className="flex items-center gap-3" aria-label="Beranda TPQ Hidayatul Mubtadiin">
                    <LogoMark />
                    <Wordmark />
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {nav.map((item) => {
                        const active = location.pathname === item.to;
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={cn(
                                    'relative py-2 text-[13px] font-medium transition',
                                    active ? 'text-ink' : 'text-ink/55 hover:text-ink',
                                )}
                            >
                                {item.label}
                                {active && (
                                    <motion.span
                                        layoutId="public-nav-underline"
                                        className="absolute inset-x-0 -bottom-px h-px bg-brand-800"
                                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-6 md:flex">
                    {wa && (
                        <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] font-medium text-ink/55 transition hover:text-ink"
                        >
                            Kontak
                        </a>
                    )}
                    <Link
                        to="/login"
                        className="text-[13px] font-medium text-ink/55 transition hover:text-ink"
                    >
                        Masuk
                    </Link>
                    <Link to="/informasi#pendaftaran" className="btn-primary gap-2 px-4 py-2.5 text-[12.5px]">
                        Daftar
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    aria-label={open ? 'Tutup menu' : 'Buka menu'}
                    className="grid h-10 w-10 place-items-center rounded-[2px] border border-ink/15 text-ink md:hidden"
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-ink/10 md:hidden"
                    >
                        <nav className="container-page flex flex-col pb-6 pt-2">
                            {nav.map((item) => {
                                const active = location.pathname === item.to;
                                return (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className={cn(
                                            'border-b border-ink/10 py-4 text-[15px] transition',
                                            active
                                                ? 'font-semibold text-brand-800'
                                                : 'text-ink/65 hover:text-ink',
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <div className="mt-5 flex items-center gap-3">
                                <Link to="/login" className="btn-soft flex-1 justify-center py-3">
                                    Masuk
                                </Link>
                                <Link to="/informasi#pendaftaran" className="btn-primary flex-1 justify-center py-3">
                                    Daftar
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
