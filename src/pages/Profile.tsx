import { ArrowRight, BookOpen, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { useData } from '../lib/store';
import { initials } from '../lib/utils';

export function Profile() {
    const { teachers, classes, students } = useData();

    const classesSorted = [...classes].sort((a, b) =>
        a.nama.localeCompare(b.nama, 'id', { numeric: true }),
    );
    const maxStudents = Math.max(
        1,
        ...classes.map((item) => students.filter((s) => s.class_id === item.id).length),
    );

    return (
        <>
            <PageHeader
                eyebrow="Profil"
                title="Mengenal pengajar kami"
                description="Para ustadz dan ustadzah yang membimbing santri belajar membaca Al-Qur'an setiap hari, dengan sabar dan penuh perhatian."
                chips={
                    <>
                        <span className="chip">
                            <Users className="h-3 w-3" />
                            {teachers.length} pengajar
                        </span>
                        <span className="chip">
                            <BookOpen className="h-3 w-3" />
                            {classes.length} kelas
                        </span>
                        <span className="chip">
                            <GraduationCap className="h-3 w-3" />
                            {students.length} santri
                        </span>
                    </>
                }
            />

            <section className="container-page py-14 lg:py-20">
                <Reveal className="flex items-end justify-between gap-4">
                    <div>
                        <span className="eyebrow">Tim pengajar</span>
                        <h2 className="section-title mt-5">Yang mendampingi santri</h2>
                    </div>
                    <span className="hidden h-px flex-1 bg-ink/10 sm:block" />
                </Reveal>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {teachers.length > 0 ? (
                        teachers.map((teacher, index) => (
                            <Reveal key={teacher.id} delay={Math.min(index * 0.04, 0.2)}>
                                <article className="h-full border border-ink/10 bg-white p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="grid h-14 w-14 shrink-0 place-items-center bg-brand-900 text-lg font-semibold text-lime-300">
                                            {initials(teacher.nama)}
                                        </span>
                                        <div className="min-w-0 pt-0.5">
                                            <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                                                {teacher.nama}
                                            </h3>
                                            {teacher.jabatan && (
                                                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-brand-700">
                                                    {teacher.jabatan}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2 border-t border-ink/10 pt-4 text-[11px] font-medium text-ink/40">
                                        <span className="h-1 w-1 bg-brand-600" />
                                        Pengajar TPQ Hidayatul Mubtadiin
                                    </div>
                                </article>
                            </Reveal>
                        ))
                    ) : (
                        <div className="card col-span-full flex flex-col items-center px-6 py-14 text-center">
                            <span className="grid h-12 w-12 place-items-center border border-ink/10 bg-cream text-brand-700">
                                <Users className="h-5 w-5" strokeWidth={1.6} />
                            </span>
                            <p className="mt-4 text-lg font-semibold text-ink">Data pengajar belum tersedia</p>
                            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                                Informasi pengajar akan tampil di sini setelah ditambahkan oleh pengelola.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="border-y border-ink/10 bg-white/50">
                <div className="container-page py-14 lg:py-20">
                    <Reveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <span className="eyebrow">Kelas & santri</span>
                            <h2 className="section-title mt-5">Kelas yang sedang berjalan</h2>
                        </div>
                        <p className="text-sm text-ink-soft">
                            <span className="text-2xl font-semibold leading-none tracking-tight text-brand-800">
                                {students.length}
                            </span>
                            <span className="ml-1.5">
                                santri di {classes.length} kelas
                            </span>
                        </p>
                    </Reveal>

                    <div className="mt-10 border-t border-ink/10">
                        {classesSorted.length > 0 ? (
                            classesSorted.map((classroom, index) => {
                                const count = students.filter(
                                    (student) => student.class_id === classroom.id,
                                ).length;
                                return (
                                    <Reveal key={classroom.id} delay={Math.min(index * 0.03, 0.15)}>
                                        <div className="grid grid-cols-[2.5rem_1fr] items-start gap-x-4 gap-y-3 border-b border-ink/10 py-5 sm:grid-cols-[3.5rem_1fr_10rem_7rem] sm:items-center sm:py-6">
                                            <span className="font-mono text-[11px] text-ink/35">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <div className="min-w-0">
                                                <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                                                    {classroom.nama}
                                                </h3>
                                                {classroom.keterangan && (
                                                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                                                        {classroom.keterangan}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="col-start-2 sm:col-start-auto">
                                                <div className="flex items-center justify-between gap-3 text-xs font-medium text-ink/45 sm:justify-start">
                                                    <span className="inline-flex items-center gap-2">
                                                        <BookOpen className="h-3.5 w-3.5 text-brand-600" />
                                                        {count} santri
                                                    </span>
                                                </div>
                                                <div className="mt-2 h-px w-full max-w-[9rem] bg-ink/10">
                                                    <div
                                                        className="h-px bg-brand-700"
                                                        style={{
                                                            width: `${Math.round((count / maxStudents) * 100)}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="col-start-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30 sm:col-start-auto sm:text-right">
                                                Kelas {index + 1}
                                            </span>
                                        </div>
                                    </Reveal>
                                );
                            })
                        ) : (
                            <div className="card col-span-full mt-8 flex flex-col items-center px-6 py-14 text-center">
                                <span className="grid h-12 w-12 place-items-center border border-ink/10 bg-cream text-brand-700">
                                    <BookOpen className="h-5 w-5" strokeWidth={1.6} />
                                </span>
                                <p className="mt-4 text-lg font-semibold text-ink">Data kelas belum tersedia</p>
                                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                                    Informasi kelas akan tampil di sini setelah ditambahkan oleh pengelola.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="container-page py-14 lg:py-16">
                <Reveal>
                    <div className="flex flex-col items-start justify-between gap-6 border border-ink/10 bg-white p-7 sm:flex-row sm:items-center sm:p-9">
                        <div>
                            <h2 className="text-xl font-semibold tracking-[-0.015em] text-ink">
                                Ingin bergabung dengan kelas kami?
                            </h2>
                            <p className="mt-1.5 text-sm text-ink-soft">
                                Lihat informasi pendaftaran atau hubungi kami terlebih dahulu.
                            </p>
                        </div>
                        <Link to="/informasi#pendaftaran" className="btn-primary shrink-0 gap-2.5 px-6">
                            Info pendaftaran
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </>
    );
}
