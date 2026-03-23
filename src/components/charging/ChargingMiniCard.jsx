import { LuPencil } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

function ChargingMiniCard({ charging, previlegeMenu, setCharging, setUpdateVisibility, setDeleteVisibility }) {

    return (
        <div className="relative w-full lg:w-3/5 flex flex-col sm:flex-row px-4 py-2 gap-8 border border-purple-400/20 rounded-md items-center justify-evenly" key={charging._id}>
            <div className="flex flex-col gap-2 items-center">
                <img src={`/player/${charging.player.type}.png`} className='size-36 ' />
                <p className='text-slaet-700 dark:text-slate-300 text-sm'>Player: <span className='font-bold font-poppins text-sky-600 dark:text-purple-400'>{charging.player.nickname}</span> </p>
            </div>
            <div className="flex flex-col gap-1 sm:w-2/5">
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Start Date: <span className='font-bold font-poppins'>{charging.chargingStartDate}</span> </p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>End Date: <span className='font-bold font-poppins'>{charging.chargingEndDate}</span> </p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>First Session Date: <span className='font-bold font-poppins'>{charging.firstSessionDate}</span> </p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Last Session Date: <span className='font-bold font-poppins'>{charging.lastSessionDate}</span> </p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Start Time: <span className='font-bold font-poppins'>{charging.chargingStartTime}</span> </p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>End Time: <span className='font-bold font-poppins'>{charging.chargingEndTime}</span> </p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Charging Duration: <span className='font-bold font-poppins'>{charging.chargingDuration} minutes</span> </p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Note: <span className='font-bold font-poppins'>{charging.note || "-"}</span> </p>
            </div>

            {previlegeMenu && <div className="absolute flex flex-row gap-2 top-3 right-3">
                <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm text-center text-left' onClick={() => { window.location.href = `/charging/${charging._id}`; }}>
                    <GoArrowUpRight size={16} className='text-slate-800 dark:text-slate-200' />
                </span>
                <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm text-center text-left' onClick={() => { setUpdateVisibility(true); setCharging(charging); setChargingVisibility(false); }}>
                    <LuPencil size={16} className='text-slate-800 dark:text-slate-200' />
                </span>
                <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm text-center text-left' onClick={() => { setDeleteVisibility(true); setCharging(charging); setChargingVisibility(false); }}>
                    <FaTrashAlt size={16} className='text-rose-400' />
                </span>
            </div>}
        </div>
    );

}

export default ChargingMiniCard;
