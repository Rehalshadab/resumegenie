export default function ResumePreview({ resume, coverLetter, userData, onPaymentSuccess }) {
  if (!resume) return null

  const sections = [
    { key: 'summary', label: 'Summary' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills' },
    { key: 'experience', label: 'Experience / Projects' },
    { key: 'certifications', label: 'Certifications' },
  ]

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
        <div className="text-center mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{userData?.name || 'Your Name'}</h1>
          <p className="text-sm text-gray-500">
            {[userData?.email, userData?.phone, userData?.city].filter(Boolean).join(' | ')}
          </p>
        </div>

        {sections.map(section => {
          const content = resume[section.key] || resume.raw
          if (!content) return null
          return (
            <div key={section.key} className="mb-5 pb-4 border-b border-gray-100 last:border-0">
              <h2 className="text-base font-bold text-primary-600 uppercase tracking-wide mb-2">{section.label}</h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
            </div>
          )
        })}
      </div>

      {coverLetter && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
          <div className="text-center mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Cover Letter</h1>
            <p className="text-sm text-gray-500">{userData?.name || 'Your Name'}</p>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{coverLetter}</p>
        </div>
      )}

      <div className="text-center mt-6">
        <button onClick={onPaymentSuccess}
          className="btn-primary text-sm px-8 py-3">
          Download PDF ↓
        </button>
      </div>
    </div>
  )
}
