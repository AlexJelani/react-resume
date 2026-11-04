import { useEffect } from 'react';
import { company } from './company';

export default function usePageTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} | ${company.displayName}` : company.displayName;
    }, [title]);
}
