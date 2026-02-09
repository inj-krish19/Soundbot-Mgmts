import React, { useEffect, useState } from 'react'
import { FaHeadphones, FaHome, FaListUl } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi'
import { IoCalendar } from 'react-icons/io5'
import { BACKEND_URL } from '../store/UrlStore';
import { cleanDate } from '../utils/date';
import { responseHandler, errorHandler } from '../utils/response-handler';
import ChargingCard from '../components/ChargingCard';

function Charging() {

    const [visible, setVisible] = useState(false);

    const [charging, setCharging] = useState(null);
    const [chargings, setChargings] = useState([]);

    const [summary, setSummary] = useState([]);
    const [info, setInfo] = useState({
        message: '',
        type: ''
    })

    useEffect(() => {

        try {

            setSummary([
                { title: 'Years\' Chargings', data: 3, units: " Charging", component: <IoCalendar className='text-teal-400 dark:text-slate-200' size={24} /> },
                { title: 'Average Charging Days', data: 10, units: " Days", component: <FiInfo className='text-teal-400 dark:text-slate-200' size={24} /> },
                { title: 'Total Chargings', data: 40, units: " Charging", component: <FaListUl className='text-teal-400 dark:text-slate-200' size={24} /> },
                { title: 'Most Charged Player', data: "Vinnies' Spin", units: "", component: <FaHeadphones className='text-teal-400 dark:text-slate-200' size={24} /> }
            ]);


            const main = async () => {

                let res = await fetch(`${BACKEND_URL}/charging/paging/latest`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
                    },
                    credentials: 'include'
                });

                responseHandler(res.clone(), setInfo);
                let response = await res.json();

                for (let resp of response.data) {
                    resp['chargingStartDate'] = cleanDate(resp['chargingStartDate']);
                    resp['chargingEndDate'] = cleanDate(resp['chargingEndDate']);
                    resp['firstSessionDate'] = cleanDate(resp['firstSessionDate']);
                    resp['lastSessionDate'] = cleanDate(resp['lastSessionDate']);
                }

                console.log(response.data);
                setChargings(response.data);

            }
            main();

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }, [])

    return (
        <>
            <main className="relative flex flex-col gap-8 w-full min-h-screen h-full px-2 md:px-4 py-2">

                {visible && <ChargingCard charging={charging} />}

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

                <table>
                    <tbody className='flex flex-col gap-4'>
                        <tr className='flex flex-row w-full justify-between items-center border-b-2 border-slate-700 pb-4'>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200'>Start Date</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200'>End Date</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200'>First Session Date</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200'>Last Session Date</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200'>Start Time</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200'>End Time</th>
                            <th className='w-1/7 text-slate-800 dark:text-slate-200 text-left'>Note</th>
                        </tr>
                        {chargings.map(charging => {
                            return (
                                <>
                                    <tr className='flex w-full justify-between border-b-1 border-slate-700 pb-1' onMouseEnter={(e) => { setVisible(true); setCharging(charging); }} onMouseLeave={(e) => { setVisible(false); }}  >
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.chargingStartDate}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.chargingEndDate}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.firstSessionDate}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.lastSessionDate}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.chargingStartTime}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.chargingEndTime}</td>
                                        <td className='w-1/7 text-slate-700 dark:text-slate-300 text-sm text-left'>{charging.note || "-"}</td>
                                    </tr >
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </main>
        </>
    );

}

export default Charging;