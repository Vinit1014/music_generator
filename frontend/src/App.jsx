import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Toaster } from 'sonner'
import { ThemeProvider } from './contexts/ThemeContext'
function App() {
  return (
    <>
      <div>
        <ThemeProvider>
         <Toaster richColors/>
         <Home/>
        </ThemeProvider>
      </div>
    </>
  )
}

export default App
