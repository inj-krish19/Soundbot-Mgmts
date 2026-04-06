import { useState } from "react";
import { ImCross } from "react-icons/im";


import Notification from "@/components/ui/Notification";
import { BACKEND_URL } from "@/store/UrlStore";
import { errorHandler, responseHandler } from "@/utils/response-handler";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { getSVGByDeviceType } from "@/utils/getSVG";

function CreateDevice({ panel }) {

    const devices = ['phone', 'tablet', 'desktop', 'others'];
    const [info, setInfo] = useState({
        message: '',
        type: ''
    });


    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    const [company, setCompany] = useState('');
    const [type, setType] = useState(devices[0]);


    const submitDevice = async (e) => {

        try {

            e.preventDefault();
            let res = await fetch(`${BACKEND_URL}/device/`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name, nickname, company, type
                }),
                credentials: "include"
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
            <div className="fixed top-1/2 left-1/2 -translate-1/2 flex flex-col gap-8 w-3/4 md:w-1/3 h-auto bg-stone-300 dark:bg-stone-700 p-4 rounded-md z-100">

                <span className="text-violet-500 font-bold font-poppins text-lg">Create Device</span>

                <ImCross className="absolute top-3 right-3 text-rose-400" onClick={() => { panel(false) }} />
                <Notification info={info} />

                <form className="flex flex-col flex-wrap justify-around gap-4" onSubmit={(e) => { submitDevice(e) }} >

                    <div className="flex flex-col justify-center gap-1">
                        <label htmlFor="name" className="text-slate-700 dark:text-slate-300 text-sm">Name</label>
                        <input type="text" name="name" id="name" placeholder="ex. Samsung S24" className="px-2 py-1 border-2 border-slate-100 outline-slate-100 text-slate-900 dark:text-slate-100 rounded-sm" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                        <label htmlFor="nickname" className="text-slate-700 dark:text-slate-300 text-sm">Nickname</label>
                        <input type="text" name="nickname" id="nickname" placeholder="ex. Sun S24" className="px-2 py-1 border-2 border-slate-100 outline-slate-100 text-slate-900 dark:text-slate-100 rounded-sm" value={name} onChange={(e) => { setNickname(e.target.value) }} />
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                        <label htmlFor="company" className="text-slate-700 dark:text-slate-300 text-sm">Company</label>
                        <input type="text" name="company" id="company" placeholder="ex. Samsung" className="px-2 py-1 border-2 border-slate-100 outline-slate-100 text-slate-900 dark:text-slate-100 rounded-sm" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                        <label htmlFor="type" className="text-sate-800 dark:text-slate-300 text-sm">Type</label>
                        <Listbox value={type} onChange={setType} >

                            <ListboxButton className="px-4 py-2 border-2 border-slate-100 outline-slate-100 rounded-sm flex gap-2 items-center capitalize" >
                                {getSVGByDeviceType(type, 'text-blue-400')}
                                <span className="text-sky-400 text-sm">{type}</span>
                            </ListboxButton>

                            <ListboxOptions className="border-2 border-slate-100 rounded-sm" >
                                {devices.map(device => {
                                    return (
                                        <ListboxOption
                                            key={device} value={device}
                                            className="px-4 py-2 rounded-sm flex gap-2 items-center capitalize hover:bg-sky-200 hover:cursor-pointer"
                                        >
                                            {getSVGByDeviceType(device, 'text-blue-400')}
                                            <span className="text-sky-400 text-sm">{device}</span>
                                        </ListboxOption>
                                    );
                                })}
                            </ListboxOptions>

                        </Listbox>
                    </div>

                    <button type="submit" className="p-2 bg-violet-500 text-slate-200 rounded-md font-bold font-poppins hover:cursor-pointer hover:bg-violet-600 hover:scale-101 transition">Submit</button>

                </form>

            </div>
        </>
    );

}

export default CreateDevice;
