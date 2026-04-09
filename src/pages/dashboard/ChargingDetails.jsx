import { useParams } from "react-router";
import { cleanDate } from "@/utils/date";
import { useEffect, useState } from "react";


import Loading from "@/components/ui/Loading";
import NotFound from "@/pages/system/NotFound";
import Notification from "@/components/ui/Notification";

import UpdateCharging from "@/components/charging/UpdateCharging";
import DeleteCharging from "@/components/charging/DeleteCharging";
import SessionMiniCard from "@/components/session/SessionMiniCard";
import ChargingMiniCard from "@/components/charging/ChargingMiniCard";

import { FaListOl } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { RiNumbersFill } from "react-icons/ri";
import { IoTrendingUp } from "react-icons/io5";
import { PiArrowsHorizontalBold } from "react-icons/pi";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";

import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler } from "@/utils/response-handler";
import { eclipseNumber } from "@/utils/eclipse-text";


function ChargingDetails() {

    const params = useParams();
    const id = params.id;

    const [info, setInfo] = useState({
        message: '',
        type: ''
    });
    const [summary, setSummary] = useState({
        "total_days": {
            title: "Playback Interval", component: <PiArrowsHorizontalBold size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "playback_time": {
            title: "Playback Time", component: <MdAccessTime size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "total_sessions": {
            title: "Total Sessions", component: <FaListOl size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "biggest_session": {
            title: "Biggest Session", component: <RiNumbersFill size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "longest_charging_streak": {
            title: "Longest Streak", component: <IoTrendingUp size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "average_session_degrade_rate": {
            title: "Degrade Rate", component: <HiMiniArrowTrendingDown size={24} className='text-teal-400 dark:text-slate-200' />,
        }
    });

    const [sessions, setSessions] = useState([]);
    const [charging, setCharging] = useState(null);
    const [forbidden, setForbidden] = useState(false);

    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);

    const fetchCharging = async () => {

        let res = await fetch(`${BACKEND_URL}/charging/${id}`, {
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
        } else {
            response.data['firstSessionDate'] = cleanDate(response.data['firstSessionDate'])
            response.data['lastSessionDate'] = cleanDate(response.data['lastSessionDate'])
            response.data['chargingStartDate'] = cleanDate(response.data['chargingStartDate'])
            response.data['chargingEndDate'] = cleanDate(response.data['chargingEndDate'])
        }

        setCharging(response.data);

    }


    const fetchSessions = async () => {

        let res = await fetch(`${BACKEND_URL}/charging/${id}/sessions`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        responseHandler(res.clone(), setInfo);
        let response = await res.json();

        for (let resp of response.data) {
            resp['startDate'] = cleanDate(resp['startDate']);
            resp['endDate'] = cleanDate(resp['endDate']);
            resp['volume'] = Math.round(resp['volume'] * 100);
        }
        console.log(response.data);
        setSessions(response.data.reverse());

    }


    const getSummary = async () => {

        let res = await fetch(`${BACKEND_URL}/dashboard/charging/${id}`, {
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
                data: response.data[key].data,
                type: response.data[key].type,
                units: response.data[key].units
            }
        }

        setSummary(updatedSummary);

    }

    useEffect(() => {
        try {
            fetchCharging();
            getSummary();
            fetchSessions();
        } catch (err) { }
    }, [])

    if (forbidden) return <NotFound />

    return (
        <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
            <Notification info={info} />

            {updateVisibility && <UpdateCharging charging={charging} panel={setUpdateVisibility} />}
            {deleteVisibility && <DeleteCharging charging={charging} panel={setDeleteVisibility} />}


            <div className="flex flex-col-reverse md:flex-col gap-6">
                <div className="flex flex-row w-full flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">
                    {!charging ? <Loading /> : <ChargingMiniCard charging={charging} previlegeMenu={true} setCharging={setCharging} setUpdateVisibility={setUpdateVisibility} setDeleteVisibility={setDeleteVisibility} />}
                </div>

                <div className="flex flex-row flex-wrap gap-4 justify-center">
                    {Object.entries(summary).map(([index, summary]) => {
                        return (
                            <div className="flex flex-row py-2 px-4 gap-4 justify-around items-center border border-slate-200 dark:border-purple-400/20 rounded-md w-60" key={index} >
                                {summary.component}
                                <div className="flex flex-col">
                                    <span className='text-cyan-600 text-sm' >{summary.title}</span>
                                    <span className='text-sky-600 dark:text-purple-300 text-sm capitalize'><span className='font-bold font-poppins text-md'>{summary.type === "number" ? eclipseNumber(summary.data) : summary.data}</span>{summary.units}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col w-full flex-wrap gap-8 px-4 md:px-8 py-4 justify-around items-center mt-4">
                <span className="text-indigo-400 text-2xl font-bold font-poppins uppercase">Sessions</span>

                {sessions.length === 0 ? <Loading /> :
                    sessions.map(session => {
                        return <SessionMiniCard session={session} privilegeMenu={false} key={session._id} />
                    })
                }
            </div>
        </main>
    );
}

export default ChargingDetails;
