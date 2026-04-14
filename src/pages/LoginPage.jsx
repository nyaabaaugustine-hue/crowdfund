import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Briefcase, Building2, Shield, ArrowRight, CheckCircle, Heart } from 'lucide-react'

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
    tagline: 'Manage campaigns for others',
    color: '#7C3AED',
    bg: '#F5F3FF',
    features: ['Manage multiple campaigns', 'Track earnings & commission', 'Performance dashboard', 'Client reports'],
  },
  {
    id: 'company',
    icon: Building2,
    label: 'NGO / Company',
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6EF] via-white to-[#EDFAF2] flex flex-col">
      {/* Top kente bar */}
      <div className="kente-bar" />

      {/* Hero Section */}
      <div className={`flex-1 flex items-center justify-center px-4 py-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="w-full max-w-5xl">
          {/* Logo & Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 mx-auto">
                <img 
                  src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png" 
                  alt="Nkabom Fund Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#F6A800] text-white text-xs font-bold px-3 py-1 rounded-full">
                Demo Mode
              </div>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-4">
              Welcome to <span className="text-[#0B4D2B]">Nkabom Fund</span>
              <span className="inline-block ml-2">🇬🇭</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              Ghana's most trusted crowdfunding platform. Select your role to continue testing.
            </p>
          </div>

          {/* Role Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROLES.map((role, i) => {
              const Icon = role.icon
              const isSelected = selected === role.id
              return (
                <button
                  key={role.id}
                  onClick={() => setSelected(role.id)}
                  className={`
                    relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-300
                    ${isSelected 
                      ? 'shadow-2xl scale-[1.02]' 
                      : 'shadow-md hover:shadow-xl hover:scale-[1.01]'
                    }
                    anim-fade-up
                  `}
                  style={{
                    animationDelay: `${i * 100}ms`,
                    border: `2px solid ${isSelected ? role.color : '#E5E7EB'}`,
                    background: isSelected ? role.bg : 'white',
                  }}
                >
                  {/* Selected indicator */}
                  {isSelected && (
                    <div 
                      className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: role.color }}
                    >
                      <CheckCircle size={14} className="text-white" />
                    </div>
                  )}

                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300"
                    style={{ 
                      backgroundColor: isSelected ? role.color : '#F0EDE4',
                      transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    <Icon size={28} color={isSelected ? 'white' : role.color} />
                  </div>

                  {/* Content */}
                  <h3 
                    className="font-display font-bold text-xl mb-1 transition-colors"
                    style={{ color: isSelected ? role.color : '#1A1A1A' }}
                  >
                    {role.label}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{role.tagline}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {role.features.map(f => (
                      <li 
                        key={f} 
                        className="flex items-center gap-2 text-xs transition-colors"
                        style={{ color: isSelected ? role.color : '#6B7280' }}
                      >
                        <CheckCircle size={12} style={{ color: isSelected ? role.color : '#9CA3AF' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              )
            })}
          </div>

          {/* Continue Button */}
          <div className="mt-10 text-center">
            <button
              onClick={handleContinue}
              disabled={!selected || loading}
              className={`
                relative overflow-hidden font-bold py-5 px-12 rounded-2xl text-lg
                transition-all duration-300 shadow-lg
                ${selected 
                  ? 'bg-[#0B4D2B] hover:bg-[#065F46] text-white shadow-[#0B4D2B]/30 hover:shadow-[#0B4D2B]/50' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
                disabled:scale-100 enabled:hover:scale-105 enabled:active:scale-95
              `}
            >
              {loading ? (
                <span className="flex items-center gap-3 justify-center">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing you in...
                </span>
              ) : selected ? (
                <span className="flex items-center gap-3 justify-center">
                  Continue as {ROLES.find(r => r.id === selected)?.label}
                  <ArrowRight size={20} />
                </span>
              ) : (
                'Select a role to continue'
              )}
            </button>

            {/* Guest Browse */}
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="text-[#0B4D2B] font-semibold hover:underline inline-flex items-center gap-2"
              >
                <Heart size={16} />
                Browse campaigns as guest
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              No account needed · Demo mode · Switch roles anytime from dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-[#F0EDE4] bg-white/80 backdrop-blur px-4 py-5">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <span className="text-[#0B4D2B]">🔒</span> Secure & Private
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[#02a95c]">✅</span> Verified Campaigns
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[#F6A800]">📱</span> Mobile Money Supported
          </span>
          <span className="flex items-center gap-2">
            <span>🇬🇭</span> Built for Ghana
          </span>
        </div>
      </div>
    </div>
  )
}
