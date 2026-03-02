import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook to get the current direction (rtl/ltr) based on i18n language.
 * @returns 'rtl' | 'ltr'
 */
export function useDirection(): 'rtl' | 'ltr' {
    const { i18n } = useTranslation();
    const [dir, setDir] = useState<'rtl' | 'ltr'>(i18n.dir());

    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            setDir(i18n.dir(lng));
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

    return dir;
}
