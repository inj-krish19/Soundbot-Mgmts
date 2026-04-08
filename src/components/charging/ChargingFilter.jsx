import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

import { cleanDate } from "@/utils/date";
import { BACKEND_URL } from "@/store/UrlStore";
import { getSVGByPlayerType } from "@/utils/getSVG";
import { errorHandler } from "@/utils/response-handler";

function ChargingFilter({ panelState, loadingState, setData, setPage, setFiltering }) {

    const [info, setInfo] = useState({
        message: '',
        type: ''
    });

    // player state handle
    const [player, setPlayer] = useState({ type: 'none', nickname: 'All Players Selected' });
    const [players, setPlayers] = useState([]);

    // session start and end date handler
    const [firstSessionDate, setFirstSessionDate] = useState('');
    const [lastSessionDate, setLastSessionDate] = useState('');

    // charging start and end date handler
    const [chargingStartDate, setChargingStartDate] = useState('');
    const [chargingEndDate, setChargingEndDate] = useState('');

    // charging start and end time handler
    const [chargingStartTime, setChargingStartTime] = useState('');
    const [chargingEndTime, setChargingEndTime] = useState('');

    // charging duration value and operator handler
    const [chargingDuration, setChargingDuration] = useState(null);
    const [chargingDurationActive, setChargingDurationActive] = useState("");


    const submitFilter = async (e) => {

        setFiltering(true);
        loadingState(true);
        e.preventDefault();

        try {

            let res = await fetch(`${BACKEND_URL}/charging/filter/data`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    player: player._id || null, sessionDateRange: [firstSessionDate, lastSessionDate],
                    chargingDateRange: [chargingStartDate, chargingEndDate],
                    chargingTimeRange: [chargingStartTime, chargingEndTime],
                    chargingDuration: [chargingDurationActive, chargingDuration]
                }),
                credentials: "include"
            });

            let response = await res.json();

            for (let resp of response.data) {
                resp['firstSessionDate'] = cleanDate(resp['firstSessionDate']);
                resp['lastSessionDate'] = cleanDate(resp['lastSessionDate']);
                resp['chargingEndDate'] = cleanDate(resp['chargingEndDate']);
                resp['chargingStartDate'] = cleanDate(resp['chargingStartDate']);
            }

            setPage(-1);
            console.log(response.data)
            setData([...response.data]);

            setTimeout(() => {
                panelState(false);
                setTimeout(() => { loadingState(false) }, 1500);
            }, 500);

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }


    const resetFilter = async (e) => {

        setChargingDuration("");
        setChargingDurationActive("");

        e.preventDefault();
        setPlayer({ type: "none", nickname: "All Players Selected" });

        setFirstSessionDate('');
        setLastSessionDate('');

        setChargingEndDate('');
        setChargingStartDate('');

        setChargingEndTime('');
        setChargingStartTime('');

    }


    useEffect(() => {

        const getPlayers = async () => {

            let res = await fetch(`${BACKEND_URL}/player/`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                },
                credentials: 'include'
            });

            let response = await res.json();
            setPlayers(response.data);

        }
        getPlayers();

    }, []);


    return (
        <>
            <div className="fixed top-1/2 left-1/2 -translate-1/2 w-3/4 md:w-1/3 h-auto flex flex-col bg-stone-300 dark:bg-stone-700 px-4 py-2 rounded-sm z-50">

                <ImCross className="absolute top-3 right-3 text-rose-400" onClick={() => { panelState(false); }} />

                <div className="flex flex-col gap-2">

                    <div className="flex flex-col mb-2">
                        <span className="text-indigo-400 font-bold font-poppins text-md">Charging Filter Panel</span>
                        <span className="text-rose-400 font-poppins text-sm">* Atlease one of the field should be selected</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-sky-500 text-sm font-semibold">Player</span>

                            <div className="flex flex-col gap-1">
                                <Listbox value={player} onChange={setPlayer}>

                                    {players.length === 0 && <span className="text-rose-400 text-sm">Please add streaming player first</span>}

                                    {players.length !== 0 && <ListboxButton className="px-2 py-1 border-2 border-slate-800 dark:border-slate-200 outline-slate-800 dark:outline-slate-200 rounded-sm flex items-center gap-2" >
                                        {player.type !== "none" && getSVGByPlayerType(player.type, 'size-4 text-sky-400')}
                                        <span className="text-blue-400 text-sm">{player.nickname}</span>
                                    </ListboxButton>}

                                    {players.length !== 0 && <ListboxOptions className='outline-2 outline-slate-800 dark:outline-slate-200 rounded-sm'>
                                        <ListboxOption value={{ type: 'none', nickname: 'All Players Selected' }} className='px-2 py-1 flex items-center gap-2 hover:bg-sky-200 hover:cursor-pointer' >
                                            <span className="text-blue-400 text-sm">All Players Selected</span>
                                        </ListboxOption>

                                        {players.map(streamingPlayer => {
                                            return (
                                                <ListboxOption key={streamingPlayer._id} value={streamingPlayer} className='px-2 py-1 flex items-center gap-2 hover:bg-sky-200 hover:cursor-pointer' >
                                                    {getSVGByPlayerType(streamingPlayer.type, 'size-4 text-sky-400')}
                                                    <span className="text-blue-400 text-sm">{streamingPlayer.nickname}</span>
                                                </ListboxOption>
                                            )
                                        })}

                                    </ListboxOptions>}
                                </Listbox>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-sky-500 text-sm font-semibold">Session Date Range</span>
                            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">

                                <div className="flex flex-col gap-1 w-full sm:w-1/2" >
                                    <span className="text-slate-800 dark:text-slate-200 text-xs">Start Date</span>
                                    <input type="date" value={firstSessionDate} onChange={(e) => { setFirstSessionDate(new Date(e.target.value).toISOString().split('T')[0]) }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200 px-2 py-1 rounded-sm text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>

                                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                                    <span className="text-slate-800 dark:text-slate-200 text-xs">End Date</span>
                                    <input type="date" value={lastSessionDate} onChange={(e) => { setLastSessionDate(new Date(e.target.value).toISOString().split('T')[0]) }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200 px-2 py-1 rounded-sm text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>

                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-sky-500 font-semibold text-sm">Charging Date Range</span>
                            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">

                                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                                    <span className="text-slate-800 dark:text-slate-200 text-xs">Start Date</span>
                                    <input type="date" value={chargingStartDate} onChange={(e) => { setChargingStartDate(new Date(e.target.value).toISOString().split('T')[0]) }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200 px-2 py-1 rounded-sm text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>

                                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                                    <span className="text-slate-800 dark:text-slate-200 text-xs">End Date</span>
                                    <input type="date" value={chargingEndDate} onChange={(e) => { setChargingEndDate(new Date(e.target.value).toISOString().split('T')[0]) }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200 px-2 py-1 rounded-sm text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>

                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-sky-500 font-semibold text-sm">Charging Time Range</span>
                            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">

                                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                                    <span className="text-slate-800 dark:text-slate-200 text-xs">Start Time</span>
                                    <input type="time" value={chargingStartTime} onChange={(e) => { setChargingStartTime(e.target.value) }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200 px-2 py-1 rounded-sm text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>

                                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                                    <span className="text-slate-800 dark:text-slate-200 text-xs">End Time</span>
                                    <input type="time" value={chargingEndTime} onChange={(e) => { setChargingEndTime(e.target.value) }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200 px-2 py-1 rounded-sm text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>

                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
                            <span className="text-sky-500 text-sm font-semibold">Charging Duration</span>

                            <div className="flex flex-row gap-2">
                                <span className={`hover:cursor-pointer bg-purple-500 text-slate-200 px-2 py-1 border-slate-800 dark:border-slate-200 outline-slate-800 dark:outline-slate-200 rounded-sm text-sm ${chargingDurationActive === "lte" ? "border-2 outline font-bold" : "border"} `} onClick={() => setChargingDurationActive("lte")}>{"<="}</span>
                                <span className={`hover:cursor-pointer bg-purple-500 text-slate-200 px-2 py-1 border-slate-800 dark:border-slate-200 outline-slate-800 dark:outline-slate-200 rounded-sm text-sm ${chargingDurationActive === "eq" ? "border-2 outline font-bold" : "border"} `} onClick={() => setChargingDurationActive("eq")}>=</span>
                                <span className={`hover:cursor-pointer bg-purple-500 text-slate-200 px-2 py-1 border-slate-800 dark:border-slate-200 outline-slate-800 dark:outline-slate-200 rounded-sm text-sm ${chargingDurationActive === "gte" ? "border-2 outline font-bold" : "border"} `} onClick={() => setChargingDurationActive("gte")}>{">="}</span>
                            </div>

                            <input type="number" inputMode="numeric" className="text-emerald-400 text-sm font-bold font-poppins w-auto border border-slate-800 dark:border-slate-200 px-2 py-1 outline outline-slate-800 dark:outline-slate-200 rounded-sm" min={0} max={1000} value={chargingDuration || ""} onChange={(e) => setChargingDuration(new Number(e.target.value))} placeholder="Duration" />
                        </div>

                        <div className="flex flex-row gap-2">
                            <button onClick={(e) => submitFilter(e)} className="px-2 py-1 w-1/2 bg-purple-500 text-stone-200 font-bold font-poppins text-sm rounded-sm">Apply</button>
                            <button onClick={(e) => { resetFilter(e) }} type="submit" className="px-2 py-1 w-1/2 bg-rose-400 text-stone-200 font-bold font-poppins text-sm rounded-sm">Reset</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}

export default ChargingFilter;
