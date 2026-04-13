import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Briefcase, Building2, Shield, ArrowRight, CheckCircle } from 'lucide-react'

const ROLES = [
  {
    id: 'user',
    icon: User,
    label: 'Regular User',
    tagline: 'Browse, donate & raise funds',
    color: '#0B4D2B',
    bg: '#EDFAF2',
    features: ['Browse all campaigns', 'Donate with Mobile Money', 'Create your own campaign', 'Personal dashboard'],
  },
  {
    id: 'agent',
    icon: Briefcase,
    label: 'Campaign Agent',
    tagline: 'Manage campaigns on behalf of others',
    color: '#7C3AED',
    bg: '#F5F3FF',
    features: ['Manage multiple campaigns', 'Track earnings & commission', 'Performance dashboard', 'Client campaign reports'],
  },
  {
    id: 'company',
    icon: Building2,
    label: 'Organisation / NGO',
    tagline: 'Verified badge & analytics',
    color: '#065F46',
    bg: '#ECFDF5',
    features: ['Verified trust badge', 'Advanced analytics', 'Donor management', 'Professional dashboard'],
  },
  {
    id: 'admin',
    icon: Shield,
    label: 'Admin',
    tagline: 'Full platform control',
    color: '#1E3A5F',
    bg: '#EFF6FF',
    features: ['Approve / reject campaigns', 'View all users & data', 'Simulate payouts', 'Platform analytics'],
  },
]

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleContinue = () => {
    if (!selected) return
    setLoading(true)
    setTimeout(() => {
      login(selected)
      const dash = { user: '/dashboard', agent: '/agent', company: '/company', admin: '/admin' }
      navigate(dash[selected])
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#F9F6EF] flex flex-col">
      {/* Top kente bar */}
      <div className="kente-bar" />

      {/* Header */}
      <div className="text-center px-4 pt-12 pb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#0B4D2B] flex items-center justify-center shadow-warm">
            <span className="text-[#F6A800] font-display font-bold text-lg">G</span>
          </div>
          <span className="font-display font-bold text-[#0B4D2B] text-2xl">GhCrowd</span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-3">
          Welcome to GhCrowd 🇬🇭
        </h1>
        <p className="text-gray-500 text-base max-w-md mx-auto">
          Ghana's most trusted crowdfunding platform. Choose how you'd like to continue.
        </p>
      </div>

      {/* Role cards */}
      <div className="max-w-4xl mx-auto w-full px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map((role, i) => {
            const Icon = role.icon
            const isSelected = selected === role.id
            return (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                className="role-card text-left anim-fade-up"
                style={{
                  animationDelay: `${i * 80}ms`,
                  borderColor: isSelected ? role.color : undefined,
                  background: isSelected ? role.bg : undefined,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: isSelected ? role.color : '#F0EDE4' }}
                >
                  <Icon size={22} color={isSelected ? 'white' : role.color} />
                </div>
                <h3
                  className="font-display font-bold text-base mb-1 text-center"
                  style={{ color: isSelected ? role.color : '#1A1A1A' }}
                >
                  {role.label}
                </h3>
                <p className="text-xs text-gray-400 text-center mb-4">{role.tagline}</p>
                <ul className="space-y-1.5">
                  {role.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: role.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>

        {/* Continue button */}
        <div className="mt-8 max-w-sm mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selected || loading}
            className="w-full bg-[#0B4D2B] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all text-base shadow-warm-md hover:bg-[#0F6035] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing you in...
              </>
            ) : (
              <>
                Continue as {selected ? ROLES.find(r => r.id === selected)?.label : '—'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-400 mt-4">
            No account needed · Demo mode · Switch roles anytime
          </p>
        </div>

        {/* Or browse as guest */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-[#0B4D2B] font-semibold hover:underline"
          >
            Browse as guest →
          </button>
        </div>
      </div>

      {/* Trust bar */}
      <div className="mt-auto border-t border-[#F0EDE4] bg-white px-4 py-4">
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <span>🔒 Secure & Private</span>
          <span>✅ Verified Campaigns</span>
          <span>📱 Mobile Money Supported</span>
          <span>🇬🇭 Built for Ghana</span>
        </div>
      </div>
    </div>
  )
}
