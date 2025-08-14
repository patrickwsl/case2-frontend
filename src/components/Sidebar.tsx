import Image from 'next/image'

type SidebarProps = {
  onSelect: (page: string) => void
  activePage: string
}

export default function Sidebar({ onSelect, activePage }: SidebarProps) {
  return (
    <nav className="flex flex-col space-y-2 p-4 bg-gray-200 dark:bg-gray-800 min-h-screen w-48 border-r border-black dark:border-neonBlue">
      <div className="flex justify-center drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-4">
        <Image src="/componente.svg" alt="Logo" width={126} height={40} />
      </div>
      {['dashboard', 'clients', 'allocations', 'assets'].map((page) => (
        <button
          key={page}
          onClick={() => onSelect(page)}
          className={`text-left px-4 py-2 rounded transition-colors
            ${
              activePage === page
                ? 'bg-gray-300 text-black dark:bg-gray-500 dark:text-white font-semibold'
                : 'text-black dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
        >
          {page[0].toUpperCase() + page.slice(1)}
        </button>
      ))}
    </nav>
  )
}
