import { Grid, List } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface ViewToggleProps {
    view: 'grid' | 'list';
    onChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
    return (
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 border border-zinc-200 dark:border-zinc-700">
            <button
                onClick={() => onChange('grid')}
                className={cn(
                    'p-2 rounded-full transition-colors',
                    view === 'grid'
                        ? 'bg-white dark:bg-zinc-700 text-primary-500 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                )}
            >
                <Grid className="w-4 h-4" />
            </button>
            <button
                onClick={() => onChange('list')}
                className={cn(
                    'p-2 rounded-full transition-colors',
                    view === 'list'
                        ? 'bg-white dark:bg-zinc-700 text-primary-500 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                )}
            >
                <List className="w-4 h-4" />
            </button>
        </div>
    );
}
