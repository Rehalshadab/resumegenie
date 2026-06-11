import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold text-white">ResumeGenie</span>
              <span className="text-xl">🧞</span>
            </div>
            <p className="text-sm text-gray-400">Your Career, Powered by AI</p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          Made with <span className="text-red-500">❤</span> in India
        </div>
      </div>
    </footer>
  )
}
