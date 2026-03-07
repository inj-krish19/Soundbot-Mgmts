import { Link } from 'react-router'
import { IoGrid } from 'react-icons/io5'
import { LuPencil } from 'react-icons/lu'
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
import { XAxis, YAxis, Line, Legend, Label, LineChart, Tooltip, BarChart, Bar, Cell, ResponsiveContainer, PieChart, Pie, Sector, CartesianGrid, AreaChart, Area } from 'recharts'

import useAuth from '@/store/AuthStore';
import details from '@/store/DetailsStore'
import { BACKEND_URL } from '@/store/UrlStore'
import { eclipseNumber } from '@/utils/eclipse-text'
import { errorHandler, responseHandler } from '@/utils/response-handler'
import UpdatePlayer from '@/components/player/UpdatePlayer'
import Notification from '@/components/ui/Notification'
import { FaTrashAlt } from 'react-icons/fa'
import DeletePlayer from '@/components/player/DeletePlayer'



function Dashboard() {


    const auth = useAuth((state) => state.auth);
    const nickname = details((state) => state.nickname);
    const setNickname = details((state) => state.setNickname);

    if (!auth) {
        window.location.href = '/';
    }



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

    const [playerUsageInfo, setPlayerUsageInfo] = useState([]);
    const [timeOfDayInfo, setTimeOfDayInfo] = useState([]);

    const [monthlyUsageInfo, setMonthlyUsageInfo] = useState([]);
    const [sessionTotalUsageInfo, setSessionTotalUsageInfo] = useState([]);

    const [averageSessionInfo, setAverageSessionInfo] = useState([]);
    const [cumulativeUsageInfo, setCumulativeUsageInfo] = useState([]);

    // Charts relates states

    const [sessionBarGap, setSessionBarGap] = useState(4);
    const [sessionIndex, setSessionIndex] = useState(null);

    const [timeBarGap, setTimeBarGap] = useState(4);
    const [timeIndex, setTimeIndex] = useState(null);

    const [totalUsageBarGap, setTotalUsageBarGap] = useState(4);
    const [totalUsageIndex, setTotalUsageIndex] = useState(null);

    const [player, setPlayer] = useState(null);
    const [view, setView] = useState(localStorage.getItem("preference") || 'grid');

    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);



    const getMe = async () => {

        let res = await fetch(`${BACKEND_URL}/user/me`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        let response = await res.json();
        setNickname(response?.['data']?.['nickname']);

    }


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


            setPlayerUsageInfo(response?.data?.['player-usage-distribution'])
            setTimeOfDayInfo(response?.data?.['time-of-day'])


            setMonthlyUsageInfo(response?.data?.['monthly-usage-trend'])
            setSessionTotalUsageInfo(response?.data?.['session-total-usage'])


            setAverageSessionInfo(response?.data?.['average-session-duration'])
            setCumulativeUsageInfo(response?.data?.['cumulative-usage'])


        } catch (err) {
            setDailyUsageInfo([])
            setSessionDurationInfo([])


            setPlayerUsageInfo([])
            setTimeOfDayInfo([])


            setMonthlyUsageInfo([])
            setSessionTotalUsageInfo([])


            setAverageSessionInfo([])
            setCumulativeUsageInfo([])

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
            getMe();

        } catch (err) {
            errorHandler(err, setInfo);
        }


        getPlayers();
        getChartsInfo();

    }, [])


    const COLORS = ['var(--color-sky-300)', 'var(--color-teal-400)', 'var(--color-purple-400)', 'var(--color-rose-400)', 'var(--color-emerald-400)', 'var(--color-indigo-400)', 'var(--color-orange-400)',]



    return (
        <>
            <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
                {playerPanel && <CreatePlayer panel={setPlayerPanel} />}
                {sessionPanel && <CreateSession panel={setSessionPanel} />}
                {chargingPanel && <CreateCharging panel={setChargingPanel} />}

                {updateVisibility && <UpdatePlayer player={player} panel={setUpdateVisibility} />}
                {deleteVisibility && <DeletePlayer player={player} panel={setDeleteVisibility} />}
                <Notification info={info} />

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
                                    <div className="relative flex flex-col gap-1 border border-emerald-400 outline outline-emerald-400 hover:outline-2 rounded-md px-3 py-1 size-48 items-center bg-stone-200 dark:bg-stone-800" key={streamingPlayer._id}>
                                        <img src={`/player/${streamingPlayer.type}.png`} className='size-36 ' />
                                        <div className="flex flex-col gap-1 items-center">
                                            <span className='text-violet-400 text-md font-poppins font-bold'>{streamingPlayer.nickname}</span>
                                            {/* <span className='text-emerald-400 text-xs uppercase font-bold '>{streamingPlayer.type}</span> */}
                                        </div>

                                        <div className="absolute flex flex-col gap-2 top-2 right-2">
                                            <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm text-center hover:cursor-pointer' onClick={() => { setUpdateVisibility(true); setPlayer(streamingPlayer) }}>
                                                <LuPencil size={16} className='text-slate-800 dark:text-slate-200' />
                                            </span>
                                            <span className='flex justify-center items-center text-slate-700 dark:text-slate-300 bg-stone-300 dark:bg-stone-700 p-1 rounded-xs text-sm text-center hover:cursor-pointer' onClick={() => { setDeleteVisibility(true); setPlayer(streamingPlayer) }}>
                                                <FaTrashAlt size={16} className='text-rose-400' />
                                            </span>
                                        </div>
                                    </div>
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
                                            <GoArrowUpRight className='text-slate-800 dark:text-slate' />
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
                            <MdList onClick={() => { localStorage.setItem("preference", "list"); setView("list"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-sky-300 p-1 ${view === "list" ? 'bg-sky-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                            <IoGrid onClick={() => { localStorage.setItem("preference", "grid"); setView("grid"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-emerald-300 p-1 ${view === "grid" ? 'bg-emerald-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 justify-center items-center">

                        {sessionDurationInfo && <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                            <span className="font-oswald font-bold text-md tracking-wide text-sky-400">Session Duration Distribution</span>

                            <ResponsiveContainer >
                                <BarChart data={sessionDurationInfo} barCategoryGap={sessionBarGap}  >
                                    <XAxis dataKey="key" tick={{ fontSize: 12 }} >
                                        <Label offset={-2} value="Session Duration Distribution" position="insideBottom" style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }} >
                                        <Label angle={-90} offset={20} value="Count" position="insideLeft" style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Bar dataKey="count" fill='var(--color-fuchsia-400)' radius={[4, 4, 0, 0]} onMouseLeave={() => setSessionIndex(null)} >
                                        {sessionDurationInfo.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                fill={index === sessionIndex ? "var(--color-sky-400)" : "var(--color-teal-400)"}
                                                onMouseEnter={() => { setSessionIndex(index); setSessionBarGap(4); }}
                                                onMouseLeave={() => { setSessionBarGap(12) }}
                                            />
                                        ))}
                                    </Bar>
                                    <Tooltip cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>}


                        {dailyUsageInfo && <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                            <span className="font-oswald font-bold text-md tracking-wide text-sky-400">Daily Usage Trend</span>

                            <ResponsiveContainer>
                                <LineChart data={dailyUsageInfo} >
                                    <XAxis dataKey="day" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }} >
                                        <Label value='Duration' offset={-2} position='insideBottom' style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }}>
                                        <Label value='Duration' angle={-90} offset={20} position='insideLeft' style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Line type="monotone" dataKey="duration" stroke="var(--color-emerald-500)" />
                                    <Tooltip cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>}


                        {timeOfDayInfo && <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 w-full h-100 shadow-md items-center ${view === 'list' ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                            <span className='font-oswald font-bold text-md tracking-wide text-sky-400'>Time of Day</span>

                            <ResponsiveContainer>
                                <BarChart data={timeOfDayInfo} barCategoryGap={timeBarGap} >
                                    <XAxis dataKey="key" tick={{ fontSize: 12 }}>
                                        <Label offset={-2} value="Time" position="insideBottom" style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis dataKey="count" tick={{ fontSize: 12 }}>
                                        <Label angle={-90} offset={20} value="Count" position="insideLeft" style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Bar dataKey="count" fill='var(--color-fuchsia-400)' radius={[4, 4, 0, 0]} onMouseLeave={() => setTimeIndex(null)}>
                                        {timeOfDayInfo.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                fill={index === timeIndex ? 'var(--color-blue-500)' : 'var(--color-indigo-400)'}
                                                onMouseEnter={() => { setTimeIndex(index); setTimeBarGap(4); }}
                                                onMouseLeave={() => { setTimeBarGap(12) }}
                                            />
                                        ))}
                                    </Bar>
                                    <Tooltip cursor={{ fill: 'var(--color-purple-200' }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </BarChart>
                            </ResponsiveContainer>

                        </div>}


                        {playerUsageInfo && <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                            <span className='font-oswald font-bold text-md tracking-wide text-sky-400'>Player Usage Distribution</span>

                            <ResponsiveContainer >
                                <PieChart>
                                    <Pie activeShape={renderActiveShape} data={playerUsageInfo} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="percent" nameKey="nickname" >
                                        {playerUsageInfo.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: "12px", border: "none" }} />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "14px" }} />
                                </PieChart>
                            </ResponsiveContainer>

                        </div>}



                        {cumulativeUsageInfo && <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 w-full h-100 shadow-md items-center ${view === 'list' ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                            <span className='font-oswald font-bold text-md tracking-wide text-sky-400'>Cumulative Usage</span>

                            <ResponsiveContainer>
                                <AreaChart data={cumulativeUsageInfo} >
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }}  >
                                        <Label value="Date" offset={-2} fontSize={12} position='insideBottom' />
                                    </XAxis>
                                    <YAxis dataKey="duration" tick={{ fontSize: 12 }} >
                                        <Label value="Duration" angle={-90} offset={20} fontSize={12} position='insideLeft' />
                                    </YAxis>

                                    <Line type="monotone" dataKey="duration" stroke='var(--color-purple-400)' />
                                    <Area type="monotone" dataKey="duration" stroke='var(--color-purple-400)' fill='var(--color-cyan-300)' />

                                    <Tooltip content={CumulativeUsageToolTip} cursor={{ fill: 'var(--color-purple-300)' }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </AreaChart>
                            </ResponsiveContainer>

                        </div>}


                        {sessionTotalUsageInfo && <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 w-full h-100 shadow-md items-center ${view === 'list' ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                            <span className='font-oswald font-bold text-md tracking-wide text-sky-400'>Session vs Total Usage</span>

                            <ResponsiveContainer>
                                <BarChart data={sessionTotalUsageInfo} barCategoryGap={totalUsageBarGap} >
                                    {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}
                                    <XAxis dataKey="week" tick={{ fontSize: 12 }}>
                                        <Label offset={-2} value="Week" position="insideBottom" style={{ fontSize: 12 }} />
                                    </XAxis>

                                    <YAxis yAxisId="left" dataKey="count" tick={{ fontSize: 12 }}>
                                        <Label angle={-90} offset={20} value="Count" position="insideLeft" style={{ fontSize: 12 }} />
                                    </YAxis>
                                    <YAxis yAxisId="right" orientation='right' dataKey="duration" tick={{ fontSize: 12 }}>
                                        <Label angle={90} offset={20} value="Duration" position="insideRight" style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Bar yAxisId='right' fill='var(--color-indigo-400)' dataKey="duration" radius={[4, 4, 0, 0]} onMouseLeave={() => setTotalUsageIndex(null)}>
                                        {sessionTotalUsageInfo.map((entry, index) => (
                                            < Cell key={`cell-${index}`}
                                                fill={index === totalUsageIndex ? 'var(--color-blue-500)' : 'var(--color-indigo-400)'}
                                                onMouseEnter={() => { setTotalUsageIndex(index); setTotalUsageBarGap(4); }}
                                                onMouseLeave={() => { setTotalUsageBarGap(12) }}
                                            />
                                        ))}
                                    </Bar>

                                    <Bar yAxisId='left' fill='var(--color-violet-400)' dataKey="count" radius={[4, 4, 0, 0]} onMouseLeave={() => setTotalUsageIndex(null)}>
                                        {sessionTotalUsageInfo.map((entry, index) => (
                                            < Cell key={`cell-${index}`}
                                                fill={index === totalUsageIndex ? 'var(--color-purple-500)' : 'var(--color-violet-400)'}
                                                onMouseEnter={() => { setTotalUsageIndex(index); setTotalUsageBarGap(4); }}
                                                onMouseLeave={() => { setTotalUsageBarGap(12) }}
                                            />
                                        ))}
                                    </Bar>


                                    <Legend verticalAlign="top" height={36} />
                                    <Tooltip cursor={{ fill: 'var(--color-purple-200' }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </BarChart>
                            </ResponsiveContainer>

                        </div>}


                        {averageSessionInfo && <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                            <span className='font-oswald font-bold text-md tracking-wide text-sky-400'>Average Session Duration</span>

                            <ResponsiveContainer >
                                <LineChart data={averageSessionInfo}>
                                    <XAxis dataKey="week" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }}  >
                                        <Label value="Week" offset={-2} fontSize={12} position='insideBottom' />
                                    </XAxis>
                                    <YAxis dataKey='duration' tick={{ fontSize: 12 }}>
                                        <Label value="Duration" angle={-90} offset={15} position='insideLeft' fontSize={12} />
                                    </YAxis>

                                    <Line type='monotone' dataKey="duration" stroke='var(--color-sky-400)' />
                                    <Line type='monotone' dataKey="average" stroke='var(--color-pink-400)' />
                                    <Tooltip content={AverageSessionToolTip} cursor={{ fill: 'var(--color-purple-300)' }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>}



                        {monthlyUsageInfo && <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                            <span className='font-oswald font-bold text-md tracking-wide text-sky-400'>Monthly Usage Trend</span>

                            <ResponsiveContainer >
                                <LineChart data={monthlyUsageInfo}>
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} >
                                        <Label value="Month" offset={-2} fontSize={12} position='insideBottom' />
                                    </XAxis>
                                    <YAxis dataKey='duration' tick={{ fontSize: 12 }}>
                                        <Label value="Duration" angle={-90} offset={15} position='insideLeft' fontSize={12} />
                                    </YAxis>

                                    <Line type='monotone' dataKey="duration" stroke='var(--color-orange-300)' />
                                    <Tooltip cursor={{ fill: 'var(--color-purple-300)' }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>}


                    </div>
                </div>


            </main>
        </>
    );

}


const CumulativeUsageToolTip = ({ active, payload, label }) => {

    return (
        <div className='px-2 py-1 bg-white rounded-sm '>
            <p className='text-sm text-violet-600'>Duration : {payload[0]?.payload?.['duration']}</p>
            <p className='text-sm text-cyan-500'>{payload[0]?.payload?.['date']}</p>
        </div>
    );

}


const AverageSessionToolTip = ({ active, payload, label }) => {

    return (
        <div className='px-2 py-1 bg-white rounded-sm '>
            <p className='text-sm text-blue-600'>Duration : {payload[0]?.payload?.['duration']}</p>
            <p className='text-sm text-fuchsia-600'>Average : {payload[0]?.payload?.['average']}</p>
            <p className='text-sm text-teal-400'>{payload[0]?.payload?.['min']}</p>
            <p className='text-sm text-teal-400'>{payload[0]?.payload?.['max']}</p>
        </div>
    );

}


const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
}) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.nickname}
            </text>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
            <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={(outerRadius ?? 0) + 6} outerRadius={(outerRadius ?? 0) + 10} fill={fill} />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="var(--color-emerald-400)" fontSize={18} fontWeight={700} >{`${payload.nickname}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="var(--color-fuchsia-400)" fontSize={12}>
                {`(Contribution ${(percent ?? 1)}%)`}
            </text>
        </g>
    );
};

export default Dashboard;