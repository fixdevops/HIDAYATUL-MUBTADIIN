import type { ReactNode } from 'react';

interface AdminPageHeaderProps {
    title: string;
    description?: string;
    actions?: ReactNode;
}

export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
    return (
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-brand-700">Dashboard</p>
                <h1 className="mt-1.5 text-[1.7rem] font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2rem]">
                    {title}
                </h1>
                {description && <p className="mt-1.5 text-sm text-ink/40">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
    );
}
