import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router"
import { RiCalendarLine, RiArrowRightLine, RiSparklingLine } from "react-icons/ri"

/**
 * YearlyRecapBanner
 * Shown on Dashboard during the yearly recap window:
 * Jan 1-7 only — reviewing the previous year.
 * e.g. visible Jan 1-7 2027 → shows 2026 recap
 * Self-hides outside that window — just drop it in Dashboard, no conditions needed.
 */

const useYearlyRecapWindow = () => {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()   // 0 = January
    const year = now.getFullYear()

    if (month !== 0 || day > 7) return null

    return { recapYear: year - 1 }
}

const YearlyRecapBanner = () => {
    const navigate = useNavigate()
    const window = useYearlyRecapWindow()

    if (!window) return null

    const { recapYear } = window
    const go = () => navigate(`/recap/${recapYear}`)

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.button
                    onClick={go}
                    whileHover={{ scale: 1.012 }}
                    whileTap={{ scale: 0.985 }}
                    className="relative w-full overflow-hidden rounded-xl border border-amber-400/25 bg-stone-800/70 backdrop-blur-sm px-5 py-4 text-left cursor-pointer group transition-colors duration-300 hover:border-amber-400/45 hover:bg-stone-800/90"
                    style={{ boxShadow: "0 0 0 1px rgba(251,191,36,0.04) inset" }}
                >
                    {/* Hover glow */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(251,191,36,0.08) 0%, transparent 70%)" }}
                    />

                    {/* Drifting orb */}
                    <motion.div
                        className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-amber-400/5 pointer-events-none"
                        animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="relative flex items-center justify-between gap-4">

                        {/* Left */}
                        <div className="flex items-center gap-4">

                            {/* Pulsing icon */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    className="absolute inset-0 rounded-xl bg-amber-400/20"
                                    animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25">
                                    <RiCalendarLine size={20} className="text-amber-300" />
                                </div>
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-1.5">
                                    <RiSparklingLine size={11} className="text-amber-400" />
                                    <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] font-poppins">
                                        Year in Review
                                    </span>
                                </div>
                                <p className="text-slate-200 text-sm font-poppins font-bold leading-tight">
                                    Your {recapYear} Recap is ready
                                </p>
                                <p className="text-stone-500 text-xs leading-snug">
                                    A full year of listening — your story, your stats
                                </p>
                            </div>
                        </div>

                        {/* Right arrow */}
                        <motion.div
                            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300"
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <RiArrowRightLine size={14} />
                        </motion.div>
                    </div>

                    {/* Bottom shimmer */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileHover={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.button>
            </motion.div>
        </AnimatePresence>
    )
}

export default YearlyRecapBanner;