import { useState } from 'react'
import { X, CheckCircle, ChevronRight, Smartphone, CreditCard, Building2 } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { formatGHS } from '../data/seed'

const SUGGESTED_AMOUNTS = [50, 100, 200, 500, 1000]
const MOMO_PROVIDERS = [
  { id: 'mtn', name: 'MTN Mobile Money', short: 'MTN MoMo', color: '#FFC107', logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085018/newmo_vwzw4r.png' },
  { id: 'telecel', name: 'Telecel Cash', short: 'Telecel', color: '#E60000', logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085086/tele_1_wfgluk.png' },
  { id: 'airteltigo', name: 'AirtelTigo Money', short: 'AirtelTigo', color: '#FF6600', logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085165/download_1_jclht6.jpg' },
]

export default function DonationModal({ campaign, onClose }) {
  const { donate } = useData()
  const { user } = useAuth()
  const [step, setStep] = useState(1) // 1=amount, 2=method, 3=confirm, 4=success
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [payMethod, setPayMethod] = useState('mtn')
  const [payType, setPayType] = useState('momo') // momo | card
  const [momoNumber, setMomoNumber] = useState(user?.phone || '')
  const [name, setName] = useState(user?.name || '')
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)

  const finalAmount = customAmount ? Number(customAmount) : Number(amount)
  const selectedProvider = MOMO_PROVIDERS.find(p => p.id === payMethod)

  const handleAmountSelect = (val) => {
    setAmount(val)
    setCustomAmount('')
  }

  const handleNext = () => {
    if (step === 1 && finalAmount >= 1) setStep(2)
    else if (step === 2) setStep(3)
  }

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      donate(campaign.id, finalAmount, anonymous ? 'Anonymous' : name, selectedProvider?.short || 'Card')
      setLoading(false)
      setStep(4)
    }, 1800)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F0EDE4] flex items-center justify-center hover:bg-[#E5DFD3] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Step 4: Success */}
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
              <p className="font-mono text-sm font-bold text-gray-800">GHC-{Date.now().toString().slice(-8)}</p>
              <p className="text-xs text-gray-400 mt-1">Simulated · No real payment made</p>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              Your generosity makes a real difference. A receipt has been sent to your email.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#0B4D2B] hover:bg-[#0F6035] text-white font-bold py-3.5 rounded-2xl transition-colors"
            >
              Back to Campaign
            </button>
          </div>
        )}

        {/* Step 1: Amount */}
        {step === 1 && (
          <>
            <div className="mb-6">
              <p className="text-xs font-bold text-[#0B4D2B] uppercase tracking-wider mb-1">Donating to</p>
              <h2 className="font-display font-bold text-xl text-gray-900 leading-snug line-clamp-2">{campaign.title}</h2>
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

            <div className="mb-6">
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

            <button
              onClick={handleNext}
              disabled={finalAmount < 1}
              className="w-full bg-[#0B4D2B] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              Continue <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Step 2: Payment method */}
        {step === 2 && (
          <>
            <button onClick={() => setStep(1)} className="text-xs text-[#0B4D2B] font-semibold mb-4 flex items-center gap-1">
              ← Back
            </button>
            <h2 className="font-display font-bold text-xl text-gray-900 mb-1">Payment Method</h2>
            <p className="text-sm text-gray-400 mb-5">Donating <span className="font-bold text-[#0B4D2B]">{formatGHS(finalAmount)}</span></p>

            {/* Type tabs */}
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
                    {p.logo.startsWith('http') ? (
                      <img src={p.logo} className="w-7 h-7 object-contain" alt={p.short} />
                    ) : (
                      <span className="text-2xl">{p.logo}</span>
                    )}
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
                />
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                <input placeholder="Card number" className="gh-input" readOnly value="•••• •••• •••• ••••" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM/YY" className="gh-input" readOnly value="12/27" />
                  <input placeholder="CVV" className="gh-input" readOnly value="•••" />
                </div>
                <p className="text-xs text-gray-400">Demo mode — no real card required</p>
              </div>
            )}

            <div className="mb-5">
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

            <button
              onClick={handleNext}
              className="w-full bg-[#0B4D2B] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors hover:bg-[#0F6035]"
            >
              Review Donation <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Step 3: Confirm */}
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
                  {payType === 'momo' ? selectedProvider?.name : 'Credit/Debit Card'}
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

            <p className="text-xs text-gray-400 mb-5 text-center">
              🔒 This is a demo. No real payment will be processed.
            </p>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full bg-[#F6A800] hover:bg-[#D48E00] disabled:opacity-60 text-[#3D2A00] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-base"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#3D2A00]/40 border-t-[#3D2A00] rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>Confirm & Donate {formatGHS(finalAmount)}</>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
