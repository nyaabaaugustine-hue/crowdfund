import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin, Clock, Users, CheckCircle, Share2, Heart, ChevronLeft,
  Sparkles, Calendar, TrendingUp, AlertTriangle, Link2, Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DonationModal from '../components/DonationModal'
import ImageWithFallback from '../components/ImageWithFallback'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { formatGHS, getProgressPercent, getCategoryStyle } from '../data/seed'

const LOGO_URL = 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png'

export default function CampaignDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCampaignById, improveStory } = useData()
  const { user } = useAuth()
  const campaign = getCampaignById(id)

  const [donateOpen, setDonateOpen] = useState(false)
  const [tab, setTab] = useState('story')
  const [improving, setImproving] = useState(false)
  const [improved, setImproved] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

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
  const campaignUrl = typeof window !== 'undefined' ? `${window.location.origin}/campaign/${campaign.id}` : ''
  const shareTitle = `Support "${campaign.title}" on Nkabom Fund`
  const shareText = `Help raise funds for ${campaign.title}. Every donation makes a difference!`

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}&quote=${encodeURIComponent(shareTitle)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(campaignUrl)}&text=${encodeURIComponent(shareTitle + ' - ' + shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + '\n\n' + campaignUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(campaignUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(campaignUrl)}&text=${encodeURIComponent(shareTitle)}`,
  }

  const handleShare = (platform) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(campaignUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400')
    }
  }

  const handleImprove = () => {
    setImproving(true)
    setTimeout(() => {
      const ok = improveStory(campaign.id)
      setImproving(false)
      if (ok) setImproved(true)
    }, 2200)
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
          <div className="relative rounded-3xl overflow-hidden mb-6 aspect-video">
            <ImageWithFallback 
              src={campaign.image} 
              alt={campaign.title} 
              className="w-full h-full object-cover"
              style={{ minHeight: '300px' }}
            />
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
                onClick={() => setShowShareModal(true)}
                className="w-full border-2 border-[#0B4D2B] text-[#0B4D2B] hover:bg-[#EDFAF2] font-bold py-3 rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Share2 size={16} />
                {linkCopied ? 'Link Copied!' : 'Share Campaign'}
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

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="font-bold text-gray-900">Share this Campaign</h3>
                <p className="text-xs text-gray-500">Help raise awareness!</p>
              </div>
            </div>
            
            {/* Campaign Preview */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
              <img src={campaign.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{campaign.title}</p>
                <p className="text-xs text-[#0B4D2B] font-bold">{formatGHS(campaign.raised)} raised</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { icon: Facebook, label: 'Facebook', color: '#1877F2', platform: 'facebook' },
                { icon: Twitter, label: 'X', color: '#000', platform: 'twitter' },
                { icon: Linkedin, label: 'LinkedIn', color: '#0A66C2', platform: 'linkedin' },
                { icon: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>, label: 'WhatsApp', color: '#25D366', platform: 'whatsapp' },
              ].map((social, i) => (
                <button 
                  key={i} 
                  onClick={() => handleShare(social.platform)} 
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all"
                >
                  <social.icon size={22} style={{ color: social.color }} />
                  <span className="text-[10px] text-gray-600 font-medium">{social.label}</span>
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={campaignUrl} 
                className="flex-1 px-3 py-2.5 rounded-xl border border-[#E5DFD3] text-xs bg-gray-50" 
              />
              <button 
                onClick={() => handleShare('copy')} 
                className="px-4 py-2.5 bg-[#0B4D2B] text-white rounded-xl text-xs font-medium hover:bg-[#065F46] transition-colors"
              >
                {linkCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <button 
              onClick={() => setShowShareModal(false)} 
              className="w-full mt-3 py-2 text-gray-500 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
