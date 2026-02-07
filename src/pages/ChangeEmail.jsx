import React, { useState } from 'react'
import Notification from '../components/Notification';
import { Link } from 'react-router';
import PasswordForm from '../components/PasswordForm';
import EmailForm from '../components/EmailForm';
import { responseHandler, errorHandler } from '../utils/response-handler';

function ChangeEmail() {


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";


    let url = window.location.pathname;
    let parts = url.split('/');

    const [hash, setHash] = useState(parts[parts.length - 1]);
    const [info, setInfo] = useState({
        message: '',
        type: 'success'
    });



    const handleChangeEmail = async (e, email) => {

        try {

            e.preventDefault();

            let res = await fetch(`${BACKEND_URL}/auth/email/${hash}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email
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
                <EmailForm data={{
                    title: "Change Email",
                    handler: handleChangeEmail,
                    info: info,
                }} />
            </main>
        </>
    );

}

export default ChangeEmail;