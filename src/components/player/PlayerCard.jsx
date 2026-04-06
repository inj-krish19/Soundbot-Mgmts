import { getSVGByPlayerType } from "@/utils/getSVG";

function PlayerCard({ player }) {

    return (
        <>
            <div className="hidden lg:flex fixed top-1/2 left-1/2 -translate-1/2 flex flex-col gap-4 p-4 rounded-md bg-stone-300 dark:bg-stone-700 w-3/4 md:w-1/3 h-auto z-100">

                <div className="flex flex-row items-center gap-2">
                    {getSVGByPlayerType(player.type, 'text-sky-400 dark:text-blue-400')}
                    <span className="text-slate-800 dark:text-slate-200 font-bold font-poppins text-md">Player</span>
                </div>

                <div className="flex flex-col gap-1">
                    {/* <p className="text-slate-700 dark:text-slate-300 text-sm">ID:  <span className="font-bold font-poppins">{player._id}</span> </p> */}
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Name:  <span className="font-bold font-poppins">{player.name}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Nickname:  <span className="font-bold font-poppins">{player.nickname}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Company:  <span className="font-bold font-poppins">{player.company}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">RGB:  <span className="font-bold font-poppins">{player.rgb ? "Yes" : "No"}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Wireless:  <span className="font-bold font-poppins">{player.wireless ? "Yes" : "No"}</span> </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Type:  <span className="font-bold font-poppins capitalize">{player.type}</span> </p>
                </div>
            </div>
        </>
    );

}

export default PlayerCard;
