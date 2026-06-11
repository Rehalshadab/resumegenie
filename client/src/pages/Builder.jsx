import { useState, useRef, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ResumeForm from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API = import.meta.env.VITE_API_URL || ''

export default function Builder() {
  const [searchParams] = useSearchParams()
  const initialPlan = searchParams.get('plan') || 'basic'
  const [step, setStep] = useState('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [userData, setUserData] = useState(null)
  const [toast, setToast] = useState(null)
  const previewRef = useRef(null)

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handleGenerate = async (formData) => {
    setLoading(true)
    setError('')
    setUserData(formData)
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30000)

      const res = await fetch(`${API}/api/generate?action=both`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Generation failed')

      setResult(data)
      setStep('preview')
      showToast('Resume generated successfully!', 'success')
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.')
        showToast('Request timed out. Please try again.')
      } else {
        setError(err.message || 'Failed to generate resume. Please try again.')
        showToast(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = useCallback(async () => {
    if (!previewRef.current) return
    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`ResumeGenie_${userData?.name || 'Resume'}.pdf`)
      showToast('PDF downloaded successfully!', 'success')
    } catch (err) {
      console.error('PDF error:', err)
      showToast('Failed to generate PDF. Please try again.')
    }
  }, [userData])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="text-gray-400 hover:text-primary-600 text-sm flex items-center gap-1 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <p className="text-sm text-gray-400">
              {initialPlan === 'pro' ? 'Resume + Cover Letter' : 'Resume Only'}
            </p>
          </div>

          {step === 'form' && (
            <>
              <div className="text-center mb-10 fade-in">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Build Your Resume</h1>
                <p className="text-gray-500">Fill in your details and let AI craft the perfect resume for you.</p>
              </div>
              <ResumeForm onSubmit={handleGenerate} loading={loading} />
            </>
          )}

          {step === 'preview' && result && (
            <div className="fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your AI-Generated Resume</h2>
                <button onClick={() => setStep('form')} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  ← Edit Details
                </button>
              </div>

              <div ref={previewRef}>
                <ResumePreview
                  resume={result.resume}
                  coverLetter={result.coverLetter}
                  userData={userData}
                  onPaymentSuccess={downloadPDF}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
              {error}
              <button onClick={() => setError('')} className="ml-2 underline hover:no-underline">Dismiss</button>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-sm font-medium animate-slide-up z-50 ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
