import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler } from "@/utils/response-handler";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NotFound from "@/pages/system/NotFound";

function PlayerDetails() {

    const params = useParams();
    const id = params.id;

    const [summary, setSummary] = useState({});
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

    }

    useEffect(() => {
        main();
    }, []);

    if (forbidden) return <NotFound />

    return (
        <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>

        </main>
    );

}

export default PlayerDetails;
