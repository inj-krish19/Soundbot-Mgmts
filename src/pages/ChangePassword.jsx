import React, { useState } from 'react'
import Notification from '../components/Notification';
import { Link } from 'react-router';
import PasswordForm from '../components/PasswordForm';
import { responseHandler, errorHandler } from '../utils/response-handler';

function ChangePassword() {


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";


    let url = window.location.pathname;
    let parts = url.split('/');

    const [hash, setHash] = useState(parts[parts.length - 1]);
    const [info, setInfo] = useState({
        message: '',
        type: 'success'
    });


    const handleChangePassword = async (e, password, confirm_password) => {

        try {

            e.preventDefault();

            let res = await fetch(`${BACKEND_URL}/auth/change-password/${hash}`, {
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
                    title: "Change Password",
                    handler: handleChangePassword,
                    info: info,
                    alternate: null
                }} />
            </main>
        </>
    );

}

export default ChangePassword;