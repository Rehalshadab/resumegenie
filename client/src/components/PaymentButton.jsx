import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || ''

export default function PaymentButton({ plan, amount: planAmount, userData, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [utr, setUtr] = useState('')
  const [step, setStep] = useState('select')
  const [error, setError] = useState('')

  const label = plan === 'pro' ? `Resume + Cover Letter — ₹79` : `Resume Only — ₹49`

  const handlePay = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/payment/create-upi-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, name: userData?.name }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      setOrder(data)
      setStep('show')
    } catch (err) {
      setError('Failed to create payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/payment/verify-upi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.orderId, utr }),
      })
      const data = await res.json()
      if (data.success) {
        setStep('done')
        onSuccess && onSuccess(data)
      }
    } catch {
      setError('Verification failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'show' && order) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setStep('select')}>
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Pay via UPI</h3>
          <p className="text-sm text-gray-500 mb-4">{order.label} — ₹{order.amount}</p>

          <img src={order.qrCodeUrl} alt="UPI QR Code" className="w-48 h-48 mx-auto mb-4 rounded-lg" />

          <p className="text-xs text-gray-400 mb-1">Or pay to this UPI ID:</p>
          <p className="text-sm font-mono font-bold text-primary-600 mb-4 select-all">{order.upiVpa}</p>

          <p className="text-xs text-gray-400 mb-3">Scan with any UPI app (Google Pay, PhonePe, Paytm) and pay</p>

          <div className="space-y-2">
            <input type="text" value={utr} onChange={e => setUtr(e.target.value)}
              placeholder="Enter UTR number (optional)" className="input-field text-sm text-center" />
            <button onClick={handleVerify} disabled={loading}
              className="btn-primary w-full text-sm py-2.5">
              {loading ? 'Verifying...' : "✅ I've Paid — Unlock Download"}
            </button>
            <button onClick={() => setStep('select')} className="text-sm text-gray-500 hover:text-gray-700">
              Cancel
            </button>
          </div>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      </div>
    )
  }

  if (step === 'done') {
    return null
  }

  return (
    <div>
      <button onClick={handlePay} disabled={loading}
        className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[44px] ${
          plan === 'pro'
            ? 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg'
            : 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50'
        } disabled:opacity-50`}>
        {loading ? (
          <span className="flex items-center gap-2 justify-center">
            <span className="loading-dot" /><span className="loading-dot" /><span className="loading-dot" />
          </span>
        ) : `Pay ₹${planAmount} — ${label}`}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
