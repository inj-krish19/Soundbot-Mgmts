import React, { useEffect, useState } from 'react'
import { FaHeadphones, FaHome, FaListUl } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi'
import { IoCalendar } from 'react-icons/io5'

function Charging() {

    const [summary, setSummary] = useState([]);
    const [info, setInfo] = useState({
        message: '',
        type: ''
    })

    useEffect(() => {

        setSummary([
            { title: 'Years\' Chargings', data: 3, units: " Charging", component: <IoCalendar className='text-teal-400 dark:text-slate-200' size={24} /> },
            { title: 'Average Charging Days', data: 10, units: " Days", component: <FiInfo className='text-teal-400 dark:text-slate-200' size={24} /> },
            { title: 'Total Chargings', data: 40, units: " Charging", component: <FaListUl className='text-teal-400 dark:text-slate-200' size={24} /> },
            { title: 'Most Charged Player', data: "Vinnies' Spin", units: "", component: <FaHeadphones className='text-teal-400 dark:text-slate-200' size={24} /> }
        ]);


    }, [])

    return (
        <>
            <main className="flex flex-col gap-8 w-full h-full px-2 md:px-4 py-2">
                <div className="flex flex-row flex-wrap gap-4 p-4 justify-around ">
                    {summary.map(summary => {
                        return (
                            <div className="flex flex-row gap-2 p-2 justify-around items-center w-60 p-2 border border-purple-400/20 rounded-sm">
                                {summary.component}
                                <div className="flex flex-col">
                                    <p className='text-cyan-600 text-sm'>{summary.title}</p>
                                    <p className='text-sky-600 dark:text-purple-300 text-sm'><span className='font-poppins font-bold'>{summary.data}</span> {summary.units}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>


            </main>
        </>
    );

}

export default Charging;