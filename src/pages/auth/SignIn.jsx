import React, { useState } from 'react'
import PasswordForm from '@/components/auth/PasswordForm';
import { responseHandler, errorHandler } from '@/utils/response-handler';

function SignIn() {


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";


    let url = window.location.pathname;
    let parts = url.split('/');

    const [hash, setHash] = useState(parts[parts.length - 1]);
    const [info, setInfo] = useState({
        message: '',
        type: 'success'
    });

    const [resetPassword, setResetPassword] = useState(false);


    const handleSignIn = async (e, password, confirm_password) => {

        try {

            e.preventDefault();
            let res = await fetch(`${BACKEND_URL}/auth/signin/${hash}`, {
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
                    window.location.href = '/dashboard';
                }, 5000);
            }

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }


    return (
        <>
            <main className='flex justify-center items-center bg-stone-200 dark:bg-stone-800 h-full min-h-screen w-full py-8 px-4'>
                {!resetPassword && <PasswordForm data={{
                    title: "Sign In",
                    handler: handleSignIn,
                    info: info,
                }} />}
            </main>
        </>
    );

}

export default SignIn;