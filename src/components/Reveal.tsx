import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}

export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
    const reduced = useReducedMotion();

    if (reduced) return <div className={className}>{children}</div>;

    return (
        <motion.div
            className={cn(className)}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
