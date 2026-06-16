const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Writing',
    desc: 'Claude AI writes your resume content tailored to Indian job market standards.',
  },
  {
    icon: '📄',
    title: 'ATS Optimized',
    desc: 'Pass automated resume filters easily with keyword-optimized formatting.',
  },
  {
    icon: '💌',
    title: 'Cover Letter',
    desc: 'Matching cover letter generated instantly for every job application.',
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    desc: 'Build your resume from your phone, anywhere, anytime.',
  },
  {
    icon: '⚡',
    title: '2 Minute Process',
    desc: 'Fill form, get AI resume, download PDF — done in 2 minutes.',
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    desc: 'Razorpay encrypted transactions for safe and instant payments.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-4 scroll-reveal">Everything You Need to Get Hired</h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto scroll-reveal">
          AI-powered tools designed to help Indian freshers and job seekers land their dream jobs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <div key={i} className="card p-6 md:p-8 group scroll-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
