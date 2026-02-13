import { useState, useEffect } from "react";

import { ImCross } from "react-icons/im";
import { cleanDate } from "../utils/date";
import { BACKEND_URL } from '../store/UrlStore';
import { getSVGByPlayerType } from "./CreatePlayer";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

function SessionFilter({ panelState, hoveredState, loadingState, setData }) {

    const [info, setInfo] = useState({
        message: '',
        type: ''
    })

    // player state handle
    const [player, setPlayer] = useState({ type: 'none', nickname: 'All Players Selected' });
    const [players, setPlayers] = useState([]);


    // start and end date handler
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // start and end time handler
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);


    // volume operator handler
    const [active, setActive] = useState("");

    // volume value handler
    const [volume, setVolume] = useState(null);


    const submitFilter = async (e) => {

        loadingState(true);
        e.preventDefault();

        let res = await fetch(`${BACKEND_URL}/session/filter/data`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                player: player._id || null, "dateRange": [startDate, endDate],
                "timeRange": [startTime, endTime], "volume": [active, volume / 100]
            }),
            credentials: "include"
        });

        let response = await res.json();
        console.log(response);

        for (let resp of response.data) {
            resp['startDate'] = cleanDate(resp['startDate']);
            resp['endDate'] = cleanDate(resp['endDate']);
        }

        setData(response.data)

        setTimeout(() => {
            panelState(false);

            setTimeout(() => { loadingState(false); }, 1500);

        }, 500)
        console.log(response);

    }


    const resetFilter = (e) => {

        setActive("");
        e.preventDefault();

        setPlayer('');
        setVolume("");

        setEndDate("");
        setStartDate("");

        setEndTime("");
        setStartTime("");
    }

    useEffect(() => {

        const getPlayers = async () => {

            let res = await fetch(`${BACKEND_URL}/player/`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            });
            let response = await res.json();
            console.log(response.data);

            setPlayers(response.data);

        }
        getPlayers();

    }, []);

    return (
        <>
            <div className="fixed top-1/2 left-1/2 -translate-1/2 w-3/4 md:w-1/3 h-auto flex flex-col bg-stone-300 dark:bg-stone-700 px-4 py-2 rounded-sm z-100">

                <ImCross className="absolute top-3 right-3 text-rose-400 " onClick={() => { panelState(false); hoveredState(false); }} />

                <div className="flex flex-col gap-2 ">

                    <div className="flex flex-col mb-2">
                        <span className="text-indigo-400 font-bold font-poppins text-md">Filter Panel</span>
                        <span className="text-rose-400 font-poppins text-xs">* Atleast one of the filter should be selected</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1 ">
                            <p className="text-emerald-400 text-sm font-semibold">Player</p>
                            <div className="flex flex-col gap-1">

                                <Listbox value={player} onChange={setPlayer}>

                                    {players.length === 0 && <span className="text-rose-400 text-sm">Please add streaming player first</span>}

                                    {players.length !== 0 && <ListboxButton className='px-2 py-1 border-2 border-slate-800 dark:border-slate-200 outline-slate-800 dark:outline-slate-200 rounded-sm flex items-center gap-2'>
                                        {player?.type !== 'none' && getSVGByPlayerType(player.type, 'size-4 text-emerald-400')}
                                        <span className="text-teal-400 text-sm">{player.nickname}</span>
                                    </ListboxButton>}

                                    {players.length !== 0 && <ListboxOptions className='outline-2 outline-slate-800 dark:outline-slate-200 rounded-sm'>
                                        <ListboxOption value={{ type: 'none', nickname: 'All Players Selected' }} className='px-2 py-1 flex items-center gap-2 hover:bg-emerald-200 hover:cursor-pointer'>
                                            <span className="text-teal-400 text-sm">All Players Selected</span>
                                        </ListboxOption>
                                        {players.map(streamingPlayer => {
                                            return (
                                                <ListboxOption key={streamingPlayer._id} value={streamingPlayer} className='px-2 py-1 flex items-center gap-2 hover:bg-emerald-200 hover:cursor-pointer'>
                                                    {getSVGByPlayerType(streamingPlayer.type, 'size-4 text-emerald-400')}
                                                    <span className="text-teal-400 text-sm">{streamingPlayer.nickname}</span>
                                                </ListboxOption>
                                            )
                                        })}
                                    </ListboxOptions>}
                                </Listbox>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-emerald-400 text-sm font-semibold">Date Range</p>
                            <div className="flex flex-row gap-2 justify-center items-center">

                                <div className="flex flex-col gap-1 w-1/2">
                                    <p className="text-slate-800 dark:text-slate-200 text-xs">Start Date</p>
                                    <input type="date" value={startDate} onChange={(e) => { setStartDate(new Date(e.target.value)?.toISOString()?.split('T')?.[0] || "") }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200 px-2 py-1 rounded-sm text-center text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>
                                <div className="flex flex-col gap-1 w-1/2">
                                    <p className="text-slate-800 dark:text-slate-200 text-xs">End Date</p>
                                    <input type="date" value={endDate} onChange={(e) => { setEndDate(new Date(e.target.value).toISOString().split('T')[0]) }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200  px-2 py-1 rounded-sm text-center text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-emerald-400 text-sm font-semibold">Time Range</p>
                            <div className="flex flex-row gap-2 justify-center">

                                <div className="flex flex-col gap-1 w-1/2">
                                    <p className="text-slate-800 dark:text-slate-200 text-xs">Start Time</p>
                                    <input type="time" value={startTime} onChange={(e) => { setStartTime(e.target.value) }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200  px-2 py-1 rounded-sm text-center text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>
                                <div className="flex flex-col gap-1 w-1/2">
                                    <p className="text-slate-800 dark:text-slate-200 text-xs">End Time</p>
                                    <input type="time" value={endTime} onChange={(e) => { setEndTime(e.target.value) }} className="border border-slate-800 dark:border-slate-200 outline outline-slate-800 dark:outline-slate-200  px-2 py-1 rounded-sm text-center text-slate-800 dark:text-slate-200 text-sm [color-scheme:light] dark:[color-scheme:dark]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 justify-between items-center">
                            <p className="text-emerald-400 text-sm font-semibold">Volume</p>

                            <div className="flex flex-row gap-2">
                                <span className={`hover:cursor-pointer bg-purple-500 text-slate-200 px-2 py-1 border-slate-800 dark:border-slate-200 outline-slate-800 dark:outline-slate-200 rounded-sm text-sm ${active === "lte" ? "border-2 outline font-bold" : "border"} `} onClick={() => setActive("lte")}>{"<="}</span>
                                <span className={`hover:cursor-pointer bg-purple-500 text-slate-200 px-2 py-1 border-slate-800 dark:border-slate-200 outline-slate-800 dark:outline-slate-200 rounded-sm text-sm ${active === "eq" ? "border-2 outline font-bold" : "border"} `} onClick={() => setActive("eq")}>=</span>
                                <span className={`hover:cursor-pointer bg-purple-500 text-slate-200 px-2 py-1 border-slate-800 dark:border-slate-200 outline-slate-800 dark:outline-slate-200 rounded-sm text-sm ${active === "gte" ? "border-2 outline font-bold" : "border"} `} onClick={() => setActive("gte")}>{">="}</span>
                            </div>

                            <input type="number" inputMode="numeric" className="text-emerald-400 text-sm font-bold font-poppins w-auto border border-slate-800 dark:border-slate-200 px-2 py-1 outline outline-slate-800 dark:outline-slate-200 rounded-sm" min={0} max={100} value={volume} onChange={(e) => setVolume(new Number(e.target.value))} placeholder="Volume" />
                        </div>

                        <div className="flex flex-row gap-2">
                            <button onClick={(e) => { submitFilter(e) }} className="px-2 py-1 w-1/2 bg-purple-500 text-stone-200 font-poppins font-bold text-sm rounded-sm">Apply</button>
                            <button onClick={(e) => { resetFilter(e) }} className="px-2 py-1 w-1/2 bg-rose-400 text-stone-200 font-poppins font-bold text-sm rounded-sm">Reset</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );

}

export default SessionFilter;