import React, { useState } from 'react'
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa';
import Notification from '../components/Notification';

function SignIn() {




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
    })


    // manual login handler
    const handleSignIn = async (e) => {
        e.preventDefault();

        let response = await fetch(`${BACKEND_URL}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify({
                email
            })
        }).then(r = r.json());

        console.log(response);
        if (response.status === 200) {
            setTimeout(() => {
                window.location.href = window.location.origin;
            }, [7000]);
        }

        if (response.status === 400) {
            // notitying as per bad request (warning)
            setInfo({
                message: 'Please provide email, something went wrong',
                type: 'warning'
            })
        }
        if (response.status === 401) {
            // notitying as per unauthorized (error)
            setInfo({
                message: 'Something went wrong',
                type: 'error'
            })
        }
        if (response.status === 403) {
            // notitying as per forbidden (error)
            setInfo({
                message: 'Please provide email',
                type: 'error'
            })
        }

        if (response.status === 500) {
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
            <main className='flex justify-center items-center bg-stone-200 dark:bg-stone-800 h-full min-h-screen w-full py-8 px-4'>
                <div className="flex flex-col justify-around w-3/4 md:w-1/2 h-auto bg-stone-300 dark:bg-stone-700  rounded-md border-2 border-stone-100 p-4 gap-2 ">
                    <span className='font-poppins text-2xl font-bold text-center capitalize text-slate-950 dark:text-slate-50'>Sign In</span>
                    {/* <div className="border border-slate-200 dark:border-slate-800"></div> */}
                    <Notification info={info} />
                    <div className="flex flex-col">
                        <form className='flex m-2 flex-col gap-4 justify-around' onSubmit={(e) => { handleSignIn(e) }}>
                            <div className="flex flex-col justify-center gap-1">
                                <label htmlFor="email" className='text-slate-800 dark:text-slate-200 text-sm'>Email</label>
                                <input type="email" name="email" id="email" placeholder='ex. john@gmail.com' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                            </div>

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

                        {/* 
                        <button type="submit" className='flex flex-row justify-center items-center gap-4 bg-slate-50 text-black p-2 rounded-md'>
                            <FaGoogle />
                            <span>Sign In with Google </span>
                        </button>
                        <button type="submit" className='flex flex-row justify-center items-center gap-4 bg-blue-700 text-white p-2 rounded-md'>
                            <FaLinkedin />
                            <span>Sign In with LinkedIn </span>
                        </button>
                        <button type="submit" className='flex flex-row justify-center items-center gap-4 bg-black text-white p-2 rounded-md'>
                            <FaGithub />
                            <span>Sign In with Github </span>
                        </button>
                        <button type="submit" className='flex flex-row justify-center items-center gap-4 bg-blue-500 text-white p-2 rounded-md'>
                            <FaFacebook />
                            <span>Sign In with Facebook </span>
                        </button>
                        */}
                    </div>

                </div>
            </main>
        </>
    );

}

export default SignIn;