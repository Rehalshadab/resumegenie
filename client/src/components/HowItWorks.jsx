const steps = [
  {
    num: '01',
    icon: '📝',
    title: 'Fill Your Details',
    desc: 'Enter your education, skills, experience and job target in our simple form.',
  },
  {
    num: '02',
    icon: '🤖',
    title: 'AI Generates Resume',
    desc: 'Claude AI creates a professional, ATS-friendly resume tailored to your profile.',
  },
  {
    num: '03',
    icon: '💳',
    title: 'Pay & Download PDF',
    desc: 'Secure payment via Razorpay, then instantly download your resume as PDF.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-4 scroll-reveal">Get Your Resume in 3 Simple Steps</h2>
        <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto scroll-reveal">
          No complex software. No templates. Just fill, generate, and download.
        </p>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5">
            <svg className="w-full h-full" viewBox="0 0 100 1" preserveAspectRatio="none">
              <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6,6" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center scroll-reveal" style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 relative z-10">
                  {step.icon}
                </div>
                <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3 inline-block">
                  Step {step.num}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
