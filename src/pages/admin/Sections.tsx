import { useState } from 'react';
import { BookOpen, GraduationCap, Plus, Search, Users, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { DataTable } from '../../components/admin/DataTable';
import type { DataColumn } from '../../components/admin/DataTable';
import { useData } from '../../lib/store';
import type { Classroom, Student, Teacher } from '../../lib/types';

const teacherColumns: DataColumn<Teacher>[] = [
    { key: 'nama', label: 'Nama', primary: true },
    { key: 'jabatan', label: 'Jabatan' },
];

const classColumns: DataColumn<Classroom>[] = [
    { key: 'nama', label: 'Kelas', primary: true },
    { key: 'keterangan', label: 'Keterangan' },
];

const teacherDetailColumns: DataColumn<Teacher>[] = [
    { key: 'nama', label: 'Nama', primary: true },
    { key: 'ttl', label: 'Tempat, tanggal lahir' },
    { key: 'alamat', label: 'Alamat' },
];

export function ProfilAdmin() {
    const { teachers, classes, students } = useData();

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title="Profil"
                description="Kelola data pengajar dan kelas yang tampil di halaman profil."
            />

            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: 'Pengajar', value: teachers.length, icon: Users, target: 'pengajar', tone: 'bg-brand-50 text-brand-700' },
                    { label: 'Kelas', value: classes.length, icon: BookOpen, target: 'kelas', tone: 'bg-gold-50 text-gold-600' },
                    { label: 'Santri', value: students.length, icon: GraduationCap, target: null, tone: 'bg-ink/5 text-ink/55' },
                ].map((stat) => {
                    const inner = (
                        <>
                            <span className={`grid h-11 w-11 place-items-center rounded-2xl ${stat.tone}`}>
                                <stat.icon className="h-5 w-5" strokeWidth={1.7} />
                            </span>
                            <div>
                                <p className="font-display text-2xl leading-none text-ink">{stat.value}</p>
                                <p className="mt-1 text-[11px] text-ink/45">{stat.label}</p>
                            </div>
                        </>
                    );
                    const className =
                        'admin-card flex items-center gap-4 p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-lift';

                    return stat.target ? (
                        <button
                            key={stat.label}
                            type="button"
                            onClick={() =>
                                document.getElementById(stat.target!)?.scrollIntoView({ behavior: 'smooth' })
                            }
                            className={className}
                        >
                            {inner}
                        </button>
                    ) : (
                        <Link key={stat.label} to="/admin/data" className={className}>
                            {inner}
                        </Link>
                    );
                })}
            </div>

            <section id="pengajar" className="scroll-mt-28">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h2 className="font-display text-2xl leading-tight text-ink">Pengajar</h2>
                        <p className="mt-1 text-xs text-ink/40">Nama dan jabatan yang tampil di halaman profil.</p>
                    </div>
                    <Link to="/admin/teachers/create?back=profil" className="btn-primary px-5 py-2.5 text-xs">
                        <Plus className="h-3.5 w-3.5" />
                        Tambah pengajar
                    </Link>
                </div>
                <DataTable
                    columns={teacherColumns}
                    rows={teachers}
                    resource="teachers"
                    back="profil"
                    label="Pengajar"
                />
            </section>

            <section id="kelas" className="scroll-mt-28">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h2 className="font-display text-2xl leading-tight text-ink">Kelas</h2>
                        <p className="mt-1 text-xs text-ink/40">Kelas yang tersedia untuk pengelompokan santri.</p>
                    </div>
                    <Link to="/admin/classes/create?back=profil" className="btn-soft px-5 py-2.5 text-xs">
                        <Plus className="h-3.5 w-3.5" />
                        Tambah kelas
                    </Link>
                </div>
                <DataTable
                    columns={classColumns}
                    rows={classes}
                    resource="classes"
                    back="profil"
                    label="Kelas"
                />
            </section>
        </div>
    );
}

export function DataAdmin() {
    const { teachers, students, classes } = useData();
    const [query, setQuery] = useState('');

    const term = query.trim().toLowerCase();
    const filteredTeachers = teachers.filter((row) => row.nama.toLowerCase().includes(term));
    const filteredStudents = students.filter((row) => row.nama.toLowerCase().includes(term));

    const className = (id?: number | null) => classes.find((classroom) => classroom.id === id)?.nama;

    const studentColumns: DataColumn<Student>[] = [
        { key: 'nama', label: 'Nama', primary: true },
        { key: 'ttl', label: 'Tempat, tanggal lahir' },
        { key: 'alamat', label: 'Alamat' },
        {
            key: 'class_id',
            label: 'Kelas',
            render: (row) => {
                const name = className(row.class_id);
                return name ? (
                    <span className="chip">{name}</span>
                ) : (
                    <span className="text-xs italic text-ink/25">belum ada kelas</span>
                );
            },
        },
    ];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title="Data"
                description="Data lengkap pengajar dan santri dalam satu tempat."
                actions={
                    <Link to="/admin/students/create?back=data" className="btn-primary px-5 py-2.5 text-xs">
                        <Plus className="h-3.5 w-3.5" />
                        Tambah santri
                    </Link>
                }
            />

            <div className="admin-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Cari nama pengajar atau santri…"
                        className="field mt-0 pl-11 pr-10"
                        aria-label="Cari data"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink/35 transition hover:bg-ink/5 hover:text-ink"
                            aria-label="Bersihkan pencarian"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
                <div className="flex gap-2 text-[11px]">
                    <span className="chip">{filteredTeachers.length} pengajar</span>
                    <span className="chip">{filteredStudents.length} santri</span>
                </div>
            </div>

            <section>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h2 className="font-display text-2xl leading-tight text-ink">Pengajar</h2>
                        <p className="mt-1 text-xs text-ink/40">Termasuk tempat lahir dan alamat.</p>
                    </div>
                    <Link to="/admin/teachers/create?back=data" className="btn-soft px-5 py-2.5 text-xs">
                        <Plus className="h-3.5 w-3.5" />
                        Tambah
                    </Link>
                </div>
                <DataTable
                    columns={teacherDetailColumns}
                    rows={filteredTeachers}
                    resource="teachers"
                    back="data"
                    label="Pengajar"
                    emptyText={query ? 'Tidak ada pengajar dengan nama tersebut.' : undefined}
                />
            </section>

            <section>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h2 className="font-display text-2xl leading-tight text-ink">Santri</h2>
                        <p className="mt-1 text-xs text-ink/40">Daftar santri dan kelasnya masing-masing.</p>
                    </div>
                    <Link to="/admin/students/create?back=data" className="btn-soft px-5 py-2.5 text-xs">
                        <Plus className="h-3.5 w-3.5" />
                        Tambah
                    </Link>
                </div>
                <DataTable
                    columns={studentColumns}
                    rows={filteredStudents}
                    resource="students"
                    back="data"
                    label="Santri"
                    emptyText={query ? 'Tidak ada santri dengan nama tersebut.' : undefined}
                />
            </section>
        </div>
    );
}
