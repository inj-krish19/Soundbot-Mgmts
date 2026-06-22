import { motion } from "framer-motion"

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } }
}
const rise = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const YearlyClosingCard = ({ personality, year, isActive }) => {
    const { tag, headline, text } = personality || {}

    return (
        <motion.div
            className="flex flex-col justify-center items-center min-h-screen w-full px-6 py-20 text-center relative overflow-hidden"
            variants={stagger}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
        >
            {/* ── Deep cinematic radial glow — layered for depth ── */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                    background: [
                        "radial-gradient(ellipse 80% 60% at 50% 65%, rgba(147,51,234,0.22) 0%, transparent 60%)",
                        "radial-gradient(ellipse 50% 40% at 50% 55%, rgba(168,85,247,0.14) 0%, transparent 50%)",
                        "radial-gradient(ellipse 100% 80% at 50% 80%, rgba(88,28,135,0.10) 0%, transparent 70%)",
                    ].join(", ")
                }}
            />

            {/* ── Rings — pure CSS border using rgba purple, BEHIND content via z-index ── */}
            {[
                { w: 260, dur: 28, dir: 1, opacity: 0.12 },
                { w: 380, dur: 40, dir: -1, opacity: 0.08 },
                { w: 520, dur: 58, dir: 1, opacity: 0.05 },
            ].map((r, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: r.w,
                        height: r.w,
                        border: `1px solid rgba(192,132,252,${r.opacity})`,
                        zIndex: 0,
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={isActive
                        ? { opacity: 1, scale: 1, rotate: 360 * r.dir }
                        : { opacity: 0 }
                    }
                    transition={{
                        opacity: { duration: 1.2, delay: i * 0.2 },
                        scale: { duration: 1.2, delay: i * 0.2 },
                        rotate: { duration: r.dur, repeat: Infinity, ease: "linear" },
                    }}
                />
            ))}

            {/* ── Soft particle dots floating in bg ── */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`dot-${i}`}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: i % 3 === 0 ? 3 : 2,
                        height: i % 3 === 0 ? 3 : 2,
                        backgroundColor: `rgba(216,180,254,${0.15 + (i % 3) * 0.08})`,
                        left: `${10 + i * 11}%`,
                        top: `${15 + (i % 4) * 18}%`,
                        zIndex: 0,
                    }}
                    animate={{ y: [-6, 6, -6], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
                />
            ))}

            {/* ── All text content — z-10 so it sits above rings ── */}
            <div className="relative z-10 flex flex-col items-center">

                <motion.span variants={rise}
                    className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-7 font-poppins">
                    Your {year} Personality
                </motion.span>

                {/* Decorative divider */}
                <motion.span variants={rise}
                    className="text-purple-400/40 text-2xl mb-5 select-none tracking-[0.5em]">
                    ✦ ✦ ✦
                </motion.span>

                {/* THE moment — personality name */}
                <motion.h1 variants={rise}
                    className="text-purple-300 font-poppins font-bold text-5xl md:text-6xl lg:text-7xl leading-tight max-w-3xl mb-6"
                    style={{ textShadow: "0 0 60px rgba(168,85,247,0.35), 0 0 120px rgba(147,51,234,0.15)" }}
                >
                    {tag}
                </motion.h1>

                {/* Headline */}
                <motion.p variants={rise}
                    className="text-slate-200 text-base md:text-xl font-poppins mb-5 max-w-md leading-snug">
                    {headline}
                </motion.p>

                {/* Divider line */}
                <motion.div variants={rise}
                    className="w-16 h-px mb-5"
                    style={{ background: "linear-gradient(to right, transparent, rgba(192,132,252,0.5), transparent)" }}
                />

                {/* Subtext */}
                <motion.p variants={rise}
                    className="text-stone-500 text-sm max-w-sm leading-relaxed">
                    {text}
                </motion.p>
            </div>

            {/* ── Footer stamp — also above rings ── */}
            {/* <motion.span
                variants={rise}
                className="absolute bottom-8 text-stone-700 text-[10px] tracking-[0.22em] uppercase font-poppins z-10">
                Soundbot · {year} Year in Review
            </motion.span> */}
        </motion.div>
    )
}

export default YearlyClosingCard;