import { AnimatePresence, motion } from 'motion/react';
import {
    ArrowLeft,
    ArrowRight,
    CircleAlert,
    Eye,
    EyeOff,
    Lock,
    MapPin,
    ShieldCheck,
    Users,
    User as UserIcon,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LogoMark, Wordmark } from '../components/Logo';
import { useAuth, useData } from '../lib/store';

export function Login() {
    const { isAuthed, login } = useAuth();
    const { user, teachers, students, classes } = useData();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState<string | null>(null);

    if (isAuthed) return <Navigate to="/admin/ringkasan" replace />;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (login(username, password)) {
            navigate('/admin/ringkasan', { replace: true });
        } else {
            setError('Username atau password tidak sesuai. Coba lagi.');
        }
    }

    return (
        <div className="grid min-h-screen bg-cream lg:grid-cols-2">
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-brand-950 p-12 text-cream lg:flex lg:p-14">
                <img
                    src="/images/about.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-brand-950/35" />

                <Link
                    to="/"
                    className="relative inline-flex w-fit items-center gap-2 text-sm text-cream/60 transition hover:text-cream"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke beranda
                </Link>

                <div className="relative max-w-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lime-300">
                        Panel pengelola
                    </p>
                    <h1 className="display-lg mt-5 text-cream">
                        Mengelola dengan tenang, melayani dengan ikhlas.
                    </h1>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">
                        Kelola konten website, data pengajar, santri, dan kelas TPQ Hidayatul Mubtadiin dari satu
                        tempat.
                    </p>

                    <div className="mt-10 grid max-w-sm grid-cols-3 border-y border-white/15 py-5">
                        {[
                            { label: 'Pengajar', value: teachers.length },
                            { label: 'Kelas', value: classes.length },
                            { label: 'Santri', value: students.length },
                        ].map((item, index) => (
                            <div
                                key={item.label}
                                className={index === 0 ? 'pr-4' : 'border-l border-white/15 px-4'}
                            >
                                <p className="text-2xl font-semibold leading-none text-cream">{item.value}</p>
                                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-cream/40">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center gap-2.5 text-xs text-cream/45">
                        <MapPin className="h-4 w-4 text-lime-400" strokeWidth={1.6} />
                        Tlogohaji, Sumberrejo, Bojonegoro
                    </div>
                </div>

                <p className="relative text-xs text-cream/30">
                    © {new Date().getFullYear()} TPQ Hidayatul Mubtadiin
                </p>
            </aside>

            <main className="flex flex-col px-6 py-8 sm:px-10">
                <div className="flex items-center justify-between lg:hidden">
                    <Link to="/" className="flex items-center gap-2.5">
                        <LogoMark className="h-9 w-9" iconClassName="h-4 w-4" />
                        <Wordmark compact />
                    </Link>
                    <Link to="/" className="text-xs font-semibold text-ink/45 hover:text-ink">
                        Beranda
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center py-12 lg:py-0">
                    <div className="w-full max-w-sm">
                        <span className="eyebrow">Area admin</span>
                        <h2 className="display-lg mt-5 text-ink">Selamat datang kembali</h2>
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                            Masuk untuk mengelola konten dan data TPQ.
                        </p>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="mt-6 flex items-start gap-2.5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="username" className="label">
                                    Username
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/30">
                                        <UserIcon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                                    </span>
                                    <input
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        required
                                        autoFocus
                                        autoComplete="username"
                                        placeholder="Masukkan username"
                                        className="field pl-11"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="label">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/30">
                                        <Lock className="h-[18px] w-[18px]" strokeWidth={1.7} />
                                    </span>
                                    <input
                                        id="password"
                                        name="password"
                                        type={show ? 'text' : 'password'}
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                        autoComplete="current-password"
                                        placeholder="Masukkan password"
                                        className="field pl-11 pr-24"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow((value) => !value)}
                                        className="absolute inset-y-0 right-3 my-auto inline-flex h-8 items-center gap-1.5 rounded-[2px] px-2.5 text-[11px] font-semibold text-brand-700 transition hover:bg-ink/5"
                                    >
                                        {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                        {show ? 'Sembunyikan' : 'Lihat'}
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-center gap-2.5 text-sm text-ink/60">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(event) => setRemember(event.target.checked)}
                                    className="h-4 w-4 rounded-[1px] border-ink/20 accent-brand-800"
                                />
                                Ingat saya di perangkat ini
                            </label>

                            <button type="submit" className="btn-primary w-full gap-2.5 py-3.5">
                                Masuk ke dashboard
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>

                        <div className="mt-7 border border-ink/10 bg-white p-4">
                            <div className="flex items-start gap-2.5">
                                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center border border-ink/10 bg-cream text-brand-700">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold text-ink">Akun demo</p>
                                    <p className="mt-0.5 text-[11px] leading-relaxed text-ink/55">
                                        {user.username} / {user.password}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUsername(user.username);
                                            setPassword(user.password);
                                            setError(null);
                                        }}
                                        className="mt-2 inline-flex items-center gap-1 border-b border-ink/20 pb-0.5 text-[11px] font-semibold text-brand-700 transition hover:border-brand-700 hover:text-brand-900"
                                    >
                                        Isi otomatis
                                        <ArrowRight className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p className="mt-8 flex items-center justify-center gap-2 text-center text-[11px] text-ink/35">
                            <Users className="h-3.5 w-3.5" />
                            Akses terbatas untuk pengelola TPQ
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
