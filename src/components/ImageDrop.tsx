import { ImagePlus, Loader2, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { readImageFile } from '../lib/utils';
import { cn } from '../lib/utils';

interface ImageDropProps {
    id: string;
    label: string;
    value?: string;
    onChange: (value: string) => void;
    aspect?: string;
    hint?: string;
}

export function ImageDrop({ id, label, value, onChange, aspect = 'aspect-[4/3]', hint }: ImageDropProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    async function handleFile(file?: File) {
        if (!file) return;
        setLoading(true);
        try {
            const dataUrl = await readImageFile(file);
            onChange(dataUrl);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {label && <span className="label">{label}</span>}
            <div
                className={cn(
                    'group relative mt-2 overflow-hidden rounded-2xl border-2 border-dashed border-ink/10 bg-cream/60 transition hover:border-brand-300 hover:bg-brand-50/40',
                )}
            >
                {value ? (
                    <>
                        <img src={value} alt={`Pratinjau ${label}`} className={cn('w-full object-cover', aspect)} />
                        <div className="flex items-center justify-between border-t border-ink/5 bg-white px-3 py-2 text-[11px] font-medium text-ink/45">
                            Klik untuk mengganti
                            <ImagePlus className="h-3.5 w-3.5" />
                        </div>
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            aria-label="Hapus foto"
                            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition hover:bg-white hover:text-red-500"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className={cn('flex w-full flex-col items-center justify-center gap-2 text-center', aspect)}
                    >
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand-700 shadow-sm">
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <ImagePlus className="h-5 w-5" />
                            )}
                        </span>
                        <span className="text-xs font-semibold text-ink/60">Pilih foto</span>
                        <span className="px-4 text-[10px] text-ink/35">{hint ?? 'JPG / PNG · otomatis dioptimalkan'}</span>
                    </button>
                )}

                {value && (
                    <input
                        ref={inputRef}
                        id={id}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => void handleFile(event.target.files?.[0])}
                    />
                )}
                {value && (
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="absolute inset-x-0 top-0 z-10 cursor-pointer"
                        style={{ height: 'calc(100% - 34px)' }}
                        aria-label={`Ganti ${label}`}
                    />
                )}
            </div>
            {!value && (
                <input
                    ref={inputRef}
                    id={id}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => void handleFile(event.target.files?.[0])}
                />
            )}
        </div>
    );
}
