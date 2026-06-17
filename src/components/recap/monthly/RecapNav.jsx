import { motion, AnimatePresence } from "framer-motion"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"

const RecapNav = ({ currentCard, totalCards, onPrev, onNext }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.45 }}
        className="fixed bottom-7 left-0 right-0 z-50 flex items-center justify-center gap-5"
    >
        <AnimatePresence>
            {currentCard > 0 && (
                <motion.button key="prev"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                    onClick={onPrev}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-800/80 border border-stone-700 text-slate-500 hover:text-slate-200 hover:border-purple-400/40 backdrop-blur-sm transition-colors duration-200"
                >
                    <RiArrowLeftLine size={16} />
                </motion.button>
            )}
        </AnimatePresence>

        <span className="text-stone-600 text-[11px] font-poppins tabular-nums w-12 text-center">
            {currentCard + 1} / {totalCards}
        </span>

        <AnimatePresence>
            {currentCard < totalCards - 1 && (
                <motion.button key="next"
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                    onClick={onNext}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-400/12 border border-purple-400/30 text-purple-300 hover:bg-purple-400/22 backdrop-blur-sm transition-colors duration-200"
                >
                    <RiArrowRightLine size={16} />
                </motion.button>
            )}
        </AnimatePresence>
    </motion.div>
)

export default RecapNav;