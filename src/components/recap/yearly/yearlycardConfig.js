import {
    RiHeadphoneLine, RiCalendarCheckLine, RiFireLine, RiPlayLine,
    RiMoonLine, RiTimeLine, RiArrowUpLine, RiArrowDownLine,
    RiSmartphoneLine, RiBatteryChargeLine, RiTrophyLine,
    RiBarChartGroupedLine, RiCalendar2Line, RiSunCloudyLine,
    RiMedalLine, RiUserStarLine, RiArrowUpDownLine, RiHeartLine,
    RiEqualizerLine, RiPulseLine
} from "react-icons/ri"

/* ── per card key: icon, accent text color, glow rgba ─────────── */
export const CARD_META = {
    /* sound_story */
    total_listening_time: { Icon: RiHeadphoneLine, accent: "text-purple-400", glow: "rgba(168,85,247,0.09)" },
    active_days: { Icon: RiCalendarCheckLine, accent: "text-purple-400", glow: "rgba(168,85,247,0.08)" },
    longest_streak: { Icon: RiFireLine, accent: "text-orange-400", glow: "rgba(251,146,60,0.09)" },
    total_sessions: { Icon: RiPlayLine, accent: "text-purple-300", glow: "rgba(168,85,247,0.07)" },

    /* your_calendar (patterns) */
    favorite_time_of_day: { Icon: RiMoonLine, accent: "text-indigo-400", glow: "rgba(99,102,241,0.09)" },
    peak_hour: { Icon: RiTimeLine, accent: "text-cyan-400", glow: "rgba(34,211,238,0.08)" },
    biggest_spike_day: { Icon: RiArrowUpLine, accent: "text-emerald-400", glow: "rgba(52,211,153,0.08)" },
    shortest_session: { Icon: RiArrowDownLine, accent: "text-rose-400", glow: "rgba(244,63,94,0.07)" },

    /* your_gear */
    go_to_player: { Icon: RiTrophyLine, accent: "text-teal-400", glow: "rgba(20,184,166,0.08)" },
    most_used_device: { Icon: RiSmartphoneLine, accent: "text-teal-300", glow: "rgba(20,184,166,0.07)" },
    total_chargings: { Icon: RiBatteryChargeLine, accent: "text-teal-400", glow: "rgba(20,184,166,0.08)" },
    battery_recoup: { Icon: RiPulseLine, accent: "text-teal-300", glow: "rgba(20,184,166,0.06)" },

    /* your_patterns (calendar) */
    biggest_month: { Icon: RiCalendar2Line, accent: "text-amber-400", glow: "rgba(251,191,36,0.08)" },
    quitest_month: { Icon: RiSunCloudyLine, accent: "text-amber-300", glow: "rgba(251,191,36,0.06)" },
    best_quarter: { Icon: RiBarChartGroupedLine, accent: "text-amber-400", glow: "rgba(251,191,36,0.08)" },
    quarter_wise_comparison: { Icon: RiEqualizerLine, accent: "text-amber-300", glow: "rgba(251,191,36,0.07)" },

    /* your_standing */
    vs_last_year: { Icon: RiArrowUpDownLine, accent: "text-rose-400", glow: "rgba(244,63,94,0.08)" },
    device_loyalty_score: { Icon: RiHeartLine, accent: "text-rose-300", glow: "rgba(244,63,94,0.07)" },
    listening_personality: { Icon: RiUserStarLine, accent: "text-rose-400", glow: "rgba(244,63,94,0.08)" },
    top_user_rank: { Icon: RiMedalLine, accent: "text-yellow-400", glow: "rgba(250,204,21,0.1)" },
}

/* ── per category: color palette ──────────────────────────────── */
export const CATEGORY_PALETTE = {
    sound_story: {
        accent: "text-purple-300",
        border: "border-purple-400/25",
        bg: "bg-purple-400/8",
        glow: "rgba(168,85,247,0.12)",
        pill: "bg-purple-400/15 text-purple-300 border-purple-400/25",
        barColor: "#c084fc",
    },
    your_calendar: {
        accent: "text-indigo-300",
        border: "border-indigo-400/25",
        bg: "bg-indigo-400/8",
        glow: "rgba(99,102,241,0.12)",
        pill: "bg-indigo-400/15 text-indigo-300 border-indigo-400/25",
        barColor: "#818cf8",
    },
    your_gear: {
        accent: "text-teal-300",
        border: "border-teal-400/25",
        bg: "bg-teal-400/8",
        glow: "rgba(20,184,166,0.12)",
        pill: "bg-teal-400/15 text-teal-300 border-teal-400/25",
        barColor: "#2dd4bf",
    },
    your_patterns: {
        accent: "text-amber-300",
        border: "border-amber-400/25",
        bg: "bg-amber-400/8",
        glow: "rgba(251,191,36,0.10)",
        pill: "bg-amber-400/15 text-amber-300 border-amber-400/25",
        barColor: "#fbbf24",
    },
    your_standing: {
        accent: "text-rose-300",
        border: "border-rose-400/25",
        bg: "bg-rose-400/8",
        glow: "rgba(244,63,94,0.10)",
        pill: "bg-rose-400/15 text-rose-300 border-rose-400/25",
        barColor: "#fb7185",
    },
}