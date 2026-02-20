import { Link } from 'react-router';
import React, { useState } from 'react'
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa';

import EmailForm from '@/components/auth/EmailForm';
import Notification from '@/components/ui/Notification';
import { responseHandler, errorHandler } from '@/utils/response-handler';

function Verification() {




    // ENVIRONMENT VARIABLES
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
    const STATE = import.meta.env.VITE_STATE || "";

    // OAuth Provider Credentials

    // Google : 
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
    const GOOGLE_REDIRECT_URI = BACKEND_URL + import.meta.env.VITE_GOOGLE_REDIRECT_URI || "";


    // LinkedIn : 
    const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID || "";
    const LINKEDIN_REDIRECT_URI = BACKEND_URL + import.meta.env.VITE_LINKEDIN_REDIRECT_URI || "";


    // Github : 
    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || "";
    const GITHUB_REDIRECT_URI = BACKEND_URL + import.meta.env.VITE_GITHUB_REDIRECT_URI || "";


    // Facebook :
    const FACEBOOK_CLIENT_ID = import.meta.env.VITE_FACEBOOK_CLIENT_ID || "";
    const FACEBOOK_REDIRECT_URI = BACKEND_URL + import.meta.env.VITE_FACEBOOK_REDIRECT_URI || "";


    // states
    const [email, setEmail] = useState('');
    const [info, setInfo] = useState({
        message: '',
        type: 'success'
    });

    const [resetPassword, setResetPassword] = useState(false);


    // manual login handler
    const handleVerification = async (e) => {

        try {

            e.preventDefault();

            let res = await fetch(`${BACKEND_URL}/auth/verification`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email
                }),
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


    const handleResetPassword = async (e, email) => {

        e.preventDefault();

        let res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                email
            })
        });

        let response = await res.json();
        if (res.ok) {
            setInfo({
                message: response.message,
                type: 'success'
            })

            setTimeout(() => {
                window.location.href = window.location.origin;
            }, [7000]);
        }

        if (res.status === 400) {
            // notitying as per bad request (warning)
            setInfo({
                message: 'Please provide email, something went wrong',
                type: 'warning'
            })
        }
        if (res.status === 401) {
            // notitying as per unauthorized (error)
            setInfo({
                message: 'Something went wrong',
                type: 'error'
            })
        }
        if (res.status === 403) {
            // notitying as per forbidden (error)
            setInfo({
                message: 'Please provide email',
                type: 'error'
            })
        }

        if (res.status === 500) {
            // notitying as per server error (info)
            setInfo({
                message: 'Issue at server side, Please try later',
                type: 'info'
            })
        }
    }


    // OAuth2 Provider Login Redirection Functions    

    const handleOAuthGoogle = () => {
        let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&access_type=offline`;
        window.location.href = url;
    }

    const handleOAuthLinkedIn = () => {
        let scopes = ["email", "openid", "profile", "r_profile_basicinfo", "r_verify"].join(" ");
        let url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&state=${STATE}&scope=${encodeURIComponent(scopes)}`;
        window.location.href = url;
    }

    const handleOAuthGithub = () => {
        let url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&state=${STATE}&scope=user`;
        window.location.href = url;
    }

    const handleOAuthFacebook = () => {
        let url = `https://www.facebook.com/v24.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&scope=email,user_location&state=${STATE}`;
        window.location.href = url;
    }


    return (
        <>
            {resetPassword && <EmailForm data={{
                title: "Reset Password",
                handler: handleResetPassword,
                info: info,
                alternate: {
                    text: 'Back to Sign In',
                    call: (e) => { setResetPassword(false); }
                }
            }} />}
            <main className={`flex justify-center items-center bg-stone-200 dark:bg-stone-800 h-full min-h-screen w-full py-8 px-4 ${resetPassword ? 'hidden' : ''}`}>
                <div className="flex flex-col justify-around w-3/4 md:w-1/2 h-auto bg-stone-300 dark:bg-stone-700  rounded-md border-2 border-stone-100 p-4 gap-2 ">
                    <span className='font-poppins text-2xl font-bold text-center capitalize text-slate-950 dark:text-slate-50'>Sign In</span>
                    {info && <Notification info={info} />}
                    <div className="flex flex-col">
                        <form className='flex m-2 flex-col gap-2 justify-around' onSubmit={(e) => { handleVerification(e) }}>
                            <div className="flex flex-col justify-center gap-1 mb-2">
                                <label htmlFor="email" className='text-slate-700 dark:text-slate-300 text-sm'>Email</label>
                                <input type="email" name="email" id="email" placeholder='ex. john@gmail.com' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                            </div>

                            <span className='text-sm text-rose-400 text-right'><Link onClick={(e) => { setResetPassword(true); }}>Forget Password? Reset Password</Link></span>

                            <button type="submit" className='bg-violet-700 text-white p-2 rounded-md'>Submit</button>

                        </form>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-2">
                        <div className="w-1/2 h-0 border border-slate-200 dark:border-stone-800"></div>
                        <p className='uppercase text-slate-900 dark:text-slate-100'>or</p>
                        <div className="w-1/2 h-0 border border-slate-200 dark:border-stone-800"></div>
                    </div>


                    <div className="flex flex-col gap-4">
                        <button type="submit" className='flex flex-row justify-center items-center gap-4 bg-purple-500 text-white p-2 rounded-md'
                            onClick={() => { handleOAuthGoogle() }} >
                            <FaGoogle />
                            <span>Sign In with Google </span>
                        </button>
                        <button type="submit" className='flex flex-row justify-center items-center gap-4 bg-purple-500 text-white p-2 rounded-md'
                            onClick={() => { handleOAuthLinkedIn() }} >
                            <FaLinkedin />
                            <span>Sign In with LinkedIn </span>
                        </button>
                        <button type="submit" className='flex flex-row justify-center items-center gap-4 bg-purple-500 text-white p-2 rounded-md'
                            onClick={() => { handleOAuthGithub() }} >
                            <FaGithub />
                            <span>Sign In with Github </span>
                        </button>
                        <button type="submit" className='flex flex-row justify-center items-center gap-4 bg-purple-500 text-white p-2 rounded-md'
                            onClick={() => { handleOAuthFacebook() }} >
                            <FaFacebook />
                            <span>Sign In with Facebook </span>
                        </button>

                    </div>
                </div>
            </main>
        </>
    );

}

export default Verification;