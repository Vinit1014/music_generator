import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Headphones, Mic, Guitar, Piano, Drum, Radio, Volume2, Zap, Heart } from "lucide-react"
import { useTrackStore } from "../store/useTrackStore"
import { fetchGenres } from "../services/api"
import { useTheme } from "../contexts/ThemeContext"

const GenreSelector = () => {
  const { selectedGenre, setGenre } = useTrackStore()
  const [genres, setGenres] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {colors} = useTheme();

  const genreIcons = {
    pop: Radio,
    lofi: Headphones,
    "lo-fi": Headphones,
    "cinematic": Guitar,
    default: Music,
  }

  const genreStyles = {
    pop: {
      gradient: "from-pink-400 via-purple-400 to-indigo-400",
      shadow: "shadow-pink-500/25",
      glow: "from-pink-400 to-purple-400",
    },
    cinematic: {
      gradient: "from-violet-400 via-purple-500 to-indigo-600",
      shadow: "shadow-violet-500/25",
      glow: "from-violet-400 to-purple-500",
    },
    "lo-fi": {
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      shadow: "shadow-blue-500/25",
      glow: "from-blue-400 to-indigo-500",
    },
    default: {
      gradient: "from-purple-400 via-pink-500 to-red-500",
      shadow: "shadow-purple-500/25",
      glow: "from-purple-400 to-pink-500",
    },
  }

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setIsLoading(true)
        const data = await fetchGenres()
        setGenres(data)
      } catch (error) {
        console.error("Failed to fetch the genres:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadGenres()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  }

  const getGenreIcon = (genre) => {
    const normalizedGenre = genre.toLowerCase().replace(/\s+/g, "")
    const IconComponent = genreIcons[normalizedGenre] || genreIcons.default
    return IconComponent
  }

  const getGenreStyle = (genre) => {
    const normalizedGenre = genre.toLowerCase().replace(/\s+/g, "")
    return genreStyles[normalizedGenre] || genreStyles.default
  }

  return (
    <div className="mb-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-4"
      >
        <Headphones className="w-5 h-5 text-purple-300" />
        <h2 className={`text-lg font-semibold ${colors.textPrimary}`}>Choose Your Genre</h2>
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
            <motion.div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="genres"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {genres.map((genre) => {
              const IconComponent = getGenreIcon(genre)
              const genreStyle = getGenreStyle(genre)
              const isSelected = selectedGenre === genre

              return (
                <motion.button
                  key={genre}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGenre(genre)}
                  className={`
                    relative p-4 rounded-2xl font-medium text-sm
                    transition-all duration-300 overflow-hidden
                    flex flex-col items-center gap-2 min-h-[100px]
                    ${
                      isSelected
                        ? `text-white ${genreStyle.shadow} shadow-lg`
                        : `${colors.textSecondary} hover:text-white ${colors.buttonBg} ${colors.buttonBgHover} ${colors.border} border`
                    }
                  `}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        layoutId="selectedGenreBg"
                        className={`absolute inset-0 bg-gradient-to-br ${genreStyle.gradient}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <motion.div
                      animate={
                        isSelected
                          ? {
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1],
                            }
                          : {}
                      }
                      transition={{ duration: 0.6 }}
                      className={`p-2 rounded-full backdrop-blur-sm ${isSelected ? "bg-white/20" : colors.buttonBg}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.div>
                    <span className="capitalize text-center leading-tight">{genre}</span>
                  </div>

                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${genreStyle.glow} opacity-0 blur-xl`}
                    whileHover={{ opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                  />

                  {isSelected && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${genreStyle.gradient} rounded-2xl`}
                      animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{ scale: 1, rotate: 45 }}
                      className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-sm"
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedGenre && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 text-center"
          >
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 ${colors.buttonBg} rounded-full text-sm ${colors.textMuted}`}
            >
              <span>Now vibing to:</span>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${colors.textPrimary} capitalize`}>{selectedGenre}</span>
                <div className="flex items-center gap-0.5">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    ✨
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GenreSelector
