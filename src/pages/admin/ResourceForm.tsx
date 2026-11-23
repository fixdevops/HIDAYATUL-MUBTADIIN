import { useState } from 'react';
import type { ComponentType, FormEvent } from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Images, Save, Users } from 'lucide-react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { ImageDrop } from '../../components/ImageDrop';
import { useToast } from '../../components/Toast';
import { resourceConfig } from '../../lib/resourceConfig';
import { useData } from '../../lib/store';
import type { DataValues, Resource } from '../../lib/types';

type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>;

const icons: Record<Resource, IconComponent> = {
    teachers: Users,
    students: GraduationCap,
    classes: BookOpen,
    activities: Images,
};

const isResource = (value: string | undefined): value is Resource =>
    value !== undefined && value in resourceConfig;

const isBack = (value: string | null): value is 'profil' | 'data' | 'informasi' =>
    value === 'profil' || value === 'data' || value === 'informasi';

export function ResourceForm() {
    const { res, id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { push } = useToast();
    const data = useData();

    const resource = isResource(res) ? res : null;
    const def = resource ? resourceConfig[resource] : null;
    const back = isBack(searchParams.get('back')) ? (searchParams.get('back') as string) : def?.back ?? 'profil';
    const item = id && resource ? data[resource].find((entry) => entry.id === Number(id)) : undefined;
    const isEdit = Boolean(id);

    const [values, setValues] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        const source = item as unknown as Record<string, unknown> | undefined;
        def?.fields.forEach((field) => {
            const raw = source?.[field.name];
            initial[field.name] = raw === null || raw === undefined ? '' : String(raw);
        });
        return initial;
    });
    const [error, setError] = useState<string | null>(null);

    if (!resource || !def) {
        return (
            <div className="admin-card mx-auto max-w-md p-8 text-center">
                <p className="font-display text-xl text-ink">Halaman tidak ditemukan</p>
                <p className="mt-2 text-sm text-ink/45">Jenis data tidak dikenali.</p>
                <Link to="/admin/ringkasan" className="btn-primary mt-6 px-5 py-2.5 text-xs">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Kembali ke ringkasan
                </Link>
            </div>
        );
    }

    if (isEdit && !item) {
        return (
            <div className="admin-card mx-auto max-w-md p-8 text-center">
                <p className="font-display text-xl text-ink">Data tidak ditemukan</p>
                <p className="mt-2 text-sm text-ink/45">
                    Data mungkin sudah dihapus. Silakan kembali dan pilih data lain.
                </p>
                <Link to={`/admin/${back}`} className="btn-primary mt-6 px-5 py-2.5 text-xs">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Kembali
                </Link>
            </div>
        );
    }

    const Icon = icons[resource];
    const singularLabel = def.singular.charAt(0).toUpperCase() + def.singular.slice(1);
    const set = (name: string, value: string) => setValues((prev) => ({ ...prev, [name]: value }));

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const missing = def.fields.find((field) => field.required && !values[field.name]?.trim());
        if (missing) {
            setError(`${missing.label} wajib diisi.`);
            return;
        }
        setError(null);

        const payload: DataValues = {};
        def.fields.forEach((field) => {
            if (field.type === 'class') {
                payload[field.name] = values[field.name] ? Number(values[field.name]) : null;
            } else {
                payload[field.name] = values[field.name] ?? '';
            }
        });

        if (item) {
            data.updateItem(resource, item.id, payload);
            push(`${singularLabel} berhasil diperbarui.`);
        } else {
            data.createItem(resource, payload);
            push(`${singularLabel} berhasil ditambahkan.`);
        }
        navigate(`/admin/${back}`);
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
            <AdminPageHeader
                title={isEdit ? `Edit ${def.singular}` : `Tambah ${def.singular}`}
                description={
                    isEdit
                        ? `Perbarui data ${def.singular.toLowerCase()} yang tersimpan.`
                        : `Lengkapi data ${def.singular.toLowerCase()} baru.`
                }
                actions={
                    <Link to={`/admin/${back}`} className="btn-soft px-5 py-2.5 text-xs">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Kembali
                    </Link>
                }
            />

            <div className="admin-card overflow-hidden">
                <div className="flex items-center gap-3 border-b border-ink/5 bg-cream/40 px-6 py-5 sm:px-7">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-brand-700 shadow-sm">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-ink">
                            {isEdit ? `Data ${def.singular}` : `${singularLabel} baru`}
                        </p>
                        <p className="mt-0.5 text-xs text-ink/40">
                            {isEdit ? `ID #${item?.id ?? id}` : `Akan ditambahkan ke bagian ${def.label.toLowerCase()}.`}
                        </p>
                    </div>
                </div>

                <div className="space-y-5 px-6 py-6 sm:px-7">
                    {def.fields.map((field) => (
                        <div key={field.name}>
                            <label className="label inline-flex items-center gap-1" htmlFor={field.name}>
                                {field.label}
                                {field.required && <span className="text-red-500">*</span>}
                            </label>

                            {field.type === 'textarea' && (
                                <textarea
                                    id={field.name}
                                    rows={4}
                                    className="field leading-relaxed"
                                    placeholder={field.placeholder}
                                    value={values[field.name] ?? ''}
                                    onChange={(event) => set(field.name, event.target.value)}
                                />
                            )}

                            {field.type === 'class' && (
                                <select
                                    id={field.name}
                                    className="field appearance-none"
                                    value={values[field.name] ?? ''}
                                    onChange={(event) => set(field.name, event.target.value)}
                                >
                                    <option value="">Tanpa kelas</option>
                                    {data.classes.map((classroom) => (
                                        <option key={classroom.id} value={classroom.id}>
                                            {classroom.nama}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {field.type === 'file' && (
                                <ImageDrop
                                    id={field.name}
                                    label=""
                                    value={values[field.name] || undefined}
                                    onChange={(next) => set(field.name, next)}
                                    aspect="aspect-[2/1]"
                                    hint={field.hint}
                                />
                            )}

                            {field.type === 'text' && (
                                <input
                                    id={field.name}
                                    type="text"
                                    className="field"
                                    placeholder={field.placeholder}
                                    value={values[field.name] ?? ''}
                                    onChange={(event) => set(field.name, event.target.value)}
                                />
                            )}

                            {field.hint && field.type !== 'file' && <p className="hint mt-2">{field.hint}</p>}
                        </div>
                    ))}

                    {error && (
                        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600">
                            {error}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/5 bg-cream/40 px-6 py-4 sm:px-7">
                    <p className="hint">Perubahan langsung tampil di website.</p>
                    <div className="flex gap-2">
                        <Link to={`/admin/${back}`} className="btn-soft px-5 py-2.5 text-xs">
                            Batal
                        </Link>
                        <button type="submit" className="btn-primary px-5 py-2.5 text-xs">
                            <Save className="h-3.5 w-3.5" />
                            {isEdit ? 'Simpan perubahan' : `Simpan ${def.singular.toLowerCase()}`}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
