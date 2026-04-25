import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { responseHandler } from "@/utils/response-handler";

import { BACKEND_URL } from "@/store/UrlStore";
import Loading from "@/components/ui/Loading";
import NotFound from "@/pages/system/NotFound";
import Notification from "@/components/ui/Notification";


import UpdateDevice from "@/components/device/UpdateDevice";
import DeleteDevice from "@/components/device/DeleteDevice";
import DeviceMiniCard from "@/components/device/DeviceMiniCard";
import DeviceLoading from "@/components/charts_loading/DeviceLoading";


import { MdList } from "react-icons/md";
import { SiSession } from "react-icons/si";
import { LuActivity } from "react-icons/lu";
import { eclipseNumber } from "@/utils/eclipse-text";
import { IoCalendar, IoGrid, IoTrendingUp } from "react-icons/io5";


import { XAxis, YAxis, Line, Legend, Label, LineChart, Tooltip, BarChart, Bar, Cell, ResponsiveContainer, PieChart, Pie, Sector, CartesianGrid, AreaChart, Area } from 'recharts'


const COLORS = ['var(--color-purple-600)', 'var(--color-teal-600)', 'var(--color-orange-600)', 'var(--color-pink-600)', 'var(--color-cyan-600)', 'var(--color-lime-600)', 'var(--color-fuchsia-600)', 'var(--color-indigo-600)', 'var(--color-emerald-600)', 'var(--color-amber-600)', 'var(--color-rose-600)', 'var(--color-sky-600)',
];


function DeviceDetails() {

    const params = useParams();
    const id = params.id;

    const [summary, setSummary] = useState({
        "yearly_device_sessions": {
            title: "Yearly Sessions", component: <SiSession size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "longest_yearly_session": {
            title: "Longest Session", component: <LuActivity size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "average_listen_time": {
            title: "Average Listen Time", component: <IoTrendingUp size={24} className='text-teal-400 dark:text-slate-200' />,
        },
        "yearly_listening_time": {
            title: "Yearly Listening Time", component: <IoCalendar size={24} className='text-teal-400 dark:text-slate-200' />,
        },
    });
    const [info, setInfo] = useState({
        'message': '',
        type: ''
    })

    const [device, setDevice] = useState(null);
    const [forbidden, setForbidden] = useState(false);

    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);


    const [timeIndex, setTimeIndex] = useState(null);
    const [timeBarGap, setTimeBarGap] = useState(4);

    const [sessionBarGap, setSessionBarGap] = useState(4);
    const [sessionIndex, setSessionIndex] = useState(null);

    const [listenTimeDistribution, setListenTimeDistribution] = useState([]);
    const [playerUsageDistribution, setPlayerUsageDistribution] = useState([]);

    const [sessionDurationDistribution, setSessionDurationDistribution] = useState([]);
    const [yearlyCountDistribution, setYearlyCountDistribution] = useState([]);

    const [view, setView] = useState(localStorage.getItem("preference") || 'grid');


    const main = async () => {

        let res = await fetch(`${BACKEND_URL}/device/${id}`, {
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
        }

        setDevice(response?.data);

    }


    const getSummary = async () => {

        let res = await fetch(`${BACKEND_URL}/dashboard/device/${id}`, {
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


    const getChartsInfo = async () => {

        try {

            let res = await fetch(`${BACKEND_URL}/analytics/device/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            });

            let response = await res.json();

            setListenTimeDistribution(response?.data?.['listening-time'] || []);
            setPlayerUsageDistribution(response?.data?.['player-usage-contribution'] || []);

            setYearlyCountDistribution(response?.data?.['yearly-count-trend'] || []);
            setSessionDurationDistribution(response?.data?.['session-duration-distribution'] || []);

        } catch (err) {

            setListenTimeDistribution([]);
            setPlayerUsageDistribution([]);

            setYearlyCountDistribution([]);
            setSessionDurationDistribution([]);

        }

    }


    useEffect(() => {
        try {
            main();
            getSummary();
            getChartsInfo();
        } catch (err) { }
    }, []);

    if (forbidden) return <NotFound />

    return (
        <main className='relative flex flex-col gap-8 min-h-screen w-full h-full px-4 md:px-8 py-4'>
            <Notification info={info} />

            {updateVisibility && <UpdateDevice device={device} panel={setUpdateVisibility} />}
            {deleteVisibility && <DeleteDevice device={device} panel={setDeleteVisibility} />}


            <div className="flex flex-col-reverse md:flex-col gap-6">

                <div className="flex flex-row w-full flex-wrap gap-8 md:px-8 py-4 justify-around">
                    {!device ? <Loading /> : <DeviceMiniCard device={device} privilegeMenu={true} setDevice={setDevice} setUpdateVisibility={setUpdateVisibility} setDeleteVisibility={setDeleteVisibility} />}
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



            <div className="flex flex-col gap-4 w-full h-auto justify-content px-4 py-4">

                <div className="flex flex-row gap-2 justify-between items-center bg-stone-300 dark:bg-stone-700 px-4 py-2 rounded-md">
                    <span className='font-poppins text-sky-400 font-bold text-xl'>Device Analytical Charts</span>
                    <div className="hidden md:flex flex-row gap-2 items-center">
                        <MdList onClick={() => { localStorage.setItem("preference", "list"); setView("list"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-sky-300 p-1 ${view === "list" ? 'bg-sky-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                        <IoGrid onClick={() => { localStorage.setItem("preference", "grid"); setView("grid"); }} size={30} className={`text-slate-800 dark:text-slate-200 rounded-sm hover:bg-emerald-300 p-1 ${view === "grid" ? 'bg-emerald-300' : 'bg-stone-400 dark:bg-stone-600'} `} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 justify-center items-center">


                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                        <span className="font-oswald font-bold text-md tracking-wide text-indigo-400">Listen Time Distribution</span>

                        {listenTimeDistribution.length === 0 ? <DeviceLoading />
                            : <ResponsiveContainer >
                                <BarChart data={listenTimeDistribution} barCategoryGap={timeBarGap}  >
                                    <XAxis dataKey="key" tick={{ fontSize: 12 }} >
                                        <Label offset={-2} value="Listen Time Distribution" position="insideBottom" style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }} >
                                        <Label angle={-90} offset={20} value="Count" position="insideLeft" style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Bar dataKey="count" fill='var(--color-fuchsia-400)' radius={[4, 4, 0, 0]} onMouseLeave={() => setTimeIndex(null)} >
                                        {listenTimeDistribution.map((entry, index) => (
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

                        <span className='font-oswald font-bold text-md tracking-wide text-indigo-400'>Player Usage Distribution</span>

                        {playerUsageDistribution.length === 0 ? <DeviceLoading />
                            : <ResponsiveContainer >
                                <PieChart>
                                    <Pie activeShape={renderActiveShape} data={playerUsageDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="percent" nameKey="nickname" >
                                        {playerUsageDistribution.map((entry, index) => (
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

                        <span className="font-oswald font-bold text-md tracking-wide text-indigo-400">Yearly Count</span>

                        {yearlyCountDistribution.length === 0 ? <DeviceLoading />
                            : <ResponsiveContainer >
                                <LineChart data={yearlyCountDistribution} >
                                    <XAxis dataKey="year" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }} >
                                        <Label value='Year' offset={-2} position='insideBottom' style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }}>
                                        <Label value='Session Count' angle={-90} offset={20} position='insideLeft' style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Line type="monotone" dataKey="count" stroke="var(--color-orange-400)" strokeWidth={2} />
                                    <Tooltip cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </LineChart>
                            </ResponsiveContainer>
                        }
                    </div>



                    <div className={`row-span-1 flex flex-col gap-3 bg-stone-300 dark:bg-stone-700 p-4 rounded-xl border border-sky-300 dark:border-purple-400 w-full max:w-3/4 h-100 shadow-md items-center ${view === "list" ? 'col-span-2' : 'col-span-2 md:col-span-1 '}`}>

                        <span className="font-oswald font-bold text-md tracking-wide text-indigo-400">Session Duration Distribution</span>

                        {sessionDurationDistribution.length === 0 ? <DeviceLoading />
                            : <ResponsiveContainer >
                                <BarChart data={sessionDurationDistribution} barCategoryGap={sessionBarGap}  >
                                    <XAxis dataKey="key" tick={{ fontSize: 12 }} >
                                        <Label offset={-2} value="Session Duration Distribution" position="insideBottom" style={{ fontSize: 12 }} />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }} >
                                        <Label angle={-90} offset={20} value="Count" position="insideLeft" style={{ fontSize: 12 }} />
                                    </YAxis>

                                    <Bar dataKey="count" fill='var(--color-fuchsia-400)' radius={[4, 4, 0, 0]} onMouseLeave={() => setSessionIndex(null)} >
                                        {sessionDurationDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                fill={index === sessionIndex ? "var(--color-blue-400)" : "var(--color-indigo-400)"}
                                                onMouseEnter={() => { setSessionIndex(index); setSessionBarGap(4); }}
                                                onMouseLeave={() => { setSessionBarGap(12) }}
                                            />
                                        ))}
                                    </Bar>
                                    <Tooltip cursor={{ fill: "var(--color-purple-200)" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                                </BarChart>
                            </ResponsiveContainer>
                        }
                    </div>



                </div>
            </div>


        </main>
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
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="var(--color-emerald-400)" fontSize={18} fontWeight={700} >{`${payload.nickname}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="var(--color-fuchsia-400)" fontSize={12}>
                {`(Contribution ${(percent ?? 1)}%)`}
            </text>
        </g>
    );
};


export default DeviceDetails;