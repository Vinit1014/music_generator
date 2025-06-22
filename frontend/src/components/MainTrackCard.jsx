import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Heart, Download, Music } from "lucide-react"
import { useTrackStore } from "../store/useTrackStore"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "../contexts/ThemeContext"

const MainTrackCard = ({ track }) => {
  const { currentTrack, likedTracks, toggleLikeTrack, addRecentTrack, playingTrackUrl, setPlayingTrackUrl } =
    useTrackStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { colors, isDark } = useTheme();

  const thisTrack = track || currentTrack
  const isLiked = likedTracks.some((t) => t.url === thisTrack?.url)

  const moodColors = {
    happy: "from-yellow-400 via-orange-400 to-red-500",
    sad: "from-blue-400 via-indigo-500 to-purple-600",
    energetic: "from-red-400 via-pink-500 to-purple-600",
    chill: "from-green-400 via-teal-500 to-blue-500",
    romantic: "from-pink-400 via-rose-500 to-red-500",
    default: "from-purple-400 via-pink-500 to-red-500",
  }

  const getMoodColor = (mood) => {
    return moodColors[mood?.toLowerCase()] || moodColors.default
  }

  useEffect(() => {
    if (thisTrack && playingTrackUrl !== thisTrack.url && isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }, [playingTrackUrl])

  useEffect(() => {
    if (thisTrack) {
      const audio = new Audio(thisTrack.url)
      audioRef.current = audio

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration)
        setIsLoading(false)
      })

      audio.addEventListener("loadstart", () => {
        setIsLoading(true)
      })

      audio.addEventListener("canplay", () => {
        setIsLoading(false)
      })

      const updateProgress = () => {
        const audio = audioRef.current
        if (audio && audio.duration) {
          const percent = (audio.currentTime / audio.duration) * 100
          setProgress(percent)
          setCurrentTime(audio.currentTime)
        }
      }

      audioRef.current.addEventListener("timeupdate", updateProgress)

      return () => {
        audioRef.current?.pause()
        audioRef.current?.removeEventListener("timeupdate", updateProgress)
        audioRef.current = null
        setIsPlaying(false)
        setProgress(0)
        setIsLoading(false)
      }
    }
  }, [thisTrack])

  if (!thisTrack) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          relative overflow-hidden rounded-3xl backdrop-blur-lg p-12
          ${
            isDark
              ? "bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-white/10"
              : "bg-gradient-to-br from-purple-100/80 to-pink-100/80 border-gray-200/50"
          } border
        `}
      >
        <div className="text-center">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="mb-6"
          >
            <Music className={`w-24 h-24 mx-auto opacity-60 ${isDark ? "text-purple-300" : "text-purple-500"}`} />
          </motion.div>
            <h3 className={`text-3xl font-bold mb-3 ${colors.textPrimary}`}>No Track Selected</h3>
            <p className={`opacity-70 text-lg ${colors.textMuted}`}>
              Choose your mood and genre to generate amazing music
            </p>
        </div>
      </motion.div>
    )
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setPlayingTrackUrl(null)
    } else {
      audio.play()
      setPlayingTrackUrl(thisTrack.url)
      setTimeout(() => {
        addRecentTrack(thisTrack)
      }, 1200)
    }
    setIsPlaying(!isPlaying)
  }

  const handleLike = () => {
    toggleLikeTrack(thisTrack)
  }

  const handleProgressClick = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickPercent = clickX / rect.width
    const newTime = clickPercent * duration

    audio.currentTime = newTime
    setCurrentTime(newTime)
    setProgress(clickPercent * 100)
  }

  const formatTime = (time) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative overflow-hidden rounded-3xl backdrop-blur-lg border
        transition-all duration-500
        ${
          playingTrackUrl === thisTrack.url
            ? `bg-gradient-to-br ${getMoodColor(thisTrack.mood)}/20 ${colors.borderHover} shadow-2xl`
            : `${colors.cardBg} ${colors.border} shadow-xl`
            }
          `}
        >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${getMoodColor(thisTrack.mood)} opacity-10`}
          animate={{
            scale: isPlaying ? [1, 1.05, 1] : 1,
            opacity: isPlaying ? [0.1, 0.15, 0.1] : 0.1,
          }}
          transition={{
            duration: 4,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 p-8">
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 12, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
            className={`
              w-16 h-16 mx-auto mb-2 rounded-3xl flex items-center justify-center
              bg-gradient-to-br ${getMoodColor(thisTrack.mood)} shadow-2xl
            `}
          >
            <Music className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl font-bold mb-4 truncate ${colors.textPrimary}`}
          >
            {thisTrack.title}
          </motion.h3>

          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${getMoodColor(thisTrack.mood)} text-white font-medium text-sm`}
            >
              {thisTrack.mood}
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full font-medium text-sm ${
                isDark ? "bg-white/20 text-white" : "bg-gray-200/80 text-gray-700"
              }`}
            >
              {thisTrack.genre}
            </motion.span>
          </div>
        </div>

        <div className="mb-1">
          <motion.div
            onClick={handleProgressClick}
            className={`relative h-3 rounded-full cursor-pointer group mb-3 ${
              isDark ? "bg-white/20" : "bg-gray-300/60"
            }`}
            whileHover={{ scaleY: 1.2 }}
          >
            <motion.div
              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getMoodColor(thisTrack.mood)} rounded-full`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            <motion.div
              className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 ${
                isDark ? "bg-white" : "bg-gray-100"
              }`}
              style={{ left: `${progress}%`, marginLeft: "-10px" }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          <div className={`flex justify-between items-center text-sm ${colors.textMuted}`}>
            <span className="font-medium">{formatTime(currentTime)}</span>
            <span className="font-medium">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
             className={`p-4 rounded-full transition-all duration-200 ${colors.buttonBg} ${colors.buttonBgHover}`}
          >
            <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
              <Heart
                className={`w-6 h-6 transition-colors duration-200 ${
                  isLiked ? "text-red-400 fill-red-400" : `${colors.textMuted} hover:text-red-400`
                }`}
              />
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            disabled={isLoading}
            className={`
              relative p-6 rounded-full transition-all duration-300
              bg-gradient-to-r ${getMoodColor(thisTrack.mood)} shadow-2xl hover:shadow-3xl
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin"
                />
              ) : isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -90 }}
                >
                  <Pause className="w-10 h-10 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                >
                  <Play className="w-10 h-10 text-white ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={thisTrack.url}
            download
            className={`p-4 rounded-full transition-all duration-200 ${colors.buttonBg} ${colors.buttonBgHover}`}
          >
            <Download className={`w-6 h-6 ${colors.textSecondary} hover:${colors.textPrimary.replace("text-", "hover:text-")}`}/>
          </motion.a>
        </div>

      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${isDark ? "white" : "#f3f4f6"};
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${isDark ? "white" : "#f3f4f6"};
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </motion.div>
  )
}

export default MainTrackCard
