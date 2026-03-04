import { BACKEND_URL } from "@/store/UrlStore";
import Notification from "@/components/ui/Notification";
import { errorHandler, responseHandler } from "@/utils/response-handler";
import { useState } from "react";

function DeletePlayer({ player, panel }) {

    const [info, setInfo] = useState({
        message: '',
        type: ''
    })
    const removePlayer = async (e) => {

        try {

            let res = await fetch(`${BACKEND_URL}/player/${player._id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            });

            responseHandler(res, setInfo);

        } catch (err) {
            errorHandler(err, setInfo);
        }

    }


    return (
        <>
            <div className="fixed top-1/2 left-1/2 -translate-1/2 flex flex-col w-3/4 md:w-1/3 h-auto gap-4 justify-around items-center px-4 md:px-8 py-4 bg-stone-300 dark:bg-stone-700 rounded-md z-50">

                {info && <Notification info={info} />}
                <div className="flex flex-col gap-2 items-center">
                    <span className="text-rose-400 text-md font-bold font-poppins">Are you sure ? Delete Player</span>
                    <span className="text-slate-700 dark:text-slate-300 text-sm text-center">Tapping below will confirm and delete the player,sessions and charging details from tracking and AI insights.</span>
                </div>

                <div className="flex flex-row justify-center items-center w-4/5 gap-4">
                    <button type="submit" className="bg-rose-400 font-bold font-poppins text-white px-2 py-1 rounded-sm w-1/2 hover:cursor-pointer" onClick={() => { removePlayer() }} >Delete</button>
                    <button type="submit" className="bg-stone-800 dark:bg-stone-200 text-slate-300 dark:text-slate-700 font-bold font-poppins  px-2 py-1 rounded-sm w-1/2 hover:cursor-pointer" onClick={() => { panel(false) }} >Cancel</button>
                </div>

            </div>
        </>
    );

}

export default DeletePlayer;