import React, { useEffect, useState } from 'react'
import { GoArrowUpRight } from 'react-icons/go'
import { SiSession } from 'react-icons/si'
import { MdCalendarMonth, MdAudiotrack } from 'react-icons/md'
import { BsCalendarWeek } from 'react-icons/bs'
import { LuAudioLines } from 'react-icons/lu'

import { Link } from 'react-router'


function Dashboard() {

    const [summary, setSummary] = useState([]);
    const [players, setPlayers] = useState([]);

    const quickActions = [
        { title: 'Prediction', link: '/prediction' },
        { title: 'Recommedation', link: '/recommendation' },
        { title: 'AI Insights', link: '/insights' },
    ]

    useEffect(() => {

        setSummary([
            { title: "Todays' Usage", data: "29", units: " minutes", component: <MdAudiotrack size={24} className='text-cyan-400 dark:text-slate-200' /> },
            { title: "Weekly Usage", data: "200", units: " minutes", component: <BsCalendarWeek size={24} className='text-cyan-400 dark:text-slate-200' /> },
            { title: "Monthly Usage", data: "1.8K", units: " minutes", component: <MdCalendarMonth size={24} className='text-cyan-400 dark:text-slate-200' /> },
            { title: "Last Session", data: "45", units: " minutes", component: <SiSession size={24} className='text-cyan-400 dark:text-slate-200' /> },
            { title: "Last Charging Playback", data: "317", units: " minutes", component: <LuAudioLines size={24} className='text-cyan-400 dark:text-slate-200' /> },
        ]);

        setPlayers([
            { type: 'earbud', nickname: "Z4" },
            { type: 'earphone', nickname: "Alright 65" },
            { type: 'headphone', nickname: "Vinnies Spin" },
        ]);

    }, [])

    const nickname = 'nick';




    return (
        <>
            <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>

                <div className="flex flex-col gap-8">

                    <div className="flex flex-col gap-1">
                        <p className='text-slate-800 dark:text-slate-200 text-sm'>Welcome,
                            <span className='font-bold text-md'>{" " + nickname}</span>
                        </p>
                        <p className='text-slate-700 dark:text-slate-300 text-sm'>Track your audio usage and insights.</p>
                    </div>

                    <div className="flex flex-wrap md:flex-row w-full gap-4 justify-center">
                        {summary.map((summary, index) => {
                            return (
                                <div className="flex flex-row py-2 px-4 gap-4 justify-around items-center border border-purple-400/20 rounded-md w-60" key={index}>
                                    {summary.component}
                                    <div className="flex flex-col">
                                        <p className='text-cyan-600 text-sm'>{summary.title}</p>
                                        <p className='text-sky-600 dark:text-purple-300  text-sm'><span className='font-bold font-poppins text-md'>{summary.data}</span>{summary.units}</p>
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
                                        <div className="flex flex-col gap-1 border border-emerald-400 outline hover:outline-emerald-400 rounded-md px-3 py-1 size-48 items-center" key={streamingPlayer.nickname}>
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

                            <button className='bg-sky-400 text-slate-200 font-bold px-2 py-1 rounded-sm hover:cursor-pointer'>Create Player</button>
                            <button className='bg-emerald-400 text-slate-200 font-bold px-2 py-1 rounded-sm hover:cursor-pointer' >Create Session</button>
                            <button className='bg-rose-400 text-slate-200 font-bold px-2 py-1 rounded-sm hover:cursor-pointer' >Create Charging</button>

                        </div>

                    </div>


                </div>


            </main>
        </>
    );

}

export default Dashboard;