import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline';
    children: React.ReactNode;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:focus:ring-zinc-300',
                {
                    'border-transparent bg-primary-500 text-white shadow hover:bg-primary-600':
                        variant === 'default',
                    'text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800':
                        variant === 'outline',
                },
                className
            )}
            {...props}
        />
    );
}
