import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, ImagePlus, MapPin, MessageCircle, Save, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { DataTable } from '../../components/admin/DataTable';
import type { DataColumn } from '../../components/admin/DataTable';
import { useToast } from '../../components/Toast';
import { FacebookIcon, InstagramIcon } from '../../components/BrandIcons';
import { useData } from '../../lib/store';
import type { Activity } from '../../lib/types';

const activityColumns: DataColumn<Activity>[] = [
    {
        key: 'judul',
        label: 'Judul',
        render: (row) => (
            <div className="flex items-center gap-3">
                {row.foto ? (
                    <img src={row.foto} alt={row.judul} className="h-10 w-12 shrink-0 rounded-lg object-cover" />
                ) : (
                    <span className="grid h-10 w-12 shrink-0 place-items-center rounded-lg bg-cream text-ink/30">
                        <ImagePlus className="h-4 w-4" />
                    </span>
                )}
                <span className="font-semibold text-ink">{row.judul}</span>
            </div>
        ),
    },
    { key: 'deskripsi', label: 'Deskripsi' },
];

export function InfoAdmin() {
    const { activities, settings, saveSettings } = useData();
    const { push } = useToast();

    const [form, setForm] = useState(settings);

    const bind = (key: keyof typeof form) => ({
        value: form[key],
        onChange: (event: { target: { value: string } }) => setForm((prev) => ({ ...prev, [key]: event.target.value })),
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        saveSettings(form);
        push('Pengaturan informasi berhasil disimpan.');
    };

    return (
        <div className="space-y-8">
            <AdminPageHeader
                title="Informasi"
                description="Kelola dokumentasi kegiatan serta informasi pendaftaran dan kontak."
                actions={
                    <Link to="/admin/activities/create?back=informasi" className="btn-primary px-5 py-2.5 text-xs">
                        <ImagePlus className="h-3.5 w-3.5" />
                        Tambah kegiatan
                    </Link>
                }
            />

            <section>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h2 className="font-display text-2xl leading-tight text-ink">Dokumentasi kegiatan</h2>
                        <p className="mt-1 text-xs text-ink/40">Foto dan momen yang tampil di halaman informasi.</p>
                    </div>
                    <span className="chip">{activities.length} kegiatan</span>
                </div>
                <DataTable
                    columns={activityColumns}
                    rows={activities}
                    resource="activities"
                    back="informasi"
                    label="Kegiatan"
                    emptyText="Belum ada kegiatan. Klik Tambah kegiatan untuk memulai."
                />
            </section>

            <form onSubmit={handleSubmit} className="admin-card max-w-4xl overflow-hidden">
                <div className="flex items-center gap-3 border-b border-ink/5 px-6 py-5 sm:px-7">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                        <Send className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-ink">Pendaftaran &amp; kontak</p>
                        <p className="mt-0.5 text-xs text-ink/40">
                            Tampil di halaman informasi, footer, dan tombol WhatsApp.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 px-6 py-6 sm:grid-cols-2 sm:px-7">
                    <div className="sm:col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/35">Pendaftaran</p>
                        <div className="mt-4 h-px bg-ink/5" />
                    </div>

                    <div>
                        <label className="label" htmlFor="link_daftar">
                            Link pendaftaran
                        </label>
                        <input
                            id="link_daftar"
                            {...bind('link_daftar')}
                            placeholder="https://forms.gle/..."
                            className="field"
                        />
                        <p className="hint mt-2">Google Form atau tautan pendaftaran online.</p>
                    </div>
                    <div>
                        <label className="label" htmlFor="whatsapp">
                            Nomor WhatsApp
                        </label>
                        <input id="whatsapp" {...bind('whatsapp')} placeholder="08xx..." className="field" />
                        <p className="hint mt-2">Otomatis diformat menjadi tautan wa.me.</p>
                    </div>

                    <div className="mt-2 sm:col-span-2">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-gold-600" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/35">
                                Sosial &amp; lokasi
                            </p>
                        </div>
                        <div className="mt-4 h-px bg-ink/5" />
                    </div>

                    <div>
                        <label className="label inline-flex items-center gap-1.5" htmlFor="instagram">
                            <InstagramIcon className="h-3.5 w-3.5 text-ink/40" />
                            Instagram
                        </label>
                        <input id="instagram" {...bind('instagram')} placeholder="@tpq.hidayatulmubtadiin" className="field" />
                    </div>
                    <div>
                        <label className="label inline-flex items-center gap-1.5" htmlFor="facebook">
                            <FacebookIcon className="h-3.5 w-3.5 text-ink/40" />
                            Facebook
                        </label>
                        <input id="facebook" {...bind('facebook')} placeholder="Nama halaman Facebook" className="field" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="label" htmlFor="maps_url">
                            Link Google Maps
                        </label>
                        <input
                            id="maps_url"
                            {...bind('maps_url')}
                            placeholder="https://maps.google.com/..."
                            className="field"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="label" htmlFor="alamat">
                            Alamat
                        </label>
                        <textarea id="alamat" rows={3} {...bind('alamat')} className="field" />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/5 bg-cream/40 px-6 py-4 sm:px-7">
                    <p className="hint">Tersimpan langsung ke website.</p>
                    <button type="submit" className="btn-primary px-6 py-2.5 text-xs">
                        <Save className="h-3.5 w-3.5" />
                        Simpan pengaturan
                    </button>
                </div>
            </form>

            <div className="flex items-center gap-2 text-xs text-ink/40">
                <MessageCircle className="h-3.5 w-3.5" />
                Nomor WhatsApp juga otomatis muncul sebagai tombol mengambang di situs.
                <Link to="/informasi" target="_blank" className="inline-flex items-center gap-1 font-semibold text-brand-700">
                    Lihat hasilnya
                    <ArrowUpRight className="h-3 w-3" />
                </Link>
            </div>
        </div>
    );
}
