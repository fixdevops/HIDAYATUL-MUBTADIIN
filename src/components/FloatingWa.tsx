import { useData } from '../lib/store';
import { waLink } from '../lib/utils';
import { WhatsAppIcon } from './BrandIcons';

export function FloatingWa() {
    const { settings } = useData();
    const link = waLink(settings.whatsapp);
    if (!link) return null;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi kami lewat WhatsApp"
            className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-[2px] border border-brand-950/10 bg-brand-900 text-cream shadow-[0_16px_32px_-18px_rgba(18,30,22,0.8)] transition duration-200 hover:bg-brand-800 sm:bottom-7 sm:right-7"
        >
            <WhatsAppIcon className="h-5 w-5" />
        </a>
    );
}
