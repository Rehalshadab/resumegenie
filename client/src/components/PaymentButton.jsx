import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || ''

export default function PaymentButton({ plan, amount, userData, onSuccess }) {
  const [loading, setLoading] = useState(false)

  const loadRazorpay = () => new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

  const handlePayment = async () => {
    setLoading(true)
    try {
      const isReady = await loadRazorpay()
      if (!isReady) {
        alert('Failed to load payment gateway. Please try again.')
        setLoading(false)
        return
      }

      const orderRes = await fetch(`${API}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const order = await orderRes.json()
      if (!order.success) throw new Error(order.error)

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'ResumeGenie',
        description: plan === 'pro' ? 'Resume + Cover Letter' : 'AI Resume Builder',
        image: '/favicon.svg',
        order_id: order.id,
        prefill: {
          name: userData?.name || '',
          email: userData?.email || '',
          contact: userData?.phone || '',
        },
        theme: { color: '#2563EB' },
        handler: async function (response) {
          const verifyRes = await fetch(`${API}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          })
          const verify = await verifyRes.json()
          if (verify.success) {
            onSuccess && onSuccess(response)
          } else {
            alert('Payment verification failed. Please contact support.')
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', (resp) => {
        alert('Payment failed: ' + (resp.error.description || 'Please try again'))
        setLoading(false)
      })
      rzp.open()
    } catch (err) {
      console.error('Payment error:', err)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const label = plan === 'pro' ? `Unlock Resume + Cover Letter — ₹${amount}` : `Unlock Full Resume — ₹${amount}`

  return (
    <button onClick={handlePayment} disabled={loading}
      className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[44px] ${
        plan === 'pro'
          ? 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg'
          : 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50'
      } disabled:opacity-50`}>
      {loading ? (
        <span className="flex items-center gap-2 justify-center">
          <span className="loading-dot" /><span className="loading-dot" /><span className="loading-dot" />
        </span>
      ) : label}
    </button>
  )
}
