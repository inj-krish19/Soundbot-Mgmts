import { Link } from 'react-router'
import React, { useEffect, useState } from 'react'

import { SiSession } from 'react-icons/si'
import { SiAudiomack } from 'react-icons/si'
import { GoArrowUpRight } from 'react-icons/go'
import { BsCalendarWeek } from 'react-icons/bs'
import { MdCalendarMonth, MdAudiotrack, MdList } from 'react-icons/md'

import CreatePlayer from '@/components/player/CreatePlayer'
import CreateSession from '@/components/session/CreateSession'
import CreateCharging from '@/components/charging/CreateCharging'
import { getSVGByPlayerType } from '@/components/player/CreatePlayer'

import { BACKEND_URL } from '@/store/UrlStore'
import { eclipseNumber } from '@/utils/eclipse-text'
import { errorHandler, responseHandler } from '@/utils/response-handler'

import { XAxis, YAxis, Line, Legend, Label, LineChart, Tooltip, BarChart, Bar, Cell, ResponsiveContainer } from 'recharts'
import { IoGrid } from 'react-icons/io5'


function Dashboard() {






    const [summary, setSummary] = useState({
        "todays_usage": {
            title: "Todays' Usage", component: <MdAudiotrack size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "weekly_usage": {
            title: "Weekly Usage", component: <BsCalendarWeek size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "monthly_usage": {
            title: "Monthly Usage", component: <MdCalendarMonth size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "last_session": {
            title: "Last Session", component: <SiSession size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "last_charging_playback": {
            title: "Playback Time", component: <SiAudiomack size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "buddy_player": {
            title: "Buddy Player", component: getSVGByPlayerType('headphone', 'text-teal-400 dark:text-slate-200')
        }
    });
    const [players, setPlayers] = useState([]);

    const quickActions = [
        { title: 'Prediction', link: '/prediction' },
        { title: 'Recommedation', link: '/recommendation' },
        { title: 'AI Insights', link: '/insights' },
    ];
    const [info, setInfo] = useState({
        message: '',
        type: ''
    })

    const [playerPanel, setPlayerPanel] = useState(false);
    const [sessionPanel, setSessionPanel] = useState(false);
    const [chargingPanel, setChargingPanel] = useState(false);


    const [dailyUsageInfo, setDailyUsageInfo] = useState([]);
    const [sessionDurationInfo, setSessionDurationInfo] = useState([]);


    // Charts relates states

    const [hoverGap, setHoverGap] = useState(12);
    const [activeIndex, setActiveIndex] = useState(null);



    const [view, setView] = useState('list');


    const getPlayers = async () => {

        let res = await fetch(`${BACKEND_URL}/player/`, {
            method: 'GET',
            headers: {
                'content-type': "application/json"
            },
            credentials: "include",
        });

        let response = await res.json();
        setPlayers(response.data);

    }


    const getChartsInfo = async () => {

        try {

            let res = await fetch(`${BACKEND_URL}/analytics/`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include"
            });

            let response = await res.json();

            setDailyUsageInfo(response?.data?.['daily-usage-trend'])
            setSessionDurationInfo(response?.data?.['session-duration-distribution'])

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }


    useEffect(() => {


        try {

            const main = async () => {

                let res = await fetch(`${BACKEND_URL}/dashboard/`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
                    },
                    credentials: "include"
                });

                responseHandler(res.clone(), setInfo);
                let response = await res.json();

                for (let key in response.data) {
                    summary[key]['data'] = response.data[key]['data'];
                    summary[key]['type'] = response.data[key]['type'];
                    summary[key]['units'] = response.data[key]['units'];
                }

                setSummary(summary);
            }
            main();

        } catch (err) {
            errorHandler(err, setInfo);
        }


        getPlayers();
        getChartsInfo();

    }, [])

    const nickname = 'nick';
    const player = "headphone";


    useEffect(() => {
        console.log(dailyUsageInfo, sessionDurationInfo)
    }, [dailyUsageInfo, sessionDurationInfo]);


    return (
        <>
            <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
                {playerPanel && <CreatePlayer panel={setPlayerPanel} />}
                {sessionPanel && <CreateSession panel={setSessionPanel} />}
                {chargingPanel && <CreateCharging panel={setChargingPanel} />}

                <div className="flex flex-col gap-8">

                    <div className="flex flex-col gap-1">
                        <p className='text-slate-800 dark:text-slate-200 text-sm'>Welcome,
                            <span className='font-bold text-md'>{" " + nickname}</span>
                        </p>
                        <p className='text-slate-700 dark:text-slate-300 text-sm'>Track your audio usage and insights.</p>
                    </div>

                    <div className="flex flex-wrap flex-row w-full gap-4 justify-center">
                        {Object.entries(summary).map(([index, summary]) => {
                            return (
                                <div className="flex flex-row py-2 px-4 gap-4 justify-around items-center border border-slate-200 dark:border-purple-400/20 rounded-md w-60" key={index}>
                                    {summary.component}
                                    <div className="flex flex-col">
                                        <p className='text-cyan-600 text-sm'>{summary.title}</p>
                                        <p className='text-sky-600 dark:text-purple-300 text-sm'><span className='font-bold font-poppins text-md'>{summary.type === "number" ? eclipseNumber(summary.data) : summary.data}</span>{summary.units}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <div className="flex flex-col-reverse md:flex-row gap-4 px-4 py-2">


                    <div className="flex flex-col w-full md:w-1/2 gap-2 p-4 justify-around ">
                        <span className='text-indigo-700 font-bold uppercase'>Streaming Players</span>

                        <div className="flex flex-row flex-wrap gap-2 p-2 justify-around items-center">
                            {players.map(streamingPlayer => {
                                return (
                                    <>
                                        <div className="flex flex-col gap-1 border border-emerald-400 outline outline-emerald-400 hover:outline-2 rounded-md px-3 py-1 size-48 items-center bg-stone-200 dark:bg-stone-800" key={streamingPlayer.nickname}>
                                            <img src={`/player/${streamingPlayer.type}.png`} className='size-36 ' />
                                            <div className="flex flex-col gap-1 items-center">
                                                <span className='text-violet-400 text-md font-poppins font-bold'>{streamingPlayer.nickname}</span>
                                                {/* <span className='text-emerald-400 text-xs uppercase font-bold '>{streamingPlayer.type}</span> */}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col px-4 py-2 gap-8">
                        <span className='uppercase font-bold text-slate-800 dark:text-slate-200'>Quick Actions</span>

                        <div className="flex flex-col">
                            {quickActions.map(action => {
                                return (
                                    <>
                                        <Link to={action.link} className='text-slate-700 dark:text-slate-300 text-sm flex flex-row gap-2 hover:text-slate-800 hover:dark:text-slate-200 items-center' key={action.title} >
                                            {action.title}
                                            <GoArrowUpRight className='text-slate-800 dark:text-slate-200' />
                                        </Link>
                                    </>
                                );
                            })}
                        </div>

                        <div className="flex flex-row flex-wrap gap-4 ">

                            <button className='bg-sky-400 text-slate-200 font-bold px-2 py-1 rounded-sm hover:cursor-pointer' onClick={() => {
                                setPlayerPanel(true);
                                setSessionPanel(false);
                                setChargingPanel(false);
                            }} >Create Player</button>
                            <button className='bg-emerald-400 text-slate-200 font-bold px-2 py-1 rounded-sm hover:cursor-pointer' onClick={() => {
                                setPlayerPanel(false);
                                setSessionPanel(true);
                                setChargingPanel(false);
                            }} >Create Session</button>
                            <button className='bg-rose-400 text-slate-200 font-bold px-2 py-1 rounded-sm hover:cursor-pointer' onClick={() => {
                                setPlayerPanel(false);
                                setSessionPanel(false);
                                setChargingPanel(true);
                            }} >Create Charging</button>

                        </div>

                    </div>


                </div>


                <div className="flex flex-col gap-4 w-full h-auto justify-content px-4 py-4">

                    <div className="flex flex-row gap-2 justify-between items-center bg-stone-300 dark:bg-stone-700 px-4 py-2 rounded-md">
                        <span className='font-poppins text-emerald-400 font-bold text-xl'>Analytical Charts</span>
                        <div className="flex flex-row gap-2 items-center">
                            <MdList onClick={() => { setView("list"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-sky-300 p-1 ${view === "list" ? 'bg-sky-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                            <IoGrid onClick={() => { setView("grid"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-emerald-300 p-1 ${view === "grid" ? 'bg-emerald-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 justify-center items-center">

                        <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-72 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                            <span className="font-oswald font-bold text-md tracking-wide text-sky-400">Session Duration Distribution</span>

                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sessionDurationInfo} barCategoryGap={hoverGap}  >
                                    <XAxis dataKey="key" tick={{ fontSize: 12 }} >
                                        <Label offset={-2} value="Session Duration Distribution" position="insideBottom" style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }} >
                                        <Label angle={-90} offset={20} value="Count" position="insideLeft" style={{ fontSize: 12 }} />
                                    </YAxis>
                                    <Tooltip cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]} onMouseLeave={() => setActiveIndex(null)} >
                                        {sessionDurationInfo.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    index === activeIndex
                                                        ? "var(--color-sky-400)"
                                                        : "var(--color-teal-400)"
                                                }
                                                onMouseEnter={() => { setActiveIndex(index); setHoverGap(4); }}
                                                onMouseLeave={() => { setHoverGap(12) }}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>


                        <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-72 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                            <span className="font-oswald font-bold text-md tracking-wide text-sky-400">Daily Usage Trend</span>

                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={dailyUsageInfo}
                                >
                                    <XAxis dataKey="day" tick={{ fontSize: 12 }}>
                                        <Label value='Duration' offset={-2} position='insideBottom' style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }}>
                                        <Label value='Duration' angle={-90} offset={20} position='insideLeft' style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Tooltip cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                    <Line type="monotone" dataKey="duration" stroke="var(--color-emerald-500)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>


            </main>
        </>
    );

}

export default Dashboard;