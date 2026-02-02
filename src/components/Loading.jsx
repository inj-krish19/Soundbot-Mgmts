import { motion } from 'framer-motion';
import { FaCompactDisc } from 'react-icons/fa'

function Loading() {

    return (
        <>
            <div className="flex flex-row gap-2 justify-center items-center p-3 border-2 border-slate-800">
                <motion.div className="flex flex-row size-6 text-indigo-400/20 dark:text-white/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                >
                    <FaCompactDisc size={24} />
                </motion.div>
                <span className='text-purple-500 text-sm font-bold font-poppins'>Loading</span>
            </div>
        </>
    );

}

export default Loading;