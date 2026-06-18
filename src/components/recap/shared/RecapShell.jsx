import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * RecapShell
 * Exported named components used by both Monthly.jsx and Yearly.jsx
 * for loading, error, and not-allowed states.
 *
 * Also exports the DOT_GRID style constant.
 *
 * RecapShell itself is NOT used as a wrapper component —
 * Monthly.jsx and Yearly.jsx each manage their own layout directly.
 * This file exists purely to share the three state screens.
 */

/* ── Loading ──────────────────────────────────────────────────── */
export const RecapLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <motion.div
            className="relative w-12 h-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        >
            <div className="absolute inset-0 rounded-full border-2 border-stone-800" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-400" />
        </motion.div>
        <motion.p
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-stone-600 text-[10px] font-poppins uppercase tracking-[0.25em]"
        >
            Building your recap…
        </motion.p>
    </div>
)

/* ── Error ────────────────────────────────────────────────────── */
export const RecapError = ({ message, onRetry }) => (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-6 text-center">
        <div className="w-10 h-10 rounded-full bg-rose-400/10 border border-rose-400/20 flex items-center justify-center">
            <span className="text-rose-400 text-lg font-poppins">!</span>
        </div>
        <p className="text-slate-400 font-poppins font-bold">Something went wrong</p>
        <p className="text-stone-600 text-sm max-w-xs">{message}</p>
        <button
            onClick={onRetry}
            className="mt-2 px-5 py-2 rounded-full border border-stone-700 text-stone-500 text-xs font-poppins uppercase tracking-widest hover:border-purple-400/30 hover:text-purple-300 transition-colors duration-200"
        >
            Try again
        </button>
    </div>
)

/* ── Not Allowed ──────────────────────────────────────────────── */
export const RecapNotAllowed = ({ navigate }) => {
    useEffect(() => {
        const t = setTimeout(() => navigate("/dashboard"), 3000)
        return () => clearTimeout(t)
    }, [navigate])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center">
                    <span className="text-stone-500 text-xl">🔒</span>
                </div>
                <p className="text-slate-400 font-poppins font-bold text-lg">
                    Recap not available
                </p>
                <p className="text-stone-600 text-sm max-w-xs leading-relaxed">
                    Recaps are only unlocked during the first 7 days of the following period.
                </p>
                <p className="text-stone-700 text-xs font-poppins">
                    Redirecting you back…
                </p>
            </motion.div>
        </div>
    )
}

/* ── Dot grid background style ────────────────────────────────── */
export const DOT_GRID = {
    backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
    backgroundSize: "32px 32px"
}