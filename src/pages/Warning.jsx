import { motion } from "framer-motion";
import { IoWarning } from "react-icons/io5";

function Warning({ title, message, advice_note }) {

    setTimeout(() => {
        window.location.href = '/'
    }, 4000);

    return (
        <>
            <div className="flex flex-col min-h-screen h-full w-full gap-12 px-4 md:px-8 py-4 justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-4">

                    <motion.div className="flex flex-col "
                        animate={{ y: [0, -25, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }}
                    >
                        <IoWarning color="var(--color-yellow-400)" size={48} />
                    </motion.div>

                    <motion.div className="flex flex-col gap-4 items-center"
                        animate={{ y: [0, -25, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }}
                    >
                        <span className="text-slate-900 dark:text-slate-100 font-bold capitalize">{title || "Sign-in couldn't be completed"}</span>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-slate-800 dark:text-slate-200 font-bold text-sm">{message || "We couldn't finish signing you in because some required information."}</p>
                            <p className="text-slate-800 dark:text-slate-200 font-bold text-sm">{advice_note || "No changes were made to your account. You can safely retry. Please fill details on account of authentication provider."}</p>
                        </div>
                    </motion.div>


                </div>
            </div>
        </>
    );

}

export default Warning;