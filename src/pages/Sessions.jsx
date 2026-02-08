import { useEffect, useState } from 'react';
import { FaListUl } from 'react-icons/fa'
import { FaPuzzlePiece } from 'react-icons/fa6'
import { GiCalendarHalfYear } from 'react-icons/gi'
import { SiAudiomack } from 'react-icons/si'

function Sessions() {

    const [summary, setSummary] = useState([]);

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


    }, [])

    return (
        <>
            <main className='relative flex flex-col gap-8 px-4 md:px-8 py-2'>


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

            </main >
        </>
    );

}

export default Sessions;