import { motion } from "framer-motion";
import { ImCross } from "react-icons/im";

function Error({ title, message, advice_note }) {

    let query = window.location.search;
    if (query === "?warning") {
        setTimeout(() => {
            window.location.href = '/warning'
        }, 300);
    }

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
                        <ImCross color="var(--color-red-400)" size={48} />
                    </motion.div>

                    <motion.div className="flex flex-col gap-4 items-center"
                        animate={{ y: [0, -25, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }}
                    >
                        <span className="text-slate-900 dark:text-slate-100 font-bold capitalize">{title || "Something went wrong"}</span>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-slate-800 dark:text-slate-200 font-bold text-sm">{message || "We ran into a temporary server issue while signing you in."}</p>
                            <p className="text-slate-800 dark:text-slate-200 font-bold text-sm">{advice_note || "Please wait a moment and retry. If the issue persists, reach out to our support team."}</p>
                        </div>
                    </motion.div>


                </div>
            </div>
        </>
    );

}

export default Error;