import { BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

export function LogoMark({ className, iconClassName }: { className?: string; iconClassName?: string }) {
    return (
        <span
            className={cn(
                'relative grid h-10 w-10 shrink-0 place-items-center rounded-[2px] bg-brand-900 text-lime-300',
                className,
            )}
        >
            <BookOpen className={cn('h-[17px] w-[17px]', iconClassName)} strokeWidth={1.6} />
        </span>
    );
}

export function Wordmark({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
    return (
        <span className="leading-tight">
            <span
                className={cn(
                    'block text-[15px] font-semibold tracking-[-0.01em]',
                    dark ? 'text-cream' : 'text-ink',
                )}
            >
                Hidayatul Mubtadiin
            </span>
            {!compact && (
                <span
                    className={cn(
                        'mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em]',
                        dark ? 'text-cream/45' : 'text-ink/40',
                    )}
                >
                    TPQ · Tlogohaji
                </span>
            )}
        </span>
    );
}
