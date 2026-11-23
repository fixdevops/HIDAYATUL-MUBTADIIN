import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect } from 'react';
import type { Activity } from '../lib/types';

interface LightboxProps {
    items: Activity[];
    index: number | null;
    onClose: () => void;
    onChange: (index: number) => void;
}

export function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
    const open = index !== null;
    const item = open ? items[index] : undefined;

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
            if (event.key === 'ArrowRight') onChange((Number(index) + 1) % items.length);
            if (event.key === 'ArrowLeft') onChange((Number(index) - 1 + items.length) % items.length);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, index, items.length, onChange, onClose]);

    return (
        <AnimatePresence>
            {open && item && (
                <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
                    />

                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 18, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Tutup"
                            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition hover:bg-white"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {items.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => onChange((Number(index) - 1 + items.length) % items.length)}
                                    aria-label="Sebelumnya"
                                    className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition hover:bg-white"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onChange((Number(index) + 1) % items.length)}
                                    aria-label="Berikutnya"
                                    className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition hover:bg-white"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </>
                        )}

                        <div className="max-h-[62vh] overflow-hidden bg-brand-950">
                            {item.foto ? (
                                <img src={item.foto} alt={item.judul} className="max-h-[62vh] w-full object-cover" />
                            ) : (
                                <div className="grid aspect-[16/9] place-items-center bg-gradient-to-br from-brand-800 to-brand-950 text-gold-200">
                                    <span className="font-display text-lg">Foto belum ditambahkan</span>
                                </div>
                            )}
                        </div>

                        <div className="p-6 sm:p-8">
                            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-600">
                                Dokumentasi kegiatan
                            </p>
                            <h3 className="mt-2 font-display text-2xl leading-snug text-ink">{item.judul}</h3>
                            {item.deskripsi && (
                                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
                                    {item.deskripsi}
                                </p>
                            )}
                            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/30">
                                {Number(index) + 1} / {items.length}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
