import { useState, useEffect } from 'react';
import { getSVGByPlayerType } from '@/utils/getSVG';
import { motion, AnimatePresence } from 'framer-motion';

const players = ['earbud', 'earphone', 'headphone'];

const stageVariants = {
    initial: { opacity: 0, scale: 0.5, rotate: -10 },
    animate: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        rotate: 10,
        transition: { duration: 0.3 }
    }
};

const ringVariants = {
    animate: (i) => ({
        scale: [1, 2.2],
        opacity: [0.5, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
        }
    })
};

function PlayerLoading() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % players.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px]">
            <div className="relative flex items-center justify-center size-32">
                <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-2xl" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={players[index]}
                        variants={stageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                variants={ringVariants}
                                animate="animate"
                                custom={i}
                                className="absolute size-full border-2 border-violet-500/30 rounded-full"
                            />
                        ))}

                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-purple-400 text-2xl z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        >
                            {getSVGByPlayerType(players[index], 'text-purple-500')}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <span className="text-purple-500 text-sm font-bold font-poppins">
                Generating Analytics...
            </span>
        </div>
    );
}

export default PlayerLoading;
