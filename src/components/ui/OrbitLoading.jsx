import { motion } from 'framer-motion'
import { IoIosMusicalNote } from "react-icons/io";

function OrbitLoading() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="relative size-16">
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-indigo-500"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <IoIosMusicalNote size={32} />
                </motion.div>

                <motion.div
                    className="absolute inset-0 border-2 border-dashed border-purple-400/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                    className="absolute inset-2 border border-indigo-400/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-indigo-400 text-xs font-inter font-bold"
            >
                Generating Analytics...
            </motion.p>
        </div>
    );
}

export default OrbitLoading;
