import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin, Clock, Users, CheckCircle, Share2, Heart, ChevronLeft,
  Sparkles, MessageCircle, Calendar, TrendingUp, AlertTriangle
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DonationModal from '../components/DonationModal'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { formatGHS, getProgressPercent, getCategoryStyle } from '../data/seed'

export default function CampaignDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCampaignById, improveStory } = useData()
  const { user } = useAuth()
  const campaign = getCampaignById(id)

  const [donateOpen, setDonateOpen] = useState(false)
  const [tab, setTab] = useState('story') // story | donors | updates
  const [improving, setImproving] = useState(false)
  const [improved, setImproved] = useState(false)
  const [shareMsg, setShareMsg] = useState(false)

  if (!campaign) return (
    <div className="min-h-screen bg-[#F9F6EF] flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl mb-4">😕</p>
        <h2 className="font-display font-bold text-2xl text-gray-800 mb-2">Campaign not found</h2>
        <Link to="/explore" className="text-[#0B4D2B] font-semibold hover:underline">Back to Explore</Link>
      </div>
    </div>
  )

  const pct = getProgressPercent(campaign.raised, campaign.target)
  const cat = getCategoryStyle(campaign.category)

  const handleImprove = () => {
    setImproving(true)
    setTimeout(() => {
      const ok = improveStory(campaign.id)
      setImproving(false)
      if (ok) setImproved(true)
    }, 2200)
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
    setShareMsg(true)
    setTimeout(() => setShareMsg(false), 2500)
  }

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0B4D2B] transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: main content */}
        <div className="lg:col-span-2">
          {/* Hero image */}
          <div className="relative rounded-3xl overflow-hidden bg-[#F0EDE4] mb-6 aspect-video">
            <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="cat-pill text-white text-xs" style={{ backgroundColor: cat.color }}>
                {cat.emoji} {cat.label}
              </span>
              {campaign.verified && (
                <span className="badge-verified">
                  <CheckCircle size={11} /> Verified
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-2 leading-tight">
            {campaign.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1.5"><MapPin size={14} />{campaign.location}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{campaign.daysLeft} days left</span>
            <span className="flex items-center gap-1.5"><Users size={14} />{campaign.donorCount} donors</span>
            {campaign.status === 'approved' && (
              <span className="flex items-center gap-1.5 text-[#0B4D2B] font-semibold">
                <TrendingUp size={14} /> Active
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b border-[#F0EDE4] mb-6">
            {['story','donors','updates'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 text-sm font-semibold capitalize border-b-2 transition-colors ${
                  tab === t ? 'border-[#0B4D2B] text-[#0B4D2B]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {t} {t === 'donors' ? `(${campaign.donors.length})` : ''} {t === 'updates' ? `(${campaign.updates.length})` : ''}
              </button>
            ))}
          </div>

          {/* Story tab */}
          {tab === 'story' && (
            <div className="anim-fade-in">
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                {campaign.story}
              </div>

              {/* AI improve button */}
              {user && !improved && (
                <div className="bg-gradient-to-r from-[#EDFAF2] to-[#FFF2C2] rounded-2xl p-5 border border-[#D0F0DF] flex items-start gap-4">
                  <Sparkles size={22} className="text-[#0B4D2B] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm mb-1">✨ AI Story Improvement</h4>
                    <p className="text-xs text-gray-500 mb-3">
                      Let our AI rewrite your campaign story to be more compelling and emotional — proven to increase donations.
                    </p>
                    <button
                      onClick={handleImprove}
                      disabled={improving}
                      className="flex items-center gap-2 bg-[#0B4D2B] hover:bg-[#0F6035] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                    >
                      {improving ? (
                        <><span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" /> Improving story...</>
                      ) : (
                        <><Sparkles size={13} /> Improve My Story</>
                      )}
                    </button>
                  </div>
                </div>
              )}
              {improved && (
                <div className="bg-[#EDFAF2] rounded-2xl p-4 border border-[#9ADDB8] flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#0B4D2B]" />
                  <p className="text-sm text-[#0B4D2B] font-semibold">Story improved by AI! Donors can now see the enhanced version.</p>
                </div>
              )}
            </div>
          )}

          {/* Donors tab */}
          {tab === 'donors' && (
            <div className="anim-fade-in space-y-3">
              {campaign.donors.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Heart size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Be the first to donate!</p>
                </div>
              )}
              {campaign.donors.map((d, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-[#F0EDE4]">
                  <div className="w-9 h-9 rounded-xl bg-[#EDFAF2] flex items-center justify-center text-sm font-bold text-[#0B4D2B] flex-shrink-0">
                    {d.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-bold text-gray-800">{d.name}</span>
                      <span className="text-sm font-bold text-[#0B4D2B]">{formatGHS(d.amount)}</span>
                    </div>
                    <p className="text-xs text-gray-400">{d.date}</p>
                    {d.message && <p className="text-sm text-gray-600 mt-1.5 italic">"{d.message}"</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Updates tab */}
          {tab === 'updates' && (
            <div className="anim-fade-in space-y-4">
              {campaign.updates.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Calendar size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No updates yet</p>
                </div>
              )}
              {campaign.updates.map((u, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-[#F0EDE4]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#0B4D2B]" />
                    <span className="text-xs font-semibold text-gray-400">{u.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{u.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: donation sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Progress card */}
            <div className="bg-white rounded-3xl p-6 border border-[#F0EDE4] shadow-warm">
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display font-bold text-3xl text-[#0B4D2B]">{formatGHS(campaign.raised)}</span>
                </div>
                <p className="text-sm text-gray-400">raised of <span className="font-semibold text-gray-700">{formatGHS(campaign.target)}</span> goal</p>
              </div>

              <div className="h-3 bg-[#F0EDE4] rounded-full overflow-hidden mb-4">
                <div className="progress-fill h-full" style={{ width: `${pct}%` }} />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                <div>
                  <p className="font-bold text-lg text-gray-800">{pct}%</p>
                  <p className="text-xs text-gray-400">funded</p>
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-800">{campaign.donorCount}</p>
                  <p className="text-xs text-gray-400">donors</p>
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-800">{campaign.daysLeft}</p>
                  <p className="text-xs text-gray-400">days left</p>
                </div>
              </div>

              <button
                onClick={() => setDonateOpen(true)}
                className="w-full bg-[#F6A800] hover:bg-[#D48E00] text-[#3D2A00] font-bold py-4 rounded-2xl transition-colors text-base shadow-gold mb-3"
              >
                ❤️ Donate Now
              </button>

              <button
                onClick={handleShare}
                className="w-full border-2 border-[#0B4D2B] text-[#0B4D2B] hover:bg-[#EDFAF2] font-bold py-3 rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Share2 size={16} />
                {shareMsg ? 'Link Copied!' : 'Share Campaign'}
              </button>
            </div>

            {/* Creator info */}
            <div className="bg-white rounded-2xl p-5 border border-[#F0EDE4] shadow-warm">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Campaign Organiser</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDFAF2] flex items-center justify-center text-sm font-bold text-[#0B4D2B]">
                  {campaign.beneficiary?.charAt(0) || '?'}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">{campaign.beneficiary || 'Campaign Creator'}</p>
                  <p className="text-xs text-gray-400">{campaign.location}</p>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="bg-[#EDFAF2] rounded-2xl p-5 border border-[#D0F0DF]">
              <h4 className="text-xs font-bold text-[#0B4D2B] uppercase tracking-wider mb-3">Why Trust This Campaign</h4>
              <ul className="space-y-2">
                {[
                  campaign.verified ? '✅ Identity verified by Nkabom Fund' : '🔄 Identity verification pending',
                  '🔒 Funds held securely until disbursement',
                  '📊 Full donor & transaction reports',
                  '📱 Mobile Money disbursement',
                ].map((item, i) => (
                  <li key={i} className="text-xs text-gray-700">{item}</li>
                ))}
              </ul>
            </div>

            {campaign.status === 'pending' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-yellow-700 mb-0.5">Awaiting Approval</p>
                  <p className="text-xs text-yellow-600">This campaign is under review. Donations will be enabled once approved.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      {donateOpen && (
        <DonationModal campaign={campaign} onClose={() => setDonateOpen(false)} />
      )}
    </div>
  )
}
