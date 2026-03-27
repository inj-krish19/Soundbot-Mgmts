import { LuPencil } from 'react-icons/lu';
import { FaTrashAlt } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import { getSVGByDeviceType } from '@/utils/getSVG';

function SessionMiniCard({ session, privilegeMenu, setSession, setUpdateVisibility, setDeleteVisibility }) {

    return (
        <div className="relative w-full lg:w-3/5 flex flex-col sm:flex-row px-4 py-2 gap-8 border border-purple-400/20 rounded-md items-center justify-evenly" key={session._id}>
            <div className="flex flex-col gap-2 items-center">
                <img src={`/player/` + session.player.type + `.png`} className='size-36' />
                <div className="flex flex-col items-center ">
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Player : <span className='font-bold font-poppins text-sky-600 dark:text-purple-400'>{session.player.nickname}</span></p>
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Device : <span className='font-bold font-poppins text-sky-600 dark:text-indigo-400'>{session.device.nickname}</span></p>

                </div>
            </div>
            <div className="flex flex-col gap-1 sm:w-2/5">
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Start Date: <span className='font-bold font-poppins'>{session.startDate}</span></p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>End Date: <span className='font-bold font-poppins'>{session.endDate}</span></p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Start Time: <span className='font-bold font-poppins'>{session.startTime}</span></p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>End Time: <span className='font-bold font-poppins'>{session.endTime}</span></p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Volume: <span className='font-bold font-poppins'>{session.volume}</span></p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Duration: <span className='font-bold font-poppins'>{session.duration}</span></p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Note: <span className='font-bold font-poppins'>{session.note || "-"}</span></p>
            </div>

            {privilegeMenu && <div className="absolute flex flex-row gap-2 top-3 right-3">
                <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm ' onClick={() => { window.location.href = `session/${session._id}` }}>
                    <GoArrowUpRight size={16} className='text-slate-800 dark:text-slate-200' />
                </span>
                <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm ' onClick={() => { setUpdateVisibility(true); setSession(session); setSessionVisibility(false); }}>
                    <LuPencil size={16} className='text-slate-800 dark:text-slate-200' />
                </span>
                <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm ' onClick={() => { setDeleteVisibility(true); setSession(session); setSessionVisibility(false); }}>
                    <FaTrashAlt size={16} className='text-rose-400' />
                </span>
            </div>}
        </div>
    );

}

export default SessionMiniCard;
