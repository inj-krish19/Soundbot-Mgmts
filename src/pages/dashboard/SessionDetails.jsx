import { useParams } from "react-router";
import { useEffect, useState } from "react";

import Loading from "@/components/ui/Loading";
import NotFound from "@/pages/system/NotFound";
import Notification from "@/components/ui/Notification";

import UpdateSession from "@/components/session/UpdateSession";
import DeleteSession from "@/components/session/DeleteSession";
import SessionMiniCard from "@/components/session/SessionMiniCard";
import SessionLoading from "@/components/charts_loading/SessionLoading";

import { MdList } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { TiEquals } from "react-icons/ti";
import { IoCalendarClear, IoGrid, IoPieChart } from "react-icons/io5";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import { cleanDate } from "@/utils/date";
import { BACKEND_URL } from "@/store/UrlStore";
import { eclipseNumber } from "@/utils/eclipse-text";
import { responseHandler } from "@/utils/response-handler";
import { XAxis, YAxis, Line, Label, LineChart, Tooltip, ResponsiveContainer } from 'recharts'


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

    const [monthlyTrend, setMonthlyTrend] = useState([]);
    const [yearlyDateTrend, setYearlyDateTrend] = useState([]);
    const [view, setView] = useState(localStorage.getItem("preference") || 'grid');


    const main = async () => {

        let res = await fetch(`${BACKEND_URL}/session/${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        responseHandler(res.clone(), setInfo);
        let response = await res.json();

        console.log(response);
        if (response.code === 403 || response.code === 401) {
            setForbidden(true);
        }

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


    const getChartsInfo = async () => {

        try {

            let res = await fetch(`${BACKEND_URL}/analytics/session/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            });

            let response = await res.json();

            setMonthlyTrend(response?.data?.['monthly-trend'] || []);
            setYearlyDateTrend(response?.data?.['yearly-date-trend'] || []);

        } catch (err) {
            setMonthlyTrend([]);
            setYearlyDateTrend([]);
        }

    }


    useEffect(() => {

        try {
            main();
            getSummary();
            getChartsInfo();
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

                <div className="flex flex-col gap-4 w-full h-auto justify-content px-4 py-4">

                    <div className="flex flex-row gap-2 justify-between items-center bg-stone-300 dark:bg-stone-700 px-4 py-2 rounded-md">
                        <span className='font-poppins text-sky-400 font-bold text-xl'>Session Analytical Charts</span>
                        <div className="hidden md:flex flex-row gap-2 items-center">
                            <MdList onClick={() => { localStorage.setItem("preference", "list"); setView("list"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-sky-300 p-1 ${view === "list" ? 'bg-sky-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                            <IoGrid onClick={() => { localStorage.setItem("preference", "grid"); setView("grid"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-emerald-300 p-1 ${view === "grid" ? 'bg-emerald-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 justify-center items-center">

                        <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                            <span className="font-oswald font-bold text-md tracking-wide text-purple-400">{new Date(session?.startDate).toLocaleString('en-US', { month: 'long' })} Trend</span>

                            {monthlyTrend.length === 0 ? <SessionLoading />
                                : <ResponsiveContainer >
                                    <LineChart data={monthlyTrend} >
                                        <XAxis dataKey="date" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }} >
                                            <Label value='Duration' offset={-2} position='insideBottom' style={{ fontSize: 12 }} />
                                        </XAxis>
                                        <YAxis tick={{ fontSize: 12 }}>
                                            <Label value='Duration' angle={-90} offset={20} position='insideLeft' style={{ fontSize: 12 }} />
                                        </YAxis>

                                        <Line type="monotone" dataKey="duration" stroke="var(--color-violet-600)" strokeWidth={2} />
                                        <Tooltip content={TrendToolTip} cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            }
                        </div>



                        <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                            <span className="font-oswald font-bold text-md tracking-wide text-purple-400">Yearly {new Date(session?.startDate).getDate()} Date Trend</span>

                            {yearlyDateTrend.length === 0 ? <SessionLoading />
                                : <ResponsiveContainer >
                                    <LineChart data={yearlyDateTrend} >
                                        <XAxis dataKey="date" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }} >
                                            <Label value='Duration' offset={-2} position='insideBottom' style={{ fontSize: 12 }} />
                                        </XAxis>
                                        <YAxis tick={{ fontSize: 12 }}>
                                            <Label value='Duration' angle={-90} offset={20} position='insideLeft' style={{ fontSize: 12 }} />
                                        </YAxis>

                                        <Line type="monotone" dataKey="duration" stroke="var(--color-fuchsia-600)" strokeWidth={2} />
                                        <Tooltip content={TrendToolTip} cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            }
                        </div>

                    </div>
                </div>

            </main>
        </>
    )
}


const TrendToolTip = ({ active, payload, label }) => {

    return (
        <div className='px-2 py-1 bg-white rounded-sm '>
            <p className='text-sm text-violet-600'>{payload[0]?.payload?.['date']}</p>
            <p className='text-sm text-violet-600'>Duration : {payload[0]?.payload?.['duration']}</p>
            <p className='text-sm text-indigo-500'>Start Time : {payload[0]?.payload?.['startTime']}</p>
            <p className='text-sm text-indigo-500'>End Time : {payload[0]?.payload?.['endTime']}</p>
        </div>
    );

}


export default SessionDetails;