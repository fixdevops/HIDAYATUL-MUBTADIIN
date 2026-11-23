import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function CountUp({ value, className }: { value: number; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const reduced = useReducedMotion();
    const [display, setDisplay] = useState(reduced ? value : 0);

    useEffect(() => {
        if (!inView || reduced) return;
        const controls = animate(0, value, {
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => setDisplay(Math.round(latest)),
        });
        return () => controls.stop();
    }, [inView, reduced, value]);

    return (
        <span ref={ref} className={className}>
            {display.toLocaleString('id-ID')}
        </span>
    );
}
