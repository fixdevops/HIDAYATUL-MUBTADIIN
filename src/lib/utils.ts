import { clsx, type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export function initials(name: string, length = 2): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, length)
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase();
}

export function waLink(number: string): string | null {
    const digits = number.replace(/\D/g, '');
    if (!digits) return null;
    const normalized = digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
    return `https://wa.me/${normalized}`;
}

export function formatDateID(date = new Date()): string {
    return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

export function readImageFile(file: File, maxSize = 1400): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Gagal membaca file.'));
        reader.onload = () => {
            const source = String(reader.result);
            const image = new Image();
            image.onerror = () => resolve(source);
            image.onload = () => {
                const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
                if (scale === 1 && file.size < 350_000) {
                    resolve(source);
                    return;
                }
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(image.width * scale);
                canvas.height = Math.round(image.height * scale);
                const context = canvas.getContext('2d');
                if (!context) {
                    resolve(source);
                    return;
                }
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.84));
            };
            image.src = source;
        };
        reader.readAsDataURL(file);
    });
}
