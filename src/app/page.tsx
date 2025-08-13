'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import Image from 'next/image'
import { loginUser } from '@/services/user/data'

type LoginForm = {
  username: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>()
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
      <ThemeToggle />

      {/* Logo centralizado no topo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        <Image src="/componente.svg" alt="Logo" width={126} height={40} />
      </div>

      {/* Formulário no centro */}
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
