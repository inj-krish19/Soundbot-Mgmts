import { useState } from "react";
import { ImCross } from "react-icons/im";
import { GiEarbuds } from "react-icons/gi";
import { BsEarbuds } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa6";

import { BACKEND_URL } from '@/store/UrlStore';
import Notification from '@/components/ui/Notification';
import { responseHandler, errorHandler } from '@/utils/response-handler';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

const getSVGByPlayerType = (type, className) => {

    type = type.toLowerCase()
    let component;
    if (type === "earphone") {
        component = <GiEarbuds size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    } else if (type === "earbud") {
        component = <BsEarbuds size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    } else {
        component = <FaHeadphones size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    }
    return component;
}

function CreatePlayer({ panel }) {

    const players = ['earbud', 'earphone', 'headphone'];
    const [info, setInfo] = useState({
        message: 'OP',
        type: ''
    });

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    const [company, setCompany] = useState('');
    const [type, setType] = useState(players[0]);

    const [wireless, setWireless] = useState(true);
    const [RGB, setRGB] = useState(false);


    const submitPlayer = async (e) => {

        try {

            e.preventDefault();
            let res = await fetch(`${BACKEND_URL}/player/`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name, nickname, company, type, wireless, RGB
                })
            });

            responseHandler(res.clone(), setInfo);
            let response = await res.json();

        } catch (err) {
            errorHandler(err, setInfo);
        }


    }


    return (
        <>
            <div className="fixed top-1/2 left-1/2 -translate-1/2  flex flex-col gap-8 w-3/4 md:w-1/3 h-auto bg-stone-300 dark:bg-stone-700 p-4 rounded-md z-100">

                <span className="text-sky-400 font-bold font-poppis text-lg">Create Player</span>

                <ImCross className="absolute top-3 right-3 text-rose-400" onClick={() => panel(false)} />
                <Notification info={info} />

                <form className="flex flex-col flex-wrap justify-around gap-4" onSubmit={(e) => { submitPlayer(e) }}>

                    <div className="flex flex-col justify-center gap-1">
                        <label htmlFor="name" className="text-slate-700 dark:text-slate-300 text-sm">Name</label>
                        <input type="text" name="name" id="name" placeholder="ex. Alright Echo 65" className="px-2 py-1 border-2 border-slate-100 outline-slate-100 text-slate-900 dark:text-slate-100 rounded-sm" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                        <label htmlFor="nickname" className="text-slate-700 dark:text-slate-300 text-sm">Nickname</label>
                        <input type="text" name="nickname" id="nickname" placeholder="ex. Echo" className="px-2 py-1 border-2 border-slate-100 outline-slate-100 text-slate-900 dark:text-slate-100 rounded-sm" value={nickname} onChange={(e) => { setNickname(e.target.value) }} />
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                        <label htmlFor="company" className="text-slate-700 dark:text-slate-300 text-sm">Company</label>
                        <input type="text" name="company" id="company" placeholder="ex. Sony" className="px-2 py-1 border-2 border-slate-100 outline-slate-100 text-slate-900 dark:text-slate-100 rounded-sm" value={company} onChange={(e) => { setCompany(e.target.value) }} />
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                        <label htmlFor="type" className="text-slate-700 dark:text-slate-300 text-sm">Type</label>
                        <Listbox value={type} onChange={setType} >
                            <ListboxButton className="px-4 py-2 border-2 border-slate-100 outline-slate-100 rounded-sm flex items-center gap-2 capitalize" id="type" name="type">
                                {getSVGByPlayerType(type, 'text-purple-400')}
                                <span className="text-fuchsia-400">{type}</span>
                            </ListboxButton>

                            <ListboxOptions className="border-2 border-slate-100 rounded-sm ">
                                {players.map((player) => (
                                    <ListboxOption
                                        key={player}
                                        value={player}
                                        className="px-4 py-2 flex items-center gap-2 hover:bg-pink-200 hover:cursor-pointer capitalize"
                                    >
                                        {getSVGByPlayerType(player, 'text-purple-400 ')}
                                        <span className="text-purple-500">{player}</span>
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Listbox>

                    </div>

                    <div className="flex flex-row justify-start items-center gap-3">

                        <div className="flex flex-row gap-2 ">
                            <label htmlFor="wireless" className="text-slate-800 dark:text-slate-200 " >Wireless</label>
                            <input type="checkbox" name="wireless" id="wireless" value="Wireless" checked={wireless} onChange={(e) => { setWireless(!wireless) }} />
                        </div>

                        <div className="flex flex-row gap-2 ">
                            <label htmlFor="rgb" className="text-slate-700 dark:text-slate-300 " >RGB</label>
                            <input type="checkbox" name="rgb" id="rgb" value="RGB" checked={RGB} onChange={(e) => { setRGB(!RGB); }} />
                        </div>
                    </div>

                    <button type="submit" className="p-2 bg-violet-500 text-slate-200 rounded-md font-bold font-poppins">Submit</button>

                </form>

            </div>
        </>
    )

}

export { getSVGByPlayerType };
export default CreatePlayer;