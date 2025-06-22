import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Zap, Coffee, Moon, Sun, Music } from "lucide-react"
import { useTrackStore } from "../store/useTrackStore"
import { fetchMoods } from "../services/api"
import { useTheme } from "../contexts/ThemeContext"

const MoodSelector = () => {
  const { selectedMood, setMood } = useTrackStore()
  const [moods, setMoods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { colors } = useTheme()

  const moodIcons = {
    happy: Sun,
    sad: Moon,
    energetic: Zap,
    chill: Coffee,
    romantic: Heart,
    default: Music,
  }

  const moodColors = {
    happy: "from-yellow-400 to-orange-500",
    sad: "from-blue-400 to-indigo-600",
    energetic: "from-red-400 to-pink-600",
    chill: "from-green-400 to-teal-500",
    romantic: "from-pink-400 to-rose-600",
    default: "from-purple-400 to-pink-500",
  }

  useEffect(() => {
    const loadMoods = async () => {
      try {
        setIsLoading(true)
        const data = await fetchMoods()
        setMoods(data)
      } catch (error) {
        console.error("Failed to fetch the moods:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadMoods()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const getMoodIcon = (mood) => {
    const IconComponent = moodIcons[mood.toLowerCase()] || moodIcons.default
    return IconComponent
  }

  const getMoodColor = (mood) => {
    return moodColors[mood.toLowerCase()] || moodColors.default
  }

  return (
    <div className="mb-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-4"
      >
        <Music className="w-5 h-5 text-purple-300" />
        <h2 className={`text-lg font-semibold ${colors.textPrimary}`}>Select Your Mood</h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div
            key="moods"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3"
          >
            {moods.map((mood) => {
              const IconComponent = getMoodIcon(mood)
              const isSelected = selectedMood === mood

              return (
                <motion.button
                  key={mood}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMood(mood)}
                  className={`
                    relative px-4 py-3 rounded-xl font-medium text-sm
                    transition-all duration-300 overflow-hidden
                    flex items-center gap-2 min-w-[100px] justify-center
                    ${
                      isSelected
                        ? "text-white shadow-lg shadow-purple-500/25"
                        : `${colors.textSecondary} hover:text-white ${colors.buttonBg} ${colors.buttonBgHover} ${colors.border} border`
                    }
                  `}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        layoutId="selectedMoodBg"
                        className={`absolute inset-0 bg-gradient-to-r ${getMoodColor(mood)}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 flex items-center gap-2">
                    <motion.div animate={isSelected ? { rotate: [0, 10, -10, 0] } : {}} transition={{ duration: 0.5 }}>
                      <IconComponent className="w-4 h-4" />
                    </motion.div>
                    <span className="capitalize">{mood}</span>
                  </div>

                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${getMoodColor(mood)} opacity-0 blur-xl`}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />

                  {isSelected && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${getMoodColor(mood)} rounded-xl`}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center"
          >
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 ${colors.buttonBg} rounded-full text-sm ${colors.textMuted}`}
            >
              <span>Current mood:</span>
              <span className={`font-semibold ${colors.textPrimary} capitalize`}>{selectedMood}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                ✨
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MoodSelector
