import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {

    return (

        <div className="fixed size-10 flex bg-violet-200 p-2 bottom-18 right-6 justify-center items-center border rounded-full border-rose-300">
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} >
                <FaArrowUp className='size-6' color='var(--color-fuchsia-600)' />
            </button>
        </div>
    );

}

export default BackToTop;