import { motion } from 'framer-motion';
import { FaChartBar, FaWaveSquare } from 'react-icons/fa';

function ChartLoading() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-4 py-10">
            <div className="relative flex items-center justify-center">
                <motion.div
                    className="absolute size-12 bg-indigo-500/10 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="flex items-end gap-1 h-8 mb-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 bg-indigo-400 rounded-full"
                            animate={{ height: ["20%", "80%", "30%", "100%", "20%"] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center gap-1">
                <span className="text-purple-500 text-sm font-bold font-inter">
                    Generating Analytics...
                </span>
                <motion.div
                    className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-24 rounded-full"
                    animate={{ x: [-40, 40] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                />
            </div>
        </div>
    );
}

export default ChartLoading;
