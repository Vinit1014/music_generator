import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true) 

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(prefersDark)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark
        ? "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
        : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50",

      cardBg: isDark
        ? "bg-white/10 backdrop-blur-lg border-white/20"
        : "bg-white/80 backdrop-blur-lg border-gray-200/50",

      cardBgHover: isDark ? "hover:bg-white/15 hover:border-white/30" : "hover:bg-white/90 hover:border-gray-300/60",

      textPrimary: isDark ? "text-white" : "text-gray-900",
      textSecondary: isDark ? "text-white/80" : "text-gray-700",
      textMuted: isDark ? "text-white/60" : "text-gray-500",

      accent: "from-purple-500 to-pink-500",
      accentHover: "from-purple-400 to-pink-400",

      buttonBg: isDark ? "bg-white/10" : "bg-gray-100",
      buttonBgHover: isDark ? "hover:bg-white/20" : "hover:bg-gray-200",

      border: isDark ? "border-white/20" : "border-gray-200",
      borderHover: isDark ? "border-white/30" : "border-gray-300",
    },
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
