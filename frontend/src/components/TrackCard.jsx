import { motion, AnimatePresence } from "framer-motion"
import { Play, Heart, Music, Clock, Headphones } from "lucide-react"
import { useState } from "react"
import { useTrackStore } from "../store/useTrackStore"
import { useTheme } from "../contexts/ThemeContext"

const TrackCard = ({ track }) => {
  const { likedTracks, toggleLikeTrack, setCurrentTrack, currentTrack } = useTrackStore()
  const isLiked = likedTracks.some((t) => t.url === track?.url)
  const isCurrentTrack = currentTrack?.url === track?.url
  const [isPlaying, setIsPlaying] = useState(false)
  const {colors} = useTheme();

  const moodColors = {
    happy: "from-yellow-400 to-orange-500",
    sad: "from-blue-400 to-indigo-600",
    energetic: "from-red-400 to-pink-600",
    chill: "from-green-400 to-teal-500",
    romantic: "from-pink-400 to-rose-600",
    default: "from-purple-400 to-pink-500",
  }

  const genreColors = {
    pop: "bg-pink-500/20 text-pink-300",
    rock: "bg-red-500/20 text-red-300",
    jazz: "bg-amber-500/20 text-amber-300",
    electronic: "bg-cyan-500/20 text-cyan-300",
    edm: "bg-gray-500/20 text-gray-300",
    "lo-fi": "bg-violet-500/20 text-violet-300",
    blues: "bg-blue-500/20 text-blue-300",
    default: "bg-purple-500/20 text-purple-300",
  }

  const getMoodColor = (mood) => {
    return moodColors[mood?.toLowerCase()] || moodColors.default
  }

  const getGenreColor = (genre) => {
    const normalizedGenre = genre?.toLowerCase().replace(/\s+/g, "")
    return genreColors[normalizedGenre] || genreColors.default
  }

  const handleLike = (e) => {
    e.stopPropagation();
    toggleLikeTrack(track);
  }

  const handleSelect = () => {
    setCurrentTrack(track)
  }

  const handlePlayPause = (e) => {
    e.stopPropagation()
    setIsPlaying(!isPlaying)
    if (!isCurrentTrack) {
      setCurrentTrack(track)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={handleSelect}
      className={`
        group relative p-5 rounded-2xl cursor-pointer
        transition-all duration-300 overflow-hidden
        ${
          isCurrentTrack
            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/20"
            : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
        }
      `}
    >
      {isCurrentTrack && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400"
        />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <motion.div
              whileHover={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, ease: "linear" }}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${isCurrentTrack ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-white/10"}
              `}
            >
              <Music className={`w-6 h-6 ${colors.textPrimary}`} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-bold ${colors.textPrimary} truncate mb-1`}>{track.title}</h3>
              <div className={`flex items-center gap-2 text-sm ${colors.textPrimary}`}>
                <Clock className="w-3 h-3" />
                <span>2:30</span>
                {isCurrentTrack && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex items-center gap-1 ${colors.textPrimary}`}
                  >
                    <Headphones className="w-3 h-3" />
                    <span className={`text-xs font-medium ${colors.textPrimary}`}>Now Playing</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayPause}
              className={`
                p-2 rounded-full transition-all duration-200
                ${
                  isCurrentTrack
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                    : "bg-white/10 hover:bg-white/20"
                }
              `}
            >
              <AnimatePresence mode="wait"> 
                  <motion.div
                    key="play"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                  >
                    <Play className={`w-4 h-4 ${colors.textPrimary} ml-0.5`} />
                  </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                <Heart
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isLiked ? `text-red-400 fill-red-400` : `${colors.textPrimary} hover:text-red-400`
                  }`}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`
              px-3 py-1 rounded-full text-xs font-medium
              bg-gradient-to-r ${getMoodColor(track.mood)} text-white
            `}
          >
            {track.mood}
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full text-xs font-medium ${getGenreColor(track.genre)}`}
          >
            {track.genre}
          </motion.span>
          
        </div>
      </div>
    </motion.div>
  )
}

export default TrackCard
