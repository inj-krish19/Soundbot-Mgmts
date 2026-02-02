import { Link, NavLink } from "react-router";
import useAuth from "../store/AuthStore";

function Navbar() {

    const auth = useAuth((state) => state.auth);

    const navItems = [
        { title: 'Home', route: 'home' },
    ];

    const authItems = auth ? [
        { title: 'Dashboard', route: 'dashboard' },
        { title: 'Charging', route: 'charging' },
        { title: 'Sessions', route: 'sessions' },
        { title: 'Sign Out', route: 'signout' },
    ] : [
        { title: 'About', route: 'about' },
        { title: 'Contact', route: 'contact' },
        { title: 'Sign In', route: 'verification' },
    ];


    return (
        <>
            <ul className='hidden md:flex flex-row gap-8 m-2 mx-8 px-8 h-8 justify-center items-center bg-stone-200 dark:bg-stone-800 transition-colors duration-400 rounded-md '>
                {[...navItems, ...authItems].map(
                    item => {
                        return (
                            <li
                                key={item.route.toLowerCase()}
                                className='hover:text-indigo-400 text-sm text-black dark:text-white transition transititon-colors duration-200' >
                                <Link
                                    to={`/${item.route.toLowerCase()}`}
                                    className='w-12 capitalize' >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    }
                )}
            </ul>
        </>
    );

}

export default Navbar;