import React, { useEffect, useRef, useState } from 'react'

import { FiInfo } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa6';
import { HiRefresh } from 'react-icons/hi';
import { IoCalendar } from 'react-icons/io5'

import { IoIosFunnel } from 'react-icons/io';
import { GoArrowUpRight } from 'react-icons/go';
import { LuArrowUpDown, LuPencil } from 'react-icons/lu';
import { FaHeadphones, FaListUl, FaTrashAlt } from 'react-icons/fa';

import { cleanDate } from '@/utils/date';
import { BACKEND_URL } from '@/store/UrlStore';
import { eclipseText, eclipseNumber } from '@/utils/eclipse-text';
import { responseHandler, errorHandler } from '@/utils/response-handler';

import Loading from '@/components/ui/Loading';
import Notification from '@/components/ui/Notification';
import ChargingCard from '@/components/charging/ChargingCard';
import ChargingFilter from '@/components/charging/ChargingFilter';

import CreateCharging from '@/components/charging/CreateCharging';
import UpdateCharging from '@/components/charging/UpdateCharging';
import DeleteCharging from '@/components/charging/DeleteCharging';
import ChargingMiniCard from '@/components/charging/ChargingMiniCard';

function Charging() {

    const [note, setNote] = useState('');

    const [filterVisibility, setFilterVisibility] = useState(false);
    const [chargingVisibility, setChargingVisibility] = useState(false);

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

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        message: '',
        type: ''
    });


    const loaderRef = useRef(null);
    const [page, setPage] = useState(-1);

    // ascending = true
    const [sorted, setSorted] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);

    const [createVisibility, setCreateVisibility] = useState(false);
    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);

    const filterNote = async (e) => {

        try {

            setLoading(true);
            e.preventDefault();

            let res = await fetch(`${BACKEND_URL}/charging/filter/note`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ note }),
                credentials: "include"
            });

            responseHandler(res.clone(), setInfo);
            let response = await res.json();

            for (let resp of response.data) {
                resp['firstSessionDate'] = cleanDate(resp['firstSessionDate']);
                resp['lastSessionDate'] = cleanDate(resp['lastSessionDate']);
                resp['chargingEndDate'] = cleanDate(resp['chargingEndDate']);
                resp['chargingStartDate'] = cleanDate(resp['chargingStartDate']);
            }

            setChargings(response.data || []);
            setTimeout(() => { setLoading(false); }, 2000);

        } catch (err) {
            errorHandler(res, err);
        }

    }


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

        const updatedSummary = { ...summary };

        for (let key in response.data) {
            updatedSummary[key] = {
                ...updatedSummary[key],
                data: response.data[key].data,
                type: response.data[key].type,
                units: response.data[key].units
            }
        }

        setSummary(updatedSummary);

    }


    const main = async () => {

        if (isFiltering) return;

        let res = await fetch(`${BACKEND_URL}/charging/paging/latest`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                page
            }),
            credentials: 'include'
        });

        if (res.status === 403) {
            // window.scrollTo({ top: 0, behavior: 'smooth' });
            loaderRef.current = false;
            return;
        }


        responseHandler(res.clone(), setInfo);
        let response = await res.json();

        for (let resp of response.data) {
            resp['chargingStartDate'] = cleanDate(resp['chargingStartDate']);
            resp['chargingEndDate'] = cleanDate(resp['chargingEndDate']);
            resp['firstSessionDate'] = cleanDate(resp['firstSessionDate']);
            resp['lastSessionDate'] = cleanDate(resp['lastSessionDate']);
        }

        setChargings(
            prev => sorted
                ? [...prev, ...response.data]
                : [...response.data.toReversed(), ...prev]
        );

    }


    useEffect(() => {
        (async () => { main(); })();
    }, [page]);


    useEffect(() => {

        if (isFiltering) return;

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

            getSummary();
            setTimeout(() => { setLoading(false) }, 2000);

            return () => observer.disconnect();

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }, [])

    return (
        <>
            {chargingVisibility && !filterVisibility && charging && <ChargingCard charging={charging} />}
            {filterVisibility && <ChargingFilter panelState={setFilterVisibility} loadingState={setLoading} setData={setChargings} setPage={setPage} setFiltering={setIsFiltering} />}

            {createVisibility && <CreateCharging charging={charging} panel={setCreateVisibility} />}
            {updateVisibility && <UpdateCharging charging={charging} panel={setUpdateVisibility} />}
            {deleteVisibility && <DeleteCharging charging={charging} panel={setDeleteVisibility} />}

            <main className="relative flex flex-col gap-8 w-full min-h-screen h-full px-4 md:px-8 py-2">

                <Notification info={info} />

                <div className="flex flex-row flex-wrap gap-4 p-4 justify-around ">
                    {Object.entries(summary).map(([index, summary]) => {
                        return (
                            <div className="flex flex-row gap-2 p-2 justify-around items-center w-60 p-2 border border-slate-200 dark:border-purple-400/20 rounded-sm" key={index}>
                                {summary.component}
                                <div className="flex flex-col">
                                    <p className='text-cyan-600 text-sm'>{summary.title}</p>
                                    <p className='text-sky-600 dark:text-purple-300 text-sm'><span className='font-poppins font-bold'>{summary.type === "number" ? eclipseNumber(summary.data) : summary.data}</span> {summary.units}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>


                <div className="px-4 py-2 flex flex-row justify-around items-center gap-4 border-2 border-slate-200 dark:border-slate-800 rounded-md ">

                    <form className='w-full flex flex-row items-center gap-4' onSubmit={(e) => { filterNote(e); }}>
                        <input type="search" name="search" id="search" value={note} onChange={(e) => { setNote(e.target.value); }} placeholder='Search ...' className='px-2 py-1 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-sm w-full text-sm' />
                        <button type="submit" className='px-2 py-1 bg-purple-500 text-white font-bold font-poppins rounded-sm hover:cursor-pointer'>Submit</button>
                    </form>

                    <HiRefresh size={24} className='text-emerald-300 transition ease-in hover:-rotate-90 hover:scale-110 hover:cursor-pointer active:-rotate-270' onClick={() => {
                        setLoading(true);
                        setPage(0);
                        main();
                        setTimeout(() => { setLoading(false); }, 2000)
                    }} />
                    <IoIosFunnel size={24} className='text-slate-800 dark:text-slate-200 hover:cursor-pointer' onClick={() => { setFilterVisibility(true); }} />
                    <LuArrowUpDown size={24} className='text-slate-800 dark:text-slate-200 hover:cursor-pointer' onClick={() => { setSorted(!sorted); setChargings(chargings.toReversed()) }} />
                    <FaPlus size={24} className='text-slate-800 dark:text-slate-200 hover:cursor-pointer' onClick={() => { setCreateVisibility(true) }} />

                </div>


                {!loading && <table className='hidden lg:block'>
                    <tbody className='flex flex-col gap-4'>
                        <tr className='flex flex-row w-full items-center border-b-2 border-slate-700 pb-4'>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>First Session Date</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>Last Session Date</th>
                            <th className='w-3/32 text-slate-800 dark:text-slate-200'>Start Date</th>
                            <th className='w-3/32 text-slate-800 dark:text-slate-200'>End Date</th>
                            <th className='w-1/16 text-slate-800 dark:text-slate-200'>Start Time</th>
                            <th className='w-1/16 text-slate-800 dark:text-slate-200'>End Time</th>
                            <th className='w-1/8 text-slate-800 dark:text-slate-200'>Player</th>
                            <th className='w-3/16  text-slate-800 dark:text-slate-200 text-left'>Note</th>
                        </tr>
                        {chargings.map(_charging => {
                            return (
                                <tr className='flex w-full py-1 border-b border-slate-700 hover:cursor-pointer items-center ' key={_charging._id} onMouseEnter={(e) => { setChargingVisibility(true); setCharging(_charging); }} onMouseLeave={(e) => { setChargingVisibility(false); setCharging(null); }}  >
                                    <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{_charging.firstSessionDate}</td>
                                    <td className='w-1/8 text-slate-700 dark:text-slate-300 text-sm text-center'>{_charging.lastSessionDate}</td>
                                    <td className='w-3/32 text-slate-700 dark:text-slate-300 text-sm text-center'>{_charging.chargingStartDate}</td>
                                    <td className='w-3/32 text-slate-700 dark:text-slate-300 text-sm text-center'>{_charging.chargingEndDate}</td>
                                    <td className='w-1/16 text-slate-700 dark:text-slate-300 text-sm text-center'>{_charging.chargingStartTime}</td>
                                    <td className='w-1/16 text-slate-700 dark:text-slate-300 text-sm text-center'>{_charging.chargingEndTime}</td>
                                    <td className='w-1/8 text-sky-600 dark:text-purple-400 text-sm text-center font-bold'>{_charging.player.nickname}</td>
                                    <td className='w-7/32 text-slate-700 dark:text-slate-300 text-sm text-left'>{eclipseText(_charging.note, 35) || "-"}</td>
                                    <td className='flex justify-center items-center w-1/32 text-slate-700 dark:text-slate-300 text-sm text-center text-left' onClick={() => { window.location.href = `/charging/${_charging._id}` }}>
                                        <GoArrowUpRight size={16} className='text-slate-800 dark:text-slate-200' />
                                    </td>
                                    <td className='flex justify-center items-center w-1/32 text-slate-700 dark:text-slate-300 text-sm text-center text-left' onClick={() => { setUpdateVisibility(true); setCharging(_charging); setChargingVisibility(false); }}>
                                        <LuPencil size={16} className='text-slate-800 dark:text-slate-200' />
                                    </td>
                                    <td className='flex justify-center items-center w-1/32 text-slate-700 dark:text-slate-300 text-sm text-center text-left' onClick={() => { setDeleteVisibility(true); setCharging(_charging); setChargingVisibility(false); }}>
                                        <FaTrashAlt size={16} className='text-rose-400' />
                                    </td>
                                </tr >
                            )
                        })}
                    </tbody>
                </table>}


                {!loading && <div className="flex flex-row lg:hidden flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">
                    {chargings.map(_charging => {
                        return <ChargingMiniCard charging={_charging} key={_charging._id} previlegeMenu={true} setCharging={setCharging} setUpdateVisibility={setUpdateVisibility} setDeleteVisibility={setDeleteVisibility} />
                    })}
                </div>}


                {!loading && (!chargings || chargings.length === 0) &&
                    <span className='text-sky-300 text-ms text-center font-poppins'>Charging not found. Please add usage data.</span>}


                {loading && <Loading />}

                {!isFiltering && <div ref={loaderRef} className='h-16'>
                    {!loading && <Loading />}
                </div>}



            </main>
        </>
    );

}

export default Charging;
