import { motion } from 'framer-motion'
import { FaCompactDisc, FaHeadphones, FaWaveSquare, FaMusic } from 'react-icons/fa'

function Loading() {

    const position_waves = [
        "top-12 left-8",
        "top-24 right-16",
        "top-1/2 left-12",
        "bottom-1/3 right-24",
        "bottom-8 right-8",
    ];

    const position_musics = [
        "top-1/10 right-1/2",
        "top-1/3 right-3/10",
        "bottom-3/10 left-16",
    ];

    const position_headphones = [
        "bottom-2/10 right-12",
        "top-6/10 right-1/2",
    ];

    const position_discs = [
        "bottom-16 left-8",
        "bottom-8/10 left-7/10",
        "top-1/3 left-1/4",
    ];

    return (
        <>
            <main className="relative flex flex-col gap-12 px-4 md:px-8 py-4 min-h-screen h-full w-full justify-center items-center transition duration-300" >

                {position_waves.map((position, index) => {
                    return (<motion.div key={index}
                        className={`absolute ${position} dark:text-emerald-400/30 text-indigo-400/20`}
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <FaWaveSquare size={24} />
                    </motion.div>);
                })}


                {position_headphones.map((position, index) => {
                    return (<motion.div key={index}
                        className={`absolute ${position} dark:text-emerald-400/30 text-indigo-400/20`}
                        animate={{ y: [0, -15, 0], rotate: [-5, -5, -5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <FaHeadphones size={36} />
                    </motion.div>);
                })}


                {position_discs.map((position, index) => {
                    return (<motion.div key={index}
                        className={`absolute ${position} dark:text-emerald-400/20 text-indigo-400/20`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        <FaCompactDisc size={36} />
                    </motion.div>);
                })}


                {position_musics.map((position, index) => {
                    return (<motion.div key={index}
                        className={`absolute ${position} dark:text-emerald-400/15 text-indigo-600/20`}
                        animate={{ rotate: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <FaMusic size={48} />
                    </motion.div>);
                })}

                <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="flex flex-row gap-4 items-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        >
                            <FaCompactDisc size={48} className='text-indigo-300 dark:text-slate-100 hover:text-sky-400 hover:dark:text-emerald-400 hover:scale-110 transition' />
                        </motion.div>
                        <motion.span
                            className="text-md font-bold font-poppins capitalize bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-[length:300%_100%] bg-clip-text text-transparent text-lg hover:scale-105 transition"
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        >
                            Listen till it loads
                        </motion.span>
                    </div>

                    <div className="flex flex-col">
                        <p className='text-slate-700 dark:text-slate-300 font-bold'>Wait a moment, much closer to Loading</p>
                    </div>

                </div>
            </main>
        </>
    );

}

export default Loading;