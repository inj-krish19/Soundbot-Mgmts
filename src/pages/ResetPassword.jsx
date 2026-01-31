import React, { useState } from 'react'
import Notification from '../components/Notification';
import { Link } from 'react-router';
import PasswordForm from '../components/PasswordForm';

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
        let response = await res.json();


        if (res.ok) {
            setInfo({
                message: response.message,
                type: 'success'
            });

            setTimeout(() => {
                window.location.href = '/';
            }, 5000);
        }


        if (res.status === 400) {
            setInfo({
                message: response.message,
                type: 'warning'
            });
        }


        if (res.status === 401) {
            setInfo({
                message: response.message,
                type: 'error'
            });
        }


        if (res.status === 403) {
            setInfo({
                message: response.message,
                type: 'warning'
            });
        }


        if (res.status === 500) {
            setInfo({
                message: 'Issue at server side, Please try later',
                type: 'info'
            })
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