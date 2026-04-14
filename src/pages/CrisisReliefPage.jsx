import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, AlertCircle, Clock, TrendingUp, Users, ArrowRight, CheckCircle, Zap, HeartHandshake, Phone } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampaignCard from '../components/CampaignCard'
import DonationModal from '../components/DonationModal'
import { useData } from '../context/DataContext'
import { formatGHS } from '../data/seed'

const TRUST_MARKS = [
  { icon: ShieldCheck, label: 'ID-Verified Campaigns', desc: 'Every campaign organiser is identity-checked before going live' },
  { icon: Clock, label: '24-Hour Disbursement', desc: 'Approved emergency funds transferred within one business day' },
  { icon: Zap, label: 'Direct to MoMo', desc: "Funds arrive directly to the beneficiary's Mobile Money wallet" },
  { icon: HeartHandshake, label: 'NGO-Partnered', desc: 'Major relief campaigns run in partnership with verified NGOs' },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Browse verified campaigns', desc: 'Every relief campaign has passed our verification team review.' },
  { num: '02', title: 'Choose your amount', desc: 'Any amount helps. Suggested options: ₵50 · ₵100 · ₵200 · ₵500.' },
  { num: '03', title: 'Pay via MoMo or card', desc: 'MTN MoMo, Telecel Cash, AirtelTigo Money, Visa or Mastercard.' },
  { num: '04', title: 'Funds reach the cause', desc: 'Your donation is disbursed directly. You get a confirmation receipt.' },
]

export default function CrisisReliefPage() {
  const { campaigns } = useData()
  const [donateTarget, setDonateTarget] = useState(null)
  const [ticker, setTicker] = useState(0)

  const crisisCampaigns = campaigns.filter(c =>
    (c.category === 'emergency' || c.category === 'medical') && c.status === 'approved'
  )

  const totalRaised = crisisCampaigns.reduce((s, c) => s + c.raised, 0)
  const totalDonors = crisisCampaigns.reduce((s, c) => s + c.donorCount, 0)

  // Simulate a live ticker
  useEffect(() => {
    const names = ['Kwame A.', 'Abena S.', 'Kofi P.', 'Ama B.', 'Anonymous', 'Yaw D.', 'Efua H.', 'Nana J.']
    const amounts = [50, 100, 200, 300, 500]
    const interval = setInterval(() => setTicker(t => t + 1), 5000)
    return () => clearInterval(interval)
  }, [])

  const tickerNames = ['Kwame A.', 'Abena S.', 'Kofi P.', 'Ama B.', 'Anonymous', 'Yaw D.', 'Efua H.', 'Nana J.']
  const tickerAmounts = [50, 100, 200, 300, 500]
  const tickerCamp = crisisCampaigns[ticker % Math.max(crisisCampaigns.length, 1)]
  const tickerName = tickerNames[ticker % tickerNames.length]
  const tickerAmt = tickerAmounts[ticker % tickerAmounts.length]

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Live donation ticker */}
      {tickerCamp && (
        <div className="bg-[#0B4D2B] text-white text-xs font-semibold py-2 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3">
            <span className="flex-shrink-0 flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6A800] animate-pulse" />
              Live
            </span>
            <span className="truncate">
              <span className="text-[#F6A800] font-bold">{tickerName}</span> just donated{' '}
              <span className="text-[#F6A800] font-bold">{formatGHS(tickerAmt)}</span> to &ldquo;{tickerCamp.title.slice(0, 40)}...&rdquo;
            </span>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#7F1D1D] via-[#991B1B] to-[#B91C1C] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 0% 0%, white 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, rgba(255,200,100,0.5) 0%, transparent 50%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-bold mb-8">
              <AlertCircle size={15} className="text-red-300" />
              Crisis & Emergency Relief
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight">
              Every second counts.<br />
              <span className="text-red-300">Donate to verified</span><br />
              crisis relief.
            </h1>
            <p className="text-red-100 text-lg leading-relaxed max-w-xl mb-10">
              When disaster strikes — floods, medical emergencies, fires — Nkabom Fund mobilises fast.
              Your donation reaches verified beneficiaries within 24 hours via Mobile Money.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#campaigns" className="inline-flex items-center gap-2 bg-white text-[#991B1B] font-black px-8 py-4 rounded-xl hover:bg-red-50 transition-all shadow-lg text-base">
                See Urgent Campaigns <ArrowRight size={18} />
              </a>
              <Link to="/explore" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-base">
                All Campaigns
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-3 gap-6">
            <div>
              <p className="font-display font-black text-2xl sm:text-3xl">{formatGHS(totalRaised)}</p>
              <p className="text-red-200 text-xs sm:text-sm mt-0.5">raised for crisis relief</p>
            </div>
            <div>
              <p className="font-display font-black text-2xl sm:text-3xl">{totalDonors.toLocaleString()}</p>
              <p className="text-red-200 text-xs sm:text-sm mt-0.5">donors contributed</p>
            </div>
            <div>
              <p className="font-display font-black text-2xl sm:text-3xl">&lt;24h</p>
              <p className="text-red-200 text-xs sm:text-sm mt-0.5">avg. disbursement time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust marks */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_MARKS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Campaigns */}
      <section id="campaigns" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-600 text-xs font-bold uppercase tracking-widest">Urgent — Verified</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900">Active Crisis Campaigns</h2>
          </div>
          <Link to="/explore?cat=emergency" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#991B1B] hover:underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {crisisCampaigns.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <CheckCircle size={40} className="mx-auto mb-4 text-green-400" />
            <h3 className="font-bold text-gray-700 text-lg mb-2">No active crises right now</h3>
            <p className="text-gray-400 text-sm">Check back later or browse all campaigns.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {crisisCampaigns.map((c, i) => (
              <CampaignCard key={c.id} campaign={c} delay={i * 60} />
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-3">How Crisis Donations Work</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Fast, transparent, and direct. Your money moves in minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="absolute top-5 left-[calc(50%+20px)] right-[-50%] h-px bg-gray-200 hidden lg:block" />
                )}
                <div className="bg-[#F9F6EF] rounded-2xl p-6 text-center relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#991B1B] text-white font-black text-sm flex items-center justify-center mx-auto mb-4">{step.num}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency contact banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-gradient-to-r from-[#7F1D1D] to-[#991B1B] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Phone size={28} className="text-red-200" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl mb-1">Got an Emergency?</h3>
              <p className="text-red-200 text-sm">Our team helps you set up a verified campaign in under 30 minutes.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/login" className="inline-flex items-center gap-2 bg-white text-[#991B1B] font-black px-6 py-3 rounded-xl hover:bg-red-50 transition-all text-sm whitespace-nowrap">
              Start Campaign Now <ArrowRight size={16} />
            </Link>
            <a href="tel:+233302910001" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-all text-sm">
              Call Support
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {donateTarget && (
        <DonationModal campaign={donateTarget} onClose={() => setDonateTarget(null)} />
      )}
    </div>
  )
}
