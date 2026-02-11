import { useEffect, useState } from 'react';
import { FaListUl } from 'react-icons/fa'
import { FaPuzzlePiece } from 'react-icons/fa6'
import { GiCalendarHalfYear } from 'react-icons/gi'
import { LuAudioLines } from 'react-icons/lu'

import SessionCard from '../components/SessionCard';
import { BACKEND_URL } from '../store/UrlStore';
import { cleanDate } from '../utils/date';
import { eclipseText } from '../utils/eclipse-text';
import { responseHandler, errorHandler } from '../utils/response-handler';

function Sessions() {

    const [summary, setSummary] = useState({
        "current_sessions": {
            title: "Current Sessions", component: <FaPuzzlePiece size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "average_session_time": {
            title: "Average Session Time", component: <LuAudioLines size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "yearly_sessions": {
            title: "Yearly Sessions", component: <FaListUl size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "yearly_playback": {
            title: "Yearly Playback", component: <GiCalendarHalfYear size={24} className='text-teal-400 dark:text-slate-200' />
        }
    });
    const [sessions, setSessions] = useState([]);

    const [session, setSession] = useState(null);
    const [visible, setVisible] = useState(false);

    const [info, setInfo] = useState({
        message: '',
        type: ''
    });



    useEffect(() => {

        try {

            const getSummary = async () => {
                let res = await fetch(`${BACKEND_URL}/dashboard/sessions`, {
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
                    summary[key]['units'] = response.data[key]['units'];
                }

                setSummary(summary);
            }
            getSummary();

            const main = async () => {
                let res = await fetch(`${BACKEND_URL}/session/paging/latest`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
                    },
                    credentials: 'include',
                });

                responseHandler(res.clone(), setInfo)
                let response = await res.json();

                for (let resp of response.data) {
                    resp['startDate'] = cleanDate(resp['startDate']);
                    resp['endDate'] = cleanDate(resp['endDate']);
                }

                setSessions(response.data);

            }
            main();

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }, [])

    return (
        <>
            {visible && <SessionCard session={session} />}
            <main className='flex flex-col gap-8 w-full min-h-screen h-full px-4 md:px-8 py-2'>


                <div className="flex flex-row flex-wrap justify-around gap-4 p-4">
                    {Object.entries(summary).map(([index, summary]) => {
                        return (<div className="flex flex-row gap-2 items-center justify-around w-60 border p-2 border-slate-200 dark:border-purple-400/20 rounded-sm">
                            {summary.component}
                            <div className="flex flex-col">
                                <p className='text-cyan-600 text-sm'>{summary.title}</p>
                                <p className='text-sky-600 dark:text-purple-300 text-sm '><span className='font-bold font-poppins text-md'>{summary.data}</span> {summary.units}</p>
                            </div>
                        </div>)
                    })}
                </div>

                <table className='hidden lg:block'>
                    <tbody className='flex flex-col gap-4'>
                        <tr className='flex flex-row w-full justify-between items-center border-b-2 border-slate-700 pb-4'>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200 text-md'>Start Date</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200 text-md'>End Date</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200 text-md'>Start Time</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200 text-md'>End Time</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200 text-md'>Volume</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200 text-md'>Player</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200 text-md text-left'>Note</th>
                        </tr>

                        {sessions.map(session => {
                            return (
                                <>
                                    <tr className='flex w-full justify-between py-1 border-b border-slate-700 hover:cursor-pointer' key={session._id} onMouseEnter={(e) => { setVisible(true); setSession(session); }} onMouseLeave={(e) => { setVisible(false); }} >
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.startDate}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.endDate}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.startTime}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.endTime}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.volume * 100}</td>
                                        <td className='w-1/7 text-sky-600 dark:text-purple-400 text-sm text-center font-bold'>{session.player.nickname}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center text-left'>{eclipseText(session.note, 30) || "-"}</td>
                                    </tr >
                                </>
                            )
                        })}
                    </tbody>
                </table>

                <div className="flex flex-row lg:hidden flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">
                    {sessions.map(session => {
                        return (
                            <div className="w-full lg:w-2/5 flex flex-col sm:flex-row px-4 py-2 gap-8 border border-purple-400/20 rounded-md items-center justify-evenly">
                                <div className="flex flex-col gap-2 items-center">
                                    <img src={`/player/` + session.player.type + `.png`} className='size-36' />
                                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Player : <span className='font-bold font-poppins text-sky-600 dark:text-purple-400'>{session.player.nickname}</span></p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Start Date: <span className='font-bold font-poppins'>{session.startDate}</span></p>
                                    <p className='text-slate-700 dark:text-slate-300 text-sm'>End Date: <span className='font-bold font-poppins'>{session.endDate}</span></p>
                                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Start Time: <span className='font-bold font-poppins'>{session.startTime}</span></p>
                                    <p className='text-slate-700 dark:text-slate-300 text-sm'>End Time: <span className='font-bold font-poppins'>{session.endTime}</span></p>
                                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Volume: <span className='font-bold font-poppins'>{session.volume * 100}</span></p>
                                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Duration: <span className='font-bold font-poppins'>{session.duration}</span></p>
                                    <p className='text-slate-700 dark:text-slate-300 text-sm'>Note: <span className='font-bold font-poppins'>{session.note || "-"}</span></p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </main >
        </>
    );

}

export default Sessions;