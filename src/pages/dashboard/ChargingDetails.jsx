import { useParams } from "react-router";
import { cleanDate } from "@/utils/date";
import { useEffect, useState } from "react";


import Loading from "@/components/ui/Loading";
import NotFound from "@/pages/system/NotFound";
import Notification from "@/components/ui/Notification";

import UpdateCharging from "@/components/charging/UpdateCharging";
import DeleteCharging from "@/components/charging/DeleteCharging";
import SessionMiniCard from "@/components/session/SessionMiniCard";
import ChargingMiniCard from "@/components/charging/ChargingMiniCard";
import ChargingLoading from "@/components/charts_loading/ChargingLoading";

import { FaListOl } from "react-icons/fa6";
import { RiNumbersFill } from "react-icons/ri";
import { MdAccessTime, MdList } from "react-icons/md";
import { IoGrid, IoTrendingUp } from "react-icons/io5";
import { PiArrowsHorizontalBold } from "react-icons/pi";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";

import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler } from "@/utils/response-handler";
import { eclipseNumber } from "@/utils/eclipse-text";


import { XAxis, YAxis, Line, Legend, Label, LineChart, Tooltip, BarChart, Bar, Cell, ResponsiveContainer, PieChart, Pie, Sector, CartesianGrid, AreaChart, Area } from 'recharts'

const COLORS = ['var(--color-indigo-600)', 'var(--color-emerald-600)', 'var(--color-amber-600)', 'var(--color-rose-600)', 'var(--color-sky-600)', 'var(--color-purple-600)', 'var(--color-teal-600)', 'var(--color-orange-600)', 'var(--color-pink-600)', 'var(--color-cyan-600)', 'var(--color-lime-600)', 'var(--color-fuchsia-600)'
];


function ChargingDetails() {

    const params = useParams();
    const id = params.id;

    const [info, setInfo] = useState({
        message: '',
        type: ''
    });
    const [summary, setSummary] = useState({
        "total_days": {
            title: "Playback Interval", component: <PiArrowsHorizontalBold size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "playback_time": {
            title: "Playback Time", component: <MdAccessTime size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "total_sessions": {
            title: "Total Sessions", component: <FaListOl size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "biggest_session": {
            title: "Biggest Session", component: <RiNumbersFill size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "longest_charging_streak": {
            title: "Longest Streak", component: <IoTrendingUp size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "average_session_degrade_rate": {
            title: "Degrade Rate", component: <HiMiniArrowTrendingDown size={24} className='text-teal-400 dark:text-slate-200' />,
        }
    });

    const [sessions, setSessions] = useState([]);
    const [charging, setCharging] = useState(null);

    const [menu, setMenu] = useState("session");
    const [forbidden, setForbidden] = useState(false);

    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);


    const [timeIndex, setTimeIndex] = useState(null);
    const [timeBarGap, setTimeBarGap] = useState(4);

    const [divisonBarGap, setDivisonBarGap] = useState(4);
    const [divisonIndex, setDivisonIndex] = useState(null);

    const [weekBarGap, setWeekBarGap] = useState(4);
    const [weekIndex, setWeekIndex] = useState(null);



    const [cumulativeTrend, setCumulativeTrend] = useState([]);
    const [sessionDurationShare, setSessionDurationShare] = useState([]);

    const [weekDistribution, setWeekDistribution] = useState([]);
    const [usageTimeDistribution, setUsageTimeDistribution] = useState([]);

    const [divisonDistribution, setDivisonDistribution] = useState([]);
    const [volumeDistribution, setVolumeDistribution] = useState([]);

    const [deviceDistribution, setDeviceDistribution] = useState([]);
    const [weeklyUsageDistribution, setWeeklyUsageDistribution] = useState([]);


    const [view, setView] = useState(localStorage.getItem("preference") || 'grid');



    const fetchCharging = async () => {

        let res = await fetch(`${BACKEND_URL}/charging/${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        responseHandler(res.clone(), setInfo);
        let response = await res.json();

        if (response.code === 403 || response.code === 401) {
            setForbidden(true);
        } else {
            response.data['firstSessionDate'] = cleanDate(response.data['firstSessionDate'])
            response.data['lastSessionDate'] = cleanDate(response.data['lastSessionDate'])
            response.data['chargingStartDate'] = cleanDate(response.data['chargingStartDate'])
            response.data['chargingEndDate'] = cleanDate(response.data['chargingEndDate'])
        }

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
            resp['volume'] = Math.round(resp['volume'] * 100);
        }
        console.log(response.data);
        setSessions(response.data.reverse());

    }


    const getSummary = async () => {

        let res = await fetch(`${BACKEND_URL}/dashboard/charging/${id}`, {
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


    const getChartsInfo = async () => {

        try {

            let res = await fetch(`${BACKEND_URL}/analytics/charging/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            });

            let response = await res.json();

            setCumulativeTrend(response?.data?.['cumulative-trend'] || []);
            setSessionDurationShare(response?.data?.['session-duration-share'] || []);

            setUsageTimeDistribution(response?.data?.['time-usage-distribution'] || []);
            setWeekDistribution(response?.data?.['weekday-vs-weekend-distribution'] || []);

            setVolumeDistribution(response?.data?.['volume-distribution'] || []);
            setDivisonDistribution(response?.data?.['divison-usage-distribution'] || []);

            setDeviceDistribution(response?.data?.['device-distribution'] || []);
            setWeeklyUsageDistribution(response?.data?.['weekly-usage-distribution'] || []);


        } catch (err) {

            setCumulativeTrend([]);
            setSessionDurationShare([]);

            setWeekDistribution([]);
            setUsageTimeDistribution([]);

            setVolumeDistribution([]);
            setDivisonDistribution([]);

            setDeviceDistribution([]);
            setWeeklyUsageDistribution([]);

        }

    }


    useEffect(() => {
        try {
            fetchCharging();
            getSummary();
            fetchSessions();
            getChartsInfo();
        } catch (err) { }
    }, [])

    if (forbidden) return <NotFound />

    return (
        <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
            <Notification info={info} />

            {updateVisibility && <UpdateCharging charging={charging} panel={setUpdateVisibility} />}
            {deleteVisibility && <DeleteCharging charging={charging} panel={setDeleteVisibility} />}


            <div className="flex flex-col-reverse md:flex-col gap-6">
                <div className="flex flex-row w-full flex-wrap gap-8 px-4 md:px-8 py-4 justify-around">
                    {!charging ? <Loading /> : <ChargingMiniCard charging={charging} previlegeMenu={true} setCharging={setCharging} setUpdateVisibility={setUpdateVisibility} setDeleteVisibility={setDeleteVisibility} />}
                </div>

                <div className="flex flex-row flex-wrap gap-4 justify-center">
                    {Object.entries(summary).map(([index, summary]) => {
                        return (
                            <div className="flex flex-row py-2 px-4 gap-4 justify-around items-center border border-slate-200 dark:border-purple-400/20 rounded-md w-60" key={index} >
                                {summary.component}
                                <div className="flex flex-col">
                                    <span className='text-cyan-600 text-sm' >{summary.title}</span>
                                    <span className='text-sky-600 dark:text-purple-300 text-sm capitalize'><span className='font-bold font-poppins text-md'>{summary.type === "number" ? eclipseNumber(summary.data) : summary.data}</span>{summary.units}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            <div className="flex flex-row items-center h-12  justify-center gap-8 pb-4 border-b-2 border-slate-200 dark:border-slate-800">
                <span className={`text-indigo-400 hover:scale-105 hover:cursor-pointer transition hover:pb-1 hover:border-b-4 hover:border-emerald-400 text-2xl font-bold font-poppins uppercase ${menu === "session" && "border-b-4  border-emerald-400"} `} onClick={() => { setMenu("session") }}>Sessions</span>
                <span className={`text-indigo-400 hover:scale-105 hover:cursor-pointer transition hover:pb-1 hover:border-b-4 hover:border-emerald-400 text-2xl font-bold font-poppins uppercase ${menu === "chart" && "border-b-4 border-emerald-400"} `} onClick={() => { setMenu("chart") }}>Analytic Charts</span>
            </div>


            {menu === "session" && <div className="flex flex-col w-full flex-wrap gap-8 px-4 md:px-8 py-4 justify-around items-center mt-4">
                <span className="text-indigo-400 text-2xl font-bold font-poppins uppercase">Sessions</span>

                {sessions.length === 0 ? <Loading /> :
                    sessions.map(session => {
                        return <SessionMiniCard session={session} privilegeMenu={false} key={session._id} />
                    })
                }
            </div>}



            {menu === "chart" && <div className="flex flex-col gap-4 w-full h-auto justify-content px-4 py-4">

                <div className="flex flex-row gap-2 justify-between items-center bg-stone-300 dark:bg-stone-700 px-4 py-2 rounded-md">
                    <span className='font-poppins text-sky-400 font-bold text-xl'>Charging Analytical Charts</span>
                    <div className="hidden md:flex flex-row gap-2 items-center">
                        <MdList onClick={() => { localStorage.setItem("preference", "list"); setView("list"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-sky-300 p-1 ${view === "list" ? 'bg-sky-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                        <IoGrid onClick={() => { localStorage.setItem("preference", "grid"); setView("grid"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-emerald-300 p-1 ${view === "grid" ? 'bg-emerald-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 justify-center items-center">



                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                        <span className='font-oswald font-bold text-md tracking-wide text-emerald-400'>Session Duration Share</span>

                        {sessionDurationShare.length === 0 ? <ChargingLoading />
                            : <ResponsiveContainer >
                                <PieChart>
                                    <Pie activeShape={renderActiveShape} data={sessionDurationShare} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="share" nameKey="duration" >
                                        {sessionDurationShare.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[Math.abs(COLORS.length - index - 1) % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: "12px", border: "none" }} />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "14px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        }
                    </div>



                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                        <span className="font-oswald font-bold text-md tracking-wide text-emerald-400">Cumulative Trend</span>

                        {cumulativeTrend.length === 0 ? <ChargingLoading />
                            : <ResponsiveContainer >
                                <LineChart data={cumulativeTrend} >
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }} >
                                        <Label value='Date' offset={-2} position='insideBottom' style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }}>
                                        <Label value='Duration' angle={-90} offset={0} position='insideLeft' style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Line type="monotone" dataKey="duration" stroke="var(--color-violet-600)" strokeWidth={2} />
                                    <Tooltip cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </LineChart>
                            </ResponsiveContainer>
                        }
                    </div>



                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                        <span className="font-oswald font-bold text-md tracking-wide text-emerald-400">Weekly Usage Distribution</span>

                        {weeklyUsageDistribution.length === 0 ? <ChargingLoading />
                            : <ResponsiveContainer >
                                <BarChart data={weeklyUsageDistribution} barCategoryGap={weekBarGap}  >
                                    <XAxis dataKey="week" tick={{ fontSize: 12 }} >
                                        <Label offset={-2} value="Week" position="insideBottom" style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }} >
                                        <Label angle={-90} offset={20} value="Count" position="insideLeft" style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Bar dataKey="duration" fill='var(--color-fuchsia-400)' radius={[4, 4, 0, 0]} onMouseLeave={() => setWeekIndex(null)} >
                                        {weeklyUsageDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                fill={index === weekIndex ? "var(--color-blue-400)" : "var(--color-indigo-400)"}
                                                onMouseEnter={() => { setWeekIndex(index); setWeekBarGap(4); }}
                                                onMouseLeave={() => { setWeekBarGap(12) }}
                                            />
                                        ))}
                                    </Bar>
                                    <Tooltip content={WeekToolTip} cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </BarChart>
                            </ResponsiveContainer>
                        }
                    </div>



                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                        <span className='font-oswald font-bold text-md tracking-wide text-emerald-400'>Weekend vs Weekday Distribution</span>

                        {weekDistribution.length === 0 ? <ChargingLoading />
                            : <ResponsiveContainer >
                                <PieChart>
                                    <Pie activeShape={renderActiveShape} data={weekDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="share" nameKey="key" >
                                        {weekDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[Math.abs(COLORS.length - index - 4) % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: "12px", border: "none" }} />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "14px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        }
                    </div>



                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                        <span className='font-oswald font-bold text-md tracking-wide text-emerald-400'>Device Distribution</span>

                        {deviceDistribution.length === 0 ? <ChargingLoading />
                            : <ResponsiveContainer >
                                <PieChart>
                                    <Pie activeShape={renderActiveShape} data={deviceDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="percent" nameKey="nickname" >
                                        {volumeDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[(COLORS.length - Math.abs(index) + 6) % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: "12px", border: "none" }} />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "14px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        }
                    </div>



                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                        <span className="font-oswald font-bold text-md tracking-wide text-emerald-400">Day vs Evening vs Night Distribution</span>

                        {divisonDistribution.length === 0 ? <ChargingLoading />
                            : <ResponsiveContainer >
                                <BarChart data={divisonDistribution} barCategoryGap={divisonBarGap}  >
                                    <XAxis dataKey="key" tick={{ fontSize: 12 }} >
                                        <Label offset={-2} value="Session Duration" position="insideBottom" style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }} >
                                        <Label angle={-90} offset={20} value="Count" position="insideLeft" style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Bar dataKey="duration" fill='var(--color-fuchsia-400)' radius={[4, 4, 0, 0]} onMouseLeave={() => setDivisonIndex(null)} >
                                        {divisonDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                fill={index === divisonIndex ? "var(--color-blue-400)" : "var(--color-indigo-400)"}
                                                onMouseEnter={() => { setDivisonIndex(index); setDivisonBarGap(4); }}
                                                onMouseLeave={() => { setDivisonBarGap(12) }}
                                            />
                                        ))}
                                    </Bar>
                                    <Tooltip cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </BarChart>
                            </ResponsiveContainer>
                        }
                    </div>



                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                        <span className="font-oswald font-bold text-md tracking-wide text-emerald-400">Usage Time Distribution</span>

                        {usageTimeDistribution.length === 0 ? <ChargingLoading />
                            : <ResponsiveContainer >
                                <BarChart data={usageTimeDistribution} barCategoryGap={timeBarGap}  >
                                    <XAxis dataKey="key" tick={{ fontSize: 12 }} >
                                        <Label offset={-2} value="Time" position="insideBottom" style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }} >
                                        <Label angle={-90} offset={20} value="Count" position="insideLeft" style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Bar dataKey="count" fill='var(--color-fuchsia-400)' radius={[4, 4, 0, 0]} onMouseLeave={() => setTimeIndex(null)} >
                                        {usageTimeDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                fill={index === timeIndex ? "var(--color-sky-400)" : "var(--color-teal-400)"}
                                                onMouseEnter={() => { setTimeIndex(index); setTimeBarGap(4); }}
                                                onMouseLeave={() => { setTimeBarGap(12) }}
                                            />
                                        ))}
                                    </Bar>
                                    <Tooltip cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </BarChart>
                            </ResponsiveContainer>
                        }
                    </div>



                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>

                        <span className='font-oswald font-bold text-md tracking-wide text-emerald-400'>Volume Distribution</span>

                        {volumeDistribution.length === 0 ? <ChargingLoading />
                            : <ResponsiveContainer >
                                <PieChart>
                                    <Pie activeShape={renderActiveShape} data={volumeDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="share" nameKey="volume" >
                                        {volumeDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[Math.abs(index) % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: "12px", border: "none" }} />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "14px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        }
                    </div>

                </div>
            </div>}

        </main>
    );
}


const WeekToolTip = ({ active, payload, label }) => {

    return (
        <div className='px-2 py-1 bg-white rounded-sm '>
            <p className='text-sm text-emerald-400 text-ms'>Week {payload[0]?.payload?.['week']}</p>
            <p className='text-sm text-indigo-600'>{payload[0]?.payload?.['min']}</p>
            <p className='text-sm text-indigo-600'>{payload[0]?.payload?.['max']}</p>
            <p className='text-sm text-purple-400'>Count : {payload[0]?.payload?.['count']}</p>
            <p className='text-sm text-purple-400'>Duration : {payload[0]?.payload?.['duration']}</p>
        </div>
    );

}


const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
}) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.nickname}
            </text>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
            <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={(outerRadius ?? 0) + 6} outerRadius={(outerRadius ?? 0) + 10} fill={fill} />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="var(--color-emerald-400)" fontSize={18} fontWeight={700} >{`${payload.key || payload.duration}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="var(--color-fuchsia-400)" fontSize={12}>
                {`(Contribution ${(percent ?? 1)}%)`}
            </text>
        </g>
    );
};


export default ChargingDetails;