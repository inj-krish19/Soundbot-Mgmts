import { useState } from "react";
import { Link } from "react-router";
import Notification from "./Notification";

function EmailForm(props) {

    const { title, handler, info, alternate } = props.data;
    const [email, setEmail] = useState('');

    return (
        <div className="absolute top-1/2 -translate-1/2 left-1/2 w-3/4 md:w-1/2 h-auto ">
            <div className="flex flex-col justify-around bg-stone-300 dark:bg-stone-700 rounded-md border-2 border-stone-100 p-4 gap-2">

                {title && <span className='font-poppins text-2xl font-bold text-center capitalize text-slate-950 dark:text-slate-50'>{title}</span>}

                {info && <Notification info={info} />}
                <div className="flex flex-col">
                    <form className='flex m-2 flex-col gap-2 justify-around' onSubmit={(e) => { handler(e, email) }}>
                        <div className="flex flex-col justify-center gap-1 mb-2">
                            <label htmlFor="email" className='text-slate-700 dark:text-slate-300 text-sm'>Email</label>
                            <input type="email" name="email" id="email" placeholder='ex. john@gmail.com' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={email} onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                        </div>

                        {alternate && <span className='text-sm text-indigo-400 text-right'><Link onClick={(e) => { alternate.call(e) }}>{alternate.text}</Link></span>}

                        <button type="submit" className='bg-violet-700 text-white p-2 rounded-md'>Submit</button>


                    </form>
                </div>
            </div>
        </div>
    );

}

export default EmailForm;