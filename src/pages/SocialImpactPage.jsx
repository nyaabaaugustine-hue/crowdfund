import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Award, BarChart3, Users, Globe, CheckCircle, ArrowRight, Leaf, BookOpen, Droplets, Zap, Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampaignCard from '../components/CampaignCard'
import { useData } from '../context/DataContext'
import { formatGHS } from '../data/seed'

const IMPACT_AREAS = [
  { icon: BookOpen, label: 'Education', color: '#3B82F6', bg: '#EFF6FF', desc: 'School fees, libraries, laptops, and scholarships for Ghanaian students.' },
  { icon: Droplets, label: 'Clean Water', color: '#06B6D4', bg: '#ECFEFF', desc: 'Borehole drilling, water filtration systems for rural communities.' },
  { icon: Leaf, label: 'Environment', color: '#10B981', bg: '#ECFDF5', desc: 'Tree planting, waste management, and green infrastructure projects.' },
  { icon: Users, label: 'Community', color: '#8B5CF6', bg: '#F5F3FF', desc: 'Community centres, youth programs, and social enterprise support.' },
  { icon: Zap, label: 'Energy Access', color: '#F59E0B', bg: '#FFFBEB', desc: 'Solar power for off-grid villages, street lighting, and micro-grids.' },
  { icon: Heart, label: 'Healthcare', color: '#EF4444', bg: '#FEF2F2', desc: 'Community clinics, health awareness campaigns, and sanitation drives.' },
]

const IMPACT_NUMBERS = [
  { label: 'Communities Reached', value: '45+', icon: Globe },
  { label: 'Schools Supported', value: '12', icon: BookOpen },
  { label: 'Lives Impacted', value: '28,000+', icon: Users },
  { label: 'Projects Completed', value: '94', icon: Award },
]

const FEATURED_ORGS = [
  { name: 'Hope Foundation Ghana', type: 'Verified NGO', focus: 'Education & Health', raised: 142500, campaigns: 4 },
  { name: 'Accra Community Fund', type: 'Registered Charity', focus: 'Urban Communities', raised: 67200, campaigns: 6 },
  { name: 'Northern Education Trust', type: 'Foundation', focus: 'Education Access', raised: 89400, campaigns: 3 },
]

export default function SocialImpactPage() {
  const { campaigns } = useData()
  const [activeArea, setActiveArea] = useState(null)

  const impactCampaigns = campaigns.filter(c =>
    (c.category === 'community' || c.category === 'education') && c.status === 'approved'
  )

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#0B4D2B] text-white overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(246,168,0,0.15) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)'
        }} />
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 30C480 60 240 0 0 30L0 60Z" fill="#F9F6EF"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28 lg:pt-28 lg:pb-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-bold mb-8">
              <Award size={15} className="text-[#F6A800]" />
              Social Impact Funds
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight">
              Invest in the<br />
              <span className="text-[#F6A800]">future of Ghana.</span>
            </h1>
            <p className="text-green-100 text-lg leading-relaxed max-w-xl mb-10">
              These community-led initiatives are building schools, providing clean water, training youth, and
              creating sustainable livelihoods across all 16 regions of Ghana. Every cedi compounds.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#campaigns" className="inline-flex items-center gap-2 bg-[#F6A800] hover:bg-[#D48E00] text-[#3D2A00] font-black px-8 py-4 rounded-xl transition-all shadow-lg text-base">
                View Impact Campaigns <ArrowRight size={18} />
              </a>
              <Link to="/charity" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-base">
                Register Your NGO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 mb-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {IMPACT_NUMBERS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-warm text-center">
              <div className="w-10 h-10 bg-[#EDFAF2] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon size={20} className="text-[#0B4D2B]" />
              </div>
              <p className="font-display font-black text-2xl sm:text-3xl text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-2">Areas of Impact</h2>
          <p className="text-gray-500">Click an area to filter campaigns by cause.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {IMPACT_AREAS.map(({ icon: Icon, label, color, bg, desc }) => (
            <button
              key={label}
              onClick={() => setActiveArea(activeArea === label ? null : label)}
              className={`group rounded-2xl p-4 text-left border-2 transition-all ${
                activeArea === label
                  ? 'border-current shadow-md scale-[1.02]'
                  : 'border-transparent bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
              style={activeArea === label ? { borderColor: color, backgroundColor: bg } : {}}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors"
                style={{ backgroundColor: activeArea === label ? `${color}20` : '#F9F6EF' }}>
                <Icon size={20} style={{ color }} />
              </div>
              <p className="font-bold text-gray-900 text-sm">{label}</p>
            </button>
          ))}
        </div>
        {activeArea && (
          <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4 anim-fade-in">
            {(() => {
              const area = IMPACT_AREAS.find(a => a.label === activeArea)
              const Icon = area.icon
              return (
                <>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: area.bg }}>
                    <Icon size={20} style={{ color: area.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{area.label}</p>
                    <p className="text-sm text-gray-500">{area.desc}</p>
                  </div>
                </>
              )
            })()}
          </div>
        )}
      </section>

      {/* Featured campaigns */}
      <section id="campaigns" className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900">Impact Campaigns</h2>
            <p className="text-gray-400 text-sm mt-1">{impactCampaigns.length} active campaigns building a better Ghana</p>
          </div>
          <Link to="/explore?cat=community" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#0B4D2B] hover:underline">
            All community <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {impactCampaigns.map((c, i) => (
            <CampaignCard key={c.id} campaign={c} delay={i * 70} />
          ))}
        </div>
      </section>

      {/* Featured organisations */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900">Leading Impact Organisations</h2>
              <p className="text-gray-500 text-sm mt-1">Verified NGOs and foundations driving change</p>
            </div>
            <Link to="/charity" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#0B4D2B] hover:underline">
              Register NGO <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FEATURED_ORGS.map((org) => (
              <div key={org.name} className="bg-[#F9F6EF] rounded-2xl p-6 border border-gray-100 hover:border-[#0B4D2B]/20 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#0B4D2B] rounded-xl flex items-center justify-center text-white font-black text-sm">
                    {org.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <span className="badge-verified text-[10px]"><CheckCircle size={10} /> {org.type}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{org.name}</h3>
                <p className="text-xs text-gray-500 mb-4">Focus: {org.focus}</p>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-bold text-[#0B4D2B] text-sm">{formatGHS(org.raised)}</p>
                    <p className="text-[10px] text-gray-400">raised</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{org.campaigns}</p>
                    <p className="text-[10px] text-gray-400">campaigns</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-gradient-to-br from-[#065F46] to-[#0B4D2B] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#F6A800 0,#F6A800 1px,transparent 0,transparent 20%)", backgroundSize:'16px 16px' }} />
          <div className="relative max-w-2xl mx-auto">
            <p className="text-[#F6A800] font-bold text-xs uppercase tracking-widest mb-4">Ready to Drive Change?</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">Start an impact campaign today.</h2>
            <p className="text-green-200 mb-8">Whether you're an individual, community group, or registered NGO — Nkabom Fund gives you the platform to make it happen.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/login" className="inline-flex items-center gap-2 bg-[#F6A800] hover:bg-[#D48E00] text-[#3D2A00] font-black px-8 py-3.5 rounded-xl transition-all">
                Start a Campaign <ArrowRight size={18} />
              </Link>
              <Link to="/charity" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all">
                Register as NGO
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
