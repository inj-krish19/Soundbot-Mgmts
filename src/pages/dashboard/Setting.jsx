import { useState } from "react";
import { Link } from "react-router";
import Notification from "@/components/ui/Notification";
import { responseHandler, errorHandler } from '@/utils/response-handler';

function Setting() {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

    const [isOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState({
        message: '',
        type: 'success'
    });


    const handleChangePassword = async (e) => {

        try {

            let res = await fetch(`${BACKEND_URL}/auth/change-password`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                credentials: 'include'
            });

            responseHandler(res.clone(), setInfo);
            if (res.ok) {
                setTimeout(() => {
                    window.location.href = window.location.origin;
                }, [7000]);
            }

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }


    const handleChangeEmail = async (e) => {

        try {

            e.preventDefault();
            let res = await fetch(`${BACKEND_URL}/auth/email`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                credentials: 'include'
            });

            responseHandler(res.clone(), setInfo);
            if (res.ok) {
                setTimeout(() => {
                    window.location.href = window.location.origin;
                }, [7000]);
            }

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }


    return (
        <>
            <main className={`flex justify-center items-center bg-stone-200 dark:bg-stone-800 h-full min-h-screen w-full py-8 px-4 ${isOpen ? 'hidden' : ''}`}>
                <div className="flex flex-col justify-around w-3/4 md:w-1/2 h-auto bg-stone-300 dark:bg-stone-700  rounded-md border-2 border-stone-100 p-4 gap-2 ">
                    <span className='font-poppins text-2xl font-bold text-center capitalize text-slate-950 dark:text-slate-50'>Settings</span>
                    {/* <div className="border border-slate-200 dark:border-slate-800"></div> */}
                    {info && <Notification info={info} />}

                    <span className="text-sm text-slate-800 dark:text-slate-200"><Link onClick={(e) => { handleChangePassword(e) }}>Change Password</Link></span>
                    <span className="text-sm text-slate-800 dark:text-slate-200"><Link onClick={(e) => { handleChangeEmail(e) }}>Change Email</Link></span>

                </div>
            </main>
        </>
    );

}

export default Setting;