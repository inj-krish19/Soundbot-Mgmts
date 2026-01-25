import { useEffect, useState } from 'react';
import { IoSunny, IoMoon } from 'react-icons/io5'

const ThemeToggle = () => {

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {

        const dark = localStorage.getItem("theme") === "dark" || window.matchMedia('window-prefer-schems: dark');

        setIsDark(dark);
        document.documentElement.classList.add('dark');
        localStorage.setItem("theme", "dark");

    }, []);

    const changeMode = () => {

        let preference = !isDark;

        if (preference) {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.remove('dark');
        }

        setIsDark(preference);

    }

    return (

        <div className="fixed size-10 flex bg-blue-200 dark:bg-teal-200 p-2 bottom-6 right-6 justify-center items-center border rounded-full  border-teal-200 dark:border-blue-200">
            <button onClick={changeMode} >
                {isDark ? <IoMoon color='var(--color-sky-400)' className='size-6' /> : <IoSunny color='var(--color-indigo-400)' className='size-6' />}
            </button>
        </div>

    );

}

export default ThemeToggle;