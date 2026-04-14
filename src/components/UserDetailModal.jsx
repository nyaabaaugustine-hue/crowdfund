import { useEffect } from 'react'
import { X, Mail, Phone, MapPin, Calendar, Award, TrendingUp, Heart, Globe, Shield, Clock, DollarSign, CheckCircle, Activity } from 'lucide-react'
import { formatGHS } from '../data/seed'

const ROLE_LABELS = {
  user: { label: 'Donor', color: '#0B4D2B', bg: '#EDFAF2' },
  agent: { label: 'Campaign Agent', color: '#7C3AED', bg: '#F5F3FF' },
  company: { label: 'Verified NGO', color: '#065F46', bg: '#ECFDF5' },
  admin: { label: 'Administrator', color: '#1E3A5F', bg: '#EFF6FF' },
}

const VERIFICATION_STATUS = {
  user: ['Email Verified', 'Phone Verified'],
  agent: ['Email Verified', 'Phone Verified', 'ID Submitted', 'Background Check Complete'],
  company: ['Email Verified', 'Business Registered', 'NGO Certification', 'Board Approval', 'Annual Report Submitted'],
  admin: ['Email Verified', 'Internal Clearance'],
}

export default function UserDetailModal({ user, onClose, transactions, campaigns }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const role = ROLE_LABELS[user.role] || ROLE_LABELS.user
  const verifications = VERIFICATION_STATUS[user.role] || []
  const userTransactions = transactions?.filter(t => t.donor === user.name || t.donor === user.email) || []
  const userCampaigns = campaigns?.filter(c => c.creatorId === user.id) || []

  const totalDonated = userTransactions.reduce((sum, t) => sum + t.amount, 0)
  const donationCount = userTransactions.length

  const joinDate = new Date(user.joinedAt)
  const now = new Date()
  const daysSinceJoin = Math.floor((now - joinDate) / (1000 * 60 * 60 * 24))
  const monthsSinceJoin = Math.floor(daysSinceJoin / 30)

  const getActivityLevel = () => {
    if (daysSinceJoin < 30) return { label: 'New User', color: '#10B981' }
    if (donationCount >= 10 || userTransactions.length >= 10) return { label: 'Power User', color: '#F59E0B' }
    if (donationCount >= 3) return { label: 'Active', color: '#0B4D2B' }
    return { label: 'Regular', color: '#6B7280' }
  }

  const activity = getActivityLevel()

  const getTrustScore = () => {
    let score = 50
    if (user.email) score += 15
    if (user.phone) score += 15
    if (verifications.length >= 3) score += 20
    return Math.min(score, 100)
  }

  const trustScore = getTrustScore()

  return (
    <div 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div 
        style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '672px', marginTop: '20px', marginBottom: '20px', padding: '32px 24px 40px', animation: 'fadeUp 0.3s ease-out', position: 'relative' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F0EDE4] flex items-center justify-center hover:bg-[#E5DFD3] transition-colors z-10"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0" style={{ backgroundColor: user.avatarColor }}>
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-display font-bold text-xl text-gray-900">{user.name}</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full capitalize" style={{ backgroundColor: role.bg, color: role.color }}>
                {role.label}
              </span>
            </div>
            <p className="text-sm text-gray-500">{user.id}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Activity size={12} /> {activity.label}
            </div>
          </div>
        </div>

        {/* Trust Score */}
        <div className="bg-gradient-to-r from-[#F9F6EF] to-[#F0EDE4] rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Trust Score</span>
            <span className="text-lg font-bold" style={{ color: trustScore >= 80 ? '#0B4D2B' : trustScore >= 50 ? '#F59E0B' : '#EF4444' }}>
              {trustScore}/100
            </span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${trustScore}%`, backgroundColor: trustScore >= 80 ? '#0B4D2B' : trustScore >= 50 ? '#F59E0B' : '#EF4444' }}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border border-[#F0EDE4] rounded-xl p-3">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <Mail size={12} /> <span className="text-[10px] font-semibold uppercase">Email</span>
            </div>
            <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
          </div>
          <div className="bg-white border border-[#F0EDE4] rounded-xl p-3">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <Phone size={12} /> <span className="text-[10px] font-semibold uppercase">Phone</span>
            </div>
            <p className="text-sm font-medium text-gray-800">{user.phone || 'Not provided'}</p>
          </div>
          <div className="bg-white border border-[#F0EDE4] rounded-xl p-3">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <MapPin size={12} /> <span className="text-[10px] font-semibold uppercase">Location</span>
            </div>
            <p className="text-sm font-medium text-gray-800">{user.location || 'Not specified'}</p>
          </div>
          <div className="bg-white border border-[#F0EDE4] rounded-xl p-3">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <Calendar size={12} /> <span className="text-[10px] font-semibold uppercase">Member Since</span>
            </div>
            <p className="text-sm font-medium text-gray-800">{user.joinedAt}</p>
            <p className="text-[10px] text-gray-400">{monthsSinceJoin} months ({daysSinceJoin} days)</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#EDFAF2] rounded-xl p-4 text-center">
            <Heart size={18} className="mx-auto mb-1 text-[#0B4D2B]" />
            <p className="font-bold text-lg text-[#0B4D2B]">{donationCount}</p>
            <p className="text-[10px] text-gray-500 font-medium">Donations Made</p>
          </div>
          <div className="bg-[#FFF2C2] rounded-xl p-4 text-center">
            <DollarSign size={18} className="mx-auto mb-1 text-[#B45309]" />
            <p className="font-bold text-lg text-[#B45309]">{formatGHS(totalDonated)}</p>
            <p className="text-[10px] text-gray-500 font-medium">Total Given</p>
          </div>
          <div className="bg-[#EFF6FF] rounded-xl p-4 text-center">
            <TrendingUp size={18} className="mx-auto mb-1 text-[#1E3A5F]" />
            <p className="font-bold text-lg text-[#1E3A5F]">{user.totalRaised ? formatGHS(user.totalRaised) : '—'}</p>
            <p className="text-[10px] text-gray-500 font-medium">Funds Raised</p>
          </div>
        </div>

        {/* Role-specific stats */}
        {user.role === 'agent' && (
          <div className="bg-[#F5F3FF] rounded-2xl p-4 mb-6">
            <h4 className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider mb-3 flex items-center gap-1">
              <Shield size={14} /> Agent Performance
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-2xl font-bold text-[#7C3AED]">{user.successRate}%</p>
                <p className="text-xs text-gray-500">Success Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#7C3AED]">{user.totalCommission ? formatGHS(user.totalCommission) : '—'}</p>
                <p className="text-xs text-gray-500">Total Commission</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#7C3AED]">{user.campaignsManaged?.length || 0}</p>
                <p className="text-xs text-gray-500">Campaigns Managed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#7C3AED]">₵{(user.totalCommission / (user.campaignsManaged?.length || 1)).toFixed(0)}</p>
                <p className="text-xs text-gray-500">Avg Commission</p>
              </div>
            </div>
          </div>
        )}

        {user.role === 'company' && (
          <div className="bg-[#ECFDF5] rounded-2xl p-4 mb-6">
            <h4 className="text-xs font-bold text-[#065F46] uppercase tracking-wider mb-3 flex items-center gap-1">
              <Award size={14} /> Organization Details
            </h4>
            <p className="text-sm text-gray-700 mb-3">{user.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-2xl font-bold text-[#065F46]">{user.donorCount?.toLocaleString() || 0}</p>
                <p className="text-xs text-gray-500">Total Donors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#065F46]">{user.campaigns?.length || 0}</p>
                <p className="text-xs text-gray-500">Active Campaigns</p>
              </div>
            </div>
          </div>
        )}

        {/* Verification */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
            <CheckCircle size={14} /> Verification Status
          </h4>
          <div className="flex flex-wrap gap-2">
            {verifications.map((v, i) => (
              <span key={i} className="bg-[#EDFAF2] text-[#0B4D2B] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                <CheckCircle size={12} /> {v}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
            <Clock size={14} /> Recent Activity
          </h4>
          {userTransactions.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {userTransactions.slice(0, 5).map((t, i) => (
                <div key={i} className="bg-white border border-[#F0EDE4] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EDFAF2] flex items-center justify-center">
                      <Heart size={14} className="text-[#0B4D2B]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{campaigns?.find(c => c.id === t.campaignId)?.title?.slice(0, 30) || 'Campaign'}...</p>
                      <p className="text-[10px] text-gray-400">{t.date} · {t.method}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#0B4D2B]">{formatGHS(t.amount)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 bg-white border border-[#F0EDE4] rounded-xl p-4 text-center">No transaction history yet</p>
          )}
        </div>

        {/* Campaigns */}
        {userCampaigns.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
              <Globe size={14} /> Campaigns Created
            </h4>
            <div className="space-y-2">
              {userCampaigns.slice(0, 3).map(c => (
                <div key={c.id} className="bg-white border border-[#F0EDE4] rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{c.title?.slice(0, 35)}...</p>
                    <p className="text-[10px] text-gray-400">{c.category} · {c.status}</p>
                  </div>
                  <span className="font-bold text-[#0B4D2B] text-sm">{formatGHS(c.raised)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
