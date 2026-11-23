import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, GraduationCap, Images, Plus, Settings, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { useData } from '../../lib/store';
import { formatDateID, initials } from '../../lib/utils';

export function Dashboard() {
    const { user, teachers, students, classes, activities, home } = useData();

    const stats = [
        { label: 'Pengajar', value: teachers.length, icon: Users, tone: 'bg-brand-50 text-brand-700' },
        { label: 'Santri', value: students.length, icon: GraduationCap, tone: 'bg-gold-50 text-gold-600' },
        { label: 'Kelas', value: classes.length, icon: BookOpen, tone: 'bg-ink/5 text-ink/55' },
        { label: 'Kegiatan', value: activities.length, icon: Images, tone: 'bg-brand-50 text-brand-700' },
    ];

    const classRows = [...classes]
        .map((classroom) => ({
            ...classroom,
            count: students.filter((student) => student.class_id === classroom.id).length,
        }))
        .sort((a, b) => a.nama.localeCompare(b.nama, 'id', { numeric: true }));
    const maxCount = Math.max(1, ...classRows.map((row) => row.count));

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title="Ringkasan"
                description="Pantau konten dan data TPQ dalam satu tampilan."
                actions={
                    <Link to="/admin/students/create?back=data" className="btn-primary px-5 py-2.5 text-xs">
                        <Plus className="h-3.5 w-3.5" />
                        Tambah santri
                    </Link>
                }
            />

            {/* Sapaan */}
            <section className="border border-brand-900 bg-brand-900 p-7 text-cream sm:p-9">
                <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                        <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-300">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDateID()}
                        </p>
                        <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[2.3rem]">
                            Assalamu'alaikum, <span className="text-gold-300">{user.username}.</span>
                        </h2>
                        <p className="mt-3 max-w-lg text-sm leading-relaxed text-brand-200/75">
                            Ada {students.length} santri di {classes.length} kelas. Jaga konten tetap hangat dan
                            informasi tetap akurat untuk keluarga santri.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link to="/admin/beranda" className="btn-light px-5 py-2.5 text-xs">
                            Edit beranda
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link to="/admin/informasi" className="btn-outline-light px-5 py-2.5 text-xs">
                            Kelola kegiatan
                        </Link>
                    </div>
                </div>
            </section>

            {/* Statistik */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="admin-card flex items-center gap-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                    >
                        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${stat.tone}`}>
                            <stat.icon className="h-5 w-5" strokeWidth={1.7} />
                        </span>
                        <div>
                            <p className="font-display text-3xl leading-none text-ink">{stat.value}</p>
                            <p className="mt-1.5 text-[11px] font-medium text-ink/45">{stat.label}</p>
                        </div>
                        <ArrowUpRight className="ml-auto h-4 w-4 text-ink/15" />
                    </div>
                ))}
            </section>

            <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
                {/* Sebaran santri */}
                <section className="admin-card p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="font-display text-xl leading-tight text-ink">Sebaran santri per kelas</h3>
                            <p className="mt-1 text-xs text-ink/40">
                                Total {students.length} santri terdaftar di {classes.length} kelas.
                            </p>
                        </div>
                        <Link to="/admin/profil" className="link-arrow text-xs">
                            Kelola
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="mt-7 space-y-4">
                        {classRows.map((row) => (
                            <div key={row.id}>
                                <div className="flex items-center justify-between gap-3 text-xs">
                                    <span className="font-semibold text-ink/70">{row.nama}</span>
                                    <span className="font-display text-sm text-brand-800">{row.count}</span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400 transition-all duration-700"
                                        style={{ width: `${Math.max(6, Math.round((row.count / maxCount) * 100))}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Aksi cepat */}
                <section className="admin-card flex flex-col p-6 sm:p-7">
                    <h3 className="font-display text-xl leading-tight text-ink">Aksi cepat</h3>
                    <p className="mt-1 text-xs text-ink/40">Pintasan pekerjaan yang sering dipakai.</p>

                    <div className="mt-5 flex flex-1 flex-col gap-2">
                        {[
                            { to: '/admin/teachers/create?back=profil', label: 'Tambah pengajar', icon: Users },
                            { to: '/admin/students/create?back=data', label: 'Tambah santri', icon: GraduationCap },
                            { to: '/admin/activities/create?back=informasi', label: 'Tambah kegiatan', icon: Images },
                            { to: '/admin/akun', label: 'Perbarui akun', icon: Settings },
                        ].map((action) => (
                            <Link
                                key={action.to}
                                to={action.to}
                                className="group flex items-center gap-3 rounded-2xl border border-ink/5 bg-cream/60 px-4 py-3 text-sm font-medium text-ink/70 transition hover:border-brand-200 hover:bg-brand-50/60 hover:text-ink"
                            >
                                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-brand-700 shadow-sm">
                                    <action.icon className="h-4 w-4" strokeWidth={1.8} />
                                </span>
                                {action.label}
                                <ArrowUpRight className="ml-auto h-4 w-4 text-ink/20 transition group-hover:text-brand-600" />
                            </Link>
                        ))}
                    </div>

                    <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-dashed border-ink/10 bg-white px-4 py-3 text-[11px] leading-relaxed text-ink/40">
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                        Semua perubahan langsung tampil di website tanpa proses build ulang.
                    </div>
                </section>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                {/* Kegiatan terbaru */}
                <section className="admin-card p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-xl leading-tight text-ink">Kegiatan terbaru</h3>
                        <Link to="/admin/informasi" className="text-[11px] font-semibold text-brand-700 hover:text-brand-800">
                            Lihat semua
                        </Link>
                    </div>
                    <div className="mt-5 space-y-3">
                        {activities.slice(0, 3).map((activity) => (
                            <div key={activity.id} className="flex items-center gap-3.5">
                                {activity.foto ? (
                                    <img
                                        src={activity.foto}
                                        alt={activity.judul}
                                        className="h-12 w-14 shrink-0 rounded-xl object-cover"
                                    />
                                ) : (
                                    <span className="grid h-12 w-14 shrink-0 place-items-center rounded-xl bg-cream text-ink/30">
                                        <Images className="h-4 w-4" />
                                    </span>
                                )}
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-ink">{activity.judul}</p>
                                    <p className="mt-0.5 line-clamp-1 text-xs text-ink/40">
                                        {activity.deskripsi || 'Tanpa deskripsi'}
                                    </p>
                                </div>
                                <Link
                                    to={`/admin/activities/${activity.id}/edit?back=informasi`}
                                    className="icon-btn ml-auto shrink-0 text-ink/30"
                                    aria-label={`Edit ${activity.judul}`}
                                >
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        ))}
                        {activities.length === 0 && (
                            <p className="rounded-2xl bg-cream px-4 py-6 text-center text-xs text-ink/40">
                                Belum ada kegiatan. Tambahkan dari menu Informasi.
                            </p>
                        )}
                    </div>
                </section>

                {/* Pengajar */}
                <section className="admin-card p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-xl leading-tight text-ink">Tim pengajar</h3>
                        <Link to="/admin/profil" className="text-[11px] font-semibold text-brand-700 hover:text-brand-800">
                            Kelola
                        </Link>
                    </div>
                    <div className="mt-5 space-y-3">
                        {teachers.slice(0, 4).map((teacher) => (
                            <div key={teacher.id} className="flex items-center gap-3">
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-brand-700 to-brand-950 font-display text-[11px] text-gold-200">
                                    {initials(teacher.nama)}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-ink">{teacher.nama}</p>
                                    <p className="text-[11px] text-ink/40">{teacher.jabatan || 'Pengajar'}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {home.deskripsi_1 && (
                        <div className="mt-5 rounded-2xl border border-gold-200/60 bg-gold-50/60 px-4 py-3 text-[11px] leading-relaxed text-gold-600">
                            Pastikan deskripsi beranda tetap sesuai kondisi terbaru TPQ.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
