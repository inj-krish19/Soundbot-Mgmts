import { ImCross } from "react-icons/im";
import Notification from "./Notification";
import { useState } from "react";

function CreateSession({ panel }) {

    const [info, setInfo] = useState({
        message: '',
        type: ''
    })

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 flex flex-col gap-4 items-center bg-stone-300 dark:bg-stone-700 rounded-md p-4">
                <span className="text-emerald-400 text-lg font-bold">Create Session</span>

                <ImCross className="absolute top-3 right-3 text-rose-400" onClick={() => { panel(false); }} />
                <Notification info={info} />

                <div className="flex flex-col items-center gap-4">

                    <form className="flex flex-col justify-around gap-4" onSubmit={() => { }}>

                        <div className="flex flex-col gap-1 ">
                            <label htmlFor="startDate" className="text-slate-700 dark:text-slate-300 text-sm ">Start Date</label>
                            <input type="date" name="startDate" id="startDate" defaultValue={new Date().toISOString().split('T')[0]} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark] " />
                        </div>

                        <div className="flex flex-col gap-1 ">
                            <label htmlFor="endDate" className="text-slate-700 dark:text-slate-300 text-sm">End Date</label>
                            <input type="date" name="endDate" id="endDate" defaultValue={new Date().toISOString().split('T')[0]} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark] w-fill" />
                        </div>

                        <div className="flex flex-row gap-2 w-full">
                            <div className="flex flex-col gap-1 w-1/2">
                                <label htmlFor="startTime" className="text-slate-700 dark:text-slate-300 text-sm">Start Time</label>
                                <input type="time" name="startTime" id="startTime" defaultValue={new Date().toISOString().split('T')[1].substring(0, 5)} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-00 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                            </div>

                            <div className="flex flex-col gap-1 w-1/2">
                                <label htmlFor="endTime" className="text-slate-700 dark:text-slate-300 text-sm">End Time</label>
                                <input type="time" name="endTime" id="endTime" defaultValue={new Date().toISOString().split('T')[1].substring(0, 5)} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="volume" className="text-slate-700 dark:text-slate-300 text-sm">Volume</label>
                            <input type="number" name="volume" id="volume" min={0} max={100} defaultValue={70} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="note" className="text-slate-700 dark:text-slate-300 text-sm">Note</label>
                            <input type="text" inputMode="numeric" pattern="[0-9]*" className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200" placeholder="ex. Listening Eminem" />
                        </div>

                        <button type="submit" className="p-2 bg-violet-500 text-slate-200 rounded-md font-bold font-poppins">Submit</button>

                    </form>

                </div>

            </div>
        </>
    )

}

export default CreateSession;