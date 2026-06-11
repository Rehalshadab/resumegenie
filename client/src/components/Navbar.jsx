import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-600">ResumeGenie</span>
            <span className="text-2xl">🧞</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isHome && navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                {link.label}
              </a>
            ))}
            <Link to="/builder" className="btn-primary text-sm px-5 py-2.5">
              Build My Resume →
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-slide-up">
            {isHome && navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="block text-gray-600 hover:text-primary-600 font-medium py-2"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <Link to="/builder" className="btn-primary text-sm w-full text-center"
              onClick={() => setMobileOpen(false)}>
              Build My Resume →
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
