import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Resume Only',
    price: '₹49',
    desc: 'Perfect if you just need a professional resume.',
    features: ['AI-Powered Resume', 'ATS Friendly Format', 'PDF Download', '1 Job Role'],
    popular: false,
    cta: 'Get Resume →',
    route: '/builder?plan=basic',
  },
  {
    name: 'Resume + Cover Letter',
    price: '₹79',
    desc: 'Everything you need for a complete job application.',
    features: ['Everything in Basic', 'AI Cover Letter', 'Multiple Formats', 'Priority Support'],
    popular: true,
    cta: 'Get Both →',
    route: '/builder?plan=pro',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-4 scroll-reveal">Simple, Affordable Pricing</h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto scroll-reveal">
          One-time payment. No subscriptions. Instant PDF after payment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] scroll-reveal ${
              plan.popular
                ? 'bg-primary-600 text-white shadow-2xl shadow-primary-200'
                : 'bg-white border-2 border-gray-100 shadow-md'
            }`} style={{ transitionDelay: `${i * 150}ms` }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <div className={`text-4xl font-extrabold mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {plan.price}
                <span className={`text-lg font-normal ${plan.popular ? 'text-primary-100' : 'text-gray-400'}`}> one-time</span>
              </div>
              <p className={`mb-6 ${plan.popular ? 'text-primary-100' : 'text-gray-500'}`}>{plan.desc}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <svg className={`w-5 h-5 ${plan.popular ? 'text-primary-200' : 'text-primary-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.popular ? 'text-white' : 'text-gray-700'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.route} className={`block text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                plan.popular
                  ? 'bg-white text-primary-600 hover:bg-primary-50'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">🔒 Secured by Razorpay | Instant PDF after payment</p>
      </div>
    </section>
  )
}
