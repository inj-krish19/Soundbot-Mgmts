import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { getSVGByDeviceType, getSVGByPlayerType } from '@/utils/getSVG'
import Notification from "@/components/ui/Notification";

import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler, errorHandler } from '@/utils/response-handler';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

function CreateSession({ panel }) {

    const [device, setDevice] = useState(null);
    const [devices, setDevices] = useState([]);

    const [player, setPlayer] = useState(null);
    const [players, setPlayers] = useState([]);

    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

    const [startTime, setStartTime] = useState(new Date().toISOString().split('T')[1].substring(0, 5));
    const [endTime, setEndTime] = useState(new Date().toISOString().split('T')[1].substring(0, 5));

    const [volume, setVolume] = useState(70);
    const [note, setNote] = useState('');

    const [info, setInfo] = useState({
        message: '',
        type: ''
    });


    const getPlayers = async () => {
        let response = await fetch(`${BACKEND_URL}/player/`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: 'include'
        });

        let res = await response.json();

        setPlayers(res.data);
        setPlayer(res.data?.[0] || null);
    }

    const getDevices = async () => {
        let response = await fetch(`${BACKEND_URL}/device/`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: 'include'
        });

        let res = await response.json();

        setDevices(res.data);
        setDevice(res.data?.[0] || null);
    }


    useEffect(() => {

        try {

            (async () => {

                getPlayers();
                getDevices();

            })();

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }, []);


    const submitSession = async (e) => {

        try {

            e.preventDefault();

            let res = await fetch(`${BACKEND_URL}/session/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    player: player._id, device: device._id, startDate, endDate, startTime, endTime, volume: volume / 100, note
                })
            });

            responseHandler(res.clone(), setInfo);
            let response = await res.json();

            setTimeout(() => {
                panel(false);
            }, 1000);

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }


    return (
        <>
            <div className="fixed top-1/2 left-1/2 -translate-1/2  flex flex-col gap-8 w-3/4 md:w-1/3 h-auto bg-stone-300 dark:bg-stone-700 rounded-md p-4 z-100">

                <span className="text-emerald-400 text-lg font-bold">Create Session</span>

                <ImCross className="absolute top-3 right-3 text-rose-400" onClick={() => { panel(false); }} />
                <Notification info={info} />

                <div className="flex flex-col items-center gap-4 ">

                    <form className="flex flex-col justify-around gap-4 w-full" onSubmit={(e) => { submitSession(e) }}>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="player" className="text-slate-700 dark:text-slate-300 text-sm">Player</label>
                            <Listbox value={player} onChange={setPlayer}>

                                {(!player || player.length === 0) && <span className="text-rose-500 text-md">Please add streaming player first</span>}

                                {player && <ListboxButton className="px-4 py-2 border-2 border-slate-100 outline-slate-100 rounded-sm flex items-center gap-2 ">
                                    {getSVGByPlayerType(player.type, 'text-purple-400')}
                                    <span className="text-fuchsia-400">{player.nickname}</span>
                                </ListboxButton>}


                                {players.length !== 0 && <ListboxOptions className='border-2 border-slate-100 rounded-sm'>
                                    {players.map(streamingPlayer => {
                                        return (
                                            <ListboxOption key={streamingPlayer._id} value={streamingPlayer} className='px-4 py-2 flex items-center gap-2 hover:bg-pink-200 hover:cursor-pointer'>
                                                {getSVGByPlayerType(streamingPlayer.type, 'text-purple-400')}
                                                <span className="text-purple-500 ">{streamingPlayer.nickname}</span>
                                            </ListboxOption>
                                        )
                                    })}
                                </ListboxOptions>}
                            </Listbox>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="device" className="text-slate-700 dark:text-slate-300 text-sm">Device</label>
                            <Listbox value={device} onChange={setDevice}>

                                {(!device || devices.length === 0) && <span className="text-rose-500 text-md">Please add device first</span>}

                                {device && <ListboxButton className="px-4 py-2 border-2 border-slate-100 outline-slate-100 rounded-sm flex items-center gap-2 ">
                                    {getSVGByDeviceType(device.type, 'text-indigo-400')}
                                    <span className="text-indigo-400">{device.nickname}</span>
                                </ListboxButton>}

                                {devices.length !== 0 && <ListboxOptions className='border-2 border-slate-100 rounded-sm'>
                                    {devices.map(digitalDevice => {
                                        return (
                                            <ListboxOption key={digitalDevice._id} value={digitalDevice} className='px-4 py-2 flex items-center gap-2 hover:bg-sky-200 hover:cursor-pointer'>
                                                {getSVGByDeviceType(digitalDevice.type, 'text-indigo-400')}
                                                <span className="text-indigo-500 ">{digitalDevice.nickname}</span>
                                            </ListboxOption>
                                        )
                                    })}
                                </ListboxOptions>}
                            </Listbox>
                        </div>

                        <div className="flex flex-col gap-1 ">
                            <label htmlFor="startDate" className="text-slate-700 dark:text-slate-300 text-sm ">Start Date</label>
                            <input type="date" name="startDate" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark] " />
                        </div>

                        <div className="flex flex-col gap-1 ">
                            <label htmlFor="endDate" className="text-slate-700 dark:text-slate-300 text-sm">End Date</label>
                            <input type="date" name="endDate" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark] w-fill" />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full">
                            <div className="flex flex-col gap-1 w-full sm:w-1/2">
                                <label htmlFor="startTime" className="text-slate-700 dark:text-slate-300 text-sm">Start Time</label>
                                <input type="time" name="startTime" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-00 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                            </div>

                            <div className="flex flex-col gap-1 w-full sm:w-1/2">
                                <label htmlFor="endTime" className="text-slate-700 dark:text-slate-300 text-sm">End Time</label>
                                <input type="time" name="endTime" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="volume" className="text-slate-700 dark:text-slate-300 text-sm">Volume</label>
                            <input type="number" name="volume" id="volume" min={0} max={100} inputMode="numeric" pattern="[0-9]*" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="note" className="text-slate-700 dark:text-slate-300 text-sm">Note</label>
                            <input type="text" name="note" id="note" value={note} onChange={(e) => setNote(e.target.value)} className="px-2 py-1 border-2 border-slate-200 outline-slate-200 rounded-sm text-slate-800 dark:text-slate-200" placeholder="ex. Listening Eminem" />
                        </div>

                        <button type="submit" className="p-2 bg-violet-500 text-slate-200 rounded-md font-bold font-poppins">Submit</button>

                    </form>

                </div >

            </div >
        </>
    )

}

export default CreateSession;
