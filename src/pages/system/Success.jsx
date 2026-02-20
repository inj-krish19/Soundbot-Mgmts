import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa'

function Success({ title, message, advice_note }) {

    setTimeout(() => {
        window.location.href = '/dashboard'
    }, 4000);

    return (
        <>
            <main className='flex flex-col min-h-screen h-full w-full gap-12 px-4 md:px-8 py-4 justify-center items-center'>
                <div className="flex flex-col justify-center items-center gap-4">

                    <motion.div className="flex flex-col "
                        animate={{ y: [0, -25, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }}
                    >
                        <FaCheckCircle color='var(--color-emerald-400)' size={48} />
                    </motion.div>

                    <motion.div className="flex flex-col gap-4 items-center"
                        animate={{ y: [0, -25, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }}
                    >
                        <span className='text-slate-900 dark:text-slate-100 font-bold capitalize'>{title || "Successfully Signed In"}</span>
                        <div className="flex flex-col items-center gap-2">
                            <p className='text-slate-800 dark:text-slate-200 font-bold text-sm'>{message || "Thank you for signing in Soundbot Mgmts. Enter your data for better insights."}</p>
                            <p className='text-slate-800 dark:text-slate-200 font-bold text-sm'>{advice_note || "Your profile has been securely verified, and you can now access your dashboard and insights."}</p>
                        </div>
                    </motion.div>

                </div>
            </main>
        </>
    );

}

export default Success;