import { motion } from 'framer-motion';
import { SiSession } from "react-icons/si";

function SessionLoading() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-4 py-10">
            <div className="flex items-center justify-center gap-4 bg-violet-500/5 px-6 py-3 rounded-full border border-violet-500/10 ">
                <motion.div
                    animate={{ rotate: [0, -15, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-violet-500 text-2xl"
                >
                    <SiSession />
                </motion.div>
                <div className="flex gap-1">
                    {[0, 1, 2, 3].map((dot) => (
                        <motion.div
                            key={dot}
                            className="size-1.5 rounded-full bg-purple-400"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.2 }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center gap-1">
                <span className="text-purple-500 text-sm font-bold font-poppins">
                    Generating Analytics...
                </span><div className="flex gap-2">
                    <div className="h-1 w-16 rounded-full bg-emerald-400/20 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-sky-500"
                            animate={{ x: [-64, 64] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionLoading;
