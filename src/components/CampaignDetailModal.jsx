import { useEffect } from 'react'
import { X, MapPin, Clock, Users, CheckCircle, Flag, TrendingUp, Calendar, Heart, Eye, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatGHS, getProgressPercent, getCategoryStyle } from '../data/seed'

export default function CampaignDetailModal({ campaign, onClose, transactions }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const pct = getProgressPercent(campaign.raised, campaign.target)
  const cat = getCategoryStyle(campaign.category)
  const campaignTransactions = transactions?.filter(t => t.campaignId === campaign.id) || []
  const totalFees = Math.round(campaign.raised * 0.03)
  const netAmount = campaign.raised - totalFees

  return (
    <div 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '16px', overflowY: 'auto', scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div 
        style={{ background: 'white', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: '672px', padding: '32px 24px 40px', animation: 'slideDown 0.3s ease-out', position: 'relative', marginTop: 'auto' }}
        className="sm:!rounded-3xl sm:!mt-8 sm:!mb-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F0EDE4] flex items-center justify-center hover:bg-[#E5DFD3] transition-colors z-10"
        >
          <X size={16} />
        </button>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden bg-[#F0EDE4] mb-4 aspect-video">
          <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="cat-pill text-white text-xs" style={{ backgroundColor: cat.color }}>
              {cat.emoji} {cat.label}
            </span>
            {campaign.verified && (
              <span className="badge-verified">
                <CheckCircle size={11} /> Verified
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <span className={`${campaign.status === 'approved' ? 'badge-verified' : campaign.status === 'pending' ? 'badge-pending' : campaign.status === 'flagged' ? 'badge-trust' : 'badge-rejected'}`}>
              {campaign.status}
            </span>
          </div>
        </div>

        {/* Title & Meta */}
        <h2 className="font-display font-bold text-xl text-gray-900 mb-2 leading-tight">{campaign.title}</h2>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-1.5"><MapPin size={14} />{campaign.location}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} />{campaign.daysLeft} days left</span>
          <span className="flex items-center gap-1.5"><Users size={14} />{campaign.donorCount} donors</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} />{campaign.createdAt}</span>
        </div>

        {/* Progress */}
        <div className="bg-[#F9F6EF] rounded-2xl p-4 mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-display font-bold text-2xl text-[#0B4D2B]">{formatGHS(campaign.raised)}</span>
            <span className="text-sm text-gray-400">of {formatGHS(campaign.target)}</span>
          </div>
          <div className="h-3 bg-[#E5DFD3] rounded-full overflow-hidden mb-2">
            <div className="progress-fill h-full" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{pct}% funded</span>
            <span>{getProgressPercent(campaign.raised, campaign.target)}% complete</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#EDFAF2] rounded-xl p-3 text-center">
            <p className="font-bold text-lg text-[#0B4D2B]">{campaign.donorCount}</p>
            <p className="text-[10px] text-gray-500">Donors</p>
          </div>
          <div className="bg-[#FFF2C2] rounded-xl p-3 text-center">
            <p className="font-bold text-lg text-[#B45309]">{formatGHS(campaign.raised / campaign.donorCount || 0)}</p>
            <p className="text-[10px] text-gray-500">Avg Donation</p>
          </div>
          <div className="bg-[#EFF6FF] rounded-xl p-3 text-center">
            <p className="font-bold text-lg text-[#1E3A5F]">{pct}%</p>
            <p className="text-[10px] text-gray-500">Progress</p>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="bg-white border border-[#F0EDE4] rounded-2xl p-4 mb-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
            <TrendingUp size={14} /> Financial Summary
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Raised</span>
              <span className="font-bold text-[#0B4D2B]">{formatGHS(campaign.raised)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Platform Fee (3%)</span>
              <span className="text-gray-600">-{formatGHS(totalFees)}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-[#E5DFD3] pt-2">
              <span className="font-bold text-gray-700">Net to Creator</span>
              <span className="font-bold text-lg text-[#1E3A5F]">{formatGHS(netAmount)}</span>
            </div>
          </div>
        </div>

        {/* Beneficiary */}
        <div className="bg-[#F5F3FF] rounded-2xl p-4 mb-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Beneficiary</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white font-bold">
              {campaign.beneficiary?.charAt(0) || '?'}
            </div>
            <div>
              <p className="font-bold text-gray-800">{campaign.beneficiary || 'Campaign Creator'}</p>
              <p className="text-xs text-gray-500">{campaign.location}</p>
            </div>
          </div>
        </div>

        {/* Story Preview */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Story Preview</h4>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{campaign.story}</p>
        </div>

        {/* Recent Donors */}
        {campaign.donors?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
              <Heart size={14} /> Recent Donors ({campaign.donors.length})
            </h4>
            <div className="space-y-2">
              {campaign.donors.slice(0, 5).map((d, i) => (
                <div key={i} className="bg-white border border-[#F0EDE4] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EDFAF2] flex items-center justify-center text-xs font-bold text-[#0B4D2B]">
                      {d.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{d.name}</p>
                      <p className="text-[10px] text-gray-400">{d.date}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#0B4D2B]">{formatGHS(d.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Updates */}
        {campaign.updates?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
              <Calendar size={14} /> Campaign Updates ({campaign.updates.length})
            </h4>
            <div className="space-y-2">
              {campaign.updates.map((u, i) => (
                <div key={i} className="bg-white border border-[#F0EDE4] rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#0B4D2B]" />
                    <span className="text-[10px] font-semibold text-gray-400">{u.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{u.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Link
            to={`/campaign/${campaign.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1E3A5F] text-white font-bold py-3 rounded-2xl hover:bg-[#2D5A8B] transition-colors"
          >
            <Eye size={16} /> View Live
          </Link>
          <button
            onClick={onClose}
            className="flex-1 border-2 border-[#E5DFD3] text-gray-700 font-bold py-3 rounded-2xl hover:bg-[#F0EDE4] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
