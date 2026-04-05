import { useState } from "react";
import { Link } from 'react-router'
import Notification from "@/components/ui/Notification";

function PasswordForm(props) {

    let { title, handler, info, alternate } = props.data;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 w-3/4 md:w-1/2 h-auto ">
            <div className="flex flex-col justify-around bg-stone-300 dark:bg-stone-700 rounded-md border-2 border-stone-100 p-4 gap-2">

                <span className='font-poppins text-2xl font-bold text-center capitalize text-slate-950 dark:text-slate-50'>{title}</span>

                {info && <Notification info={info} />}
                <div className="flex flex-col">
                    <form className='flex m-2 flex-col gap-4 justify-around' onSubmit={(e) => { e.preventDefault(); handler(e, password, confirmPassword); }}>
                        <div className="flex flex-col justify-center gap-1">
                            <label htmlFor='password' className='text-slate-700 dark:text-slate-300 text-sm'>Password</label>
                            <input type="password" name="password" id="password" placeholder='ex. secret@123' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={password} onChange={(e) => {
                                setPassword(e.target.value);
                            }} />
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                            <label htmlFor='confirm_password' className='text-slate-700 dark:text-slate-300 text-sm'>Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" placeholder='ex. secret@123' className='border-2 border-slate-100 outline-slate-100 px-2 py-1 rounded-sm text-gray-800 dark:text-gray-200' value={confirmPassword} onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }} />
                        </div>

                        {alternate && <span className='text-sm text-rose-400'><Link onClick={(e) => { alternate.call(e) }}>{alternate.text}</Link></span>}
                        <button type="submit" className='bg-violet-700 hover:bg-violet-600 hover:scale-101 hover:cursor-pointer transition text-white p-2 rounded-md'>Submit</button>


                    </form>
                </div>
            </div>
        </div>
    );

}

export default PasswordForm;
