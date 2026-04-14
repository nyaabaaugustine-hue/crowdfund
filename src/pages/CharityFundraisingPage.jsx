import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2, CheckCircle, BarChart3, Shield, ArrowRight, Globe, Users,
  FileText, CreditCard, HeartHandshake, ChevronDown, Star, Zap, Lock
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FEATURES = [
  {
    icon: Shield,
    title: 'Verified NGO Badge',
    desc: 'Registered organisations receive a gold "Verified NGO" badge on every campaign, increasing donor trust and average donation size by 40%.',
    color: '#0B4D2B',
    bg: '#EDFAF2',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics Dashboard',
    desc: 'Track donor demographics, regional performance, repeat donors, and campaign conversion rates — all in one clean dashboard.',
    color: '#3B82F6',
    bg: '#EFF6FF',
  },
  {
    icon: Zap,
    title: 'Priority Campaign Review',
    desc: 'NGO campaigns jump the review queue. Your campaigns go live in under 4 hours instead of the standard 24-hour window.',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
  {
    icon: CreditCard,
    title: 'Reduced Platform Fees',
    desc: 'Verified NGOs pay only 2% platform fee (vs. 3% standard). On a GHS 100,000 campaign, that saves you GHS 1,000.',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    icon: Globe,
    title: 'Diaspora Donation Links',
    desc: 'Shareable international donation pages with card and PayPal support for Ghanaians abroad to support your cause.',
    color: '#0891B2',
    bg: '#ECFEFF',
  },
  {
    icon: FileText,
    title: 'Automated Donor Receipts',
    desc: 'Every donor automatically receives a PDF tax-ready receipt with your organisation\'s details. No manual admin required.',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
]

const REQUIREMENTS = [
  { item: 'Certificate of Incorporation / Registration', desc: 'From the Registrar General\'s Department' },
  { item: 'Official Bank Account Details', desc: 'Must be in the organisation\'s name' },
  { item: 'Proof of Address', desc: 'Utility bill or lease agreement, not older than 3 months' },
  { item: 'At Least One Verified Director', desc: 'Ghana Card, Passport, or Driver License' },
]

const PRICING = [
  {
    tier: 'Starter NGO',
    price: 'Free',
    sub: 'to register',
    fee: '3% per donation',
    features: ['Verified NGO badge', 'Up to 3 active campaigns', 'Basic analytics', 'Donor receipts', 'MoMo & card payments'],
    cta: 'Register Free',
    highlight: false,
  },
  {
    tier: 'Impact NGO',
    price: 'GHS 200',
    sub: '/ month',
    fee: '2% per donation',
    features: ['Everything in Starter', 'Unlimited campaigns', 'Advanced analytics', 'Priority 4hr review', 'Diaspora donation links', 'Dedicated account manager', 'Custom donor data exports'],
    cta: 'Upgrade to Impact',
    highlight: true,
  },
]

const TESTIMONIAL = {
  quote: "Nkabom Fund's NGO dashboard has transformed how we report to donors and track our impact. The verified badge alone increased our average donation by 35% in the first month.",
  name: 'Abena Osei-Mensah',
  title: 'Executive Director, Northern Education Trust',
  raised: 'GHS 156,000',
  campaigns: 8,
}

export default function CharityFundraisingPage() {
  const [openReq, setOpenReq] = useState(false)

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, #02a95c 0%, transparent 40%), radial-gradient(circle at 85% 30%, #F6A800 0%, transparent 40%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 30C480 60 240 0 0 20L0 60Z" fill="#F9F6EF"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28 lg:pt-24 lg:pb-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-bold mb-8">
                <Building2 size={15} className="text-[#02a95c]" />
                For NGOs & Registered Charities
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[3.25rem] leading-tight mb-6 tracking-tight">
                The fundraising platform<br />
                <span className="text-[#02a95c]">built for impact.</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-10">
                Nkabom Fund gives Ghanaian NGOs, foundations, and registered charities the tools to raise
                more funds, build donor trust, and report impact — all in one platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#register" className="inline-flex items-center gap-2 bg-[#02a95c] hover:bg-[#029350] text-white font-black px-8 py-4 rounded-xl transition-all shadow-lg text-base">
                  Claim Your NGO Profile <ArrowRight size={18} />
                </a>
                <a href="#features" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-base">
                  See Features
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-[#F6A800] fill-current" />)}
                  <span className="text-gray-400 text-sm ml-1">Trusted by 80+ organisations</span>
                </div>
                <blockquote className="text-gray-200 text-lg leading-relaxed mb-5 italic">
                  &ldquo;The verified badge alone increased our average donation by 35% in the first month.&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                  <div className="w-10 h-10 bg-[#02a95c] rounded-full flex items-center justify-center font-black text-white text-sm">AO</div>
                  <div>
                    <p className="font-bold text-white text-sm">Abena Osei-Mensah</p>
                    <p className="text-gray-400 text-xs">Executive Director, Northern Education Trust</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '80+', label: 'Verified NGOs' },
              { value: 'GHS 1.4M+', label: 'Raised by NGOs' },
              { value: '40%', label: 'Avg. Trust Boost' },
              { value: '2%', label: 'NGO Platform Fee' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-black text-2xl sm:text-3xl text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-3">Everything your NGO needs</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Built specifically for registered organisations who need more than a basic crowdfunding page.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: bg }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-3">Simple, transparent pricing</h2>
            <p className="text-gray-500">No hidden fees. No monthly minimums. Pay only when you raise.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRICING.map((plan) => (
              <div key={plan.tier} className={`rounded-3xl p-8 border-2 relative ${plan.highlight ? 'border-[#02a95c] bg-[#EDFAF2]' : 'border-gray-200 bg-white'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#02a95c] text-white text-xs font-black px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display font-bold text-xl text-gray-900 mb-1">{plan.tier}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`font-display font-black text-3xl ${plan.highlight ? 'text-[#0B4D2B]' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.sub}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">{plan.fee}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle size={16} className={plan.highlight ? 'text-[#02a95c]' : 'text-gray-400'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#register" className={`w-full flex items-center justify-center gap-2 font-black py-3.5 rounded-xl transition-all text-sm ${plan.highlight ? 'bg-[#0B4D2B] text-white hover:bg-[#065F46]' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                  {plan.cta} <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-4">Register your NGO</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Claiming your organisation profile takes less than 10 minutes. Our team verifies your documents
              within 2 business days. Once approved, your verified badge goes live immediately.
            </p>

            {/* Requirements accordion */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
              <button
                onClick={() => setOpenReq(!openReq)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-[#0B4D2B]" />
                  <span className="font-bold text-gray-900">Documents Required</span>
                </div>
                <ChevronDown size={18} className={`text-gray-400 transition-transform ${openReq ? 'rotate-180' : ''}`} />
              </button>
              {openReq && (
                <div className="px-6 pb-5 anim-fade-in">
                  <div className="h-px bg-gray-100 mb-4" />
                  <div className="space-y-3">
                    {REQUIREMENTS.map((req) => (
                      <div key={req.item} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-[#02a95c] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{req.item}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{req.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 bg-[#EDFAF2] rounded-2xl p-5 border border-[#9ADDB8]">
              <Lock size={20} className="text-[#0B4D2B] flex-shrink-0" />
              <p className="text-sm text-[#0B4D2B] font-medium">
                Your documents are encrypted and stored securely. They are never shared with third parties.
              </p>
            </div>
          </div>

          {/* Registration form-like card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-warm">
            <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Get started today</h3>
            <p className="text-gray-500 text-sm mb-6">Sign in or create an account, then submit your NGO details.</p>
            <div className="space-y-3 mb-6">
              <input placeholder="Organisation Name" className="gh-input" readOnly />
              <input placeholder="Registration Number" className="gh-input" readOnly />
              <input placeholder="Official Email Address" className="gh-input" readOnly />
              <select className="gh-input" disabled>
                <option>Organisation Type</option>
                <option>NGO</option>
                <option>Foundation</option>
                <option>Registered Charity</option>
              </select>
            </div>
            <Link to="/login" className="w-full flex items-center justify-center gap-2 bg-[#0B4D2B] hover:bg-[#065F46] text-white font-black py-4 rounded-xl transition-all text-base shadow-warm">
              Sign In to Register <ArrowRight size={18} />
            </Link>
            <p className="text-center text-xs text-gray-400 mt-4">
              Free to register · Verified in 2 business days
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-[#F6A800] fill-current" />)}
              </div>
              <blockquote className="font-display font-bold text-2xl sm:text-3xl text-white leading-relaxed mb-6 italic">
                &ldquo;{TESTIMONIAL.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#02a95c] rounded-full flex items-center justify-center font-black text-white text-sm">AO</div>
                <div>
                  <p className="font-bold text-white">{TESTIMONIAL.name}</p>
                  <p className="text-gray-400 text-sm">{TESTIMONIAL.title}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="font-display font-black text-2xl text-[#02a95c]">{TESTIMONIAL.raised}</p>
                <p className="text-gray-400 text-xs mt-1">total raised</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="font-display font-black text-2xl text-[#F6A800]">{TESTIMONIAL.campaigns}</p>
                <p className="text-gray-400 text-xs mt-1">campaigns run</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
