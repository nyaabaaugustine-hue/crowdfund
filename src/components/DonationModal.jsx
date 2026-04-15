import { useState, useRef, useEffect } from 'react'
import { Image as ImageIcon } from 'lucide-react'

function ImageWithFallback({ src, alt, className, style }) {
  const [hasError, setHasError] = useState(false)
  
  if (hasError || !src) {
    return (
      <div className={className} style={{ ...style, background: '#F0EDE4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ImageIcon size={20} className="text-gray-400" />
      </div>
    )
  }
  
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setHasError(true)}
    />
  )
}
import { X, CheckCircle, ChevronRight, Smartphone, CreditCard, AlertCircle, Loader2 } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { formatGHS } from '../data/seed'

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_34c930f14bbf8c042864e692beda363b2d40aaf9'
const SUGGESTED_AMOUNTS = [50, 100, 200, 500, 1000]
const MOMO_PROVIDERS = [
  { id: 'mtn', name: 'MTN Mobile Money', short: 'MTN MoMo', color: '#FFC107', channel: 'mobile_money_mtn', logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085018/newmo_vwzw4r.png' },
  { id: 'telecel', name: 'Telecel Cash', short: 'Telecel', color: '#E60000', channel: 'mobile_money_tigo', logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085086/tele_1_wfgluk.png' },
  { id: 'airteltigo', name: 'AirtelTigo Money', short: 'AirtelTigo', color: '#FF6600', channel: 'mobile_money_airteltigo', logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085165/download_1_jclht6.jpg' },
]

export default function DonationModal({ campaign, onClose }) {
  const { donate } = useData()
  const { user } = useAuth()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [payMethod, setPayMethod] = useState('mtn')
  const [payType, setPayType] = useState('momo')
  const [momoNumber, setMomoNumber] = useState(user?.phone || '')
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ref, setRef] = useState('')
  const paystackRef = useRef(null)

  const finalAmount = customAmount ? Number(customAmount) : Number(amount)
  const selectedProvider = MOMO_PROVIDERS.find(p => p.id === payMethod)

  const handleAmountSelect = (val) => {
    setAmount(val)
    setCustomAmount('')
  }

  const handleNext = () => {
    setError('')
    if (step === 1) {
      if (finalAmount < 1) {
        setError('Please enter a valid amount')
        return
      }
      if (!email) {
        setError('Please enter your email address')
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (payType === 'momo' && momoNumber.length < 10) {
        setError('Please enter a valid Mobile Money number')
        return
      }
      setStep(3)
    }
  }

  const loadPaystack = () => {
    return new Promise((resolve) => {
      if (window.PaystackPop) {
        resolve()
        return
      }
      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v2/inline.js'
      script.onload = () => resolve()
      script.onerror = () => resolve()
      document.body.appendChild(script)
    })
  }

  const handleConfirm = async () => {
    setLoading(true)
    setError('')

    try {
      await loadPaystack()

      if (!window.PaystackPop) {
        setError('Payment system not loaded. Please refresh and try again.')
        setLoading(false)
        return
      }

      const paymentRef = `NKF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setRef(paymentRef)

      const paystack = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: finalAmount * 100,
        currency: 'GHS',
        ref: paymentRef,
        channels: payType === 'momo' ? ['mobile_money'] : ['card'],
        metadata: {
          campaignId: campaign.id,
          campaignTitle: campaign.title,
          donorName: anonymous ? 'Anonymous' : name,
          mobile_number: momoNumber,
          payMethod: payType,
        },
        callback: (response) => {
          donate(campaign.id, finalAmount, anonymous ? 'Anonymous' : name, selectedProvider?.short || 'Card')
          setStep(4)
          setLoading(false)
        },
        onClose: () => {
          setLoading(false)
        },
      })

      paystack.openIframe()
    } catch (err) {
      setError('Payment failed to initialize. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '16px', overflowY: 'auto', scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div 
        style={{ background: 'white', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: '480px', padding: '32px 24px 40px', animation: 'slideDown 0.3s ease-out', position: 'relative', marginTop: 'auto' }}
        className="sm:!rounded-3xl sm:!mt-8 sm:!mb-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F0EDE4] flex items-center justify-center hover:bg-[#E5DFD3] transition-colors z-10"
        >
          <X size={16} />
        </button>

        {step === 4 && (
          <div className="text-center py-4">
            <div className="success-icon w-20 h-20 bg-[#EDFAF2] rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={44} className="text-[#0B4D2B]" strokeWidth={1.5} />
            </div>
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Thank you! 🙏</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              Your donation of <span className="font-bold text-[#0B4D2B]">{formatGHS(finalAmount)}</span> to
            </p>
            <p className="font-semibold text-gray-800 text-sm mb-5">"{campaign.title}"</p>
            <div className="bg-[#F9F6EF] rounded-2xl p-4 mb-6 text-left">
              <p className="text-xs text-gray-500">Payment Reference</p>
              <p className="font-mono text-sm font-bold text-gray-800">{ref}</p>
              <p className="text-xs text-gray-400 mt-1">Processed via Paystack</p>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              Your generosity makes a real difference. A receipt has been sent to {email}.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#0B4D2B] hover:bg-[#0F6035] text-white font-bold py-3.5 rounded-2xl transition-colors"
            >
              Back to Campaign
            </button>
          </div>
        )}

        {step === 1 && (
          <>
            <div className="mb-6">
              <p className="text-xs font-bold text-[#0B4D2B] uppercase tracking-wider mb-1">Donating to</p>
              <h2 className="font-display font-bold text-xl text-gray-900 leading-snug line-clamp-2">{campaign.title}</h2>
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-500 font-medium mb-1.5 block">Your email address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="gh-input"
                required
              />
            </div>

            <p className="text-sm font-semibold text-gray-700 mb-3">Choose an amount</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {SUGGESTED_AMOUNTS.map(amt => (
                <button
                  key={amt}
                  onClick={() => handleAmountSelect(amt)}
                  className={`amt-btn ${amount === amt && !customAmount ? 'selected' : ''}`}
                >
                  ₵{amt}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-500 font-medium mb-1.5 block">Or enter custom amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₵</span>
                <input
                  type="number"
                  placeholder="e.g. 250"
                  value={customAmount}
                  onChange={e => { setCustomAmount(e.target.value); setAmount('') }}
                  className="gh-input pl-8"
                  min="1"
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full bg-[#0B4D2B] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              Continue <ChevronRight size={18} />
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <button onClick={() => setStep(1)} className="text-xs text-[#0B4D2B] font-semibold mb-4 flex items-center gap-1">
              ← Back
            </button>
            <h2 className="font-display font-bold text-xl text-gray-900 mb-1">Payment Method</h2>
            <p className="text-sm text-gray-400 mb-5">Donating <span className="font-bold text-[#0B4D2B]">{formatGHS(finalAmount)}</span></p>

            <div className="flex gap-2 mb-4 p-1 bg-[#F0EDE4] rounded-xl">
              <button
                onClick={() => setPayType('momo')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${payType === 'momo' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
              >
                <Smartphone size={14} className="inline mr-1.5" /> Mobile Money
              </button>
              <button
                onClick={() => setPayType('card')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${payType === 'card' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
              >
                <CreditCard size={14} className="inline mr-1.5" /> Card
              </button>
            </div>

            {payType === 'momo' ? (
              <div className="space-y-2 mb-4">
                {MOMO_PROVIDERS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPayMethod(p.id)}
                    className={`momo-option w-full ${payMethod === p.id ? 'selected' : ''}`}
                  >
                    <ImageWithFallback src={p.logo} alt={p.name} className="w-8 h-8 object-contain rounded-lg flex-shrink-0" style={{ background: '#fff' }} />
                    <span className="text-sm font-semibold text-gray-800">{p.name}</span>
                    {payMethod === p.id && <CheckCircle size={16} className="ml-auto text-[#F6A800]" />}
                  </button>
                ))}
                <input
                  type="tel"
                  placeholder="MoMo number e.g. 0241234567"
                  value={momoNumber}
                  onChange={e => setMomoNumber(e.target.value)}
                  className="gh-input mt-3"
                  maxLength={10}
                />
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                <div className="bg-[#F9F6EF] rounded-xl p-4 text-center">
                  <CreditCard size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Card payment will open a secure Paystack form</p>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="text-xs font-medium text-gray-600 mb-1.5 block">Your name (for donor list)</label>
              <input
                className="gh-input"
                value={anonymous ? 'Anonymous' : name}
                onChange={e => setName(e.target.value)}
                disabled={anonymous}
                placeholder="e.g. Kwame Asante"
              />
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} className="rounded" />
                <span className="text-xs text-gray-500">Donate anonymously</span>
              </label>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full bg-[#0B4D2B] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors hover:bg-[#0F6035]"
            >
              Review Donation <ChevronRight size={18} />
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <button onClick={() => setStep(2)} className="text-xs text-[#0B4D2B] font-semibold mb-4 flex items-center gap-1">
              ← Back
            </button>
            <h2 className="font-display font-bold text-xl text-gray-900 mb-5">Confirm Donation</h2>

            <div className="bg-[#F9F6EF] rounded-2xl p-5 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Campaign</span>
                <span className="font-semibold text-gray-800 text-right max-w-[60%] line-clamp-1">{campaign.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount</span>
                <span className="font-bold text-[#0B4D2B] text-lg">{formatGHS(finalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Method</span>
                <span className="font-semibold text-gray-800">
                  {payType === 'momo' ? `${selectedProvider?.name} (${momoNumber})` : 'Credit/Debit Card'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Donor name</span>
                <span className="font-semibold text-gray-800">{anonymous ? 'Anonymous' : name}</span>
              </div>
              <div className="pt-2 border-t border-[#E5DFD3]">
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-gray-700">Total charged</span>
                  <span className="font-bold text-[#0B4D2B]">{formatGHS(finalAmount)}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-5 text-center flex items-center justify-center gap-1">
              🔒 Secured by Paystack
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full bg-[#F6A800] hover:bg-[#D48E00] disabled:opacity-60 text-[#3D2A00] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-base"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>Confirm & Pay {formatGHS(finalAmount)}</>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
