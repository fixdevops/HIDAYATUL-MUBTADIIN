import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface ToastItem {
    id: number;
    message: string;
}

const ToastContext = createContext<{ push: (message: string) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<ToastItem[]>([]);

    const push = useCallback((message: string) => {
        const id = Date.now() + Math.random();
        setItems((prev) => [...prev, { id, message }]);
        window.setTimeout(() => {
            setItems((prev) => prev.filter((item) => item.id !== id));
        }, 4600);
    }, []);

    const value = useMemo(() => ({ push }), [push]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex w-full max-w-sm flex-col gap-2.5 px-4 sm:px-0">
                <AnimatePresence initial={false}>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 16, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-brand-100 bg-white px-4 py-3.5 shadow-lift"
                        >
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                                <CheckCircle2 className="h-4 w-4" />
                            </span>
                            <p className="flex-1 pt-1 text-sm leading-snug text-ink">{item.message}</p>
                            <button
                                type="button"
                                onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}
                                className="icon-btn -mr-1.5 -mt-1.5 h-7 w-7 text-ink/30"
                                aria-label="Tutup notifikasi"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast harus dipakai di dalam ToastProvider.');
    return context;
}
