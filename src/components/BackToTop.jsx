import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {

        const dark = localStorage.getItem("theme") === "dark" || window.matchMedia('window-prefer-schems: dark');

        setIsDark(dark);
        document.documentElement.classList.add('dark');
        localStorage.setItem("theme", "dark");

    }, []);

    return (

        <div className="fixed size-10 flex bg-violet-200 p-2 bottom-18 right-6 justify-center items-center border rounded-full border-rose-300">
            <button onClick={() => { window.scrollTo(0) }} >
                <FaArrowUp className='size-6' color='var(--color-fuchsia-600)' />
            </button>
        </div>
    );

}

export default BackToTop;