import { useParams, useNavigate } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

import RecapNav from "@/components/recap/shared/RecapNav"
import RecapIntro from "@/components/recap/shared/RecapIntro"
import RecapAudio from "@/components/recap/shared/RecapAudio"
import RecapHeader from "@/components/recap/shared/RecapHeader"
import useRecapGuard from "@/components/recap/shared/useRecapGuard"
import { RecapLoading, RecapError, RecapNotAllowed } from "@/components/recap/shared/RecapShell"

import { BACKEND_URL } from "@/store/UrlStore"
import StatCard from "@/components/recap/monthly/StatCard"
import ClosingCard from "@/components/recap/monthly/ClosingCard"


/* ─────────────────────────────────────────────────────────────────
   Monthly track — lofi joyful
   Pixabay free license. Swap URL anytime.
───────────────────────────────────────────────────────────────── */
const MONTHLY_TRACK = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"

/* ── slide transition ─────────────────────────────────────────── */
const slide = {
    enter: (d) => ({ opacity: 0, y: d > 0 ? 56 : -56, scale: 0.97 }),
    center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, y: d > 0 ? -56 : 56, scale: 0.97, transition: { duration: 0.32, ease: "easeIn" } })
}

const DOT_GRID = {
    backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
    backgroundSize: "32px 32px"
}

const MonthlyRecapPage = () => {
    const { year, month } = useParams()
    const navigate = useNavigate()

    const { allowed } = useRecapGuard("monthly", year, month)

    const [recapData, setRecapData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [started, setStarted] = useState(false)
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)

    const fetchRecap = useCallback(async () => {
        if (!allowed) return
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`${BACKEND_URL}/recap/${year}/${month}`, {
                credentials: "include",
            })
            if (!res.ok) throw new Error(`Server returned ${res.status}`)
            const data = await res.json()
            if (data.code !== 200) throw new Error(data.message || "Unexpected response")
            setRecapData(data)
        } catch (err) {
            setError(err.message || "Failed to load recap")
        } finally {
            setLoading(false)
        }
    }, [allowed, year, month])

    useEffect(() => { fetchRecap() }, [fetchRecap])

    const cards = recapData?.recap?.cards || []
    const total = cards.length

    const goNext = useCallback(() => {
        if (current < total - 1) { setDirection(1); setCurrent(p => p + 1) }
    }, [current, total])

    const goPrev = useCallback(() => {
        if (current > 0) { setDirection(-1); setCurrent(p => p - 1) }
    }, [current])

    useEffect(() => {
        if (!started) return
        const fn = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext()
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev()
        }
        window.addEventListener("keydown", fn)
        return () => window.removeEventListener("keydown", fn)
    }, [started, goNext, goPrev])

    useEffect(() => {
        if (!started) return
        let startY = 0
        const onStart = (e) => { startY = e.touches[0].clientY }
        const onEnd = (e) => {
            const diff = startY - e.changedTouches[0].clientY
            if (Math.abs(diff) > 45) diff > 0 ? goNext() : goPrev()
        }
        window.addEventListener("touchstart", onStart)
        window.addEventListener("touchend", onEnd)
        return () => {
            window.removeEventListener("touchstart", onStart)
            window.removeEventListener("touchend", onEnd)
        }
    }, [started, goNext, goPrev])

    const activeCard = cards[current]
    const isClosing = activeCard?.key === "closing_remarks"

    if (!allowed) return (
        <div className="relative min-h-screen w-full bg-stone-900 overflow-hidden" style={{ userSelect: "none" }}>
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={DOT_GRID} />
            <RecapNotAllowed navigate={navigate} />
        </div>
    )

    return (
        <div className="relative min-h-screen w-full bg-stone-900 overflow-hidden"
            style={{ userSelect: "none", WebkitUserSelect: "none" }}>

            <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={DOT_GRID} />

            <RecapAudio trackUrl={MONTHLY_TRACK} started={started} />

            {loading && <RecapLoading />}
            {!loading && error && <RecapError message={error} onRetry={fetchRecap} />}

            {!loading && !error && recapData && (
                <>
                    <AnimatePresence mode="wait">
                        {!started && (
                            <motion.div key="intro"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -24, transition: { duration: 0.4 } }}
                                className="absolute inset-0 z-10"
                            >
                                <RecapIntro
                                    title={recapData.monthName}
                                    subtitle={String(recapData.year)}
                                    tagline="A month's worth of listening, distilled into your story."
                                    onStart={() => setStarted(true)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {started && activeCard && (
                        <>
                            <RecapHeader
                                label={`${recapData.monthName} ${recapData.year} · Recap`}
                                currentCard={current}
                                totalCards={total}
                            />

                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeCard.id}
                                    custom={direction}
                                    variants={slide}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-0"
                                >
                                    {isClosing
                                        ? <ClosingCard card={activeCard} isActive={true} />
                                        : <StatCard card={activeCard} isActive={true} />
                                    }
                                </motion.div>
                            </AnimatePresence>

                            <RecapNav
                                currentCard={current}
                                totalCards={total}
                                onPrev={goPrev}
                                onNext={goNext}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default MonthlyRecapPage;