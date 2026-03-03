/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Manual dark mode support via class
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#F05A00', // Main
                    hover: '#FF6A00',   // Hover
                    active: '#D94E00',  // Active
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#f97316',
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                },
                dark: {
                    bg: '#0B0B0B',      // Main background
                    section: '#111111', // Section background
                    card: '#1A1A1A',    // Card background
                    border: 'rgba(255,255,255,0.06)',
                    text: {
                        primary: '#EDEDED',
                        secondary: 'rgba(255,255,255,0.65)',
                        muted: 'rgba(255,255,255,0.45)'
                    }
                },
                /* Phase 1 — semantic aliases referencing CSS custom properties */
                surface: 'var(--bg)',
                'surface-2': 'var(--bg-2)',
                'panel': 'var(--panel)',
                'panel-2': 'var(--panel-2)',
                't-border': 'var(--border)',
                't-accent': 'var(--accent)',
                't-accent-soft': 'var(--accent-soft)',
                't-text': 'var(--text)',
                't-muted': 'var(--muted)',
            },
            borderRadius: {
                '3xl': '24px', // Card radius
            },
            boxShadow: {
                'soft': '0 10px 30px rgba(0,0,0,0.35)',
            },
            fontFamily: {
                sans: ['Inter', 'Cairo', 'sans-serif'], // Inter for EN, Cairo for AR
            }
        },
    },
    plugins: [],
}
