'use client'

import { useTheme } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function logout() {
    setLoading(true)
    localStorage.removeItem('token') // limpa token
    router.push('/')
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-200 dark:bg-gray-800 border-b border-black dark:border-neonBlue">
      <div className="text-black dark:text-white font-bold text-xl select-none cursor-default">InvestSystem</div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {theme === "light" ? "Modo Claro" : "Modo Escuro"}
            </span>
            <button
                onClick={toggleTheme}
                aria-label="Alternar tema"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
                ${theme === "light" ? "bg-gray-300" : "bg-gray-500"}`}
            >
                <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300
                    ${theme === "light" ? "translate-x-1" : "translate-x-6"}`}
                />
            </button>
        </div>

        <button
          disabled={loading}
          onClick={logout}
          className="bg-gray-300 dark:bg-gray-500 text-black dark:text-white px-3 py-1 rounded font-semibold hover:bg-gray-400 dark:hover:bg-gray-700 transition disabled:opacity-50"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
