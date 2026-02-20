import { SiSession } from "react-icons/si";

function SessionCard({ session }) {

    return (
        <>
            <div className="hidden lg:flex fixed top-1/2 left-1/2 -translate-1/2 flex flex-col gap-4 p-4 rounded-md bg-stone-300 dark:bg-stone-700 w-3/4 md:w-1/3 h-auto z-100">

                <div className="flex flex-row items-center gap-2">
                    <SiSession className="text-teal-400 dark:text-purple-500" />
                    <span className="text-slate-800 dark:text-slate-200 font-bold font-poppins text-md">Session</span>
                </div>

                <div className="flex flex-col gap-1">
                    {/* <p className="text-slate-700 dark:text-slate-300 text-sm">ID:  <span className="font-bold font-poppins">{session._id}</span> </p> */}
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Start Date:  <span className="font-bold font-poppins">{session.startDate}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">End Date:  <span className="font-bold font-poppins">{session.endDate}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Start Time:  <span className="font-bold font-poppins">{session.startTime}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">End Time:  <span className="font-bold font-poppins">{session.endTime}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Volume:  <span className="font-bold font-poppins">{session.volume * 100}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Duration:  <span className="font-bold font-poppins">{session.duration} minutes</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Player:  <span className="text-sky-600 dark:text-purple-400 font-bold font-poppins">{session.player.nickname}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Note:  <span className="font-bold font-poppins">{session.note || "-"}</span> </p>
                </div>
            </div>
        </>
    );

}

export default SessionCard;