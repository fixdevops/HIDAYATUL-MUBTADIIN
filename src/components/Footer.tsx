import { ArrowUp, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../lib/store';
import { waLink } from '../lib/utils';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { LogoMark, Wordmark } from './Logo';

export function Footer() {
    const { settings } = useData();
    const wa = waLink(settings.whatsapp);

    return (
        <footer className="border-t border-brand-950 bg-brand-950 text-cream">
            <div className="container-page grid gap-12 py-14 md:grid-cols-[1.6fr_1fr_1fr] lg:gap-16 lg:py-16">
                <div>
                    <Link to="/" className="flex items-center gap-3">
                        <LogoMark className="border border-white/10 bg-white/5 text-lime-300" />
                        <Wordmark dark />
                    </Link>

                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/55">
                        Mendampingi anak-anak membaca Al-Qur'an dengan tenang, terbimbing, dan penuh adab di
                        Tlogohaji, Sumberrejo, Bojonegoro.
                    </p>

                    {settings.alamat && (
                        <div className="mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-cream/55">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" strokeWidth={1.6} />
                            <span>{settings.alamat}</span>
                        </div>
                    )}

                    {settings.maps_url && (
                        <a
                            href={settings.maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 border-b border-cream/25 pb-1 text-xs font-semibold text-cream/75 transition hover:border-lime-300 hover:text-cream"
                        >
                            Lihat lokasi di peta
                            <MapPin className="h-3.5 w-3.5 text-lime-400" />
                        </a>
                    )}
                </div>

                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lime-300">Jelajahi</p>
                    <ul className="mt-5 space-y-3 text-sm">
                        {[
                            { to: '/', label: 'Beranda' },
                            { to: '/informasi', label: 'Informasi & dokumentasi' },
                            { to: '/profil', label: 'Profil & pengajar' },
                            { to: '/login', label: 'Masuk admin' },
                        ].map((item) => (
                            <li key={item.to}>
                                <Link to={item.to} className="text-cream/55 transition hover:text-cream">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lime-300">Terhubung</p>
                    <ul className="mt-5 space-y-3 text-sm">
                        {wa && (
                            <li>
                                <a
                                    href={wa}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 text-cream/55 transition hover:text-cream"
                                >
                                    <WhatsAppIcon className="h-3.5 w-3.5" />
                                    WhatsApp
                                </a>
                            </li>
                        )}
                        {settings.instagram && (
                            <li className="flex items-center gap-2.5 text-cream/55">
                                <InstagramIcon className="h-3.5 w-3.5" />
                                <span className="truncate">{settings.instagram}</span>
                            </li>
                        )}
                        {settings.facebook && (
                            <li className="flex items-center gap-2.5 text-cream/55">
                                <FacebookIcon className="h-3.5 w-3.5" />
                                <span className="truncate">{settings.facebook}</span>
                            </li>
                        )}
                        {!wa && !settings.instagram && !settings.facebook && (
                            <li className="text-cream/40">Kontak belum ditambahkan.</li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container-page flex flex-col items-start justify-between gap-3 py-5 text-[11px] text-cream/40 sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} TPQ Hidayatul Mubtadiin. Hak cipta dilindungi.</p>
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center gap-1.5 transition hover:text-cream"
                    >
                        Kembali ke atas
                        <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
