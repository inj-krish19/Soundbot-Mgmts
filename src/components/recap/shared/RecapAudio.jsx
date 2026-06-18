import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RiVolumeUpLine, RiVolumeMuteLine } from "react-icons/ri"

/**
 * RecapAudio
 * Ambient music player fixed top-right.
 * Works for both monthly and yearly — pass different trackUrl for each.
 *
 * Props:
 *   trackUrl — direct .mp3 CDN link (Pixabay free license)
 *   started  — boolean; playback begins only after user clicks "See your recap"
 *              so browser autoplay policy is never violated
 *
 * Monthly track  (lofi / joyful):
 *   https://cdn.pixabay.com/audio/2024/11/20/audio_9ac5e9f2cf.mp3
 *
 * Yearly track (cinematic / emotional):
 *   https://cdn.pixabay.com/audio/2023/03/13/audio_9a6a59a5f8.mp3
 */
const RecapAudio = ({ trackUrl, started }) => {
    const audioRef = useRef(null)
    const [muted, setMuted] = useState(false)
    const [ready, setReady] = useState(false)
    const [visible, setVisible] = useState(false)

    /* Mount audio element once */
    useEffect(() => {
        const audio = new Audio(trackUrl)
        audio.loop = true
        audio.volume = 0
        audioRef.current = audio
        audio.addEventListener("canplaythrough", () => setReady(true))
        return () => {
            audio.pause()
            audio.src = ""
        }
    }, [trackUrl])

    /* Start after user interaction — respects autoplay policy */
    useEffect(() => {
        if (!started || !ready) return
        const audio = audioRef.current
        audio.play().catch(() => {
            // Browser blocked autoplay — user can manually unmute
        })
        /* Fade volume in over ~2s */
        let v = 0
        const fade = setInterval(() => {
            v = Math.min(v + 0.02, 0.28)
            audio.volume = v
            if (v >= 0.28) clearInterval(fade)
        }, 80)
        setVisible(true)
        return () => clearInterval(fade)
    }, [started, ready])

    const toggleMute = () => {
        const audio = audioRef.current
        if (!audio) return
        if (!muted) {
            /* Fade out */
            let v = audio.volume
            const fade = setInterval(() => {
                v = Math.max(v - 0.03, 0)
                audio.volume = v
                if (v <= 0) { audio.muted = true; clearInterval(fade) }
            }, 40)
        } else {
            /* Fade in */
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
                <motion.button key="audio-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 1, duration: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={toggleMute}
                    title={muted ? "Unmute music" : "Mute music"}
                    className="fixed top-15 right-5 z-[60] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800/80 border border-stone-700 backdrop-blur-sm text-stone-500 hover:text-slate-300 hover:border-purple-400/30 transition-colors duration-200"
                >
                    {/* Animated equalizer bars when playing */}
                    {!muted && (
                        <span className="flex items-end gap-[2px] h-3">
                            {[0.4, 0.7, 1, 0.6, 0.85].map((h, i) => (
                                <motion.span key={i}
                                    className="w-[2px] rounded-full bg-purple-400"
                                    animate={{ scaleY: [h, 1, h * 0.5, h] }}
                                    transition={{
                                        duration: 0.9 + i * 0.15,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.1
                                    }}
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