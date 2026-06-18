import { motion } from "framer-motion"

/**
 * RecapIntro
 * Opening cinematic slide before cards begin.
 * Works for both monthly and yearly.
 *
 * Props:
 *   title   — big display text  e.g. "May"  or "2026"
 *   subtitle — smaller below    e.g. "2026" or "Year in Review"
 *   tagline  — small copy       e.g. "A month's worth of listening..."
 *   onStart  — called when user clicks CTA
 */

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } }
}

const rise = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const RecapIntro = ({ title, subtitle, tagline, onStart }) => (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 text-center relative">

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 45% at 50% 58%, rgba(168,85,247,0.1) 0%, transparent 70%)" }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
            <motion.div key={i}
                className="absolute w-1 h-1 rounded-full bg-purple-400/30"
                style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 20}%` }}
                animate={{ y: [-8, 8, -8], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
        ))}

        <motion.div
            className="flex flex-col items-center gap-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
        >
            <motion.span variants={rise}
                className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.3em] font-poppins">
                Your Story
            </motion.span>

            <motion.h1 variants={rise}
                className="text-white font-poppins font-bold text-6xl md:text-8xl leading-none tracking-tight">
                {title}
            </motion.h1>

            <motion.p variants={rise} className="text-stone-600 font-poppins text-2xl -mt-2">
                {subtitle}
            </motion.p>

            <motion.div variants={rise} className="w-8 h-px bg-purple-400/30 my-2" />

            <motion.p variants={rise} className="text-slate-600 text-sm max-w-xs leading-relaxed">
                {tagline}
            </motion.p>

            <motion.button
                variants={rise}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStart}
                className="mt-6 px-8 py-3 rounded-full border border-purple-400/25 bg-purple-400/8 text-purple-300 font-poppins font-bold text-xs uppercase tracking-[0.2em] hover:bg-purple-400/15 transition-colors duration-200"
            >
                See your recap
            </motion.button>
        </motion.div>

        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="absolute bottom-8 text-stone-700 text-[10px] tracking-[0.2em] uppercase font-poppins"
        >
            ↑ ↓ or swipe to navigate
        </motion.span>
    </div>
)

export default RecapIntro;