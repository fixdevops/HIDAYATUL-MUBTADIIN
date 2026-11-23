import { AnimatePresence, motion } from 'motion/react';
import { Trash2, X } from 'lucide-react';
import { useEffect } from 'react';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onClose: () => void;
}

export function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = 'Hapus',
    onConfirm,
    onClose,
}: ConfirmDialogProps) {
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[85] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-md rounded-[1.75rem] border border-ink/5 bg-white p-6 shadow-lift sm:p-7"
                        role="dialog"
                        aria-modal="true"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="icon-btn absolute right-4 top-4 text-ink/35"
                            aria-label="Tutup"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-500">
                            <Trash2 className="h-5 w-5" />
                        </span>
                        <h3 className="mt-5 font-display text-2xl leading-snug text-ink">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{message}</p>

                        <div className="mt-7 flex items-center justify-end gap-2.5">
                            <button type="button" onClick={onClose} className="btn-soft px-5 py-2.5 text-xs">
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                {confirmLabel}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
