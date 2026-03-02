import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/Input';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    const { t } = useTranslation();
    const [localValue, setLocalValue] = useState(value);
    const debouncedValue = useDebounce(localValue, 500);

    // Sync local state with prop value if it changes externally
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Call onChange when debounced value changes
    useEffect(() => {
        if (debouncedValue !== value) {
            onChange(debouncedValue);
        }
    }, [debouncedValue, onChange, value]);

    return (
        <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 rtl:right-3 rtl:left-auto" />
            <Input
                type="text"
                placeholder={t('common.search')}
                className="pl-10 rtl:pr-10 rtl:pl-4"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
            />
        </div>
    );
}
