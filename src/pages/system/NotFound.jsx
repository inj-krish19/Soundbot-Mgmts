import React, { useEffect } from "react";
import { motion } from "framer-motion";
import BackToTop from "@/components/layout/BackToTop";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { FaCompactDisc, FaHeadphones, FaWaveSquare, FaMusic } from "react-icons/fa";

function NotFound() {

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/";
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const waves = [
        "top-12 left-8",
        "top-24 right-16",
        "top-1/2 left-12",
        "bottom-1/3 right-24",
        "bottom-8 right-8",
    ];

    const musics = [
        "top-1/10 right-1/2",
        "top-1/3 right-3/10",
        "bottom-3/10 left-16",
    ];

    const headphones = [
        "bottom-2/10 right-12",
        "top-6/10 right-1/2",
    ];

    const discs = [
        "bottom-16 left-8",
        "bottom-8/10 left-7/10",
        "top-1/3 left-1/4",
    ];

    return (
        <main className="relative flex flex-col gap-12 px-4 md:px-8 py-6 min-h-screen w-full justify-center items-center transition duration-300 bg-white dark:bg-black">

            {/* Floating Waves */}
            {waves.map((pos, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${pos} text-indigo-400/20 dark:text-emerald-400/30`}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FaWaveSquare size={26} />
                </motion.div>
            ))}

            {/* Floating Music */}
            {musics.map((pos, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${pos} text-indigo-500/20 dark:text-emerald-400/20`}
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <FaMusic size={48} />
                </motion.div>
            ))}

            {/* Floating Headphones */}
            {headphones.map((pos, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${pos} text-indigo-400/20 dark:text-emerald-400/25`}
                    animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
                    transition={{ duration: 6, repeat: Infinity }}
                >
                    <FaHeadphones size={36} />
                </motion.div>
            ))}

            {/* Rotating Discs */}
            {discs.map((pos, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${pos} text-indigo-400/20 dark:text-emerald-400/20`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                    <FaCompactDisc size={36} />
                </motion.div>
            ))}

            {/* Main Content */}
            <div className="flex flex-col items-center text-center gap-5">

                <motion.h1
                    className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-[length:300%_100%] bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                    404
                </motion.h1>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                    <FaCompactDisc className="text-indigo-300 dark:text-slate-100 hover:text-sky-400 hover:dark:text-emerald-400 transition" size={48} />
                </motion.div>

                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                    Oops! This track seems to be missing 🎵
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    The page you are looking for might have been removed,
                    renamed, or never existed. Don't worry — we will redirect
                    you back to the homepage shortly.
                </p>

                <motion.a
                    href="/"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-white shadow-md hover:shadow-lg transition"
                >
                    Go Home
                </motion.a>

                <p className="text-xs text-slate-400 mt-2">
                    Redirecting automatically in a few seconds...
                </p>

            </div>

            <BackToTop />
            <ThemeToggle />

        </main>
    );
}

export default NotFound;