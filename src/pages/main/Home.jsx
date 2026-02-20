import { useEffect } from 'react'
import Hero from '../components/Hero';
import Features from '../components/Features';
import Preview from '../components/Preview';
import AchievementsNCapability from '../components/AchievementsNCapability';
import HowItWorks from '../components/HowItWorks';

import { motion } from 'framer-motion'
import { FaCompactDisc, FaHeadphones, FaMusic, FaWaveSquare } from 'react-icons/fa'

function Home() {

    const position_waves = [
        "top-12 left-8",
        "top-24 right-16",
        "top-1/2 left-12",
        "bottom-1/3 right-24",
        "bottom-8 right-8",
    ];

    const position_headphones = [
        "top-1/10 right-1/2",
        "top-1/3 right-3/10",
        "bottom-3/10 left-16",
    ];

    const position_discs = [
        "bottom-2/10 right-12",
        "top-6/10 right-1/2",
    ];

    const position_musics = [
        "bottom-16 left-8",
        "bottom-8/10 left-7/10",
        "top-1/3 left-1/4",
    ];




    return (
        <>
            <main className='relative flex flex-col min-h-screen h-full w-full px-8 py-4 gap-12 bg-gradient-to-br from-sky-400 to-emerald-400 dark:from-emerald-400 dark:to-sky-400 via-transparent transition delay-150 duration-1000 ease-in-out'>

                {position_waves.map((position, index) => {
                    return (<motion.div key={index}
                        className={`absolute ${position} dark:text-white/20 text-indigo-400/20`}
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <FaWaveSquare size={60} />
                    </motion.div>);
                })}


                {position_headphones.map((position, index) => {
                    return (<motion.div key={index}
                        className={`absolute ${position} dark:text-white/20 text-indigo-400/20`}
                        animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <FaHeadphones size={80} />
                    </motion.div>);
                })}


                {position_discs.map((position, index) => {
                    return (<motion.div key={index}
                        className={`absolute ${position} dark:text-white/20 text-indigo-400/20`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        <FaCompactDisc size={120} />
                    </motion.div>);
                })}


                {position_musics.map((position, index) => {
                    return (<motion.div key={index}
                        className={`absolute ${position} dark:text-white/15 text-indigo-600/20`}
                        animate={{ y: [0, 25, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <FaMusic size={70} />
                    </motion.div>);
                })}

                <Hero />
                <Features />
                <AchievementsNCapability />
                <Preview />
                <HowItWorks />

            </main>
        </>
    );

}

export default Home;