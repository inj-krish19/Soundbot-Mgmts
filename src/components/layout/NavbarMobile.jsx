import { FaHome } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { SiSession } from "react-icons/si";

import { Link } from "react-router";
import useAuth from "@/store/AuthStore";
import { VscSignIn, VscSignOut } from "react-icons/vsc"
import { TbLayoutDashboardFilled, TbRecharging } from 'react-icons/tb'

function NavbarMobile() {

    const auth = useAuth((state) => state.auth);

    const navItems = [
        { title: 'Home', route: 'home', component: <FaHome /> },
    ];

    const authItems = auth ? [
        { title: 'Dashboard', route: 'dashboard', component: <TbLayoutDashboardFilled /> },
        { title: 'Sessions', route: 'sessions', component: <SiSession /> },
        { title: 'Charging', route: 'charging', component: <TbRecharging /> },
        { title: 'Sign Out', route: 'signout', component: <VscSignOut /> },
    ] : [
        { title: 'About', route: 'about', component: <GoPerson /> },
        { title: 'Contact', route: 'contact', component: <IoCall /> },
        { title: 'Sign In', route: 'verification', component: <VscSignIn /> },
    ];


    return (
        <>
            {/* Implementation 1 : Drop Down Sticky Navbar */}
            <ul className='absolute top-full left-0 z-50 flex flex-col md:hidden gap-2 p-2 h-auto justify-center items-center bg-stone-200 dark:bg-stone-800 transition-colors duration-400 rounded-b-md w-full'>
                {[...navItems, ...authItems].map(
                    item => {
                        return (
                            <li
                                key={item.route.toLowerCase()}
                                className='flex hover:text-indigo-400 hover:font-bold text-sm text-black dark:text-white transition transititon-colors duration-200 bg-slate-300 dark:bg-slate-700 w-full justify-center items-center rounded-md' >
                                <Link
                                    to={`/${item.route.toLowerCase()}`}
                                    className='p-2 w-full text-center capitalize ' >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    }
                )}
            </ul>

            {/* Implementation 2 : Mobile native app */}
            {/* <ul className='relative sticky bottom-0 left-0 z-50 sm:hidden flex flex-row md:hidden gap-2 p-2 h-auto justify-center items-center bg-stone-200 dark:bg-stone-800 transition-colors duration-400 rounded-t-md w-full'>
                {[...navItems, ...authItems].map(
                    item => {
                        return (
                            <li
                                key={item.route.toLowerCase()}
                                className='flex hover:text-indigo-400 hover:font-bold text-sm text-black dark:text-white transition transititon-colors duration-200 bg-stone-300 dark:bg-stone-700 w-auto justify-center items-center rounded-md' >
                                <Link
                                    to={`/${item.route.toLowerCase()}`}
                                    className='p-2 capitalize flex flex-col gap-1 justify-center items-center ' >
                                    {item.component}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    }
                )}
            </ul> */}
        </>
    );

}

export default NavbarMobile;