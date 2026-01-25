import React, { useState } from 'react'

function Navbar() {

    const [authenticated, setAuhenticated] = useState(false);

    const navItems = [
        { title: 'Home', route: 'home' },
        { title: 'About', route: 'about' },
        { title: 'Contact', route: 'contact' },
    ];

    const authItems = authenticated ? [
        { title: 'Dashboard', route: 'dashboard' },
        { title: 'Charging', route: 'charging' },
        { title: 'Sessions', route: 'sessions' },
        { title: 'Sign Out', route: 'signout' },
    ] : [
        { title: 'Sign In', route: 'signin' },
        { title: 'Sign Up', route: 'signup' },
    ];


    return (
        <>
            <ul className='hidden md:flex flex-row gap-8 m-2 mx-8 px-8 h-8 justify-center items-center bg-stone-200 dark:bg-stone-800 rounded-md '>
                {[...navItems, ...authItems].map(
                    item => {
                        return (
                            <li
                                key={item.route.toLowerCase()}
                                className='hover:text-indigo-400 text-sm text-black dark:text-white' >
                                <a
                                    href={'/' + item.route.toLowerCase()}
                                    className='w-12 capitalize' >
                                    {item.title}
                                </a>
                            </li>
                        );
                    }
                )}
            </ul>
        </>
    );

}

export default Navbar;