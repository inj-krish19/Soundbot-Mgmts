import { useState, useEffect } from 'react';
import { getSVGByDeviceType } from '@/utils/getSVG';
import { motion, AnimatePresence } from 'framer-motion';

function DeviceLoading() {

    const [index, setIndex] = useState(0);
    const icons = ['phone', 'tablet', 'desktop', 'tv'];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % icons.length);
        }, 2000);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className="flex flex-col w-full h-full items-center justify-center p-6 gap-6">
            <div className="relative size-20 flex items-center justify-center bg-sky-500/5 rounded-3xl shadow-inner">

                <motion.div
                    className="absolute inset-0 border border-sky-500/40 rounded-3xl"
                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute inset-0 border border-blue-500/30 rounded-3xl"
                    animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
                />

                <div className="text-sky-400 text-4xl z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={icons[index]}
                            initial={{ y: 10, opacity: 0, rotateY: -90 }}
                            animate={{ y: 0, opacity: 1, rotateY: 0 }}
                            exit={{ y: -10, opacity: 0, rotateY: 90 }}
                            transition={{ duration: 0.5, ease: "backOut" }}
                        >
                            {getSVGByDeviceType(icons[index], 'text-blue-500')}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-indigo-400/80 text-[11px] font-inter font-medium capitalize"
                >
                    Syncing: {icons[index]}
                </motion.span>
                <span className='text-sm text-indigo-500 font-poppins font-bold'>Generating Analytics</span>

                <div className="flex gap-1.5">
                    {icons.map((_, i) => (
                        <motion.div
                            key={i}
                            className="h-1 rounded-full bg-blue-500"
                            animate={{
                                width: i === index ? 16 : 4,
                                opacity: i === index ? 1 : 0.2
                            }}
                            transition={{ duration: 0.4 }}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default DeviceLoading;
