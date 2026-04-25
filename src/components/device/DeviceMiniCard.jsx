import { LuPencil } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { getSVGByDeviceType } from "@/utils/getSVG";

function DeviceMiniCard({ device, privilegeMenu, setDevice, setUpdateVisibility, setDeleteVisibility }) {

    return (
        <div className="relative w-full lg:w-3/5 flex flex-col sm:flex-row px-4 py-2 gap-8 border border-purple-400/20 rounded-md items-center justify-evenly" key={device._id}>
            <div className="flex flex-col gap-2 items-center">
                {getSVGByDeviceType(device.type, 'size-12 text-purple-400 dark:text-violet-400')}
                <p className='text-sm capitalize text-indigo-400'><span className='font-bold font-poppins'>{device.type}</span></p>
            </div>
            <div className="flex flex-col gap-1 sm:w-2/5">
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Name: <span className='font-bold font-poppins'>{device.name}</span></p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Nickname: <span className='font-bold font-poppins'>{device.nickname}</span></p>
                <p className='text-slate-700 dark:text-slate-300 text-sm capitalize'>Type: <span className='font-bold font-poppins'>{device.type}</span></p>
                <p className='text-slate-700 dark:text-slate-300 text-sm'>Company: <span className='font-bold font-poppins'>{device.company}</span></p>
            </div>

            {privilegeMenu && <div className="absolute flex flex-row gap-2 top-3 right-3">
                <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm ' onClick={() => { window.location.href = `/device/${device._id}` }}>
                    <GoArrowUpRight size={16} className='text-slate-800 dark:text-slate-200' />
                </span>
                <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm ' onClick={() => { setUpdateVisibility(true); setDevice(device); }}>
                    <LuPencil size={16} className='text-slate-800 dark:text-slate-200' />
                </span>
                <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm ' onClick={() => { setDeleteVisibility(true); setDevice(device); }}>
                    <FaTrashAlt size={16} className='text-rose-400' />
                </span>
            </div>}
        </div>
    );

}

export default DeviceMiniCard;
