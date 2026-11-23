import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface PageHeaderProps {
    eyebrow: string;
    title: ReactNode;
    description: string;
    chips?: ReactNode;
    aside?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, chips, aside }: PageHeaderProps) {
    return (
        <section className="border-b border-ink/10">
            <div className="container-page flex flex-col justify-between gap-8 py-12 lg:flex-row lg:items-end lg:py-16">
                <div>
                    <Reveal>
                        <span className="eyebrow">{eyebrow}</span>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h1 className="display-lg mt-5 max-w-3xl text-ink">{title}</h1>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">{description}</p>
                    </Reveal>
                    {chips && (
                        <Reveal delay={0.14}>
                            <div className="mt-7 flex flex-wrap gap-2">{chips}</div>
                        </Reveal>
                    )}
                </div>
                {aside && (
                    <Reveal delay={0.14} className="shrink-0">
                        {aside}
                    </Reveal>
                )}
            </div>
        </section>
    );
}
