import { Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="bg-black text-white shadow-2xl border-b border-gray-900">
      <nav className="max-w-7xl mx-auto px-4 py-1 md:px-6 md:py-2 overflow-hidden">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity overflow-hidden">
            <Logo />
          </Link>
          <Link
            to="/admin"
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors flex items-center gap-2 group"
            aria-label="Admin Settings"
          >
            <Settings className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
