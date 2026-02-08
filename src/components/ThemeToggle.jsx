import { useEffect, useState } from 'react';
import { IoSunny, IoMoon } from 'react-icons/io5'

const ThemeToggle = () => {

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {

        // does local storage has preference
        const storedTheme = localStorage.getItem("theme");

        const dark = storedTheme
            ? storedTheme === "dark" // store what ever prefernce is 
            : window.matchMedia('(prefers-color-scheme: dark)').matches; // no preference then system preference

        setIsDark(dark);

        if (dark) {
            document.documentElement.classList.add(dark ? 'dark' : '');
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem("theme", "light");
        }

    }, []);

    const changeMode = () => {

        let preference = !isDark;

        if (preference) {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove('dark');
        }

        setIsDark(preference);

    }

    return (
        <>
            {/* Implementation 2 : Mobile native app */}
            {/* <div className="fixed size-10 flex bg-blue-200 dark:bg-teal-200 p-2 bottom-20 md:bottom-6 right-6 justify-center items-center border rounded-full  border-teal-200 dark:border-blue-200"> */}

            {/* Implementation 1 : Drop Down Sticky Navbar */}
            <div className="fixed size-10 flex bg-blue-200 dark:bg-teal-200 p-2 bottom-6 right-6 justify-center items-center border rounded-full  border-teal-200 dark:border-blue-200">
                <button onClick={changeMode} >
                    {isDark ? <IoMoon color='var(--color-sky-400)' className='size-6' /> : <IoSunny color='var(--color-indigo-400)' className='size-6' />}
                </button>
            </div>
        </>
    );

}

export default ThemeToggle;