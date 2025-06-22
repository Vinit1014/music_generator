import { motion } from "framer-motion"
import { Music, Clock, Sparkles } from "lucide-react"
import MoodSelector from "../components/MoodSelector"
import GenreSelector from "../components/GenreSelector"
import GenerateButton from "../components/GenerateButton"
import TrackCard from "../components/TrackCard"
import MainTrackCard from "../components/MainTrackCard"
import { useTrackStore } from "../store/useTrackStore"
import ThemeToggle from "../components/ThemeToggle"
import { useTheme } from "../contexts/ThemeContext"

const Home = () => {
  const recentTracks = useTrackStore((s) => s.recentTracks)
  const {colors, isDark } = useTheme();
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
     <div className={`min-h-screen ${colors.background} transition-all duration-500`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <motion.div
        className="relative z-10 p-6 max-w-8xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative mb-8">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mr-3"
              >
                <Music className={`w-8 h-8 ${isDark ? "text-purple-300" : "text-purple-600"}`} />
              </motion.div>
              <h1
                className={`text-5xl font-bold bg-gradient-to-r ${
                  isDark ? "from-purple-300 via-pink-300 to-blue-300" : "from-purple-600 via-pink-600 to-blue-600"
                } bg-clip-text text-transparent`}
              >
                Wubble QuickTune
              </h1>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="ml-3"
              >
                <Sparkles className={`w-8 h-8 ${isDark ? "text-pink-300" : "text-pink-600"}`} />
              </motion.div>
            </div>
            <p className={`${colors.textMuted} text-lg opacity-80`}>
              Create your perfect soundtrack with AI-powered music generation
            </p>
          </motion.div>

          <motion.div className="absolute top-0 right-0" variants={itemVariants}>
            <ThemeToggle />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-lg p-6">
              <h3 className={`${colors.textPrimary} font-semibold text-2xl mb-4 flex items-center`}>
                <Sparkles className={`w-5 h-5 mr-2 ${colors.textPrimary}`} />
                Customize Your Sound
              </h3>
              <div className="space-y-6">
                <MoodSelector />
                <GenreSelector />
                <GenerateButton />
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-white/20 shadow-2xl rounded-lg p-6">
              <MainTrackCard />
            </div>

            <motion.div variants={itemVariants}>
              {recentTracks.length > 0 ? (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-lg p-6">
                  <div className="flex items-center mb-6">
                    <Clock className="w-6 h-6 mr-3 text-purple-300" />
                    <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>Recently Played</h2>
                  </div>
                  <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                    {recentTracks.map((track, index) => (
                      <motion.div
                        key={track.url}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 300 },
                        }}
                        className="transform transition-all duration-200"
                      >
                        <TrackCard track={track} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-lg p-12">
                  <motion.div
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
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
                      className="mb-4"
                    >
                      <Music className="w-16 h-16 mx-auto text-purple-300 opacity-60" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">No tracks yet</h3>
                    <p className="text-purple-200 opacity-70">Generate your first track and it will appear here</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10 text-2xl"
              initial={{
                x: typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1000,
                y: typeof window !== "undefined" ? window.innerHeight + 50 : 800,
                rotate: 0,
              }}
              animate={{
                y: -50,
                rotate: 360,
                x: typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1000,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              ♪
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Home
