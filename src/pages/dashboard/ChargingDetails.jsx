import { useParams } from "react-router";
import { cleanDate } from "@/utils/date";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler } from "@/utils/response-handler";

import Loading from "@/components/ui/Loading";
import NotFound from "@/pages/system/NotFound";
import Notification from "@/components/ui/Notification";
import ChargingMiniCard from "@/components/charging/ChargingMiniCard";
import SessionMiniCard from "@/components/session/SessionMiniCard";

function ChargingDetails() {

    const params = useParams();
    const id = params.id;

    const [info, setInfo] = useState({
        message: '',
        type: ''
    })

    const [sessions, setSessions] = useState([]);
    const [charging, setCharging] = useState(null);
    const [forbidden, setForbidden] = useState(false);

    const fetchCharging = async () => {

        let res = await fetch(`${BACKEND_URL}/charging/${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        if (res.status === 401) {
            setForbidden(true);
        }

        responseHandler(res.clone(), setInfo);

        let response = await res.json();

        response.data['firstSessionDate'] = cleanDate(response.data['firstSessionDate'])
        response.data['lastSessionDate'] = cleanDate(response.data['lastSessionDate'])
        response.data['chargingStartDate'] = cleanDate(response.data['chargingStartDate'])
        response.data['chargingEndDate'] = cleanDate(response.data['chargingEndDate'])

        setCharging(response.data);

    }

    const fetchSessions = async () => {

        let res = await fetch(`${BACKEND_URL}/charging/${id}/sessions`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        responseHandler(res.clone(), setInfo);
        let response = await res.json();

        for (let resp of response.data) {
            resp['startDate'] = cleanDate(resp['startDate']);
            resp['endDate'] = cleanDate(resp['endDate']);
        }
        console.log(response.data);
        setSessions(response.data);

    }

    useEffect(() => {
        try {
            fetchCharging();
            fetchSessions();
        } catch (err) {

        }
    }, [])

    if (forbidden) return <NotFound />

    return (
        <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
            <Notification info={info} />

            <div className="flex flex-row w-full flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">
                {!charging ? <Loading /> : <ChargingMiniCard charging={charging} />}
            </div>

            <div className="flex flex-col w-full flex-wrap gap-8 px-4 md:px-8 py-4 justify-around items-center mt-4">
                <span className="text-indigo-400 text-2xl font-bold font-poppins uppercase">Sessions</span>

                {sessions.length === 0 ? <Loading /> :
                    sessions.map(session => {
                        return <SessionMiniCard session={session} privilegeMenu={false} key={session._id} />
                    })
                }
            </div>
        </main>
    );
}

export default ChargingDetails;
