import { useEffect, useRef, useState } from 'react';

import { HiRefresh } from 'react-icons/hi'
import { IoIosFunnel } from 'react-icons/io'
import { GoArrowUpRight } from 'react-icons/go';
import { GiCalendarHalfYear } from 'react-icons/gi'
import { FaListUl, FaTrashAlt } from 'react-icons/fa'
import { FaPlus, FaPuzzlePiece } from 'react-icons/fa6'
import { LuAudioLines, LuArrowDownUp, LuPencil } from 'react-icons/lu'

import { BACKEND_URL } from '@/store/UrlStore';
import { cleanDate } from '@/utils/date';
import { eclipseNumber, eclipseText } from '@/utils/eclipse-text';
import { responseHandler, errorHandler } from '@/utils/response-handler';

import Loading from '@/components/ui/Loading';
import Notification from '@/components/ui/Notification';
import SessionCard from '@/components/session/SessionCard';
import SessionMiniCard from '@/components/session/SessionMiniCard';

import SessionFilter from '@/components/session/SessionFilter';
import UpdateSession from '@/components/session/UpdateSession';
import DeleteSession from '@/components/session/DeleteSession';
import CreateSession from '@/components/session/CreateSession';

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
    const [sessionVisibility, setSessionVisibility] = useState(false);

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        message: '',
        type: ''
    });


    const loaderRef = useRef(null);
    const [page, setPage] = useState(-1);

    // ascending - true
    const [sorted, setSorted] = useState(true);

    const [createVisibility, setCreateVisibility] = useState(false);
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
            resp['volume'] = Math.round(resp['volume'] * 100);
            resp['startDate'] = cleanDate(resp['startDate']);
            resp['endDate'] = cleanDate(resp['endDate']);
        }

        setSessions(response.data);
        setTimeout(() => { setLoading(false) }, 2000);;

    }


    const main = async () => {

        let res = await fetch(`${BACKEND_URL}/session/paging/latest`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                page
            }),
            credentials: 'include',
        });

        if (res.status === 403) {
            // window.scrollTo({ top: 0, behavior: 'smooth' });
            loaderRef.current = false;
            return;
        }

        responseHandler(res.clone(), setInfo)
        let response = await res.json();

        for (let resp of response.data) {
            resp['volume'] = Math.round(resp['volume'] * 100);
            resp['startDate'] = cleanDate(resp['startDate']);
            resp['endDate'] = cleanDate(resp['endDate']);
        }

        setSessions(sorted ? [...sessions, ...response.data] : [...response.data.toReversed(), ...sessions]);

    }


    useEffect(() => {
        (async () => { main(); })();
        console.log("Page", page);
    }, [page]);


    useEffect(() => {

        try {

            setLoading(true);
            if (!loaderRef.current) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setPage(prev => prev + 1);
                    }
                },
                { threshold: 1 }
            );

            if (loaderRef.current) observer.observe(loaderRef.current);

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

            setTimeout(() => { setLoading(false) }, 2000);
            return () => observer.disconnect();

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }, [])

    return (
        <>
            {sessionVisibility && !filterVisibility && !updateVisibility && session && <SessionCard session={session} />}
            {filterVisibility && !updateVisibility && <SessionFilter panelState={setFilterVisibility} loadingState={setLoading} setData={setSessions} />}

            {createVisibility && <CreateSession session={session} panel={setCreateVisibility} />}
            {updateVisibility && <UpdateSession session={session} panel={setUpdateVisibility} />}
            {deleteVisibility && <DeleteSession session={session} panel={setDeleteVisibility} />}


            <main className='flex flex-col gap-8 w-full min-h-screen h-full px-4 md:px-8 py-2'>

                <Notification info={info} />

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

                    <HiRefresh size={24} className='text-sky-300 transition ease-in hover:-rotate-90 hover:scale-110 hover:cursor-pointer active:-rotate-270' onClick={() => {
                        setLoading(true);
                        setPage(0);
                        main();
                        setTimeout(() => { setLoading(false); }, 2000)
                    }} />
                    <IoIosFunnel size={24} className='text-slate-800 dark:text-slate-200 hover:cursor-pointer' onClick={() => { setFilterVisibility(true); }} />
                    <LuArrowDownUp size={24} className='text-slate-800 dark:text-slate-200 hover:cursor-pointer' onClick={() => { setSorted(!sorted); setSessions(sessions.toReversed()) }} />
                    <FaPlus size={24} className='text-slate-800 dark:text-slate-200 hover:cursor-pointer' onClick={() => { setCreateVisibility(true); }} />

                </div>


                {!loading && <table className='hidden lg:block'>
                    <tbody className='flex flex-col gap-4'>
                        <tr className='flex flex-row w-full items-center border-b-2 border-slate-700 pb-4'>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>Start Date</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>End Date</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>Start Time</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>End Time</th>
                            <th className='w-1/32 text-slate-800 dark:text-slate-200 text-md'>Volume</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md'>Player</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-md text-left'>Note</th>
                        </tr>

                        {sessions.map(session => {
                            return (
                                <tr className='flex w-full py-1 border-b border-slate-700 hover:cursor-pointer items-center ' key={session._id} onMouseEnter={(e) => { setSessionVisibility(true); setSession(session); }} onMouseLeave={(e) => { setSessionVisibility(false); setSession(null); }} >
                                    <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.startDate}</td>
                                    <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.endDate}</td>
                                    <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.startTime}</td>
                                    <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.endTime}</td>
                                    <td className='w-1/32 text-slate-700 dark:text-slate-300 text-sm text-center'>{session.volume}</td>
                                    <td className='w-1/8 text-sky-600 dark:text-purple-400 text-sm text-center font-bold'>{session.player.nickname}</td>
                                    <td className='w-1/4 text-slate-700 dark:text-slate-300 text-sm text-center text-left'>{eclipseText(session.note, 50) || "-"}</td>

                                    <td className='flex justify-center items-center w-1/32 text-slate-700 dark:text-slate-300 text-sm text-center text-left' onClick={() => { window.location.href = `/session/${session._id}` }}>
                                        <GoArrowUpRight size={16} className='text-slate-800 dark:text-slate-200' />
                                    </td>
                                    <td className='flex justify-center items-center w-1/32 text-slate-700 dark:text-slate-300 text-sm text-center text-left' onClick={() => { setUpdateVisibility(true); setSession(session); setSessionVisibility(false); }}>
                                        <LuPencil size={16} className='text-slate-800 dark:text-slate-200' />
                                    </td>
                                    <td className='flex justify-center items-center w-1/32 text-slate-700 dark:text-slate-300 text-sm text-center text-left' onClick={() => { setDeleteVisibility(true); setSession(session); setSessionVisibility(false); }}>
                                        <FaTrashAlt size={16} className='text-rose-400' />
                                    </td>
                                </tr >
                            )
                        })}
                    </tbody>
                </table>}


                {!loading && <div className="flex flex-row lg:hidden flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">

                    {sessions.map(session => {
                        return <SessionMiniCard session={session} privilegeMenu={true} setSession={setSession} setUpdateVisibility={setUpdateVisibility} setDeleteVisibility={setDeleteVisibility} key={session._id} />
                    })}
                </div>}



                {!loading && (!sessions || sessions.length === 0) &&
                    <span className='text-sky-300 text-ms text-center font-poppins'>Session not found. Please add usage data.</span>}


                {loading && <Loading />}

                <div ref={loaderRef} className='h-16'>
                    {!loading && <Loading />}
                </div>



            </main >
        </>
    );

}

export default Sessions;
