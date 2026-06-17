import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router"
import { RiHeadphoneLine, RiArrowRightLine, RiSparklingLine } from "react-icons/ri"

/**
 * RecapBanner
 * Shown on Dashboard during the recap window:
 * first 7 days of the month following the recap month.
 *
 * e.g. May recap → visible June 1-7
 */

const useRecapWindow = () => {
    const now = new Date()
    const day = now.getDate()          // 1-31
    const month = now.getMonth()         // 0-indexed current month
    const year = now.getFullYear()

    // Recap is for the PREVIOUS month, available days 1-7 of current month
    if (day > 7) return null

    const recapMonth = month === 0 ? 12 : month          // previous month (1-indexed)
    const recapYear = month === 0 ? year - 1 : year

    return { recapMonth, recapYear }
}

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

const RecapBanner = () => {
    const navigate = useNavigate()
    const window = useRecapWindow()

    // Outside recap window — render nothing
    if (!window) return null

    const { recapMonth, recapYear } = window
    const monthName = MONTH_NAMES[recapMonth - 1]

    const go = () => navigate(`/recap/monthly/${recapYear}/${recapMonth}`)

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
                    className="relative w-full overflow-hidden rounded-xl border border-purple-400/25 bg-stone-800/70 backdrop-blur-sm px-5 py-4 text-left cursor-pointer group transition-colors duration-300 hover:border-purple-400/45 hover:bg-stone-800/90"
                    style={{ boxShadow: "0 0 0 1px rgba(168,85,247,0.04) inset" }}
                >
                    {/* Ambient glow that intensifies on hover */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(168,85,247,0.1) 0%, transparent 70%)" }}
                    />

                    {/* Slow drifting orb — purely decorative */}
                    <motion.div
                        className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-purple-500/5 pointer-events-none"
                        animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="relative flex items-center justify-between gap-4">

                        {/* Left: icon + text */}
                        <div className="flex items-center gap-4">

                            {/* Pulsing icon chip */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    className="absolute inset-0 rounded-xl bg-purple-400/20"
                                    animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-purple-400/12 border border-purple-400/25">
                                    <RiHeadphoneLine size={20} className="text-purple-300" />
                                </div>
                            </div>

                            {/* Text block */}
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-1.5">
                                    <RiSparklingLine size={11} className="text-purple-400" />
                                    <span className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] font-poppins">
                                        New
                                    </span>
                                </div>
                                <p className="text-slate-200 text-sm font-poppins font-bold leading-tight">
                                    Your {monthName} Recap is ready
                                </p>
                                <p className="text-stone-500 text-xs leading-snug">
                                    See how you listened in {monthName} {recapYear}
                                </p>
                            </div>
                        </div>

                        {/* Right: arrow */}
                        <motion.div
                            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-purple-400/10 border border-purple-400/20 text-purple-300"
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <RiArrowRightLine size={14} />
                        </motion.div>
                    </div>

                    {/* Bottom shimmer sweep on hover */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileHover={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.button>
            </motion.div>
        </AnimatePresence>
    )
}

export default RecapBanner;