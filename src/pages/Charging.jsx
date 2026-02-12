import React, { useEffect, useState } from 'react'
import { FaHeadphones, FaHome, FaListUl } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi'
import { IoCalendar } from 'react-icons/io5'
import { BACKEND_URL } from '../store/UrlStore';
import { cleanDate } from '../utils/date';
import { eclipseText } from '../utils/eclipse-text';
import { responseHandler, errorHandler } from '../utils/response-handler';
import ChargingCard from '../components/ChargingCard';
import { getSVGByPlayerType } from '../components/CreatePlayer';

function Charging() {

    const [visible, setVisible] = useState(false);

    const [charging, setCharging] = useState(null);
    const [chargings, setChargings] = useState([]);

    const [summary, setSummary] = useState({
        "yearly_charging": {
            title: 'Years\' Chargings', component: <IoCalendar size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "average_charging_days": {
            title: 'Average Charging Days', component: <FiInfo size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "total_chargings": {
            title: 'Total Chargings', component: <FaListUl size={24} className='text-teal-400 dark:text-slate-200' />
        },
        "most_charged_player": {
            title: 'Most Charged Player', component: <FaHeadphones size={24} className='text-teal-400 dark:text-slate-200' />
        },
    });
    const [info, setInfo] = useState({
        message: '',
        type: ''
    })

    useEffect(() => {

        try {

            const getSummary = async () => {

                let res = await fetch(`${BACKEND_URL}/dashboard/charging`, {
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

                {visible && charging && <ChargingCard charging={charging} />}

                <div className="flex flex-row flex-wrap gap-4 p-4 justify-around ">
                    {Object.entries(summary).map(([index, summary]) => {
                        return (
                            <div className="flex flex-row gap-2 p-2 justify-around items-center w-60 p-2 border border-slate-200 dark:border-purple-400/20 rounded-sm">
                                {summary.component}
                                <div className="flex flex-col">
                                    <p className='text-cyan-600 text-sm'>{summary.title}</p>
                                    <p className='text-sky-600 dark:text-purple-300 text-sm'><span className='font-poppins font-bold'>{summary.data}</span> {summary.units}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <table className='hidden lg:block'>
                    <tbody className='flex flex-col gap-4'>
                        <tr className='flex flex-row w-full justify-between items-center border-b-2 border-slate-700 pb-4'>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>Start Date</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>End Date</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>First Session Date</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>Last Session Date</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>Start Time</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>End Time</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>Player</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200 text-left'>Note</th>
                        </tr>
                        {chargings.map(charging => {
                            return (
                                <>
                                    <tr className='flex flex-row w-full justify-between border-b-1 border-slate-700 pb-1' onMouseEnter={(e) => { setVisible(true); setCharging(charging); }} onMouseLeave={(e) => { setVisible(false); setCharging(null); }}  >
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.chargingStartDate}</td>
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.chargingEndDate}</td>
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.firstSessionDate}</td>
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.lastSessionDate}</td>
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.chargingStartTime}</td>
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{charging.chargingEndTime}</td>
                                        <td className='w-1/8 text-sky-600 dark:text-purple-400 text-sm text-center font-bold'>{charging.player.nickname}</td>
                                        <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-left'>{eclipseText(charging.note) || "-"}</td>
                                    </tr >
                                </>
                            )
                        })}
                    </tbody>
                </table>

                <div className="flex flex-row lg:hidden flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">
                    {chargings.map(charging => {
                        return (
                            <div className="w-full lg:w-2/5 flex flex-col sm:flex-row px-4 py-2 gap-8 border border-purple-400/20 rounded-md items-center justify-evenly">
                                <div className="flex flex-col gap-2 items-center">
                                    <img src={`/player/${charging.player.type}.png`} className='size-36 ' />
                                    <p className='text-slaet-700 dark:text-slate-300 text-sm'>Player: <span className='font-bold font-poppins text-sky-600 dark:text-purple-400'>{charging.player.nickname}</span> </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className='text-slaet-700 dark:text-slate-300 text-sm'>Start Date: <span className='font-bold font-poppins'>{charging.chargingStartDate}</span> </p>
                                    <p className='text-slaet-700 dark:text-slate-300 text-sm'>End Date: <span className='font-bold font-poppins'>{charging.chargingEndDate}</span> </p>
                                    <p className='text-slaet-700 dark:text-slate-300 text-sm'>First Session Date: <span className='font-bold font-poppins'>{charging.firstSessionDate}</span> </p>
                                    <p className='text-slaet-700 dark:text-slate-300 text-sm'>Last Session Date: <span className='font-bold font-poppins'>{charging.lastSessionDate}</span> </p>
                                    <p className='text-slaet-700 dark:text-slate-300 text-sm'>Start Time: <span className='font-bold font-poppins'>{charging.chargingStartTime}</span> </p>
                                    <p className='text-slaet-700 dark:text-slate-300 text-sm'>End Time: <span className='font-bold font-poppins'>{charging.chargingEndTime}</span> </p>
                                    <p className='text-slaet-700 dark:text-slate-300 text-sm'>Charging Duration: <span className='font-bold font-poppins'>{charging.chargingDuration} minutes</span> </p>
                                    <p className='text-slaet-700 dark:text-slate-300 text-sm'>Note: <span className='font-bold font-poppins'>{charging.note || "-"}</span> </p>
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