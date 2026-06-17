import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RiVolumeUpLine, RiVolumeMuteLine } from "react-icons/ri"

/**
 * RecapAudio
 *
 * Ambient lofi track that plays softly during the recap.
 * Track: "Lofi Study" by Lesfm — Pixabay free license, no attribution required.
 * Source: https://pixabay.com/music/beats-lofi-study-112191/
 *
 * To swap the track later: change TRACK_URL to any direct .mp3 link.
 */

const TRACK_URL = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"

const RecapAudio = ({ started }) => {
    const audioRef = useRef(null)
    const [muted, setMuted] = useState(false)
    const [ready, setReady] = useState(false)
    const [visible, setVisible] = useState(false)

    /* Create audio element once */
    useEffect(() => {
        const audio = new Audio(TRACK_URL)
        audio.loop = true
        audio.volume = 0
        audioRef.current = audio

        audio.addEventListener("canplaythrough", () => setReady(true))
        return () => {
            audio.pause()
            audio.src = ""
        }
    }, [])

    /* Start playing when user clicks "See your recap" */
    useEffect(() => {
        if (!started || !ready) return
        const audio = audioRef.current
        audio.play().catch(() => {
            // Browser blocked autoplay — show button, user must interact
        })
        /* Fade in volume over 2s */
        let v = 0
        const fade = setInterval(() => {
            v = Math.min(v + 0.02, 0.28)
            audio.volume = v
            if (v >= 0.28) clearInterval(fade)
        }, 80)
        setVisible(true)
        return () => clearInterval(fade)
    }, [started, ready])

    /* Mute / unmute with fade */
    const toggleMute = () => {
        const audio = audioRef.current
        if (!audio) return
        if (!muted) {
            /* fade out */
            let v = audio.volume
            const fade = setInterval(() => {
                v = Math.max(v - 0.03, 0)
                audio.volume = v
                if (v <= 0) { audio.muted = true; clearInterval(fade) }
            }, 40)
        } else {
            audio.muted = false
            let v = 0
            const fade = setInterval(() => {
                v = Math.min(v + 0.02, 0.28)
                audio.volume = v
                if (v >= 0.28) clearInterval(fade)
            }, 80)
        }
        setMuted(m => !m)
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="audio-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 1, duration: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={toggleMute}
                    title={muted ? "Unmute music" : "Mute music"}
                    className="fixed top-4 right-5 z-[60] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800/80 border border-stone-700 backdrop-blur-sm text-stone-500 hover:text-slate-300 hover:border-purple-400/30 transition-colors duration-200"
                >
                    {/* Animated bars — only when unmuted */}
                    {!muted && (
                        <span className="flex items-end gap-[2px] h-3">
                            {[0.4, 0.7, 1, 0.6, 0.85].map((h, i) => (
                                <motion.span
                                    key={i}
                                    className="w-[2px] rounded-full bg-purple-400"
                                    animate={{ scaleY: [h, 1, h * 0.5, h] }}
                                    transition={{ duration: 0.9 + i * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                                    style={{ height: "100%", originY: 1, display: "block" }}
                                />
                            ))}
                        </span>
                    )}
                    {muted
                        ? <RiVolumeMuteLine size={14} />
                        : <RiVolumeUpLine size={14} />
                    }
                    <span className="text-[10px] font-poppins uppercase tracking-widest">
                        {muted ? "Unmute" : "Music"}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default RecapAudio;