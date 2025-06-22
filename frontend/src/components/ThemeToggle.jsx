"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative p-3 rounded-full transition-all duration-300
        ${colors.buttonBg} ${colors.buttonBgHover} ${colors.border}
        border shadow-lg
      `}
    >
      <motion.div animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
        {isDark ? (
          <Moon className={`w-6 h-6 ${colors.textSecondary}`} />
        ) : (
          <Sun className={`w-6 h-6 ${colors.textSecondary}`} />
        )}
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 blur-lg"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

export default ThemeToggle
