import { useEffect, useState } from 'react';
import { FaListUl } from 'react-icons/fa'
import { FaPuzzlePiece } from 'react-icons/fa6'
import { GiCalendarHalfYear } from 'react-icons/gi'
import { SiAudiomack } from 'react-icons/si'
import SessionCard from '../components/SessionCard';
import { BACKEND_URL } from '../store/UrlStore';
import { cleanDate } from '../utils/date';
import { responseHandler, errorHandler } from '../utils/response-handler';

function Sessions() {

    const [summary, setSummary] = useState([]);
    const [sessions, setSessions] = useState([]);

    const [session, setSession] = useState(null);
    const [visible, setVisible] = useState(false);

    const [info, setInfo] = useState({
        message: '',
        type: ''
    });



    useEffect(() => {

        setSummary([
            { title: "Current Sessions", data: 38, units: " sessions", component: <FaPuzzlePiece size={24} className='text-teal-400 dark:text-slate-200' /> },
            { title: "Playback Time", data: 430, units: " minutes", component: <SiAudiomack size={24} className='text-teal-400 dark:text-slate-200' /> },
            { title: "Total Sessions", data: 8, units: " sessions", component: <FaListUl size={24} className='text-teal-400 dark:text-slate-200' /> },
            { title: "Yearly Playback", data: "5.1K", units: " minutes", component: <GiCalendarHalfYear size={24} className='text-teal-400 dark:text-slate-200' /> },
        ]);

        setSessions([
            { _id: 1234, startDate: '2026-02-03', endDate: '2026-02-03', startTime: '21:45', endTime: '23:15', duration: 90, volume: 0.7, note: "Hello" },
            { _id: 1235, startDate: '2026-02-03', endDate: '2026-02-03', startTime: '21:45', endTime: '23:15', duration: 90, volume: 0.7, note: "Hello" },
            { _id: 1236, startDate: '2026-02-03', endDate: '2026-02-03', startTime: '21:45', endTime: '23:15', duration: 90, volume: 0.7, note: "Hello" },
            { _id: 1237, startDate: '2026-02-03', endDate: '2026-02-03', startTime: '21:45', endTime: '23:15', duration: 90, volume: 0.7, note: "Hello" }
        ]);

        try {

            const main = async () => {
                let res = await fetch(`${BACKEND_URL}/session/`, {
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
            <main className='relative flex flex-col gap-8 px-4 md:px-8 py-2'>

                {visible && <SessionCard session={session} />}

                <div className="flex flex-row flex-wrap justify-around gap-4 p-4">
                    {summary.map(summary => {
                        return (<div className="flex flex-row gap-2 items-center justify-around w-60 border p-2 border-purple-400/20 rounded-sm">
                            {summary.component}
                            <div className="flex flex-col">
                                <p className='text-cyan-600 text-sm'>{summary.title}</p>
                                <p className='text-sky-600 dark:text-purple-300 text-sm '><span className='font-bold font-poppins text-md'>{summary.data}</span> {summary.units}</p>
                            </div>
                        </div>)
                    })}
                </div>

                <table>
                    <tbody className='flex flex-col gap-4'>
                        <tr className='flex flex-row w-full justify-around items-center border-b-2 border-slate-700 pb-4'>
                            <th className='text-slate-800 dark:text-slate-200 text-md w-full '>Start Date</th>
                            <th className='text-slate-800 dark:text-slate-200 text-md w-full '>End Date</th>
                            <th className='text-slate-800 dark:text-slate-200 text-md w-full '>Start Time</th>
                            <th className='text-slate-800 dark:text-slate-200 text-md w-full '>End Time</th>
                            <th className='text-slate-800 dark:text-slate-200 text-md w-full '>Volume</th>
                            <th className='text-slate-800 dark:text-slate-200 text-md w-full '>Note</th>
                        </tr>

                        {sessions.map(session => {
                            return (
                                <>
                                    <tr className='flex flex-row w-full justify-around items-center py-1 border-b border-slate-700 hover:cursor-pointer' key={session._id} onMouseEnter={(e) => { setVisible(true); setSession(session); }} onMouseLeave={(e) => { setVisible(false); }} >
                                        <td className='text-slate-700 dark:text-slate-300 w-full text-sm text-center'>{session.startDate}</td>
                                        <td className='text-slate-700 dark:text-slate-300 w-full text-sm text-center'>{session.endDate}</td>
                                        <td className='text-slate-700 dark:text-slate-300 w-full text-sm text-center'>{session.startTime}</td>
                                        <td className='text-slate-700 dark:text-slate-300 w-full text-sm text-center'>{session.endTime}</td>
                                        <td className='text-slate-700 dark:text-slate-300 w-full text-sm text-center'>{session.volume * 100}</td>
                                        <td className='text-slate-700 dark:text-slate-300 w-full text-sm text-center'>{session.note || "-"}</td>
                                    </tr >
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </main >
        </>
    );

}

export default Sessions;