import { ArrowRight, ArrowUpRight, Images, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Lightbox } from '../components/Lightbox';
import { WhatsAppIcon } from '../components/BrandIcons';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { useData } from '../lib/store';
import { waLink } from '../lib/utils';

export function Info() {
    const { activities, settings } = useData();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const wa = waLink(settings.whatsapp);

    return (
        <>
            <PageHeader
                eyebrow="Informasi"
                title="Dokumentasi kegiatan"
                description="Momen belajar dan kegiatan santri di TPQ Hidayatul Mubtadiin. Klik salah satu dokumentasi untuk melihat lebih jelas."
                chips={
                    <>
                        <span className="chip">
                            <Images className="h-3 w-3" />
                            {activities.length} kegiatan
                        </span>
                        <span className="chip">Tlogohaji · Sumberrejo</span>
                    </>
                }
            />

            <section className="py-14 lg:py-20">
                <div className="container-page">
                    {activities.length > 0 ? (
                        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
                            {activities.map((activity, index) => (
                                <Reveal key={activity.id} delay={Math.min(index * 0.04, 0.2)}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className="group block w-full text-left"
                                    >
                                        <div className="overflow-hidden border border-ink/10 bg-sand">
                                            {activity.foto ? (
                                                <img
                                                    src={activity.foto}
                                                    alt={activity.judul}
                                                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                                />
                                            ) : (
                                                <div className="grid aspect-[4/3] place-items-center bg-brand-900 text-lime-300">
                                                    <Images className="h-7 w-7" strokeWidth={1.4} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
                                            <div className="min-w-0">
                                                <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                                                    Dokumentasi · {String(index + 1).padStart(2, '0')}
                                                </p>
                                                <h2 className="mt-1.5 text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">
                                                    {activity.judul}
                                                </h2>
                                                {activity.deskripsi && (
                                                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                                                        {activity.deskripsi}
                                                    </p>
                                                )}
                                            </div>
                                            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink/30 transition group-hover:text-brand-800" />
                                        </div>
                                    </button>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div className="card flex flex-col items-center px-6 py-16 text-center">
                            <span className="grid h-12 w-12 place-items-center border border-ink/10 bg-cream text-brand-700">
                                <Images className="h-5 w-5" strokeWidth={1.6} />
                            </span>
                            <p className="mt-4 text-lg font-semibold text-ink">Dokumentasi akan segera hadir</p>
                            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                                Foto-foto kegiatan santri akan ditampilkan di sini setelah ditambahkan oleh
                                pengelola.
                            </p>
                        </div>
                    )}

                    <Lightbox
                        items={activities}
                        index={activeIndex}
                        onClose={() => setActiveIndex(null)}
                        onChange={setActiveIndex}
                    />
                </div>
            </section>

            <section id="pendaftaran" className="scroll-mt-24 border-t border-ink/10 bg-white/50">
                <div className="container-page py-14 lg:py-20">
                    <Reveal>
                        <div className="max-w-2xl">
                            <span className="eyebrow">Penerimaan santri baru</span>
                            <h2 className="section-title mt-5">Pilih cara yang paling nyaman.</h2>
                            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                                Daftar online kapan saja, atau tanyakan dulu lewat WhatsApp. Kami akan membantu
                                prosesnya.
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-10 grid gap-5 md:grid-cols-2">
                        {settings.link_daftar && (
                            <Reveal>
                                <a
                                    href={settings.link_daftar}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-full flex-col border border-brand-950 bg-brand-950 p-7 text-cream transition hover:bg-brand-900"
                                >
                                    <span className="grid h-10 w-10 place-items-center border border-white/15 text-lime-300">
                                        <svg
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={1.6}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <path d="M14 2v6h6M9 13h6M9 17h6" />
                                        </svg>
                                    </span>
                                    <h3 className="mt-7 text-xl font-semibold tracking-[-0.015em]">Daftar online</h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/55">
                                        Isi formulir pendaftaran secara online kapan saja, tanpa perlu datang.
                                    </p>
                                    <span className="mt-7 inline-flex items-center gap-2 border-b border-cream/25 pb-1 text-[13px] font-semibold text-cream transition group-hover:border-lime-300">
                                        Buka formulir
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </span>
                                </a>
                            </Reveal>
                        )}

                        {wa && (
                            <Reveal delay={0.05}>
                                <a
                                    href={wa}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-full flex-col border border-ink/15 bg-cream p-7 transition hover:border-brand-600"
                                >
                                    <span className="grid h-10 w-10 place-items-center border border-ink/15 bg-white text-brand-800">
                                        <WhatsAppIcon className="h-4 w-4" />
                                    </span>
                                    <h3 className="mt-7 text-xl font-semibold tracking-[-0.015em] text-ink">
                                        Tanya lewat WhatsApp
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                                        Ingin bertanya dulu sebelum mendaftar? Hubungi kami di {settings.whatsapp}.
                                    </p>
                                    <span className="mt-7 inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[13px] font-semibold text-ink transition group-hover:border-brand-700 group-hover:text-brand-800">
                                        Mulai chat
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                </a>
                            </Reveal>
                        )}
                    </div>

                    {settings.alamat && (
                        <div className="mt-10 flex max-w-3xl items-start gap-3 border-t border-ink/10 pt-5 text-sm leading-relaxed text-ink-soft">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={1.6} />
                            <span>
                                Atau datang langsung ke <span className="font-medium text-ink">{settings.alamat}</span>.
                            </span>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
