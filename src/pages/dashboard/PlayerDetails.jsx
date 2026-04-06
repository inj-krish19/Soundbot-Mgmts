import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler } from "@/utils/response-handler";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import NotFound from "@/pages/system/NotFound";
import PlayerCard from "@/components/player/PlayerCard";
import Notification from "@/components/ui/Notification";
import PlayerMiniCard from "@/components/player/PlayerMiniCard";
import { eclipseNumber } from "@/utils/eclipse-text";
import { IoMdTime } from "react-icons/io";
import { TiEquals } from "react-icons/ti";
import { IoCalendar, IoCalendarClear, IoMusicalNote, IoPieChart, IoTrendingUp } from "react-icons/io5";
import Loading from "@/components/ui/Loading";
import { SiSession } from "react-icons/si";
import { MdOutlineTrendingUp } from "react-icons/md";
import { LuActivity } from "react-icons/lu";
import { TbRecharging } from "react-icons/tb";

function PlayerDetails() {

    const params = useParams();
    const id = params.id;

    const [summary, setSummary] = useState({
        "last_session": {
            title: "Last Used Session", component: <SiSession size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "current_streak": {
            title: "Current Streak", component: <LuActivity size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "longest_streak": {
            title: "Longest Streak", component: <IoTrendingUp size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "yearly_sessions": {
            title: "Yearly Sessions", component: <IoCalendar size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "total_chargings": {
            title: "Lifetime Chargings", component: <TbRecharging size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "total_stream_time": {
            title: "Lifetime Playback Time", component: <IoMusicalNote size={24} className='text-teal-400 dark:text-slate-200' />,
        }
    });
    const [info, setInfo] = useState({
        'message': '',
        type: ''
    })

    const [player, setPlayer] = useState(null);
    const [forbidden, setForbidden] = useState(false);


    const main = async () => {

        let res = await fetch(`${BACKEND_URL}/player/${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        if (res.status === 403) {
            setForbidden(true);
        }
        responseHandler(res.clone(), setInfo);

        let response = await res.json();
        setPlayer(response?.data);

    }


    const getSummary = async () => {

        let res = await fetch(`${BACKEND_URL}/dashboard/player/${id}`, {
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
                data: response.data[key]['data'],
                type: response.data[key]['type'],
                units: response.data[key]['units'],
            }
        }

        setSummary(updatedSummary);

    }


    useEffect(() => {
        try {
            main();
            getSummary();
        } catch (err) { }
    }, []);

    if (forbidden) return <NotFound />

    return (
        <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
            <Notification info={info} />

            <div className="flex flex-col-reverse md:flex-col gap-6">


                <div className="flex flex-row w-full flex-wrap gap-8 md:px-8 py-4 justify-around">
                    {!player ? <Loading /> : <PlayerMiniCard player={player} />}
                </div>

                <div className="flex flex-wrap flex-row gap-4 justify-center">
                    {Object.entries(summary).map(([index, summary]) => {
                        return (
                            <div className="flex flex-row py-2 px-4 gap-4 justify-around items-center border border-slate-200 dark:border-purple-400/20 rounded-md w-60" key={index}
                            >
                                {summary.component}
                                <div className="flex flex-col">
                                    <span className="text-cyan-600 text-sm">{summary.title}</span>
                                    <span className="text-sky-600 dark:text-purple-300 text-sm capitalize"><span className="font-bold font-poppins text-md">{summary.type === "number" ? eclipseNumber(summary.data) : summary.data}</span>{summary.units}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>


            </div>

        </main>
    );

}

export default PlayerDetails;
