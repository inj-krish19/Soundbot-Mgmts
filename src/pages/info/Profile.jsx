import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler } from "@/utils/response-handler";

import Loading from "@/components/ui/Loading";
import NotFound from "@/pages/system/NotFound";
import Notification from "@/components/ui/Notification";
import { eclipseNumber } from "@/utils/eclipse-text";

function Profile() {

    const [data, setData] = useState({});
    const [info, setInfo] = useState({
        message: '',
        type: ''
    });

    const main = async () => {

        let res = await fetch(`${BACKEND_URL}/user/me`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        responseHandler(res.clone(), setInfo);
        let response = await res.json();

        setData(response.data);
        console.log(response.data)

    }


    useEffect(() => {

        try {
            main();
        } catch (err) { }

    }, [])


    return (
        <>
            <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
                <Notification info={info} />

                <div className="flex flex-row gap-8 items-center bg-stone-300 dark:bg-stone-700 p-3 rounded-sm w-1/2">
                    <div className="flex">
                        <img src={`${BACKEND_URL}${data.profile_picture}`} className="size-28 rounded-full " />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-slate-800 dark:text-slate-200 text-sm">Name : </span>
                            <span className="text-slate-800 dark:text-slate-200 text-md">{data.name}</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-slate-800 dark:text-slate-200 text-sm">Email : </span>
                            <span className="text-slate-800 dark:text-slate-200 text-md">{data.email}</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-slate-800 dark:text-slate-200 text-sm">Nickname : </span>
                            <span className="text-slate-800 dark:text-slate-200 text-md">{data.nickname}</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-slate-800 dark:text-slate-200 text-sm">Country : </span>
                            <span className="text-slate-800 dark:text-slate-200 text-md">{data.country}</span>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}

export default Profile;
