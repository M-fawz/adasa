import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { ArrowRight, BookOpen, FileText, Folder, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
    const { i18n } = useTranslation();
    const isRrtl = i18n.dir() === 'rtl';

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center bg-[#0B0B0B] overflow-hidden">
            {/* Background Grid Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Radial Glow from Left */}
            <div className="absolute left-[-10%] top-[20%] w-[30vw] h-[30vw] bg-[#F05A00] opacity-10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">

                {/* Top Small Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
                    style={{
                        backgroundColor: 'rgba(255,122,0,0.08)',
                        borderColor: 'rgba(255,122,0,0.25)',
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00]" />
                    <span className="text-sm font-medium text-[#ff7a00]">
                        مرحباً بك في عدسة
                    </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-white mb-6 max-w-4xl"
                >
                    اكتشف <span className="text-[#F05A00]">فن</span>
                    <br />
                    التصوير الفوتوغرافي
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-[18px] text-[rgba(255,255,255,0.7)] mb-10 max-w-[600px] leading-relaxed"
                >
                    انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-20"
                >
                    <Button
                        size="lg"
                        className="rounded-full px-8 py-6 text-base bg-[#ff7a00] hover:bg-[#ff8a20] border-none text-white shadow-lg shadow-orange-900/20"
                    >
                        استكشف المقالات
                        <ArrowRight className={`w-5 h-5 ${isRrtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-10 py-6 text-base bg-transparent border-[rgba(255,255,255,0.15)] text-white hover:bg-white/5 hover:text-white"
                    >
                        اعرف المزيد
                    </Button>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl"
                >
                    <StatsCard icon={<Users />} number="6" label="كاتب" />
                    <StatsCard icon={<Folder />} number="4" label="تصنيفات" />
                    <StatsCard icon={<BookOpen />} number="10+" label="ألف قارئ" />
                    <StatsCard icon={<FileText />} number="50+" label="مقالة" />
                </motion.div>

            </div>
        </section>
    );
}

function StatsCard({ icon, number, label }: { icon: React.ReactNode, number: string, label: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-[18px] border bg-[#141414] border-[rgba(255,255,255,0.06)] shadow-xl shadow-black/20 group hover:border-[#ff7a00]/30 transition-colors">
            <div className="mb-3 text-[#ff7a00] opacity-80 group-hover:opacity-100 transition-opacity">
                {icon}
            </div>
            <span className="text-2xl font-bold text-white mb-1">{number}</span>
            <span className="text-sm text-[rgba(255,255,255,0.45)]">{label}</span>
        </div>
    );
}
