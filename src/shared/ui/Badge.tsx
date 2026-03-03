import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline';
    children: React.ReactNode;
}

/* Badge — uses theme tokens to avoid white surfaces on dark backgrounds */
export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
                {
                    'border-transparent text-white shadow hover:brightness-110':
                        variant === 'default',
                    'text-[var(--muted)]':
                        variant === 'outline',
                },
                className
            )}
            style={{
                ...(variant === 'default'
                    ? { backgroundColor: 'var(--accent)' }
                    : {
                        backgroundColor: 'transparent',
                        border: '1px solid var(--border)',
                    }),
            }}
            {...props}
        />
    );
}
