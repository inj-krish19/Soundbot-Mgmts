import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler } from "@/utils/response-handler";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import NotFound from "@/pages/system/NotFound";
import PlayerCard from "@/components/player/PlayerCard";
import Notification from "@/components/ui/Notification";

function PlayerDetails() {

    const params = useParams();
    const id = params.id;

    /* const [summary, setSummary] = useState({
        "last_session": {
            title: "Last Used Session", component: <IoMdTime size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "current_streak": {
            title: "Current Streak", component: <TiEquals size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "longest_streak": {
            title: "Longest Streak", component: <IoCalendarClear size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "yearly_sessions": {
            title: "Yearly Sessions", component: <IoPieChart size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "total_chargings": {
            title: "Lifetime Chargings", component: <IoCalendarClear size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "total_stream_time": {
            title: "Lifetime Playback Time", component: <IoPieChart size={24} className='text-teal-400 dark:text-slate-200' />,
        }
    }); */
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

    useEffect(() => {
        main();
    }, []);

    if (forbidden) return <NotFound />

    return (
        <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
            <Notification info={info} />

            {player && <PlayerCard player={player} />}
        </main>
    );

}

export default PlayerDetails;
