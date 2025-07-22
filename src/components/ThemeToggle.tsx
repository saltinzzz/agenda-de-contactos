import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

useEffect(() => {
    document.body.className = ''
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

const handleToggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

return (
    <button onClick={handleToggle} className="theme-toggle">
    {theme === 'light' ? ' 🌙 ' : ' ☀️ '}
    </button>
  )
}

export default ThemeToggle