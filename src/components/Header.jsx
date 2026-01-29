import React from 'react'
import Navbar from './Navbar';
import { FaGripLines } from 'react-icons/fa';
import { Link } from 'react-router';

function Header() {

    return (
        <>
            <div className='flex flex-row bg-stone-50 dark:bg-stone-950 justify-around items-center h-20 border-b-2 border-stone-200 dark:border-stone-800 p-4'>
                <div className='flex flex-row justify-center items-center hover:cursor-pointer' onClick={() => window.location.href = '/'}>
                    <img src="/icon.svg" alt="Logo" className='size-18' />
                    <Link to='/' className='font-poppins text-2xl hover:text-cyan-400 font-bold text-black dark:text-white'>Soundbot Mgmts</Link>
                </div>
                <Navbar />
                <button className='flex md:hidden bg-stone-200 dark:bg-stone-800 size-8 justify-center items-center rounded-sm hover:cursor-pointer'>
                    <FaGripLines className='text-stone-900 dark:text-stone-100' />
                </button>
            </div >
        </>
    );

}

export default Header;