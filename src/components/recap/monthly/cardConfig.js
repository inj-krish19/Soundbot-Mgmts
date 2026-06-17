import {
    RiHeadphoneLine,
    RiCalendarCheckLine,
    RiFireLine,
    RiTimeLine,
    RiMoonLine,
    RiBarChartGroupedLine,
    RiEqualizerLine,
    RiTrophyLine,
    RiArrowUpDownLine,
} from "react-icons/ri"

export const CARD_ICONS = {
    total_listening_time: RiHeadphoneLine,
    active_days: RiCalendarCheckLine,
    longest_streak: RiFireLine,
    peak_hour: RiTimeLine,
    favorite_time_of_day: RiMoonLine,
    weekend_vs_weekday: RiBarChartGroupedLine,
    daily_average: RiEqualizerLine,
    personal_best_day: RiTrophyLine,
    vs_last_month: RiArrowUpDownLine,
}

export const CARD_ACCENT = {
    total_listening_time: "text-purple-400",
    active_days: "text-purple-400",
    longest_streak: "text-orange-400",
    peak_hour: "text-cyan-400",
    favorite_time_of_day: "text-indigo-400",
    weekend_vs_weekday: "text-teal-400",
    daily_average: "text-emerald-400",
    personal_best_day: "text-yellow-400",
    vs_last_month: "text-slate-400",
}

export const CARD_BG_GLOW = {
    total_listening_time: "rgba(168,85,247,0.07)",
    active_days: "rgba(168,85,247,0.07)",
    longest_streak: "rgba(251,146,60,0.07)",
    peak_hour: "rgba(34,211,238,0.06)",
    favorite_time_of_day: "rgba(99,102,241,0.07)",
    weekend_vs_weekday: "rgba(20,184,166,0.06)",
    daily_average: "rgba(52,211,153,0.06)",
    personal_best_day: "rgba(250,204,21,0.06)",
    vs_last_month: "rgba(148,163,184,0.04)",
}