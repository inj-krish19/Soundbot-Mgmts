import { motion } from "framer-motion"
import { CARD_ICONS, CARD_ACCENT, CARD_BG_GLOW } from "./cardConfig"

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
}
const rise = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const CardExtra = ({ card }) => {
    const { key, meta } = card

    if (key === "active_days" && meta) {
        const r = 38, circ = 2 * Math.PI * r
        const dash = meta.consistency * circ
        return (
            <motion.div variants={rise} className="flex flex-col items-center gap-2 mt-6">
                <svg width="104" height="104" viewBox="0 0 104 104" className="-rotate-90">
                    <circle cx="52" cy="52" r={r} fill="none" stroke="#292524" strokeWidth="5" />
                    <motion.circle cx="52" cy="52" r={r} fill="none"
                        stroke="#c084fc" strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: circ - dash }}
                        transition={{ duration: 1.3, delay: 0.3, ease: "easeOut" }}
                    />
                </svg>
                <span className="text-purple-300 text-xs font-poppins -mt-2">
                    {meta.status} · {Math.round(meta.consistency * 100)}%
                </span>
            </motion.div>
        )
    }

    if (key === "longest_streak" && meta) {
        const count = Math.min(meta.streak, 13)
        return (
            <motion.div variants={rise} className="flex flex-col items-center gap-2 mt-6">
                <div className="flex items-end gap-1">
                    {Array.from({ length: count }).map((_, i) => (
                        <motion.div key={i} className="w-2 rounded-sm bg-orange-400/70"
                            initial={{ height: 0 }}
                            animate={{ height: 8 + (i / count) * 28 }}
                            transition={{ delay: 0.3 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                        />
                    ))}
                </div>
                <span className="text-orange-400/60 text-[10px] font-poppins uppercase tracking-widest mt-1">
                    streak days
                </span>
            </motion.div>
        )
    }

    if (key === "weekend_vs_weekday" && meta?.share) {
        return (
            <motion.div variants={rise} className="flex gap-3 mt-6">
                {[
                    { label: "Weekday", val: meta.share.weekday.toFixed(0), color: "text-teal-300", border: "border-teal-400/20", bar: "bg-teal-400/40" },
                    { label: "Weekend", val: meta.share.weekend.toFixed(0), color: "text-slate-400", border: "border-stone-700", bar: "bg-stone-600" },
                ].map(({ label, val, color, border, bar }) => (
                    <div key={label} className={`flex flex-col items-center gap-1.5 px-7 py-4 rounded-2xl bg-stone-800/80 border ${border}`}>
                        <span className={`font-poppins font-bold text-2xl ${color}`}>{val}%</span>
                        <span className="text-stone-500 text-[10px] uppercase tracking-widest">{label}</span>
                        <motion.div className={`w-full h-0.5 rounded-full mt-1 ${bar}`}
                            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                            style={{ originX: 0 }}
                        />
                    </div>
                ))}
            </motion.div>
        )
    }

    if (key === "vs_last_month" && meta) {
        const isUp = meta.direction === "up"
        const isDown = meta.direction === "down"
        const bar = isUp ? "bg-emerald-400" : isDown ? "bg-rose-400" : "bg-stone-500"
        const fill = Math.min((meta.trend / 50) * 100, 100)
        return (
            <motion.div variants={rise} className="flex flex-col items-center gap-2 mt-6 w-52">
                <div className="w-full h-1.5 rounded-full bg-stone-800">
                    <motion.div className={`h-full rounded-full ${bar}`}
                        initial={{ width: 0 }} animate={{ width: `${fill}%` }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    />
                </div>
                <span className="text-stone-600 text-[10px] font-poppins">
                    {meta.trend}% change from previous month
                </span>
            </motion.div>
        )
    }

    if (key === "daily_average" && meta) {
        return (
            <motion.div variants={rise}
                className="mt-6 px-5 py-2.5 rounded-full bg-emerald-400/8 border border-emerald-400/20">
                <span className="text-emerald-300 font-poppins text-sm">{meta.details} / day</span>
            </motion.div>
        )
    }

    if (key === "personal_best_day" && meta) {
        return (
            <motion.div variants={rise} className="mt-6 flex flex-col items-center gap-1">
                <span className="text-yellow-400/50 text-[10px] uppercase tracking-widest font-poppins">Best session</span>
                <span className="text-yellow-300 font-poppins font-bold text-lg">
                    {new Date(meta.date).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })}
                </span>
            </motion.div>
        )
    }

    if (key === "total_listening_time" && meta) {
        return (
            <motion.div variants={rise} className="flex gap-3 mt-6">
                {[["hrs", meta.hours], ["mins", meta.minutes]].map(([unit, val]) => (
                    <div key={unit} className="flex flex-col items-center px-5 py-3 rounded-xl bg-stone-800/60 border border-purple-400/15">
                        <span className="text-purple-300 font-poppins font-bold text-xl">{val}</span>
                        <span className="text-stone-600 text-[10px] uppercase tracking-widest">{unit}</span>
                    </div>
                ))}
            </motion.div>
        )
    }

    if (key === "peak_hour" && meta) {
        return (
            <motion.div variants={rise}
                className="mt-6 px-6 py-2.5 rounded-full bg-cyan-400/8 border border-cyan-400/20">
                <span className="text-cyan-300 font-poppins text-sm">{meta["12hf"]} every night</span>
            </motion.div>
        )
    }

    return null
}

const Headline = ({ card }) => {
    const { key, headline, meta } = card
    if (key === "vs_last_month") {
        const isUp = meta?.direction === "up"
        const isDown = meta?.direction === "down"
        const color = isUp ? "text-emerald-400" : isDown ? "text-rose-400" : "text-slate-400"
        return <span className={color}>{headline}</span>
    }
    return <>{headline}</>
}

const StatCard = ({ card, isActive }) => {
    const Icon = CARD_ICONS[card.key]
    const accent = CARD_ACCENT[card.key] || "text-purple-400"
    const glow = CARD_BG_GLOW[card.key] || "rgba(168,85,247,0.06)"

    return (
        <motion.div
            className="flex flex-col justify-center items-center min-h-screen w-full px-6 py-20 text-center relative"
            variants={stagger} initial="hidden" animate={isActive ? "visible" : "hidden"}
        >
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 55% 45% at 50% 58%, ${glow} 0%, transparent 70%)` }}
            />

            <motion.span variants={rise}
                className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.28em] mb-5 font-poppins">
                {String(card.id).padStart(2, "0")} — 09
            </motion.span>

            {Icon && (
                <motion.div variants={rise} className="mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-stone-800/80 border border-stone-700">
                        <Icon size={22} className={accent} />
                    </div>
                </motion.div>
            )}

            <motion.h2 variants={rise}
                className="text-white font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl">
                <Headline card={card} />
            </motion.h2>

            <motion.div variants={rise} className="w-10 h-px bg-purple-400/30 my-5" />

            <motion.p variants={rise}
                className="text-slate-500 text-sm md:text-base max-w-sm leading-relaxed">
                {card.text}
            </motion.p>

            <CardExtra card={card} />
        </motion.div>
    )
}

export default StatCard;