'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { loginUser } from '@/services/user/data'
import { useTheme } from '@/context/ThemeContext'

type LoginForm = {
  username: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>()
  const { theme, toggleTheme } = useTheme()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(data: LoginForm) {
    setError(null)
    try {
      await loginUser(data)
      router.push('/home')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Falha no login')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-6 relative">
      <div className="absolute top-4 right-4 flex items-center gap-3">
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

      <div className="absolute top-8 left-1/2 -translate-x-1/2 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        <Image src="/componente.svg" alt="Logo" width={126} height={40} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-black p-8 rounded shadow-md dark:shadow-[0_0_15px_#fff] w-full max-w-md text-neonBlue dark:text-white mt-20 rounded border border-black dark:border-neonBlue"
      >
        <h1 className="text-black dark:text-neonBlue text-3xl font-bold mb-6 select-none color">Login</h1>

        <label className="text-black dark:text-neonBlue block mb-2 font-semibold">Username</label>
        <input
          {...register('username')}
          className="w-full p-2 mb-4 rounded border border-black dark:border-neonBlue bg-white dark:bg-black text-neonBlue dark:text-white focus:outline-none"
        />

        <label className="text-black dark:text-neonBlue block mb-2 font-semibold">Password</label>
        <input
          {...register('password')}
          type="password"
          className="w-full p-2 mb-6 rounded border border-black dark:border-neonBlue bg-white dark:bg-black text-neonBlue dark:text-white focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-neonPink text-black py-2 rounded hover:bg-neonBlue transition font-semibold"
        >
          Entrar
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        <div className="mt-6 text-center">
          <Link href="/register" className="text-black dark:text-neonBlue hover:text-neonPink">
            Ainda não tem conta? Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  )
}
