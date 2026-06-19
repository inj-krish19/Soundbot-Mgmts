import { motion } from "framer-motion"
import { CARD_META, CATEGORY_PALETTE } from "./yearlycardConfig"

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
}
const rise = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

/* ── extra visuals per card key ────────────────────────────────── */
const CardExtra = ({ card, pal }) => {
    const { key, meta } = card

    /* active_days — ring */
    if (key === "active_days" && meta) {
        const r = 38, circ = 2 * Math.PI * r
        const dash = meta.consistency * circ
        return (
            <motion.div variants={rise} className="flex flex-col items-center gap-2 mt-6">
                <svg width="104" height="104" viewBox="0 0 104 104" className="-rotate-90">
                    <circle cx="52" cy="52" r={r} fill="none" stroke="#292524" strokeWidth="5" />
                    <motion.circle cx="52" cy="52" r={r} fill="none"
                        stroke={pal.barColor} strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: circ - dash }}
                        transition={{ duration: 1.3, delay: 0.3, ease: "easeOut" }}
                    />
                </svg>
                <span className={`text-xs font-poppins -mt-2 ${pal.accent}`}>
                    {meta.status} · {Math.round(meta.consistency * 100)}%
                </span>
            </motion.div>
        )
    }

    /* longest_streak — bars */
    if (key === "longest_streak" && meta) {
        const count = Math.min(meta.streak, 24)
        return (
            <motion.div variants={rise} className="flex flex-col items-center gap-2 mt-6">
                <div className="flex items-end gap-0.5">
                    {Array.from({ length: count }).map((_, i) => (
                        <motion.div key={i}
                            className="w-1.5 rounded-sm"
                            style={{ backgroundColor: pal.barColor + "99" }}
                            initial={{ height: 0 }}
                            animate={{ height: 6 + (i / count) * 26 }}
                            transition={{ delay: 0.25 + i * 0.03, duration: 0.35, ease: "easeOut" }}
                        />
                    ))}
                </div>
                <span className="text-[10px] font-poppins uppercase tracking-widest mt-1"
                    style={{ color: pal.barColor + "80" }}>
                    streak days
                </span>
            </motion.div>
        )
    }

    /* total_listening_time — hrs/mins split */
    if (key === "total_listening_time" && meta) {
        return (
            <motion.div variants={rise} className="flex gap-3 mt-6">
                {[["hrs", meta.hours], ["mins", meta.minutes]].map(([unit, val]) => (
                    <div key={unit}
                        className={`flex flex-col items-center px-6 py-3 rounded-xl bg-stone-800/60 border ${pal.border}`}>
                        <span className={`font-poppins font-bold text-2xl ${pal.accent}`}>{val}</span>
                        <span className="text-stone-600 text-[10px] uppercase tracking-widest">{unit}</span>
                    </div>
                ))}
            </motion.div>
        )
    }

    /* total_sessions — big centered number */
    if (key === "total_sessions" && meta) {
        return (
            <motion.div variants={rise}
                className={`mt-6 px-6 py-3 rounded-xl bg-stone-800/60 border ${pal.border}`}>
                <span className={`font-poppins font-bold text-3xl ${pal.accent}`}>{meta.total}</span>
                <span className="text-stone-600 text-xs ml-2 uppercase tracking-widest">sessions</span>
            </motion.div>
        )
    }

    /* peak_hour / favorite_time_of_day — pill */
    if ((key === "peak_hour" || key === "favorite_time_of_day") && meta) {
        const label = key === "peak_hour" ? `${meta["12hf"]} every night` : meta.division || meta.divison
        return (
            <motion.div variants={rise}
                className={`mt-6 px-5 py-2 rounded-full border ${pal.border} ${pal.bg}`}>
                <span className={`font-poppins text-sm ${pal.accent}`}>{label}</span>
            </motion.div>
        )
    }

    /* biggest_spike_day / shortest_session — date badge */
    if ((key === "biggest_spike_day" || key === "shortest_session") && meta) {
        return (
            <motion.div variants={rise} className="flex flex-col items-center gap-1 mt-6">
                <span className={`text-[10px] uppercase tracking-widest font-poppins ${pal.accent} opacity-50`}>
                    {key === "biggest_spike_day" ? "Peak session" : "Shortest session"}
                </span>
                <span className={`font-poppins font-bold text-lg ${pal.accent}`}>{meta.details}</span>
            </motion.div>
        )
    }

    /* go_to_player / most_used_device — name badge */
    if ((key === "go_to_player" || key === "most_used_device") && meta) {
        const name = key === "go_to_player" ? meta.player?.nickname : meta.device?.nickname
        const sub = key === "go_to_player" ? meta.player?.company : meta.device?.company
        const type = key === "go_to_player" ? meta.player?.type : meta.device?.type
        return (
            <motion.div variants={rise}
                className={`mt-6 flex flex-col items-center gap-1 px-6 py-3 rounded-xl bg-stone-800/60 border ${pal.border}`}>
                <span className={`font-poppins font-bold text-xl ${pal.accent}`}>{name}</span>
                <span className="text-stone-600 text-xs">{sub} · {type}</span>
            </motion.div>
        )
    }

    /* total_chargings / battery_recoup — simple pill */
    if ((key === "total_chargings" || key === "battery_recoup") && meta) {
        const label = key === "total_chargings"
            ? `${meta.count} charging sessions`
            : `${meta.recoup}× usage on each charge`
        return (
            <motion.div variants={rise}
                className={`mt-6 px-5 py-2 rounded-full border ${pal.border} ${pal.bg}`}>
                <span className={`font-poppins text-sm ${pal.accent}`}>{label}</span>
            </motion.div>
        )
    }

    /* biggest_month / quitest_month */
    if ((key === "biggest_month" || key === "quitest_month") && meta) {
        return (
            <motion.div variants={rise}
                className={`mt-6 px-6 py-3 rounded-xl bg-stone-800/60 border ${pal.border} flex flex-col items-center gap-1`}>
                <span className={`font-poppins font-bold text-2xl ${pal.accent}`}>{meta.monthname}</span>
                <span className="text-stone-600 text-xs">{meta.hours} hrs {meta.minutes} mins</span>
            </motion.div>
        )
    }

    /* best_quarter — seasonal tag */
    if (key === "best_quarter" && meta) {
        return (
            <motion.div variants={rise}
                className={`mt-6 px-5 py-2 rounded-full border ${pal.border} ${pal.bg}`}>
                <span className={`font-poppins text-sm ${pal.accent}`}>{meta.tag}</span>
            </motion.div>
        )
    }

    /* quarter_wise_comparison — 4 mini bars */
    if (key === "quarter_wise_comparison" && meta) {
        const labels = ["Q1", "Q2", "Q3", "Q4"]
        const max = Math.max(...meta.hours)
        return (
            <motion.div variants={rise} className="flex gap-3 mt-6">
                {meta.hours.map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="relative w-8 h-16 flex items-end justify-center bg-stone-800/60 rounded-lg overflow-hidden">
                            <motion.div
                                className="w-full rounded-lg"
                                style={{ backgroundColor: pal.barColor + (h === max ? "cc" : "44") }}
                                initial={{ height: 0 }}
                                animate={{ height: max > 0 ? `${(h / max) * 100}%` : "4px" }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                            />
                        </div>
                        <span className="text-[10px] font-poppins text-stone-600">{labels[i]}</span>
                        <span className={`text-[10px] font-poppins font-bold ${pal.accent}`}>{h}h</span>
                    </div>
                ))}
            </motion.div>
        )
    }

    /* vs_last_year — trend bar */
    if (key === "vs_last_year" && meta) {
        const isPos = meta.growth !== "negative"
        const color = isPos ? "bg-emerald-400" : "bg-rose-400"
        const pct = Math.min((meta.difference / Math.max(meta.hours.last, meta.hours.this, 1)) * 100, 100)
        return (
            <motion.div variants={rise} className="flex flex-col items-center gap-2 mt-6 w-52">
                <div className="flex justify-between w-full text-[10px] font-poppins text-stone-600">
                    <span>2025 · {meta.hours?.last}h</span>
                    <span>2026 · {meta.hours?.this}h</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-stone-800">
                    <motion.div className={`h-full rounded-full ${color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    />
                </div>
                <span className="text-stone-600 text-[10px] font-poppins">{meta.difference} hrs difference</span>
            </motion.div>
        )
    }

    /* device_loyalty_score — arc/bar */
    if (key === "device_loyalty_score" && meta) {
        const r = 38, circ = 2 * Math.PI * r
        const dash = (meta.share / 100) * circ
        return (
            <motion.div variants={rise} className="flex flex-col items-center gap-2 mt-6">
                <svg width="104" height="104" viewBox="0 0 104 104" className="-rotate-90">
                    <circle cx="52" cy="52" r={r} fill="none" stroke="#292524" strokeWidth="5" />
                    <motion.circle cx="52" cy="52" r={r} fill="none"
                        stroke={pal.barColor} strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: circ - dash }}
                        transition={{ duration: 1.3, delay: 0.3, ease: "easeOut" }}
                    />
                </svg>
                <span className={`text-xs font-poppins -mt-2 ${pal.accent}`}>
                    {meta.share}% on {meta.device?.nickname}
                </span>
            </motion.div>
        )
    }

    /* listening_personality */
    if (key === "listening_personality" && meta) {
        return (
            <motion.div variants={rise}
                className={`mt-6 px-5 py-2 rounded-full border ${pal.border} ${pal.bg}`}>
                <span className={`font-poppins text-sm ${pal.accent}`}>{meta.tag}</span>
            </motion.div>
        )
    }

    /* top_user_rank — tier badge */
    if (key === "top_user_rank" && meta) {
        return (
            <motion.div variants={rise} className="flex flex-col items-center gap-2 mt-6">
                <motion.span
                    className="text-5xl select-none"
                    animate={{ scale: [1, 1.12, 1], rotate: [-3, 3, -3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    🥇
                </motion.span>
                <span className={`text-xs font-poppins font-bold px-4 py-1 rounded-full border ${pal.border} ${pal.accent}`}>
                    {meta.tier} · Rank #{meta.rank}
                </span>
            </motion.div>
        )
    }

    return null
}

/* ── headline color splits ──────────────────────────────────────── */
const Headline = ({ card, pal }) => {
    const { key, headline, meta } = card
    if (key === "vs_last_year") {
        const isPos = meta?.growth !== "negative"
        const color = isPos ? "text-emerald-400" : "text-rose-400"
        return <span className={color}>{headline}</span>
    }
    return <>{headline}</>
}

/* ── main ────────────────────────────────────────────────────────── */
const YearlyStatCard = ({ card, categoryKey, cardIndexInCategory, totalInCategory, isActive }) => {
    const cm = CARD_META[card.key] || {}
    const pal = CATEGORY_PALETTE[categoryKey] || CATEGORY_PALETTE.sound_story
    const Icon = cm.Icon

    return (
        <motion.div
            className="flex flex-col justify-center items-center min-h-screen w-full px-6 py-20 text-center relative"
            variants={stagger}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
        >
            {/* Card glow uses per-card color */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 55% 45% at 50% 58%, ${cm.glow || pal.glow} 0%, transparent 70%)` }}
            />

            {/* Eyebrow — shows card position within category */}
            <motion.span variants={rise}
                className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.28em] mb-5 font-poppins">
                {String(cardIndexInCategory + 1).padStart(2, "0")} — {String(totalInCategory).padStart(2, "0")}
            </motion.span>

            {/* Icon chip */}
            {Icon && (
                <motion.div variants={rise} className="mb-6">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-stone-800/80 border ${pal.border}`}>
                        <Icon size={22} className={cm.accent} />
                    </div>
                </motion.div>
            )}

            {/* Headline */}
            <motion.h2 variants={rise}
                className="text-white font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl">
                <Headline card={card} pal={pal} />
            </motion.h2>

            <motion.div variants={rise} className={`w-10 h-px my-5`}
                style={{ backgroundColor: pal.barColor + "50" }} />

            <motion.p variants={rise}
                className="text-slate-500 text-sm md:text-base max-w-sm leading-relaxed">
                {card.text}
            </motion.p>

            <CardExtra card={card} pal={pal} />
        </motion.div>
    )
}

export { CATEGORY_PALETTE };
export default YearlyStatCard;