import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { User, Briefcase, Building2, Shield, ArrowRight, CheckCircle, Heart, Mail, Lock, Eye, EyeOff, Users, Phone, Facebook, Twitter, Instagram, Linkedin, Link2, ChevronDown, X } from 'lucide-react'

const LOGO_URL = 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png'
const BACKGROUND_URL = 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776100748/1776084010602_yzmun1.jpg'

const USER_TYPES = [
  { id: 'user', icon: User, label: 'Regular User', desc: 'Browse campaigns and donate', color: '#0B4D2B' },
  { id: 'agent', icon: Briefcase, label: 'Campaign Agent', desc: 'Manage campaigns for others', color: '#7C3AED' },
  { id: 'company', icon: Building2, label: 'NGO / Organization', desc: 'Verified organization account', color: '#065F46' },
  { id: 'admin', icon: Shield, label: 'Admin', desc: 'Platform administration', color: '#1E3A5F' },
]

const DEMO_CREDENTIALS = {
  user: { email: 'ama.mensah@gmail.com', password: 'demo123', name: 'Ama Mensah' },
  agent: { email: 'kofi.boateng@ghcrowd.com', password: 'demo123', name: 'Kofi Boateng' },
  company: { email: 'info@hopefoundation.org.gh', password: 'demo123', name: 'Hope Foundation Ghana' },
  admin: { email: 'admin@nkabomfund.com', password: 'NKA2024SUPER', name: 'Admin Super' },
}

export default function LoginPage() {
  const { login, register } = useAuth()
  const { addCampaign } = useData()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'signin'
  const [tab, setTab] = useState(initialTab)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showCredentials, setShowCredentials] = useState(false)
  const [selectedCreds, setSelectedCreds] = useState(null)

  const [signinData, setSigninData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '', password: '', role: 'user' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDemoLogin = (roleId) => {
    const creds = DEMO_CREDENTIALS[roleId]
    setSigninData({ email: creds.email, password: creds.password })
    setSelectedCreds(roleId)
  }

  const handleLoginWithCreds = () => {
    setLoading(true)
    setTimeout(() => {
      login(selectedCreds)
      const dash = { user: '/dashboard', agent: '/agent', company: '/company', admin: '/admin' }
      navigate(dash[selectedCreds])
    }, 800)
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    if (!signinData.email || !signinData.password) {
      setErrors({ signin: 'Please fill in all fields' })
      return
    }
    setLoading(true)
    setTimeout(() => {
      login('user')
      navigate('/dashboard')
    }, 800)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!registerData.name) newErrors.name = 'Name is required'
    if (!registerData.email) newErrors.email = 'Email is required'
    if (!registerData.password || registerData.password.length < 6) newErrors.password = 'Min 6 characters'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      const selectedType = USER_TYPES.find(t => t.id === registerData.role)
      const newUser = {
        id: `user-${Date.now()}`,
        role: registerData.role,
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        avatar: registerData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
        avatarColor: selectedType?.color || '#0B4D2B',
        location: 'Ghana',
        joinedAt: new Date().toISOString().split('T')[0],
        totalDonated: 0,
        totalRaised: 0,
        campaigns: [],
        donations: [],
      }
      register(newUser)
      const dash = { user: '/dashboard', agent: '/agent', company: '/company', admin: '/admin' }
      navigate(dash[registerData.role] || '/dashboard')
    }, 800)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://nkabomfund.vercel.app'
  const shareTitle = 'Support Ghana crowdfunding on Nkabom Fund'
  const shareText = 'Join me in supporting important causes across Ghana. Every donation makes a difference!'

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle + ' ' + shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
  }

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Background Image (Desktop) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BACKGROUND_URL})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B4D2B]/90 via-[#0B4D2B]/70 to-[#1E3A5F]/80" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center p-12 text-white">
          <img src={LOGO_URL} alt="Nkabom Fund" className="w-24 h-24 object-contain mb-8" />
          <h1 className="font-display font-black text-4xl text-center mb-4">
            Together We Rise
          </h1>
          <p className="text-lg text-white/90 text-center max-w-md mb-8">
            Ghana's most trusted crowdfunding platform. Support causes that matter, raise funds for what you believe in.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: '45+', sub: 'Communities' },
              { label: 'GHS 8M+', sub: 'Raised' },
              { label: '10K+', sub: 'Donors' },
            ].map((stat, i) => (
              <div key={i} className="text-center bg-white/10 backdrop-blur rounded-xl px-6 py-4">
                <p className="font-bold text-2xl">{stat.label}</p>
                <p className="text-xs text-white/70">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-[#F9F6EF]">
        {/* Mobile Header */}
        <div 
          className="lg:hidden relative h-48 sm:h-64"
          style={{ backgroundImage: `url(${BACKGROUND_URL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B4D2B]/80 to-[#0B4D2B]" />
          <div className="relative flex flex-col items-center justify-center h-full p-6 text-white text-center">
            <img src={LOGO_URL} alt="Nkabom Fund" className="w-16 h-16 object-contain mb-4" />
            <h1 className="font-display font-bold text-2xl mb-2">Nkabom Fund</h1>
            <p className="text-sm text-white/80">Ghana's trusted crowdfunding platform</p>
          </div>
        </div>

        {/* Form Container */}
        <div className={`flex-1 flex items-center justify-center px-4 py-6 sm:py-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Form Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-[#F0EDE4]">
              {/* Tabs */}
              <div className="flex gap-1 mb-5 p-1 bg-[#F0EDE4] rounded-xl">
                <button
                  onClick={() => { setTab('signin'); setErrors({}) }}
                  className={`flex-1 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${tab === 'signin' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setTab('register'); setErrors({}) }}
                  className={`flex-1 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${tab === 'register' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                >
                  Register
                </button>
              </div>

              {/* Sign In Form */}
              {tab === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={signinData.email}
                      onChange={e => setSigninData({ ...signinData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#E5DFD3] focus:border-[#0B4D2B] focus:ring-2 focus:ring-[#0B4D2B]/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={signinData.password}
                        onChange={e => setSigninData({ ...signinData, password: e.target.value })}
                        className="w-full px-4 py-3.5 pr-12 rounded-xl border border-[#E5DFD3] focus:border-[#0B4D2B] focus:ring-2 focus:ring-[#0B4D2B]/20 outline-none text-sm"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  {errors.signin && <p className="text-red-500 text-xs">{errors.signin}</p>}
                  <button type="submit" disabled={loading} className="w-full bg-[#0B4D2B] hover:bg-[#065F46] text-white font-bold py-3.5 rounded-xl transition-all text-sm disabled:opacity-60">
                    {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" /> : 'Sign In'}
                  </button>
                  <p className="text-center text-xs text-gray-500">
                    Or sign in with{' '}
                    <Link to="/auth" className="text-[#0B4D2B] font-semibold hover:underline">
                      Neon Auth
                    </Link>
                  </p>
                  <div className="relative py-2"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5DFD3]" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or quick demo login</span></div></div>
                  <div className="grid grid-cols-4 gap-2">
                    {USER_TYPES.map(type => {
                      const Icon = type.icon
                      return (
                        <button key={type.id} type="button" onClick={() => handleDemoLogin(type.id)} className={`p-2 rounded-xl border text-center transition-all ${selectedCreds === type.id ? 'border-[#0B4D2B] bg-[#EDFAF2]' : 'border-[#E5DFD3] bg-white hover:bg-gray-50'}`}>
                          <Icon size={16} className="mx-auto mb-0.5" style={{ color: type.color }} />
                          <span className="text-[9px] font-medium text-gray-600 capitalize">{type.label.split(' ')[0]}</span>
                        </button>
                      )
                    })}
                  </div>
                </form>
              )}

              {/* Register Form */}
              {tab === 'register' && (
                <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
                  <input type="text" placeholder="Full Name" value={registerData.name} onChange={e => setRegisterData({ ...registerData, name: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-[#E5DFD3] focus:border-[#0B4D2B] outline-none text-sm" />
                  {errors.name && <p className="text-red-500 text-xs -mt-2">{errors.name}</p>}
                  <input type="email" placeholder="Email" value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-[#E5DFD3] focus:border-[#0B4D2B] outline-none text-sm" />
                  {errors.email && <p className="text-red-500 text-xs -mt-2">{errors.email}</p>}
                  <input type="tel" placeholder="Phone (optional)" value={registerData.phone} onChange={e => setRegisterData({ ...registerData, phone: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-[#E5DFD3] focus:border-[#0B4D2B] outline-none text-sm" />
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} placeholder="Password (min 6 chars)" value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} className="w-full px-4 py-3.5 pr-12 rounded-xl border border-[#E5DFD3] focus:border-[#0B4D2B] outline-none text-sm" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><Eye size={18} /></button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs -mt-2">{errors.password}</p>}
                  
                  {/* Account Type Dropdown */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Account Type</label>
                    <div className="relative">
                      <select
                        value={registerData.role}
                        onChange={e => setRegisterData(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E5DFD3] focus:border-[#0B4D2B] outline-none text-sm appearance-none bg-white cursor-pointer"
                      >
                        {USER_TYPES.map(type => {
                          const Icon = type.icon
                          return (
                            <option key={type.id} value={type.id}>
                              {type.label} - {type.desc}
                            </option>
                          )
                        })}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Selected Type Preview */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    {(() => {
                      const selectedType = USER_TYPES.find(t => t.id === registerData.role)
                      const Icon = selectedType?.icon
                      return selectedType ? (
                        <>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: selectedType.color + '20' }}>
                            <Icon size={20} style={{ color: selectedType.color }} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{selectedType.label}</p>
                            <p className="text-xs text-gray-500">{selectedType.desc}</p>
                          </div>
                        </>
                      ) : null
                    })()}
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-[#0B4D2B] hover:bg-[#065F46] text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-60">
                    {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" /> : 'Create Account'}
                  </button>
                </form>
              )}
            </div>

            {/* Demo Roles */}
            {tab === 'signin' && (
              <div className="mt-4">
                <p className="text-center text-xs text-gray-500 mb-2">Click to use demo credentials</p>
                <div className="grid grid-cols-4 gap-2">
                  {USER_TYPES.map(type => {
                    const Icon = type.icon
                    const isSelected = selectedCreds === type.id
                    return (
                      <button 
                        key={type.id} 
                        onClick={() => handleDemoLogin(type.id)} 
                        className={`p-2.5 rounded-xl border text-center transition-all ${isSelected ? 'border-[#0B4D2B] bg-[#EDFAF2]' : 'border-[#E5DFD3] bg-white hover:bg-gray-50'}`}
                      >
                        <Icon size={18} className="mx-auto mb-1" style={{ color: type.color }} />
                        <span className="text-[10px] font-medium text-gray-600">{type.label}</span>
                      </button>
                    )
                  })}
                </div>
                
                {/* Credentials Display */}
                {selectedCreds && DEMO_CREDENTIALS[selectedCreds] && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-700">Demo Credentials</p>
                      <button onClick={() => setShowCredentials(!showCredentials)} className="text-xs text-[#0B4D2B] font-medium">
                        {showCredentials ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span className="font-mono text-gray-800">{showCredentials ? DEMO_CREDENTIALS[selectedCreds].email : '••••••••••@•••.com'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Password:</span>
                        <span className="font-mono text-gray-800">{showCredentials ? DEMO_CREDENTIALS[selectedCreds].password : '••••••••'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Role:</span>
                        <span className="font-medium text-gray-800 capitalize">{selectedCreds}</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleLoginWithCreds}
                      disabled={loading}
                      className="w-full mt-3 bg-[#0B4D2B] hover:bg-[#065F46] text-white font-bold py-2.5 rounded-xl text-xs transition-colors disabled:opacity-60"
                    >
                      {loading ? 'Signing in...' : 'Login as ' + selectedCreds}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Guest & Share */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <button onClick={() => navigate('/')} className="text-[#0B4D2B] font-semibold flex items-center gap-1">
                <Heart size={14} /> Browse as guest
              </button>
              <button onClick={() => setShowShareModal(true)} className="text-gray-500 font-medium flex items-center gap-1">
                <Link2 size={14} /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="border-t border-[#F0EDE4] bg-white px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">🔒 Secure</span>
            <span className="flex items-center gap-1">✅ Verified</span>
            <span className="flex items-center gap-1">📱 Mobile Money</span>
            <span className="flex items-center gap-1">🇬🇭 Built for Ghana</span>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full max-w-sm mt-0 sm:mt-8 mb-auto sm:mb-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="font-bold text-gray-900">Share Nkabom Fund</h3>
                <p className="text-xs text-gray-500">Help us spread the word!</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { icon: Facebook, label: 'Facebook', color: '#1877F2', url: shareLinks.facebook },
                { icon: Twitter, label: 'X / Twitter', color: '#000', url: shareLinks.twitter },
                { icon: Instagram, label: 'Instagram', color: '#E4405F', url: '#' },
                { icon: Linkedin, label: 'LinkedIn', color: '#0A66C2', url: shareLinks.linkedin },
                { icon: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>, label: 'WhatsApp', color: '#25D366', url: shareLinks.whatsapp },
              ].map((social, i) => (
                <button key={i} onClick={() => social.url !== '#' && handleShare(social.label.toLowerCase().split(' ')[0])} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                  <social.icon size={22} style={{ color: social.color }} />
                  <span className="text-[10px] text-gray-600 font-medium">{social.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" readOnly value={shareUrl} className="flex-1 px-3 py-2.5 rounded-xl border border-[#E5DFD3] text-xs bg-gray-50" />
              <button onClick={copyLink} className="px-4 py-2.5 bg-[#0B4D2B] text-white rounded-xl text-xs font-medium hover:bg-[#065F46] transition-colors">
                Copy
              </button>
            </div>
            <button onClick={() => setShowShareModal(false)} className="w-full mt-3 py-2 text-gray-500 text-sm font-medium">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
