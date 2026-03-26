import Navbar from '@/components/layout/Navbar';
import { Link } from 'react-router';
import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import NavbarMobile from '@/components/layout/NavbarMobile';
import { FaGripLines } from 'react-icons/fa';

function Header() {

    const [panel, setPanel] = useState(false);

    return (
        <>
            <div className='relative top-0 left-0 z-50 sticky flex flex-row bg-stone-50 dark:bg-stone-950 justify-around items-center h-20 border-b-2 border-stone-200 dark:border-stone-800 p-4 transition-colors duration-800'>
                <div className='flex flex-row justify-center items-center hover:cursor-pointer' onClick={() => window.location.href = '/'}>
                    <img src="/icon.svg" alt="Logo" className='size-18' />
                    <Link to='/' className='font-poppins text-2xl hover:text-cyan-400 dark:hover:text-emerald-400 font-bold text-black dark:text-white transition-colors duration-800'>Soundbot Mgmts</Link>
                </div>
                <Navbar />
                <button className='flex md:hidden bg-stone-200 dark:bg-stone-800 size-8 justify-center items-center rounded-sm hover:cursor-pointer' onClick={() => { setPanel(!panel); }}>
                    {!panel ? <FaGripLines className='text-stone-900 dark:text-stone-100' /> : <RxCross1 className='text-stone-900 dark:text-stone-100' />}
                </button>

                {/* Implemetation 1 : Drop Down Sticky Navbar */}
                {panel && <NavbarMobile />}
            </div >
        </>
    );

}

export default Header;
