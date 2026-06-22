import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useNavigate } from "react-router"

import RecapHeader from "@/components/recap/shared/RecapHeader"
import RecapIntro from "@/components/recap/shared/RecapIntro"
import RecapNav from "@/components/recap/shared/RecapNav"
import RecapAudio from "@/components/recap/shared/RecapAudio"
import useRecapGuard from "@/components/recap/shared/useRecapGuard"
import { RecapLoading, RecapError, RecapNotAllowed } from "@/components/recap/shared/RecapShell"

import CategorySlide from "@/components/recap/yearly/CategorySlide"
import YearlyStatCard from "@/components/recap/yearly/YearlyStatCard"
import YearlyClosingCard from "@/components/recap/yearly/YearlyClosingCard"

import { BACKEND_URL } from "@/store/UrlStore"

/* ─────────────────────────────────────────────────────────────────
   Yearly recap track — cinematic / emotional ambient
   Pixabay free license, no attribution required.
   Swap URL anytime.
───────────────────────────────────────────────────────────────── */
const YEARLY_TRACK = "https://cdn.pixabay.com/audio/2024/12/15/audio_49a2d6d0f0.mp3"

/* ── slide transition ─────────────────────────────────────────── */
const slide = {
    enter: (d) => ({ opacity: 0, y: d > 0 ? 56 : -56, scale: 0.97 }),
    center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, y: d > 0 ? -56 : 56, scale: 0.97, transition: { duration: 0.32, ease: "easeIn" } })
}

/* ─────────────────────────────────────────────────────────────────
   buildSlides
   Flattens the nested categories/cards structure into a flat array
   of "slides" that the navigator steps through one by one.

   Slide types:
     { type: "category",  category, categoryIndex }
     { type: "card",      card, category, cardIndexInCategory }
     { type: "closing" }
───────────────────────────────────────────────────────────────── */
const buildSlides = (recapData) => {
    if (!recapData?.recap?.categories) return []
    const slides = []
    recapData.recap.categories.forEach((cat, ci) => {
        // Chapter title card
        slides.push({ type: "category", category: cat, categoryIndex: ci })
        // 4 stat cards
        cat.cards.forEach((card, idx) => {
            slides.push({
                type: "card",
                card,
                category: cat,
                cardIndexInCategory: idx,
                totalInCategory: cat.cards.length,
            })
        })
    })
    // Final personality closing
    slides.push({ type: "closing" })
    return slides
}

/* ── dot grid style ───────────────────────────────────────────── */
const DOT_GRID = {
    backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
    backgroundSize: "32px 32px"
}

/* ─────────────────────────────────────────────────────────────────
   Main Page
───────────────────────────────────────────────────────────────── */
const YearlyRecapPage = () => {
    const { year } = useParams()
    const navigate = useNavigate()

    /* guard — yearly window: Jan 1-7 only, previous year must match */
    const { allowed } = useRecapGuard("yearly", year)

    const [recapData, setRecapData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [started, setStarted] = useState(false)
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)

    /* ── fetch ── */
    const fetchRecap = useCallback(async () => {
        if (!allowed) return
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`${BACKEND_URL}/recap/${year}`, {
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
    }, [allowed, year])

    useEffect(() => { fetchRecap() }, [fetchRecap])

    /* ── build flat slide list ── */
    const slides = buildSlides(recapData)
    const total = slides.length

    /* ── nav ── */
    const goNext = useCallback(() => {
        if (current < total - 1) { setDirection(1); setCurrent(p => p + 1) }
    }, [current, total])

    const goPrev = useCallback(() => {
        if (current > 0) { setDirection(-1); setCurrent(p => p - 1) }
    }, [current])

    /* ── keyboard ── */
    useEffect(() => {
        if (!started) return
        const fn = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext()
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev()
        }
        window.addEventListener("keydown", fn)
        return () => window.removeEventListener("keydown", fn)
    }, [started, goNext, goPrev])

    /* ── touch swipe ── */
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

    const activeSlide = slides[current]

    /* ── render a slide ── */
    const renderSlide = (slide) => {
        if (!slide) return null

        if (slide.type === "category") {
            return (
                <CategorySlide
                    category={slide.category}
                    categoryIndex={slide.categoryIndex}
                    totalCategories={recapData.recap.total_categories}
                    isActive={true}
                />
            )
        }

        if (slide.type === "card") {
            return (
                <YearlyStatCard
                    card={slide.card}
                    categoryKey={slide.category.key}
                    cardIndexInCategory={slide.cardIndexInCategory}
                    totalInCategory={slide.totalInCategory}
                    isActive={true}
                />
            )
        }

        if (slide.type === "closing") {
            return (
                <YearlyClosingCard
                    personality={recapData?.personality}
                    year={year}
                    isActive={true}
                />
            )
        }

        return null
    }

    /* ── derive header label ── */
    const headerLabel = (() => {
        if (!activeSlide) return `${year} · Year in Review`
        if (activeSlide.type === "category") return `${activeSlide.category.label}`
        if (activeSlide.type === "card") return `${activeSlide.category.label} · ${year}`
        return `${year} · Year in Review`
    })()

    /* ── not allowed ── */
    if (!allowed) return (
        <div className="relative min-h-screen w-full bg-stone-900 overflow-hidden"
            style={{ userSelect: "none" }}>
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={DOT_GRID} />
            <RecapNotAllowed navigate={navigate} />
        </div>
    )

    return (
        <div className="relative min-h-screen w-full bg-stone-900 overflow-hidden"
            style={{ userSelect: "none", WebkitUserSelect: "none" }}>

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={DOT_GRID} />

            {/* Audio — cinematic track for yearly */}
            <RecapAudio trackUrl={YEARLY_TRACK} started={started} />

            {/* Loading */}
            {loading && <RecapLoading />}

            {/* Error */}
            {!loading && error && <RecapError message={error} onRetry={fetchRecap} />}

            {/* Content */}
            {!loading && !error && recapData && (
                <>
                    {/* Intro */}
                    <AnimatePresence mode="wait">
                        {!started && (
                            <motion.div key="intro"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -24, transition: { duration: 0.4 } }}
                                className="absolute inset-0 z-10"
                            >
                                <RecapIntro
                                    title={year}
                                    subtitle="Year in Review"
                                    tagline="A full year of listening, distilled into your story."
                                    onStart={() => setStarted(true)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Slides */}
                    {started && activeSlide && (
                        <>
                            <RecapHeader
                                label={headerLabel}
                                currentCard={current}
                                totalCards={total}
                            />

                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={current}
                                    custom={direction}
                                    variants={slide}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-0"
                                >
                                    {renderSlide(activeSlide)}
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

export default YearlyRecapPage;