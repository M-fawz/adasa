import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Folder, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    return (
        /* Full hero section — inherits global .app-bg background from MainLayout.
           Only adds its own min-height and centering. */
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center py-20">

                {/* ── B) Welcome badge pill ── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8"
                    style={{
                        backgroundColor: 'var(--accent-soft)',
                        borderColor: 'rgba(255,122,24,0.25)',
                    }}
                >
                    {/* Two small orange dots inside the pill */}
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60" />
                    <span className="text-sm font-medium text-[var(--accent)]">
                        {t('hero.welcomeBadge')}
                    </span>
                </motion.div>

                {/* ── C) Main title — two lines, one accented word ── */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-[var(--text)] mb-6 max-w-4xl"
                >
                    {t('hero.titleLine1')}{' '}
                    <span className="text-[var(--accent)]">{t('hero.titleHighlight')}</span>
                    <br />
                    {t('hero.titleLine2')}
                </motion.h1>

                {/* ── D) Subtitle ── */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base md:text-lg text-[var(--muted)] mb-10 max-w-[600px] leading-relaxed"
                >
                    {t('hero.subtitle')}
                </motion.p>

                {/* ── E) CTA buttons ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-20"
                >
                    {/* Primary — orange filled pill */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:brightness-110 hover:shadow-xl"
                        style={{
                            backgroundColor: 'var(--accent)',
                            boxShadow: '0 8px 24px rgba(255,122,24,0.25)',
                        }}
                    >
                        {t('hero.primaryCta')}
                        {/* Arrow flips direction in RTL */}
                        <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Secondary — outline pill */}
                    <Link
                        to="/about"
                        className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-medium text-[var(--text)] transition-all duration-200 hover:bg-white/[0.05]"
                        style={{
                            border: '1px solid var(--border)',
                        }}
                    >
                        {t('hero.secondaryCta')}
                    </Link>
                </motion.div>

                {/* ── F) Stats row — 4 cards ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl"
                >
                    <StatsCard
                        icon={<Users />}
                        number={t('hero.stats.writers.value')}
                        label={t('hero.stats.writers.label')}
                    />
                    <StatsCard
                        icon={<Folder />}
                        number={t('hero.stats.categories.value')}
                        label={t('hero.stats.categories.label')}
                    />
                    <StatsCard
                        icon={<BookOpen />}
                        number={t('hero.stats.readers.value')}
                        label={t('hero.stats.readers.label')}
                    />
                    <StatsCard
                        icon={<FileText />}
                        number={t('hero.stats.articles.value')}
                        label={t('hero.stats.articles.label')}
                    />
                </motion.div>

            </div>
        </section>
    );
}

/* ── Stats card sub-component ──
   Uses CSS custom properties for panel/border/accent.
   Subtle hover: slight lift + accent border glow. */
function StatsCard({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) {
    return (
        <div
            className="flex flex-col items-center justify-center p-6 shadow-xl shadow-black/20 group transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30"
            style={{
                backgroundColor: 'var(--panel)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-card)',
            }}
        >
            <div className="mb-3 text-[var(--accent)] opacity-80 group-hover:opacity-100 transition-opacity">
                {icon}
            </div>
            <span className="text-2xl font-bold text-[var(--text)] mb-1">{number}</span>
            <span className="text-sm text-[var(--muted)]">{label}</span>
        </div>
    );
}
