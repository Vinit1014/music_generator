import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Music, Zap, AlertCircle } from "lucide-react"
import { useTrackStore } from "../store/useTrackStore"
import { fetchTracks } from "../services/api"
import { toast } from "sonner"
import { useTheme } from "../contexts/ThemeContext"

const GenerateButton = () => {
  const { selectedMood, selectedGenre, setGenerateLoading, setCurrentTrack, generateLoading } = useTrackStore()
  const { colors, isDark } = useTheme()

  const isDisabled = !selectedMood || !selectedGenre || generateLoading

  const handleGenerate = () => {
    if (!selectedMood || !selectedGenre) {
      toast.error("Please select both mood and genre")
      return
    }

    setGenerateLoading(true)
    setCurrentTrack(null)

    setTimeout(async () => {
      try {
        const tracks = await fetchTracks({ mood: selectedMood, genre: selectedGenre })
        if (tracks.length === 0) {
          toast.info("No such music created. Try some different filters.")
        }

        const randomMusic = tracks.length > 0 ? tracks[Math.floor(Math.random() * tracks.length)] : null
        setCurrentTrack(randomMusic)
        setGenerateLoading(false)
      } catch (error) {
        console.error("Error fetching tracks:", error)
        toast.error("Something went wrong while fetching tracks.")
        setGenerateLoading(false)
      }
    }, 2000)
  }

  return (
    <div className="my-6">
      <motion.button
        onClick={handleGenerate}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        className={`
          relative w-full py-4 px-6 rounded-2xl font-bold text-lg
          transition-all duration-300 overflow-hidden
          ${
            isDisabled
              ? `${isDark ? "bg-gray-600/50 text-gray-400" : "bg-gray-300/50 text-gray-500"} cursor-not-allowed ${colors.border} border`
              : "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 border border-emerald-400/30"
          }
        `}
      >
        {!isDisabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ opacity: 0.3 }}
          />
        )}

        <div className="relative z-10 flex items-center justify-center gap-3">
          <AnimatePresence mode="wait">
            {generateLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Music className="w-6 h-6" />
                </motion.div>

                <div className="flex items-center gap-1">
                  <span>Generating</span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 bg-white rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-white rounded-full"
                      animate={{
                        height: [8, 16, 8, 20, 12],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : isDisabled ? (
              <motion.div
                key="disabled"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5" />
                <span>Generate Track</span>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
                <span>Generate Your Track</span>
                <motion.div
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isDisabled && !generateLoading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}

        {!isDisabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{
              x: "100%",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {generateLoading && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            className={`mt-4 w-full h-1 rounded-full overflow-hidden ${isDark ? "bg-white/20" : "bg-gray-300"}`}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GenerateButton
