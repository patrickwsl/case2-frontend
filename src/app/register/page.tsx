'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'

type RegisterForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterForm>()
  const { theme, toggleTheme } = useTheme()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(data: RegisterForm) {
    setError(null)
    if (data.password !== data.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }
    try {
      alert('Cadastro realizado com sucesso!')
      router.push('/home')
    } catch {
      setError('Erro ao cadastrar')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-6 relative">
      
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-black p-8 rounded shadow-md dark:shadow-[0_0_15px_#fff] w-full max-w-md text-neonBlue dark:text-white border border-black dark:border-neonBlue"
      >
        <h1 className="text-black dark:text-neonBlue text-3xl font-bold mb-6 select-none">Cadastro</h1>

        <label className="text-black dark:text-neonBlue block mb-2 font-semibold">Username</label>
        <input
          {...register('username')}
          className="w-full p-2 mb-4 rounded border border-black dark:border-neonBlue bg-white dark:bg-black text-black dark:text-white focus:outline-none"
        />

        <label className="text-black dark:text-neonBlue block mb-2 font-semibold">Email</label>
        <input
          {...register('email')}
          type="email"
          className="w-full p-2 mb-4 rounded border border-black dark:border-neonBlue bg-white dark:bg-black text-black dark:text-white focus:outline-none"
        />

        <label className="text-black dark:text-neonBlue block mb-2 font-semibold">Password</label>
        <input
          {...register('password')}
          type="password"
          className="w-full p-2 mb-4 rounded border border-black dark:border-neonBlue bg-white dark:bg-black text-black dark:text-white focus:outline-none"
        />

        <label className="text-black dark:text-neonBlue block mb-2 font-semibold">Confirmar Password</label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="w-full p-2 mb-6 rounded border border-black dark:border-neonBlue bg-white dark:bg-black text-black dark:text-white focus:outline-none"
        />

        <button
          type="submit"
          className="w-full text-white dark:text-black bg-gray-600 dark:bg-gray-200 text-black py-2 rounded hover:bg-neonBlue dark:hover:bg-neonBlue transition font-semibold"
        >
          Cadastrar
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        <div className="mt-6 text-center">
          <Link href="/" className="text-black dark:text-neonBlue hover:text-neonPink">
            Já tem conta? Faça login
          </Link>
        </div>
      </form>
    </div>
  )
}
