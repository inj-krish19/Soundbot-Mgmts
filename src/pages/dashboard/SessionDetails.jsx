import { useParams } from "react-router";
import { cleanDate } from "@/utils/date";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler } from "@/utils/response-handler";

import Loading from "@/components/ui/Loading";
import NotFound from "@/pages/system/NotFound";
import Notification from "@/components/ui/Notification";
import UpdateSession from "@/components/session/UpdateSession";
import DeleteSession from "@/components/session/DeleteSession";
import SessionMiniCard from "@/components/session/SessionMiniCard";

import { IoMdTime } from "react-icons/io";
import { TiEquals } from "react-icons/ti";
import { eclipseNumber } from "@/utils/eclipse-text";
import { IoCalendarClear, IoPieChart } from "react-icons/io5";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";


function SessionDetails() {

    const params = useParams();
    const id = params.id;

    const [info, setInfo] = useState({
        message: '',
        type: ''
    });
    const [summary, setSummary] = useState({
        "time_of_usage": {
            title: "Time of Usage", component: <IoMdTime size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "session_trend": {
            title: "Session Trend", component: <TiEquals size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "same_date_last_usage": {
            title: "Last Date Session", component: <IoCalendarClear size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "duration_share": {
            title: "Duration Share", component: <IoPieChart size={24} className='text-teal-400 dark:text-slate-200' />,
        }
    });

    const [session, setSession] = useState(null);
    const [forbidden, setForbidden] = useState(false);

    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);


    const main = async () => {

        let res = await fetch(`${BACKEND_URL}/session/${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        if (res.status === 403) {
            setForbidden(true);
        }

        responseHandler(res.clone(), setInfo);

        let response = await res.json();

        response.data['volume'] = Math.round(response.data['volume'] * 100, 2);
        response.data['startDate'] = cleanDate(response.data['startDate']);
        response.data['endDate'] = cleanDate(response.data['endDate']);

        setSession(response.data);

    }


    const getSummary = async () => {

        let res = await fetch(`${BACKEND_URL}/dashboard/session/${id}`, {
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

        let sessionTrend = updatedSummary['session_trend'];
        switch (sessionTrend['data']) {
            case "neutral":
                sessionTrend['component'] = <TiEquals size={24} className='text-teal-400 dark:text-slate-200' />
                break;

            case "increase":
                sessionTrend['component'] = <FaArrowTrendUp size={24} className='text-teal-400 dark:text-slate-200' />
                break;

            case "decrease":
                sessionTrend['component'] = <FaArrowTrendDown size={24} className='text-teal-400 dark:text-slate-200' />
                break;
        }

        setSummary(updatedSummary);

    }



    useEffect(() => {

        try {
            main();
            getSummary();
        } catch (err) { }

    }, [])


    if (forbidden) return <NotFound />

    return (
        <>
            <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
                <Notification info={info} />

                {updateVisibility && <UpdateSession session={session} panel={setUpdateVisibility} />}
                {deleteVisibility && <DeleteSession session={session} panel={setDeleteVisibility} />}

                <div className="flex flex-col-reverse md:flex-col gap-6">


                    <div className="flex flex-row w-full flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">
                        {!session ? <Loading /> : <SessionMiniCard session={session} privilegeMenu={true} setSession={setSession} setUpdateVisibility={setUpdateVisibility} setDeleteVisibility={setDeleteVisibility} key={session._id} />}
                    </div>

                    <div className="flex flex-wrap flex-row gap-4 justify-center">
                        {Object.entries(summary).map(([index, summary]) => {
                            return (
                                <div className="flex flex-row py-2 px-4 gap-4 justify-around items-center border border-slate-200 dark:border-purple-400/20 rounded-md w-60" key={index}>
                                    {summary.component}
                                    <div className="flex flex-col">
                                        <span className='text-cyan-600 text-sm' >{summary.title}</span>
                                        <span className='text-sky-600 dark:text-purple-300 text-sm capitalize'><span className='font-bold font-poppins text-md'>{summary.type === "number" ? eclipseNumber(summary.data) : summary.data}</span>{summary.units}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </main>
        </>
    )
}

export default SessionDetails;
