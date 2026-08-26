import React, { useEffect, useState } from 'react'
import Notification from '@/components/ui/Notification';
import { responseHandler, errorHandler } from '@/utils/response-handler'

function SignUp() {


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";


    let url = window.location.pathname;
    let parts = url.split('/');

    const [hash, setHash] = useState(parts[parts.length - 1]);
    const [info, setInfo] = useState({
        message: 'Please fill the form within 10 minutes',
        type: 'info'
    });
    const [PFPs, setPFPs] = useState([]);

    // states
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const [country, setCountry] = useState('');
    const [profilePicture, setProfilePicture] = useState('/icon.svg');


    useEffect(() => {

        try {

            (async () => {
                let response = await fetch(`${BACKEND_URL}/pfp/`, {
                    headers: {
                        "content-type": "application/json"
                    }
                }).then(r => r.json());

                if (response.code === 200) {
                    setPFPs(response.data);
                    setProfilePicture(`${BACKEND_URL}${response.data[2]}`);
                } else {
                    setPFPs([]);
                }

            })();

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }, []);


    const handleSignUp = async (e) => {
        e.preventDefault();

        let res = await fetch(`${BACKEND_URL}/auth/signup/${hash}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                password, confirm_password, name, nickname, country, profile_picture: profilePicture
            }),
            credentials: 'include'
        });

        responseHandler(res.clone(), setInfo);
        if (res.ok) {
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 5000);
        }

    }


    return (
        <>
            <main className='flex justify-center items-center bg-stone-200 dark:bg-stone-800 h-full min-h-screen w-full py-8 px-4'>
                <div className="flex flex-col justify-around w-3/4 md:w-1/2 h-auto bg-stone-300 dark:bg-stone-700 rounded-md border-2 border-stone-100 p-4 gap-2">

                    <span className='font-poppins text-2xl font-bold text-center capitalize text-slate-950 dark:text-slate-50'>Sign Up</span>

                    {info && <Notification info={info} />}
                    <div className="flex flex-col">
                        <form className='flex m-2 flex-col gap-4 justify-around' onSubmit={(e) => { handleSignUp(e); }}>

                            <div className="flex flex-col lg:flex-row justify-between gap-2">
                                <div className="flex flex-col justify-center gap-1">
                                    <label htmlFor='name' className='text-slate-700 dark:text-slate-300 text-sm'>Name</label>
                                    <input type="text" name="name" id="name" placeholder='ex. Alexander James' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={name} onChange={(e) => {
                                        setName(e.target.value);
                                    }} />
                                </div>
                                <div className="flex flex-col justify-center gap-1">
                                    <label htmlFor='nickname' className='text-slate-700 dark:text-slate-300 text-sm'>Nickname</label>
                                    <input type="text" name="nickname" id="nickname" placeholder='ex. Alex' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={nickname} onChange={(e) => {
                                        setNickname(e.target.value);
                                    }} />
                                </div>
                            </div>

                            <div className="flex flex-col justify-center gap-1">
                                <label htmlFor='password' className='text-slate-700 dark:text-slate-300 text-sm'>Password</label>
                                <input type="password" name="password" id="password" placeholder='ex. secret@123' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={password} onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                            </div>

                            <div className="flex flex-col justify-center gap-1">
                                <label htmlFor='confirm_password' className='text-slate-700 dark:text-slate-300 text-sm'>Confirm Password</label>
                                <input type="password" name="confirm_password" id="confirm_password" placeholder='ex. secret@123' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={confirm_password} onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }} />
                            </div>

                            <div className="flex flex-col justify-center gap-1">
                                <label htmlFor='country' className='text-slate-700 dark:text-slate-300 text-sm'>Country</label>
                                <input type="text" name="country" id="country" placeholder='ex. India, USA, UK' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={country} onChange={(e) => {
                                    setCountry(e.target.value);
                                }} />
                            </div>

                            <div className="flex flex-col justify-center gap-1">
                                <label htmlFor='country' className='text-slate-700 dark:text-slate-300 text-sm'>Profile Picture</label>

                                <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">

                                    <img src={profilePicture} alt="Profile Picture" className='size-36 rounded-full border-2 border-slate-800 dark:border-slate-200' onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/icon.svg';
                                    }} />

                                    <div className="flex flex-row gap-1 flex-wrap justify-center items-center">
                                        {PFPs.map((pfp, index) => {
                                            const isActive = profilePicture === pfp;
                                            return (
                                                <button key={index} type="button" onClick={() => setProfilePicture(`${BACKEND_URL}${pfp}`)} className="rounded-full" >
                                                    <img src={`${BACKEND_URL}${pfp}`} onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = '/icon.svg'
                                                    }} alt="Profile Picture" className={` size-16 rounded-full m-1 transition-all duration-200 border-2 ${isActive ? 'border-indigo-400' : 'border-slate-800 dark:border-slate-200 hover:border-indigo-400'} `} />
                                                </button>
                                            );
                                        })}
                                    </div>


                                </div>

                            </div>

                            <button type="submit" className='bg-violet-700 hover:bg-violet-600 hover:scale-101 hover:cursor-pointer transition text-white p-2 rounded-md'>Submit</button>

                        </form>
                    </div>
                </div>
            </main>
        </>
    );

}

export default SignUp;
