import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    ClipboardCheck,
    Compass,
    Heart,
    UserPlus,
    Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CountUp } from '../components/CountUp';
import { WhatsAppIcon } from '../components/BrandIcons';
import { Reveal } from '../components/Reveal';
import { useData } from '../lib/store';
import { cn, waLink } from '../lib/utils';

const steps = [
    {
        no: '01',
        title: 'Pendaftaran',
        description: 'Daftar online atau lewat WhatsApp. Kami bantu sampai santri siap mulai belajar.',
        icon: UserPlus,
    },
    {
        no: '02',
        title: 'Pemetaan kemampuan',
        description: 'Kemampuan awal santri dipetakan untuk menentukan kelas dan materi yang tepat.',
        icon: Compass,
    },
    {
        no: '03',
        title: 'Pembiasaan harian',
        description: 'Belajar rutin dengan adab, suasana tenang, dan pendampingan yang sabar.',
        icon: BookOpen,
    },
    {
        no: '04',
        title: 'Evaluasi & laporan',
        description: 'Perkembangan santri dicatat dan disampaikan kepada orang tua secara berkala.',
        icon: ClipboardCheck,
    },
];

const trust = [
    { label: 'Bimbingan bertahap', icon: BookOpen },
    { label: 'Kelas kecil & terarah', icon: Users },
    { label: 'Adab & pembiasaan', icon: Heart },
    { label: 'Laporan perkembangan', icon: ClipboardCheck },
];

const trustBorders = [
    'border-b border-ink/10 lg:border-b-0',
    'border-b border-l border-ink/10 lg:border-b-0',
    'border-ink/10 lg:border-l',
    'border-l border-ink/10',
];

export function Home() {
    const { home, settings, teachers, students, classes, activities } = useData();

    const daftarUrl = settings.link_daftar || '/informasi#pendaftaran';
    const external = Boolean(settings.link_daftar);
    const wa = waLink(settings.whatsapp);

    return (
        <>
            <section className="relative isolate overflow-hidden bg-brand-950">
                <img
                    src={home.foto_1}
                    alt="Suasana belajar santri TPQ Hidayatul Mubtadiin"
                    className="absolute inset-0 h-full w-full object-cover object-[55%_45%]"
                />
                <div className="absolute inset-0 bg-brand-950/55" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-brand-950/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />

                <div className="container-page relative flex min-h-[32rem] flex-col justify-center py-16 sm:py-20 lg:min-h-[38rem] lg:py-24">
                    <div className="max-w-2xl">
                        <Reveal>
                            <span className="inline-flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cream/60">
                                <span className="h-px w-7 bg-lime-400" />
                                TPQ Hidayatul Mubtadiin · Tlogohaji
                            </span>
                        </Reveal>

                        <Reveal delay={0.05}>
                            <h1 className="display-xl mt-6 text-cream">
                                Tumbuh dekat <span className="whitespace-nowrap">Al-Qur'an,</span> dengan tenang.
                            </h1>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <p className="mt-6 max-w-lg whitespace-pre-line text-[15px] leading-[1.8] text-cream/70">
                                {home.deskripsi_1}
                            </p>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                                <a
                                    href={daftarUrl}
                                    target={external ? '_blank' : undefined}
                                    rel={external ? 'noopener noreferrer' : undefined}
                                    className="btn-lime gap-2.5 px-6"
                                >
                                    Daftar sekarang
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                                <Link to="/profil" className="btn-outline-light gap-2.5 px-6">
                                    Kenali pengajar kami
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <dl className="mt-12 grid max-w-md grid-cols-3 border-t border-white/20">
                                {[
                                    { label: 'Santri', value: students.length },
                                    { label: 'Kelas', value: classes.length },
                                    { label: 'Pengajar', value: teachers.length },
                                ].map((stat, index) => (
                                    <div
                                        key={stat.label}
                                        className={cn(
                                            'py-5',
                                            index === 0 ? 'pr-5' : 'border-l border-white/20 px-5',
                                            index === 2 && 'pr-0',
                                        )}
                                    >
                                        <dd className="text-[1.75rem] font-semibold leading-none tracking-tight text-cream">
                                            <CountUp value={stat.value} />
                                        </dd>
                                        <dt className="mt-2 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-cream/50">
                                            {stat.label}
                                        </dt>
                                    </div>
                                ))}
                            </dl>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="border-y border-ink/10 bg-white/40">
                <div className="container-page grid grid-cols-2 lg:grid-cols-4">
                    {trust.map((item, index) => (
                        <div key={item.label} className={cn('flex items-center gap-3 py-5 lg:py-6', trustBorders[index])}>
                            <item.icon className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={1.6} />
                            <span className="text-[12.5px] font-medium leading-snug text-ink/70">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container-page py-16 lg:py-24">
                <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                    <Reveal>
                        <figure>
                            <div className="overflow-hidden border border-ink/10 bg-sand">
                                <img
                                    src={home.foto_2}
                                    alt="Kegiatan santri TPQ"
                                    className="aspect-[4/5] w-full object-cover"
                                />
                            </div>
                            <figcaption className="mt-3 flex items-center justify-between border-b border-ink/10 pb-3 text-[10px] font-medium uppercase tracking-[0.13em] text-ink/45">
                                <span>Belajar & membiasakan adab</span>
                                <span>
                                    <CountUp value={students.length} /> santri aktif
                                </span>
                            </figcaption>
                        </figure>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <span className="eyebrow">Tentang kami</span>
                        <h2 className="section-title mt-5 max-w-lg">
                            Ruang tumbuh yang hangat untuk belajar Al-Qur'an.
                        </h2>
                        <p className="mt-5 whitespace-pre-line text-[15px] leading-[1.8] text-ink-soft">
                            {home.deskripsi_2}
                        </p>

                        <ol className="mt-8 border-t border-ink/10">
                            {[
                                'Bimbingan disesuaikan dengan kemampuan tiap santri.',
                                'Adab dan kebiasaan baik ditumbuhkan sejak awal.',
                                'Pengajar mendampingi dengan sabar dan perhatian.',
                            ].map((point, index) => (
                                <li
                                    key={point}
                                    className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-ink/10 py-4"
                                >
                                    <span className="font-mono text-[11px] leading-6 text-ink/35">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text-sm leading-6 text-ink-soft">{point}</span>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Link to="/profil" className="btn-primary gap-2.5 px-6">
                                Lihat profil TPQ
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/informasi" className="link-arrow">
                                Dokumentasi kegiatan
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="border-y border-ink/10 bg-white/50">
                <div className="container-page py-16 lg:py-24">
                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <Reveal className="max-w-2xl">
                            <span className="eyebrow">Program & kelas</span>
                            <h2 className="section-title mt-5">Satu langkah kecil, satu ayat demi ayat.</h2>
                            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                                Enam tingkatan kelas yang tersusun agar setiap santri naik dengan percaya diri.
                            </p>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <Link to="/informasi" className="link-arrow">
                                Lihat dokumentasi
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </Reveal>
                    </div>

                    <Reveal delay={0.08}>
                        <div className="mt-10 border-t border-ink/10">
                            {classes.map((classroom, index) => {
                                const total = students.filter(
                                    (student) => student.class_id === classroom.id,
                                ).length;
                                return (
                                    <div
                                        key={classroom.id}
                                        className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-ink/10 py-5 sm:grid-cols-[3.5rem_1fr_9rem] sm:items-center sm:py-6"
                                    >
                                        <span className="font-mono text-[11px] text-ink/35">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="min-w-0">
                                            <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                                                {classroom.nama}
                                            </h3>
                                            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                                                {classroom.keterangan ?? 'Kelas bimbingan membaca Al-Qur’an.'}
                                            </p>
                                        </div>
                                        <span className="col-start-2 inline-flex items-center gap-2 text-xs font-medium text-ink/45 sm:col-start-auto sm:justify-end">
                                            <Users className="h-3.5 w-3.5 text-brand-600" />
                                            {total} santri
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="container-page py-16 lg:py-24">
                <div className="max-w-2xl">
                    <Reveal>
                        <span className="eyebrow">Alur pendampingan</span>
                        <h2 className="section-title mt-5">Empat langkah, satu tujuan.</h2>
                        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                            Dari pendaftaran sampai laporan perkembangan, semuanya berjalan jelas dan terarah.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={0.08}>
                    <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => (
                            <li key={step.no} className="border-t-2 border-brand-800 pt-5">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[11px] text-brand-700">{step.no}</span>
                                    <step.icon className="h-4 w-4 text-ink/30" strokeWidth={1.6} />
                                </div>
                                <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-ink">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
                            </li>
                        ))}
                    </ol>
                </Reveal>
            </section>

            <section className="border-y border-ink/10 bg-sand/50">
                <div className="container-page grid gap-6 py-14 lg:grid-cols-[11rem_1fr] lg:items-start lg:gap-12 lg:py-16">
                    <p className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-ink/40">
                        Hadits pilihan
                    </p>
                    <figure>
                        <blockquote className="max-w-3xl font-display text-[1.6rem] leading-[1.45] tracking-[-0.01em] text-ink sm:text-[2rem]">
                            “Sebaik-baik kalian adalah yang belajar Al-Qur'an dan mengajarkannya.”
                        </blockquote>
                        <figcaption className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                            HR. Bukhari
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section className="container-page py-16 lg:py-24">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <Reveal className="max-w-xl">
                        <span className="eyebrow">Momen terbaru</span>
                        <h2 className="section-title mt-5">Keseharian di kelas kami.</h2>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <Link to="/informasi" className="link-arrow">
                            Semua dokumentasi
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </Reveal>
                </div>

                <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-3">
                    {activities.slice(0, 3).map((activity, index) => (
                        <Reveal key={activity.id} delay={index * 0.05}>
                            <Link to="/informasi" className="group block">
                                <div className="overflow-hidden border border-ink/10 bg-sand">
                                    {activity.foto ? (
                                        <img
                                            src={activity.foto}
                                            alt={activity.judul}
                                            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                        />
                                    ) : (
                                        <div className="grid aspect-[4/5] place-items-center bg-brand-900 text-lime-300">
                                            <BookOpen className="h-7 w-7" strokeWidth={1.4} />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                                            Dokumentasi
                                        </p>
                                        <h3 className="mt-1.5 text-base font-semibold leading-snug tracking-[-0.01em] text-ink">
                                            {activity.judul}
                                        </h3>
                                        {activity.deskripsi && (
                                            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                                                {activity.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink/30 transition group-hover:text-brand-800" />
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="border-y border-ink/10 bg-sand/50">
                <div className="container-page grid gap-8 py-14 lg:grid-cols-[1.2fr_auto] lg:items-end lg:py-16">
                    <div>
                        <span className="eyebrow">Pendaftaran dibuka</span>
                        <h2 className="display-lg mt-5 max-w-xl text-ink">
                            Penerimaan santri baru telah dibuka.
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-[15px]">
                            Daftarkan putra-putri Anda, atau tanyakan dulu lewat WhatsApp. Kami siap membantu.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                        <a
                            href={daftarUrl}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            className="btn-primary gap-2.5 px-6"
                        >
                            Daftar online
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        {wa && (
                            <a
                                href={wa}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-soft gap-2.5 px-6"
                            >
                                <WhatsAppIcon className="h-4 w-4" />
                                Hubungi WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
