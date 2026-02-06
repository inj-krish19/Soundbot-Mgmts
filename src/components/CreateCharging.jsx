import { ImCross } from "react-icons/im";
import Notification from "./Notification";
import { useEffect, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { BACKEND_URL } from "../store/UrlStore";
import { getSVGByPlayerType } from "./CreatePlayer";

function CreateCharging({ panel }) {

    const [player, setPlayer] = useState(null);
    const [players, setPlayers] = useState([]);

    const [info, setInfo] = useState({
        message: 'If the player does not require charging, use it for tracking and maintaining active listening time.',
        type: 'info'
    });

    useEffect(() => {

        const main = async () => {

            let response = await fetch(`${BACKEND_URL}/player/`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            });
            let res = await response.json();

            setPlayers(res.data);
            setPlayer(res.data?.[0] || null);

        }
        main();

    }, [])


    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/5 flex flex-col gap-8 w-3/4 md:w-1/3 h-auto bg-stone-300 dark:bg-stone-700 p-4 rounded-md z-100">

                <span className="text-rose-400 font-bold font-poppins text-lg">Create Charging</span>

                <ImCross className="absolute top-3 right-3 text-rose-400" onClick={() => { panel(false) }} />
                <Notification info={info} />

                <form className="flex flex-col flex-wrap justify-around gap-4 w-full">

                    <div className="flex flex-col gap-1">
                        <label htmlFor="player" className="text-slate-700 dark:text-slate-300 text-sm">Player</label>
                        <Listbox value={player} onChange={setPlayer} >

                            {(!player || player.length === 0) && <span className="text-rose-500 text-md">Please add streaming player first</span>}

                            {player && <ListboxButton className='px-4 py-2 border-2 border-slate-100 outline-slate-100 rounded-sm flex items-center gap-2'>
                                {getSVGByPlayerType(player.type, 'text-purple-400')}
                                <span className="text-fuchsia-400">{player.nickname}</span>
                            </ListboxButton>}

                            {players.length !== 0 && <ListboxOptions className='border-2 border-slate-100 rounded-sm' >
                                {players.map(player => {
                                    return (
                                        <>
                                            <ListboxOption key={player._id} value={player} className='px-4 py-2 flex items-center gap-2 hover:bg-pink-200 hover:cursor-pointer'>
                                                {getSVGByPlayerType(player.type, 'text-purple-400')}
                                                <span className="text-purple-500">{player.nickname}</span>
                                            </ListboxOption>
                                        </>
                                    )
                                })}
                            </ListboxOptions>}
                        </Listbox>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="chargingStartDate" className="text-slate-700 dark:text-slate-300 text-sm">Charging Start Date</label>
                        <input type="date" name="chargingStartDate" id="chargingStartDate" defaultValue={new Date().toISOString().split('T')[0]} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="chargingEndDate" className="text-slate-700 dark:text-slate-300 text-sm">Charging End Date</label>
                        <input type="date" name="chargingEndDate" id="chargingEndDate" defaultValue={new Date().toISOString().split('T')[0]} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="chargingStartTime" className="text-slate-700 dark:text-slate-300 text-sm">Charging Start Time</label>
                            <input type="time" name="chargingStartTime" id="chargingStartTime" defaultValue={new Date().toISOString().split('T')[1].substring(0, 5)} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                        </div>
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="chargingEndTime" className="text-slate-700 dark:text-slate-300 text-sm">Charging End Time</label>
                            <input type="time" name="chargingEndTime" id="chargingEndTime" defaultValue={new Date().toISOString().split('T')[1].substring(0, 5)} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="firstSessionDate" className="text-slate-700 dark:text-slate-300 text-sm">First Session Date</label>
                        <input type="date" name="firstSessionDate" id="firstSessionDate" defaultValue={new Date().toISOString().split('T')[0]} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="lastSessionDate" className="text-slate-700 dark:text-slate-300 text-sm">Last Session Date</label>
                        <input type="date" name="lastSessionDate" id="lastSessionDate" defaultValue={new Date().toISOString().split('T')[0]} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="note" className="text-slate-700 dark:text-slate-300 text-sm">Note</label>
                        <input type="text" name="note" id="note" placeholder="ex. Gone for Walk" className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200" />
                    </div>

                    <button type="submit" className="p-2 bg-violet-500 text-slate-200 rounded-md font-bold font-poppins">Submit</button>

                </form>

            </div>
        </>
    );

}

export default CreateCharging;