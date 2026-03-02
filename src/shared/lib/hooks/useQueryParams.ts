import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

/**
 * Custom hook to manage URL query parameters.
 * @returns An object containing the current query params and a function to set them.
 */
export function useQueryParams<T extends Record<string, string>>() {
    const [searchParams, setSearchParams] = useSearchParams();

    const queryParams = useMemo(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params as Partial<T>;
    }, [searchParams]);

    const setQueryParams = (params: Partial<T>, replace = false) => {
        const newParams = new URLSearchParams(searchParams);
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
        });
        setSearchParams(newParams, { replace });
    };

    return { queryParams, setQueryParams };
}
