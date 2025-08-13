'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type RegisterForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const { register, handleSubmit, watch } = useForm<RegisterForm>()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(data: RegisterForm) {
    setError(null)
    if (data.password !== data.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }
    try {
      // Mock: só simula sucesso e vai pra home direto
      alert('Cadastro realizado com sucesso!')
      router.push('/home')
    } catch (err) {
      setError('Erro ao cadastrar')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black dark:bg-white p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black dark:bg-white p-8 rounded shadow-md w-full max-w-md text-neonBlue dark:text-black"
      >
        <h1 className="text-3xl font-bold mb-6 select-none">Cadastro</h1>

        <label className="block mb-2 font-semibold">Username</label>
        <input
          {...register('username')}
          className="w-full p-2 mb-4 rounded border border-neonBlue bg-black dark:bg-white text-neonBlue dark:text-black focus:outline-none"
        />

        <label className="block mb-2 font-semibold">Email</label>
        <input
          {...register('email')}
          type="email"
          className="w-full p-2 mb-4 rounded border border-neonBlue bg-black dark:bg-white text-neonBlue dark:text-black focus:outline-none"
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          {...register('password')}
          type="password"
          className="w-full p-2 mb-4 rounded border border-neonBlue bg-black dark:bg-white text-neonBlue dark:text-black focus:outline-none"
        />

        <label className="block mb-2 font-semibold">Confirmar Password</label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="w-full p-2 mb-6 rounded border border-neonBlue bg-black dark:bg-white text-neonBlue dark:text-black focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-neonPink text-black py-2 rounded hover:bg-neonBlue transition font-semibold"
        >
          Cadastrar
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        <div className="mt-6 text-center">
          <Link href="/" className="text-neonBlue hover:text-neonPink">
            Já tem conta? Faça login
          </Link>
        </div>
      </form>
    </div>
  )
}
