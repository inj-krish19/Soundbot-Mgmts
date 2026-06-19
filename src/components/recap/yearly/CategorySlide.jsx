import { motion } from "framer-motion"
import { CATEGORY_PALETTE } from "./yearlycardConfig"

/**
 * CategorySlide
 * Full-viewport interstitial shown before each category's 4 cards.
 * Acts as a chapter title card.
 */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
}
const rise = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const CategorySlide = ({ category, categoryIndex, totalCategories, isActive }) => {
    const pal = CATEGORY_PALETTE[category.key] || CATEGORY_PALETTE.sound_story

    return (
        <motion.div
            className="flex flex-col justify-center items-center min-h-screen w-full px-6 text-center relative overflow-hidden"
            variants={stagger}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
        >
            {/* Category-colored ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 60% 50% at 50% 55%, ${pal.glow} 0%, transparent 70%)` }}
            />

            {/* Slow drifting ring */}
            <motion.div
                className={`absolute w-64 h-64 rounded-full border ${pal.border} pointer-events-none opacity-30`}
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className={`absolute w-96 h-96 rounded-full border ${pal.border} pointer-events-none opacity-15`}
                animate={{ rotate: -360 }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            />

            {/* Chapter eyebrow */}
            <motion.span variants={rise}
                className={`text-[10px] font-bold uppercase tracking-[0.28em] mb-5 font-poppins ${pal.accent}`}>
                Chapter {categoryIndex + 1} of {totalCategories}
            </motion.span>

            {/* Big emoji */}
            <motion.span variants={rise} className="text-6xl mb-5 select-none">
                {category.icon}
            </motion.span>

            {/* Category label */}
            <motion.h2 variants={rise}
                className="text-white font-poppins font-bold text-4xl md:text-5xl leading-tight max-w-lg mb-4">
                {category.label}
            </motion.h2>

            {/* Pill count */}
            <motion.span variants={rise}
                className={`text-xs px-4 py-1.5 rounded-full border font-poppins font-bold ${pal.pill}`}>
                {category.cards.length} highlights
            </motion.span>

            {/* Subtle bottom hint */}
            {/* <motion.span variants={rise}
                className="absolute bottom-10 text-stone-700 text-[10px] tracking-[0.2em] uppercase font-poppins">
                Swipe or press → to explore
            </motion.span> */}
        </motion.div>
    )
}

export default CategorySlide;