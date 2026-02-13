import React, { useEffect, useState } from 'react'
import { GoArrowUpRight } from 'react-icons/go'
import { SiSession } from 'react-icons/si'
import { MdCalendarMonth, MdAudiotrack } from 'react-icons/md'
import { BsCalendarWeek } from 'react-icons/bs'
import { SiAudiomack } from 'react-icons/si'

import { Link } from 'react-router'
import CreatePlayer from '../components/CreatePlayer'
import CreateSession from '../components/CreateSession'
import { getSVGByPlayerType } from '../components/CreatePlayer'
import CreateCharging from '../components/CreateCharging'
import { errorHandler, responseHandler } from '../utils/response-handler'
import { BACKEND_URL } from '../store/UrlStore'
import { eclipseNumber } from '../utils/eclipse-text'


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


        setPlayers([
            { type: 'earbud', nickname: "Z4" },
            { type: 'earphone', nickname: "Alright 65" },
            { type: 'headphone', nickname: "Vinnies Spin" },
        ]);

    }, [])

    const nickname = 'nick';
    const player = "headphone";




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


            </main>
        </>
    );

}

export default Dashboard;