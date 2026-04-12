import { motion } from 'framer-motion';
import { TbRecharging } from "react-icons/tb";

function ChargingLoading() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
            <div className="relative">
                <motion.div
                    className="text-yellow-400 text-4xl"
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        y: [-3, 3, -3, 3, 0]
                    }}
                    transition={{
                        opacity: { duration: 1, repeat: Infinity },
                        y: { duration: 3, repeat: Infinity, repeatType: "mirror" }
                    }}
                >
                    <TbRecharging />
                </motion.div>

                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bottom-0 left-1/2 size-1 bg-orange-300 rounded-full"
                        animate={{ y: [-10, -40], opacity: [0, 1, 0], x: (i * 10 - 10) }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }}
                    />
                ))}
            </div>

            <div className="flex flex-col items-center gap-2">
                <span className="text-orange-500 text-sm font-bold font-poppins">
                    Generating Analytics...
                </span>
                <div className="h-1 w-16 rounded-full bg-yellow-400/20 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                        animate={{ x: [-64, 64] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChargingLoading;
