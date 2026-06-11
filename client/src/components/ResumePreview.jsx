import { useState } from 'react'
import PaymentButton from './PaymentButton'

export default function ResumePreview({ resume, coverLetter, userData, onPaymentSuccess }) {
  const [activeTab, setActiveTab] = useState('resume')
  const [paid, setPaid] = useState(false)

  const handleSuccess = () => {
    setPaid(true)
    onPaymentSuccess && onPaymentSuccess()
  }

  if (!resume) return null

  const sections = [
    { key: 'summary', label: 'Summary' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills' },
    { key: 'experience', label: 'Experience / Projects' },
    { key: 'certifications', label: 'Certifications' },
  ]

  return (
    <div className="max-w-2xl mx-auto fade-in">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button onClick={() => setActiveTab('resume')}
          className={`pb-3 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'resume' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
          }`}>
          📄 Resume
          {activeTab === 'resume' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
        </button>
        {coverLetter && (
          <button onClick={() => setActiveTab('coverletter')}
            className={`pb-3 px-4 text-sm font-medium transition-colors relative ${
              activeTab === 'coverletter' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
            }`}>
            💌 Cover Letter
            {activeTab === 'coverletter' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
          </button>
        )}
      </div>

      {/* Active Tab Content */}
      <div className={`relative ${!paid ? 'max-h-[500px] overflow-hidden' : ''}`}>
        {activeTab === 'resume' ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="text-center mb-6 pb-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">{userData?.name || 'Your Name'}</h1>
              <p className="text-sm text-gray-500">
                {[userData?.email, userData?.phone, userData?.city].filter(Boolean).join(' | ')}
              </p>
            </div>

            {sections.map(section => {
              const content = resume[section.key] || resume.raw || resume[section.key.toLowerCase()]
              if (!content) return null
              return (
                <div key={section.key} className="mb-5 pb-4 border-b border-gray-100 last:border-0">
                  <h2 className="text-base font-bold text-primary-600 uppercase tracking-wide mb-2">{section.label}</h2>
                  {typeof content === 'string' ? (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
                  ) : Array.isArray(content) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {content.map((item, i) => <li key={i} className="text-sm text-gray-700">{item}</li>)}
                    </ul>
                  ) : typeof content === 'object' ? (
                    <div className="space-y-1 text-sm text-gray-700">
                      {Object.entries(content).map(([k, v]) => (
                        <p key={k}><span className="font-medium capitalize">{k}:</span> {String(v)}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="text-center mb-6 pb-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">Cover Letter</h1>
              <p className="text-sm text-gray-500">{userData?.name || 'Your Name'}</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{coverLetter}</p>
          </div>
        )}

        {/* Locked Overlay */}
        {!paid && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white flex items-end justify-center pb-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <p className="text-xl font-bold text-gray-900 mb-1">Unlock Full Resume</p>
              <p className="text-gray-500 text-sm mb-4">Pay once, download instantly</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <PaymentButton plan="basic" amount={49} userData={userData} onSuccess={handleSuccess} />
                <PaymentButton plan="pro" amount={79} userData={userData} onSuccess={handleSuccess} />
              </div>
            </div>
          </div>
        )}
      </div>

      {paid && (
        <div className="mt-6 text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ✅ Payment Successful! Scroll up to view your full resume.
          </div>
          <button onClick={handleSuccess}
            className="btn-primary text-sm px-6 py-2.5">
            Download PDF ↓
          </button>
        </div>
      )}
    </div>
  )
}
