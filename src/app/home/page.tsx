"use client";

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import DashboardContent from '../dashboard';
import ClientsPage from '../clients/page';

export default function HomePage() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gray-200 dark:bg-gray-800 text-neonBlue dark:text-black">
      <Sidebar onSelect={setActivePage} activePage={activePage} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-grow p-6">
            {activePage === 'dashboard' && <DashboardContent />}
            {activePage === 'clients' && <ClientsPage />}
            {activePage === 'allocations' && <AllocationsContent />}
        </main>
      </div>
    </div>
  )
}

function AllocationsContent() {
  return <p>Conteúdo das alocações...</p>
}
