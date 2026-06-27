import { useState, useEffect, useRef } from 'react'

const API = import.meta.env.VITE_API_URL || ''

export default function PaymentButton({ plan, amount: planAmount, userData, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [utr, setUtr] = useState('')
  const [step, setStep] = useState('select')
  const [error, setError] = useState('')
  const [autoConfirming, setAutoConfirming] = useState(false)
  const verifiedRef = useRef(false)

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
    } catch {
      setError('Failed to create payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    if (verifiedRef.current) return
    verifiedRef.current = true
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

  const openUpiApp = (app) => {
    if (!order) return
    const intent = encodeURIComponent(order.upiIntent)
    const schemes = {
      gpay: `tez://upi/pay?pa=${order.upiVpa}&am=${order.amount}&tn=${order.orderId}&cu=INR`,
      phonepe: `phonepe://pay?pa=${order.upiVpa}&am=${order.amount}&tn=${order.orderId}&cu=INR`,
      paytm: `paytmmp://pay?pa=${order.upiVpa}&am=${order.amount}&tn=${order.orderId}&cu=INR`,
    }
    const url = schemes[app] || order.upiIntent
    window.location.href = url
  }

  // Auto-detect when user returns from UPI app
  useEffect(() => {
    if (step !== 'show') return

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && !verifiedRef.current && !autoConfirming) {
        setAutoConfirming(true)
        setTimeout(() => handleVerify(), 500)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [step, order])

  if (step === 'show' && order) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setStep('select')}>
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Pay via UPI</h3>
          <p className="text-sm text-gray-500 mb-4">{order.label} — ₹{order.amount}</p>

          <img src={order.qrCodeUrl} alt="UPI QR Code" className="w-48 h-48 mx-auto mb-3 rounded-lg border border-gray-200" />

          <p className="text-xs text-gray-400 mb-1">Or tap your preferred UPI app:</p>
          <div className="flex gap-3 justify-center mb-4">
            <button onClick={() => openUpiApp('gpay')}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-colors">
              <span className="text-lg">🔵</span>
              <span className="text-[11px] font-medium text-gray-600">GPay</span>
            </button>
            <button onClick={() => openUpiApp('phonepe')}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-colors">
              <span className="text-lg">🟣</span>
              <span className="text-[11px] font-medium text-gray-600">PhonePe</span>
            </button>
            <button onClick={() => openUpiApp('paytm')}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <span className="text-lg">🔷</span>
              <span className="text-[11px] font-medium text-gray-600">Paytm</span>
            </button>
          </div>

          <p className="text-xs text-gray-400 mb-3">Pay and come back — download unlocks automatically</p>

          <div className="space-y-2">
            <input type="text" value={utr} onChange={e => setUtr(e.target.value)}
              placeholder="UTR number (optional, for backup)" className="input-field text-sm text-center" />
            <button onClick={handleVerify} disabled={loading}
              className="btn-primary w-full text-sm py-2.5">
              {loading ? 'Verifying...' : "✅ I've Paid — Unlock Download"}
            </button>
            {autoConfirming && <p className="text-xs text-green-600">Payment detected! Verifying...</p>}
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
