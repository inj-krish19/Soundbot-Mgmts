import { motion } from "framer-motion"

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } }
}
const rise = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const TAG_CONFIG = {
    listening: { label: "Listening Style", color: "text-purple-300 border-purple-400/30 bg-purple-400/10" },
    persona: { label: "Time of Day", color: "text-cyan-300   border-cyan-400/30   bg-cyan-400/10" },
    consistency: { label: "Consistency", color: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10" },
    weekend: { label: "Weekend Style", color: "text-teal-300   border-teal-400/30   bg-teal-400/10" },
}


const redirectDashboard = () => {
    window.location.href = '/dashboard';
}


const ClosingCard = ({ card, isActive }) => {
    const { meta, headline, text } = card
    const tag = meta?.tag || "Unknown"
    const chips = Object.entries(TAG_CONFIG)
        .filter(([k]) => meta?.[k])
        .map(([k, cfg]) => ({ value: meta[k], ...cfg }))

    return (
        <motion.div
            className="flex flex-col justify-center items-center min-h-screen w-full px-6 py-20 text-center relative overflow-hidden"
            variants={stagger} initial="hidden" animate={isActive ? "visible" : "hidden"}
        >
            <motion.div className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                style={{ background: "radial-gradient(ellipse 65% 55% at 50% 62%, rgba(147,51,234,0.15) 0%, rgba(88,28,135,0.08) 40%, transparent 70%)" }}
            />

            {[
                { size: "w-72 h-72", dur: 28, dir: 1 },
                { size: "w-96 h-96", dur: 40, dir: -1 },
            ].map((r, i) => (
                <motion.div key={i}
                    className={`absolute ${r.size} rounded-full border border-purple-400/8 pointer-events-none`}
                    animate={{ rotate: 360 * r.dir }}
                    transition={{ duration: r.dur, repeat: Infinity, ease: "linear" }}
                />
            ))}

            <motion.span variants={rise}
                className="text-purple-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-7 font-poppins">
                Your Monthly Personality
            </motion.span>

            <motion.div variants={rise} className="flex flex-wrap gap-2 justify-center mb-6">
                {chips.map((chip, i) => (
                    <span key={i}
                        className={`text-[10px] px-3 py-1 rounded-full border font-poppins font-bold ${chip.color}`}>
                        {chip.value}
                    </span>
                ))}
            </motion.div>

            <motion.span variants={rise} className="text-stone-700 text-xl font-poppins mb-5">
                =
            </motion.span>

            <motion.h1 variants={rise}
                className="text-purple-300 font-poppins font-bold text-5xl md:text-6xl lg:text-7xl leading-tight max-w-3xl mb-5">
                {tag}
            </motion.h1>

            <motion.p variants={rise}
                className="text-slate-300 text-base md:text-lg font-poppins mb-4 max-w-md">
                {headline}
            </motion.p>

            <motion.div variants={rise} className="w-12 h-px bg-purple-400/25 mb-5" />

            <motion.p variants={rise}
                className="text-stone-600 text-sm max-w-sm leading-relaxed">
                {text}
            </motion.p>

            <motion.button
                variants={rise}
                whileHover={{ scale: 1.04, borderColor: "rgba(192,132,252,0.6)" }}
                whileTap={{ scale: 0.97 }}
                onClick={redirectDashboard}
                className="mt-6 px-8 py-3 rounded-full border border-purple-400/25 bg-purple-400/8 text-purple-300 font-poppins font-bold text-xs uppercase tracking-[0.2em] hover:bg-purple-400/15 transition-colors duration-200"
            >
                Redirect to Dashboard
            </motion.button>

            <motion.span variants={rise}
                className="absolute bottom-8 text-stone-800 text-[10px] tracking-[0.22em] uppercase font-poppins">
                Soundbot · Monthly Recap
            </motion.span>
        </motion.div>
    )
}

export default ClosingCard;