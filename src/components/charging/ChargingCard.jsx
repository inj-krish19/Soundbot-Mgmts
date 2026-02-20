import { TbRecharging } from 'react-icons/tb'

function ChargingCard({ charging }) {

    return (
        <>
            <div className="hidden lg:flex fixed top-1/2 left-1/2 -translate-1/2 flex-col gap-4 p-4 bg-stone-300 dark:bg-stone-700 w-3/4 md:w-1/3 h-auto rounded-md z-50">

                <div className="flex flex-row gap-2">
                    <TbRecharging size={24} className='text-violet-400 dark:text-indigo-400' />
                    <span className='text-slate-800 dark:text-slate-200 font-bold font-poppins'>Charging</span>
                </div>

                <div className="flex flex-col gap-1">
                    {/* <p className='text-slate-700 dark:text-slate-300 text-sm'>ID: <span className="font-bold font-poppins" >{charging._id}</span></p> */}
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Charging Start Date: <span className="font-bold font-poppins" >{charging.chargingStartDate}</span></p>
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Charging End Date: <span className="font-bold font-poppins" >{charging.chargingEndDate}</span></p>
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Charging Start Time: <span className="font-bold font-poppins" >{charging.chargingStartTime}</span></p>
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Charging End Time: <span className="font-bold font-poppins" >{charging.chargingEndTime}</span></p>
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>First Session Date: <span className="font-bold font-poppins" >{charging.firstSessionDate}</span></p>
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Last Session Date: <span className="font-bold font-poppins" >{charging.lastSessionDate}</span></p>
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Charging Duration: <span className="font-bold font-poppins" >{charging.chargingDuration} minutes</span> </p>
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Player: <span className="font-bold font-poppins text-sky-600 dark:text-purple-400" >{charging.player.nickname}</span></p>
                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Note: <span className="font-bold font-poppins" >{charging.note || "-"}</span></p>
                </div>

            </div>
        </>
    )

}

export default ChargingCard;