import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-indigo-50 opacity-70" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 fade-in">
            ✨ AI-Powered | Made for India
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 fade-in">
            Land Your Dream Job with an{' '}
            <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Crafted Resume
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto fade-in">
            Create a professional ATS-friendly resume and cover letter in under 2 minutes.
            Perfect for freshers, students & job seekers in India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 fade-in">
            <Link to="/builder" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-primary-200">
              Build My Resume →
            </Link>
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
              See Example ↓
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-gray-500 fade-in">
            <span>⚡ 2 Min Setup</span>
            <span className="hidden sm:inline">|</span>
            <span>✅ ATS Friendly</span>
            <span className="hidden sm:inline">|</span>
            <span>🇮🇳 Made for India</span>
            <span className="hidden sm:inline">|</span>
            <span>🔒 Secure Payment</span>
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs text-gray-400 ml-2">Resume Preview</span>
            </div>
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
              <div className="h-px bg-gray-200 my-3" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
              <div className="h-px bg-gray-200 my-3" />
              <div className="flex gap-2">
                <div className="h-6 bg-primary-100 rounded w-16" />
                <div className="h-6 bg-primary-100 rounded w-20" />
                <div className="h-6 bg-primary-100 rounded w-14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
