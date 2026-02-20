import { useEffect, useState } from 'react';

import { HiRefresh } from 'react-icons/hi'
import { IoIosFunnel } from 'react-icons/io'
import { FaPuzzlePiece } from 'react-icons/fa6'
import { GiCalendarHalfYear } from 'react-icons/gi'
import { FaListUl, FaTrashAlt } from 'react-icons/fa'
import { LuAudioLines, LuArrowDownUp, LuPencil } from 'react-icons/lu'

import { cleanDate } from '@/utils/date';
import { BACKEND_URL } from '@/store/UrlStore';
import { eclipseNumber, eclipseText } from '@/utils/eclipse-text';
import { responseHandler, errorHandler } from '@/utils/response-handler';

import Loading from '@/components/ui/Loading';
import SessionCard from '@/components/session/SessionCard';
import SessionFilter from '@/components/session/SessionFilter';
import UpdateSession from '@/components/session/UpdateSession';
import DeleteSession from '@/components/session/DeleteSession';

function Sessions() {

    const [note, setNote] = useState('');
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

    const [session, setSession] = useState(null);
    const [sessions, setSessions] = useState([]);

    const [filterVisibility, setFilterVisibility] = useState(false);
    const [sessionVisibility, setSessionVisibilility] = useState(false);

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        message: '',
        type: ''
    });


    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);


    const filterNote = async (e) => {

        setLoading(true);
        e.preventDefault();

        let res = await fetch(`${BACKEND_URL}/session/filter/note`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ note }),
            credentials: "include"
        });

        let response = await res.json();
        for (let resp of response.data) {
            resp['startDate'] = cleanDate(resp['startDate']);
            resp['endDate'] = cleanDate(resp['endDate']);
        }

        setSessions(response.data);
        setTimeout(() => { setLoading(false) }, 2000);;

    }


    const main = async () => {

        setLoading(true);
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
        setTimeout(() => { setLoading(false) }, 2000);

    }


    useEffect(() => {

        try {

            setLoading(true);
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
                    summary[key]['type'] = response.data[key]['type'];
                    summary[key]['units'] = response.data[key]['units'];
                }

                setSummary(summary);
            }
            getSummary();

            main();
            setTimeout(() => { setLoading(false) }, 2000);

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }, [])

    return (
        <>
            {sessionVisibility && !filterVisibility && !updateVisibility && session && <SessionCard session={session} />}
            {filterVisibility && !updateVisibility && <SessionFilter panelState={setFilterVisibility} loadingState={setLoading} setData={setSessions} />}

            {updateVisibility && <UpdateSession session={session} panel={setUpdateVisibility} />}
            {deleteVisibility && <DeleteSession session={session} panel={setDeleteVisibility} />}

            <main className='flex flex-col gap-8 w-full min-h-screen h-full px-4 md:px-8 py-2'>


                <div className="flex flex-row flex-wrap justify-around gap-4 p-4">
                    {Object.entries(summary).map(([index, summary]) => {
                        return (
                            <div key={index} className="flex flex-row gap-2 items-center justify-around w-60 border p-2 border-slate-200 dark:border-purple-400/20 rounded-sm">
                                {summary.component}
                                <div className="flex flex-col">
                                    <p className='text-cyan-600 text-sm'>{summary.title}</p>
                                    <p className='text-sky-600 dark:text-purple-300 text-sm '><span className='font-bold font-poppins text-md'>{summary.type === "number" ? eclipseNumber(summary.data) : summary.data}</span> {summary.units}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="px-4 py-2 flex flex-row justify-around items-center gap-4 border-2 border-slate-200 dark:border-slate-800 rounded-md">

                    <form className="w-full flex flex-row items-center gap-4" onSubmit={(e) => { filterNote(e); }}>
                        <input type="search" name="search" id="search" value={note} onChange={(e) => setNote(e.target.value)} placeholder='Search ...' className='px-2 py-1 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-sm w-full text-sm' />
                        <button type="submit" className='px-2 py-1 bg-purple-500 text-white font-bold font-poppins rounded-sm hover:cursor-pointer'>Submit</button>
                    </form>

                    <HiRefresh size={24} className='text-sky-300 transition ease-in hover:-rotate-90 hover:scale-110 hover:cursor-pointer active:-rotate-270' onClick={() => { main(); }} />
                    <IoIosFunnel size={24} className='text-slate-800 dark:text-slate-200 hover:cursor-pointer' onClick={() => { setFilterVisibility(true); }} />
                    <LuArrowDownUp size={24} className='text-slate-800 dark:text-slate-200 hover:cursor-pointer' onClick={() => { setSessions(sessions.toReversed()) }} />

                </div>

                {loading && <Loading />}

                {!loading && <table className='hidden lg:block'>
                    <tbody className='flex flex-col gap-4'>
                        <tr className='flex flex-row w-full items-center border-b-2 border-slate-700 pb-4'>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>Start Date</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>End Date</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>Start Time</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>End Time</th>
                            <th className='w-1/16 text-slate-800 dark:text-slate-200 text-md'>Volume</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>Player</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md text-left'>Note</th>
                        </tr>

                        {sessions.map(session => {
                            return (
                                <>
                                    <tr className='flex w-full py-1 border-b border-slate-700 hover:cursor-pointer items-center ' key={session._id} onMouseEnter={(e) => { setSessionVisibilility(true); setSession(session); }} onMouseLeave={(e) => { setSessionVisibilility(false); }} >
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.startDate}</td>
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.endDate}</td>
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.startTime}</td>
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.endTime}</td>
                                        <td className='w-1/16 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.volume * 100}</td>
                                        <td className='w-1/8 text-sky-600 dark:text-purple-400 text-sm text-center font-bold'>{session.player.nickname}</td>
                                        <td className='w-1/4 text-slate-700 dark:text-slate-300 text-sm text-center text-left'>{eclipseText(session.note, 50) || "-"}</td>
                                        <td className='flex justify-center items-center w-1/32 text-slate-700 dark:text-slate-300 text-sm text-center text-left' onClick={() => { setUpdateVisibility(true); setSession(session); setSessionVisibilility(false); }}>
                                            <LuPencil size={16} className='text-slate-800 dark:text-slate-200' />
                                        </td>
                                        <td className='flex justify-center items-center w-1/32 text-slate-700 dark:text-slate-300 text-sm text-center text-left' onClick={() => { setDeleteVisibility(true); setSession(session); setSessionVisibilility(false); }}>
                                            <FaTrashAlt size={16} className='text-rose-400' />
                                        </td>
                                    </tr >
                                </>
                            )
                        })}
                    </tbody>
                </table>}


                {(!sessions || sessions.length === 0) &&
                    <span className='text-sky-300 text-ms text-center font-poppins'>Session not found. Please add usage data.</span>}

                {!loading && <div className="flex flex-row lg:hidden flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">

                    {(!sessions || sessions.length === 0) &&
                        <p className='text-sky-300 text-ms text-center font-poppins'>Session not found. Please add usage data.</p>}

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
                </div>}

            </main >
        </>
    );

}

export default Sessions;