import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, ImagePlus, Lightbulb, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { ImageDrop } from '../../components/ImageDrop';
import { useToast } from '../../components/Toast';
import { useData } from '../../lib/store';

export function AdminHome() {
    const { home, saveHome } = useData();
    const { push } = useToast();

    const [foto1, setFoto1] = useState(home.foto_1);
    const [foto2, setFoto2] = useState(home.foto_2);
    const [desc1, setDesc1] = useState(home.deskripsi_1);
    const [desc2, setDesc2] = useState(home.deskripsi_2);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        saveHome({ foto_1: foto1, foto_2: foto2, deskripsi_1: desc1, deskripsi_2: desc2 });
        push('Beranda berhasil disimpan.');
    };

    const dirty =
        foto1 !== home.foto_1 || foto2 !== home.foto_2 || desc1 !== home.deskripsi_1 || desc2 !== home.deskripsi_2;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pb-24">
            <AdminPageHeader
                title="Beranda"
                description="Atur dua bagian utama yang tampil di halaman depan."
                actions={
                    <Link to="/" target="_blank" className="btn-soft px-5 py-2.5 text-xs">
                        Lihat beranda
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                }
            />

            <div className="grid gap-5 xl:grid-cols-2">
                {[
                    {
                        index: '01',
                        title: 'Bagian utama',
                        hint: 'Tampil paling atas, di samping sambutan dan statistik.',
                        foto: foto1,
                        onFoto: setFoto1,
                        desc: desc1,
                        onDesc: setDesc1,
                        id: 'home-desc-1',
                    },
                    {
                        index: '02',
                        title: 'Bagian kedua',
                        hint: 'Tampil pada blok tentang kami bersama foto pendukung.',
                        foto: foto2,
                        onFoto: setFoto2,
                        desc: desc2,
                        onDesc: setDesc2,
                        id: 'home-desc-2',
                    },
                ].map((section) => (
                    <section key={section.index} className="admin-card overflow-hidden">
                        <div className="flex items-center gap-3 border-b border-ink/5 px-6 py-5 sm:px-7">
                            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 font-display text-sm text-brand-700">
                                {section.index}
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-ink">{section.title}</p>
                                <p className="mt-0.5 text-xs text-ink/40">{section.hint}</p>
                            </div>
                        </div>

                        <div className="space-y-6 px-6 py-6 sm:px-7">
                            <ImageDrop
                                id={`${section.id}-foto`}
                                label="Foto bagian"
                                value={section.foto}
                                onChange={section.onFoto}
                                aspect="aspect-[16/10]"
                                hint="JPG atau PNG, disarankan rasio lanskap. Foto dikompres otomatis."
                            />
                            <div>
                                <label className="label" htmlFor={section.id}>
                                    Deskripsi
                                </label>
                                <textarea
                                    id={section.id}
                                    rows={6}
                                    className="field leading-relaxed"
                                    value={section.desc}
                                    onChange={(event) => section.onDesc(event.target.value)}
                                    placeholder="Tuliskan kalimat hangat tentang suasana belajar di TPQ…"
                                />
                                <p className="hint mt-2">Gunakan 2–4 kalimat agar mudah dibaca.</p>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <div className="flex items-start gap-3 rounded-3xl border border-gold-200/70 bg-gold-50/60 px-5 py-4 text-xs leading-relaxed text-gold-600">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                    Foto yang konsisten dan cerah membuat halaman depan terasa lebih hidup. Ganti foto secara berkala
                    mengikuti kegiatan terbaru.
                </p>
            </div>

            <div className="fixed inset-x-3 bottom-3 z-30 sm:inset-x-auto sm:right-6 sm:left-auto sm:bottom-6">
                <div className="flex items-center gap-3 rounded-2xl border border-ink/5 bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:pl-5">
                    <span className="hidden items-center gap-1.5 text-[11px] font-medium text-ink/40 sm:flex">
                        <ImagePlus className="h-3.5 w-3.5" />
                        {dirty ? 'Ada perubahan belum disimpan' : 'Semua perubahan tersimpan'}
                    </span>
                    <button type="submit" className="btn-primary ml-auto px-5 py-2.5 text-xs" disabled={!dirty}>
                        <Save className="h-3.5 w-3.5" />
                        Simpan beranda
                    </button>
                </div>
            </div>
        </form>
    );
}
