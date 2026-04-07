import { responseHandler } from "@/utils/response-handler";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import NotFound from "@/pages/system/NotFound";
import Loading from "@/components/ui/Loading";
import Notification from "@/components/ui/Notification";


import DeviceMiniCard from "@/components/device/DeviceMiniCard";
import UpdateDevice from "@/components/device/UpdateDevice";
import DeleteDevice from "@/components/device/DeleteDevice";


import { SiSession } from "react-icons/si";
import { LuActivity } from "react-icons/lu";
import { BACKEND_URL } from "@/store/UrlStore";
import { eclipseNumber } from "@/utils/eclipse-text";
import { IoCalendar, IoTrendingUp } from "react-icons/io5";


function DeviceDetails() {

    const params = useParams();
    const id = params.id;

    const [summary, setSummary] = useState({
        "yearly_device_sessions": {
            title: "Yearly Sessions", component: <SiSession size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "longest_yearly_session": {
            title: "Longest Session", component: <LuActivity size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "average_listen_time": {
            title: "Average Listen Time", component: <IoTrendingUp size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "yearly_listening_time": {
            title: "Yearly Listening Time", component: <IoCalendar size={24} className='text-teal-400 dark:text-slate-200' />,
        },
    });
    const [info, setInfo] = useState({
        'message': '',
        type: ''
    })

    const [device, setDevice] = useState(null);
    const [forbidden, setForbidden] = useState(false);

    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);


    const main = async () => {

        let res = await fetch(`${BACKEND_URL}/device/${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        responseHandler(res.clone(), setInfo);
        let response = await res.json();

        if (response.code === 403 || response.code === 401) {
            setForbidden(true);
        }

        setDevice(response?.data);

    }


    const getSummary = async () => {

        let res = await fetch(`${BACKEND_URL}/dashboard/device/${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        responseHandler(res.clone(), setInfo);
        let response = await res.json();

        const updatedSummary = { ...summary };
        for (let key in response.data) {
            updatedSummary[key] = {
                ...updatedSummary[key],
                data: response.data[key]['data'],
                type: response.data[key]['type'],
                units: response.data[key]['units'],
            }
        }

        setSummary(updatedSummary);

    }


    useEffect(() => {
        try {
            main();
            getSummary();
        } catch (err) { }
    }, []);

    if (forbidden) return <NotFound />

    return (
        <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
            <Notification info={info} />

            {updateVisibility && <UpdateDevice device={device} panel={setUpdateVisibility} />}
            {deleteVisibility && <DeleteDevice device={device} panel={setDeleteVisibility} />}


            <div className="flex flex-col-reverse md:flex-col gap-6">

                <div className="flex flex-row w-full flex-wrap gap-8 md:px-8 py-4 justify-around">
                    {!device ? <Loading /> : <DeviceMiniCard device={device} privilegeMenu={true} setDevice={setDevice} setUpdateVisibility={setUpdateVisibility} setDeleteVisibility={setDeleteVisibility} />}
                </div>

                <div className="flex flex-wrap flex-row gap-4 justify-center">
                    {Object.entries(summary).map(([index, summary]) => {
                        return (
                            <div className="flex flex-row py-2 px-4 gap-4 justify-around items-center border border-slate-200 dark:border-purple-400/20 rounded-md w-60" key={index}
                            >
                                {summary.component}
                                <div className="flex flex-col">
                                    <span className="text-cyan-600 text-sm">{summary.title}</span>
                                    <span className="text-sky-600 dark:text-purple-300 text-sm capitalize"><span className="font-bold font-poppins text-md">{summary.type === "number" ? eclipseNumber(summary.data) : summary.data}</span>{summary.units}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>


            </div>

        </main>
    );

}

export default DeviceDetails;
