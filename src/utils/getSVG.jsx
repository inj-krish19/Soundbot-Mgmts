import { BsEarbuds } from "react-icons/bs";
import { GiEarbuds } from "react-icons/gi";
import { FaHeadphones } from "react-icons/fa";
import { FaTabletScreenButton, FaTv } from "react-icons/fa6";
import { MdDesktopWindows, MdPhoneAndroid } from "react-icons/md";

const getSVGByPlayerType = (type, className) => {

    type = type.toLowerCase()
    let component;
    if (type === "earphone") {
        component = <GiEarbuds size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    } else if (type === "earbud") {
        component = <BsEarbuds size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    } else {
        component = <FaHeadphones size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    }
    return component;
}

const getSVGByDeviceType = (type, className) => {

    type = type.toLowerCase()
    let component;
    if (type === "phone") {
        component = <MdPhoneAndroid size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    } else if (type === "desktop") {
        component = <MdDesktopWindows size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    } else if (type === "tablet") {
        component = <FaTabletScreenButton size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    } else {
        component = <FaTv size={24} className={!className ? 'text-slate-800 dark:text-slate-200' : className} />
    }
    return component;
}

export { getSVGByPlayerType, getSVGByDeviceType };
