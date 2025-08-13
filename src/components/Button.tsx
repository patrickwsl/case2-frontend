export function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}
