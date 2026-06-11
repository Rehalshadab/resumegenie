import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function Home() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const section = searchParams.get('section')
    if (section) {
      const el = document.getElementById(section)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
