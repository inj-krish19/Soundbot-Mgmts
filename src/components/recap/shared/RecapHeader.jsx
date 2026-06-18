import { motion } from "framer-motion"

/**
 * RecapHeader
 * Fixed top bar with animated progress pills.
 * Works for both monthly and yearly.
 *
 * Props:
 *   label       — string shown as subtitle e.g. "May 2026 · Recap" or "Your Sound Story · 2026"
 *   currentCard — 0-indexed current slide
 *   totalCards  — total number of slides
 */
const RecapHeader = ({ label, currentCard, totalCards }) => (
    <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{ background: "linear-gradient(to bottom,rgba(12,10,9,0.96) 0%,transparent 100%)" }}
    >
        <div className="flex flex-col leading-tight">
            <span className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.22em] font-poppins">
                Soundbot
            </span>
            <span className="text-slate-300 text-xs font-poppins">{label}</span>
        </div>

        <div className="flex items-center gap-1.5">
            {Array.from({ length: totalCards }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        width: i === currentCard ? 18 : 5,
                        opacity: i === currentCard ? 1 : i < currentCard ? 0.45 : 0.18,
                        backgroundColor: i === currentCard ? "#c084fc" : i < currentCard ? "#7c3aed" : "#44403c",
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-1.5 rounded-full"
                />
            ))}
        </div>
    </motion.div>
)

export default RecapHeader;