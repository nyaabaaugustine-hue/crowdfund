import { Link } from 'react-router-dom'
import { MapPin, Clock, Users, CheckCircle, TrendingUp } from 'lucide-react'
import { getCategoryStyle, formatGHS, getProgressPercent } from '../data/seed'

export default function CampaignCard({ campaign, delay = 0 }) {
  const cat = getCategoryStyle(campaign.category)
  const pct = getProgressPercent(campaign.raised, campaign.target)
  const isUrgent = campaign.daysLeft <= 10

  return (
    <Link
      to={`/campaign/${campaign.id}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md anim-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#F0EDE4]">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className="cat-pill text-white text-[11px]"
            style={{ backgroundColor: cat.color }}
          >
            {cat.emoji} {cat.label}
          </span>
        </div>
        {campaign.featured && (
          <div className="absolute top-3 right-3 bg-[#F6A800] text-[#3D2A00] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <TrendingUp size={10} /> Featured
          </div>
        )}
        {isUrgent && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600/80 to-transparent px-3 py-2">
            <p className="text-white text-xs font-bold">⚡ {campaign.daysLeft} days left</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title + verified */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-gray-900 text-base leading-snug line-clamp-2">
            {campaign.title}
          </h3>
          {campaign.verified && (
            <CheckCircle size={16} className="flex-shrink-0 text-[#0B4D2B] mt-0.5" />
          )}
        </div>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {campaign.shortDesc}
        </p>

        {/* Progress */}
        <div className="mb-3">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#02a95c] transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold text-gray-900">{formatGHS(campaign.raised)} raised</span>
            <span className="text-xs text-gray-400">of {formatGHS(campaign.target)}</span>
          </div>
        </div>

        {/* Recent Donors List */}
        {campaign.donors && campaign.donors.length > 0 && (
          <div className="flex items-center gap-2 mb-4 bg-gray-50/50 p-2 rounded-lg border border-gray-100/50">
            <div className="flex -space-x-2 overflow-hidden">
              {campaign.donors.slice(0, 3).map((d, i) => (
                <div key={i} className="inline-block h-6 w-6 rounded-full bg-white ring-2 ring-gray-50 flex items-center justify-center text-[8px] font-bold text-[#02a95c]">
                  {d.name === 'Anonymous' ? '?' : d.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 font-medium truncate">
              Latest: <span className="text-gray-900 font-bold">{campaign.donors[0].name}</span>
              {campaign.donors.length > 1 && <span className="opacity-70"> +{campaign.donors.length - 1} more</span>}
            </p>
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-[#F9F6EF]">
          <div className="flex items-center gap-1">
            <Users size={12} />
            <span>{campaign.donorCount} donors</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{campaign.location.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{campaign.daysLeft}d left</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
