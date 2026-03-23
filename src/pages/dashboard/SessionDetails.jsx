import { useParams } from "react-router";
import { cleanDate } from "@/utils/date";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler } from "@/utils/response-handler";

import Loading from "@/components/ui/Loading";
import NotFound from "@/pages/system/NotFound";
import Notification from "@/components/ui/Notification";
import SessionMiniCard from "@/components/session/SessionMiniCard";

function SessionDetails() {

    const params = useParams();
    const id = params.id;

    const [info, setInfo] = useState({
        message: '',
        type: ''
    })

    const [session, setSession] = useState(null);
    const [forbidden, setForbidden] = useState(false);

    const main = async () => {

        let res = await fetch(`${BACKEND_URL}/session/${id}`, {
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

        response.data['startDate'] = cleanDate(response.data['startDate']);
        response.data['endDate'] = cleanDate(response.data['endDate']);

        setSession(response.data);

    }


    useEffect(() => {

        try {
            main();
        } catch (err) {

        }

    }, [])


    if (forbidden) return <NotFound />

    return (
        <>
            <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
                <Notification info={info} />

                <div className="flex flex-row w-full flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">
                    {!session ? <Loading /> : <SessionMiniCard session={session} privilegeMenu={false} />}
                </div>
            </main>
        </>
    )
}

export default SessionDetails;
