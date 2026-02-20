import React, { useState } from 'react'
import Notification from '@/components/ui/Notification';
import { responseHandler, errorHandler } from '@/utils/response-handler';

function SignOut() {


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
    const [info, setInfo] = useState({
        message: '',
        type: 'success'
    });


    const handleSignOut = async (e) => {

        try {

            let res = await fetch(`${BACKEND_URL}/auth/signout`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                credentials: 'include'
            });

            responseHandler(res.clone(), setInfo);
            if (res.ok) {
                setTimeout(() => {
                    window.location.href = '/'
                }, 5000);
            }

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }

    return (
        <>
            <main className='flex justify-center items-center bg-stone-200 dark:bg-stone-800 w-full h-full min-h-screen py-8 px-4'>
                <div className="flex flex-col justify-center w-3/4 md:w-1/2 h-auto bg-stone-300 dark:bg-stone-700 rounded-md border-2 border-stone-100 p-4 gap-4">
                    <span className='font-poppins text-2xl font-bold text-center capitalize text-slate-950 dark:text-slate-50'>Are you sure? You wanna Sign Out</span>
                    {info && <Notification info={info} />}
                    <div className='flex flex-col justify-around gap-4'>
                        <div className="flex flex-col gap-1">
                            <span className='text-sm text-gray-800 dark:text-gray-200 text-center '>You will be signed out of your account after clicking this.</span>
                        </div>
                        <button className='bg-red-400 text-white p-2 rounded-md' onClick={() => { handleSignOut() }}>Sign Out</button>
                    </div>
                </div>
            </main>
        </>
    );

}

export default SignOut;