import React, { useState } from 'react'
import Notification from '../components/Notification';
import { Link } from 'react-router';
import PasswordForm from '../components/PasswordForm';

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
        let response = await res.json();

        if (res.ok) {
            setInfo({
                message: "Signed In Successfully",
                type: 'success'
            });

            setTimeout(() => {
                window.location.href = '/dashboard';
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
                {!resetPassword && <PasswordForm data={{
                    title: "Sign In",
                    handler: handleSignIn,
                    info: info,
                    // alternate: {
                    //     text: 'Forgot Password? Reset Password',
                    //     call: (e) => {
                    //         e.preventDefault();
                    //         setResetPassword(true)
                    //     }
                    // }
                }} />}

                {/* <div className="flex flex-col justify-around w-3/4 md:w-1/2 h-auto bg-stone-300 dark:bg-stone-700 rounded-md border-2 border-stone-100 p-4 gap-2">

                    <span className='font-poppins text-2xl font-bold text-center capitalize text-slate-950 dark:text-slate-50'>Sign In</span>

                    {info && <Notification info={info} />}
                    <div className="flex flex-col">
                        <form className='flex m-2 flex-col gap-4 justify-around' onSubmit={(e) => { handleSignIn(e); }}>
                            <div className="flex flex-col justify-center gap-1">
                                <label htmlFor='password' className='text-slate-700 dark:text-slate-300 text-sm'>Password</label>
                                <input type="password" name="password" id="password" placeholder='ex. secret@123' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={password} onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                            </div>
                            <div className="flex flex-col justify-center gap-1">
                                <label htmlFor='confirm_password' className='text-slate-700 dark:text-slate-300 text-sm'>Confirm Password</label>
                                <input type="password" name="confirm_password" id="confirm_password" placeholder='ex. secret@123' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={confirmPassword} onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }} />
                            </div>

                            {/* <span className='text-sm text-rose-400'><Link to='/forgot-password' onClick={(e) => { handleChangePassword(e) }}>Forgot Password? Reset Password</Link></span> *//*}
                            <button type="submit" className='bg-violet-700 text-white p-2 rounded-md'>Submit</button>


                        </form>
                    </div>
                </div> */}
            </main>
        </>
    );

}

export default SignIn;