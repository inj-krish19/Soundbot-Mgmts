import React, { useState } from 'react'
import PasswordForm from '@/components/auth/PasswordForm';
import { responseHandler, errorHandler } from '@/utils/response-handler';

function ResetPassword() {


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";


    let url = window.location.pathname;
    let parts = url.split('/');

    const [hash, setHash] = useState(parts[parts.length - 1]);
    const [info, setInfo] = useState({
        message: '',
        type: 'success'
    });


    const handleResetPassword = async (e, password, confirm_password) => {

        try {

            e.preventDefault();

            let res = await fetch(`${BACKEND_URL}/auth/reset-password/${hash}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    password, confirm_password
                }),
                credentials: 'include'
            });

            responseHandler(res.clone(), setInfo);
            if (res.ok) {
                setTimeout(() => {
                    window.location.href = '/';
                }, 5000);
            }

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }


    return (
        <>
            <main className='flex justify-center items-center bg-stone-200 dark:bg-stone-800 h-full min-h-screen w-full py-8 px-4'>
                <PasswordForm data={{
                    title: "Reset Password",
                    handler: handleResetPassword,
                    info: info,
                    alternate: null
                }} />
            </main>
        </>
    );

}

export default ResetPassword;