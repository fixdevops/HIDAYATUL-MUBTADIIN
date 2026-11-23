import { AnimatePresence, motion } from 'motion/react';
import {
    Database,
    ExternalLink,
    Home,
    Images,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Users,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useData } from '../../lib/store';
import { cn, initials } from '../../lib/utils';
import { LogoMark } from '../Logo';

const groups = [
    {
        label: 'Konten',
        items: [
            { to: '/admin/ringkasan', label: 'Ringkasan', icon: LayoutDashboard },
            { to: '/admin/beranda', label: 'Beranda', icon: Home },
            { to: '/admin/informasi', label: 'Informasi', icon: Images },
            { to: '/admin/profil', label: 'Profil', icon: Users },
        ],
    },
    {
        label: 'Sistem',
        items: [
            { to: '/admin/data', label: 'Data', icon: Database },
            { to: '/admin/akun', label: 'Akun', icon: Settings },
        ],
    },
];

const allItems = groups.flatMap((group) => group.items);

export function AdminLayout() {
    const { user } = useData();
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const fallback =
        location.pathname.endsWith('/create')
            ? 'Tambah data'
            : location.pathname.endsWith('/edit')
              ? 'Edit data'
              : 'Form data';

    const current =
        allItems.find(
            (item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`),
        )?.label ?? fallback;

    function handleLogout() {
        logout();
        navigate('/', { replace: true });
    }

    return (
        <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-ink/5 bg-white transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
                    open ? 'translate-x-0' : '-translate-x-full',
                )}
            >
                <div className="flex h-20 items-center gap-3 border-b border-ink/5 px-5">
                    <NavLink to="/admin/ringkasan" className="flex items-center gap-3">
                        <LogoMark className="h-10 w-8 rounded-b-lg" iconClassName="h-4 w-4" />
                        <span className="leading-tight">
                            <span className="block font-display text-[15px] font-semibold text-ink">
                                Hidayatul Mubtadiin
                            </span>
                            <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-ink/35">
                                Panel admin
                            </span>
                        </span>
                    </NavLink>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="icon-btn ml-auto lg:hidden"
                        aria-label="Tutup menu"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6">
                    {groups.map((group, groupIndex) => (
                        <div key={group.label}>
                            <p className="px-3 text-[9px] font-bold uppercase tracking-[0.22em] text-ink/30">
                                {group.label}
                            </p>
                            <nav className="mt-3 space-y-1">
                                {group.items.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            cn(
                                                'group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition',
                                                isActive
                                                    ? 'bg-brand-800 text-white shadow-[0_16px_30px_-18px_rgba(11,81,58,0.9)]'
                                                    : 'text-ink/60 hover:bg-cream hover:text-ink',
                                            )
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <span
                                                    className={cn(
                                                        'grid h-8 w-8 place-items-center rounded-xl transition',
                                                        isActive
                                                            ? 'bg-white/10 text-gold-200'
                                                            : 'bg-cream text-ink/40 group-hover:bg-white group-hover:text-brand-700',
                                                    )}
                                                >
                                                    <item.icon className="h-[17px] w-[17px]" strokeWidth={1.7} />
                                                </span>
                                                {item.label}
                                                {isActive && (
                                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-300" />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </nav>
                            {groupIndex < groups.length - 1 && <div className="my-6 border-t border-ink/5" />}
                        </div>
                    ))}
                </div>

                <div className="border-t border-ink/5 p-4">
                    <div className="flex items-center gap-3 rounded-2xl bg-cream p-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-800 text-[11px] font-bold uppercase text-gold-200">
                            {initials(user.username, 1)}
                        </span>
                        <div className="min-w-0 flex-1 leading-tight">
                            <p className="truncate text-xs font-semibold text-ink">{user.username}</p>
                            <p className="mt-0.5 text-[10px] text-ink/40">Administrator</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="icon-btn text-ink/35 hover:bg-white hover:text-red-500"
                            title="Logout"
                            aria-label="Logout"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </aside>

            <div className="min-w-0">
                <header className="sticky top-0 z-30 border-b border-ink/5 bg-cream/85 backdrop-blur-xl">
                    <div className="flex h-16 items-center gap-3 px-5 sm:px-8">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="grid h-9 w-9 place-items-center rounded-[2px] border border-ink/10 bg-white text-ink/60 lg:hidden"
                            aria-label="Buka menu"
                        >
                            <Menu className="h-4 w-4" />
                        </button>

                        <div className="hidden items-center gap-2 text-xs font-medium text-ink/35 sm:flex">
                            <span>Admin</span>
                            <svg
                                className="h-3 w-3"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 6l6 6-6 6" />
                            </svg>
                            <span className="text-ink/70">{current}</span>
                        </div>

                        <div className="ml-auto flex items-center gap-2 sm:gap-3">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-[2px] border border-ink/10 bg-white px-3.5 py-2 text-[11px] font-semibold text-ink/60 transition hover:border-ink/20 hover:text-ink"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Lihat website</span>
                            </a>
                            <span className="hidden h-7 w-px bg-ink/10 sm:block" />
                            <div className="flex items-center gap-2.5">
                                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-800 text-[11px] font-bold uppercase text-gold-200">
                                    {initials(user.username, 1)}
                                </span>
                                <div className="hidden leading-tight sm:block">
                                    <p className="text-xs font-semibold text-ink">{user.username}</p>
                                    <p className="mt-0.5 text-[10px] text-ink/40">Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="px-5 pb-16 pt-7 sm:px-8 lg:pt-9">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
