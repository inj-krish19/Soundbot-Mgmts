import React from 'react'
import { Link } from 'react-router';
import { GoPerson } from 'react-icons/go';
import { IoCall } from 'react-icons/io5';
import { FaHome } from 'react-icons/fa';
import useAuth from '../store/AuthStore';

function Footer() {

    return (
        <>
            <div className="flex flex-col md:flex-row h-fill px-8 py-4 border-t-2 bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 gap-8 transition-colors duration-800 mt-auto">
                <div className="flex flex-col w-full md:w-2/5 gap-2">

                    <div className="flex flex-row items-center gap-4">
                        <img src='/logo.png' className='size-36' />
                        <span className='text-slate-950 dark:text-slate-50 font-2xl font-bold hover:text-cyan-400'>Soundbot Mgmts</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className='text-sm text-slate-700 dark:text-slate-300'>Soundbot Mgmts helps users track and analyze their headphone and earphone usage across daily streaming activity. It turns listening data into insights and visual reports to promote smarter device usage and healthier listening habits.</p>

                        <div className="flex flex-row gap-4 items-center">

                            <Link to='/' className='flex flex-row items-center gap-2 text-slate-700 dark:text-slate-300'>
                                <FaHome className='text-slate-950 dark:text-slate-50' />
                                <span className='text-sm'>Home</span>
                            </Link>

                            <Link to='/about' className='flex flex-row items-center gap-2 text-slate-700 dark:text-slate-300'>
                                <GoPerson
                                    className='text-slate-950 dark:text-slate-50' />
                                <span className='text-sm'>About</span>
                            </Link>

                            <Link to='/contact' className='flex flex-row items-center gap-2 text-slate-700 dark:text-slate-300'>
                                <IoCall className='text-slate-950 dark:text-slate-50' />
                                <span className='text-sm'>Contact</span>
                            </Link>

                        </div>
                    </div>

                </div>

                <div className="flex flex-row w-full md:w-3/5 justify-around items-center gap-4">

                    <div className="flex flex-col gap-4 justify-center">
                        <span className='text-slate-800 dark:text-slate-200 text-md font-bold'>Legal</span>

                        <div className="flex flex-col gap-1">
                            <Link to='/privacy-policy' className='text-sm text-slate-700 dark:text-slate-300'>Privacy Policy</Link>
                            <Link to='/cookie-policy' className='text-sm text-slate-700 dark:text-slate-300'>Cookie Policy</Link>
                            <Link to='/disclaimer' className='text-sm text-slate-700 dark:text-slate-300'>Disclaimer</Link>
                            <Link to='/update-and-chnages' className='text-sm text-slate-700 dark:text-slate-300'>Update and Changes</Link>
                        </div>
                    </div>


                    <div className="flex flex-col gap-4 justify-center">
                        <span className='text-slate-800 dark:text-slate-200 text-md font-bold'>Quick Start</span>

                        <div className="flex flex-col gap-1">
                            <Link to='/verification' className='text-sm text-slate-700 dark:text-slate-300'>Sign In</Link>
                            <Link to='/dashboard' className='text-sm text-slate-700 dark:text-slate-300'>Dashboard</Link>
                            <Link to='/charging' className='text-sm text-slate-700 dark:text-slate-300'>Charging</Link>
                            <Link to='/sessions' className='text-sm text-slate-700 dark:text-slate-300'>Sessions</Link>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );

}

export default Footer;