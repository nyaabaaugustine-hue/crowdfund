import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Church, UsersRound, Building2, Plus, ArrowUpRight, Search, Users, TrendingUp, CheckCircle, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'

const GROUPS = {
  alumni: [
    { id: 'alumni-1', name: 'Mfantsipim Old Boys Association', type: 'Alumni', location: 'National', members: '2,400+', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400', campaigns: 12, raised: 'GHS 145,000' },
    { id: 'alumni-2', name: 'Presbyterian Boys Secondary School Alumni', type: 'Alumni', location: 'Greater Accra', members: '3,100+', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400', campaigns: 8, raised: 'GHS 89,000' },
    { id: 'alumni-3', name: 'Achimota School Alumni Network', type: 'Alumni', location: 'National', members: '5,200+', image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400', campaigns: 15, raised: 'GHS 210,000' },
    { id: 'alumni-4', name: 'Holy Child Old Girls Association', type: 'Alumni', location: 'Central', members: '1,800+', image: 'https://images.unsplash.com/photo-1529390079861-591f5a8a1f8b?w=400', campaigns: 6, raised: 'GHS 67,000' },
    { id: 'alumni-5', name: "St. Augustine's College Old Boys", type: 'Alumni', location: 'Cape Coast', members: '2,000+', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400', campaigns: 10, raised: 'GHS 120,000' },
    { id: 'alumni-6', name: 'Aburi Girls Secondary School Alumni', type: 'Alumni', location: 'Eastern', members: '1,500+', image: 'https://images.unsplash.com/photo-1577017040065-650ee4d43339?w=400', campaigns: 7, raised: 'GHS 55,000' },
    { id: 'alumni-7', name: 'Opoku Ware School Alumni', type: 'Alumni', location: 'Ashanti', members: '3,800+', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', campaigns: 11, raised: 'GHS 98,000' },
    { id: 'alumni-8', name: 'Wesley Girls High School Alumni', type: 'Alumni', location: 'Central', members: '2,200+', image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400', campaigns: 9, raised: 'GHS 76,000' },
    { id: 'alumni-9', name: 'Prempeh College Old Boys', type: 'Alumni', location: 'Ashanti', members: '4,100+', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400', campaigns: 14, raised: 'GHS 165,000' },
  ],
  churches: [
    { id: 'church-1', name: 'EPC Pentecost Church', type: 'Church', location: 'Accra', members: '8,000+', image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400', campaigns: 24, raised: 'GHS 320,000' },
    { id: 'church-2', name: 'The Church of Pentecost Ghana', type: 'Church', location: 'National', members: '50,000+', image: 'https://images.unsplash.com/photo-1540555016288-9832208c4a56?w=400', campaigns: 45, raised: 'GHS 890,000' },
    { id: 'church-3', name: 'Moses Centre Ministries', type: 'Church', location: 'Kumasi', members: '5,000+', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400', campaigns: 18, raised: 'GHS 180,000' },
    { id: 'church-4', name: "Living Faith Church (Winner's Chapel)", type: 'Church', location: 'National', members: '35,000+', image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400', campaigns: 32, raised: 'GHS 450,000' },
    { id: 'church-5', name: 'Presbyterian Church of Ghana', type: 'Church', location: 'National', members: '75,000+', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400', campaigns: 52, raised: 'GHS 720,000' },
    { id: 'church-6', name: 'Charismatic Evangelicals Fellowship', type: 'Church', location: 'Accra', members: '3,200+', image: 'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=400', campaigns: 14, raised: 'GHS 156,000' },
    { id: 'church-7', name: 'Assemblies of God Ghana', type: 'Church', location: 'National', members: '60,000+', image: 'https://images.unsplash.com/photo-1519834089822-321a4968a5a8?w=400', campaigns: 48, raised: 'GHS 680,000' },
    { id: 'church-8', name: 'Catholic Archdiocese of Accra', type: 'Church', location: 'Greater Accra', members: '40,000+', image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400', campaigns: 35, raised: 'GHS 520,000' },
  ],
  associations: [
    { id: 'assoc-1', name: 'Ghana Medical Association', type: 'Association', location: 'National', members: '4,500+', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400', campaigns: 28, raised: 'GHS 540,000' },
    { id: 'assoc-2', name: 'Ghana Police Officers Union', type: 'Association', location: 'National', members: '25,000+', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400', campaigns: 19, raised: 'GHS 280,000' },
    { id: 'assoc-3', name: 'National Teachers Association', type: 'Association', location: 'National', members: '180,000+', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400', campaigns: 35, raised: 'GHS 620,000' },
    { id: 'assoc-4', name: 'Ghana Journalists Association', type: 'Association', location: 'National', members: '3,800+', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400', campaigns: 11, raised: 'GHS 145,000' },
    { id: 'assoc-5', name: 'Ghana Bar Association', type: 'Association', location: 'National', members: '12,000+', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400', campaigns: 16, raised: 'GHS 390,000' },
    { id: 'assoc-6', name: 'Ghana Nurses Association', type: 'Association', location: 'National', members: '45,000+', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', campaigns: 22, raised: 'GHS 310,000' },
    { id: 'assoc-7', name: 'Ghana Engineers Association', type: 'Association', location: 'National', members: '8,500+', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400', campaigns: 17, raised: 'GHS 245,000' },
    { id: 'assoc-8', name: 'Ghana Pharmacists Association', type: 'Association', location: 'National', members: '6,200+', image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', campaigns: 13, raised: 'GHS 178,000' },
  ]
}

const GROUP_TYPE_CONFIG = {
  alumni: { icon: GraduationCap, color: '#1E3A5F', bg: '#EFF6FF', label: 'School Alumni', description: 'Old school associations raising funds for alma maters and fellow alumni' },
  churches: { icon: Church, color: '#7C3AED', bg: '#F5F3FF', label: 'Church Groups', description: 'Churches and religious organizations supporting communities' },
  associations: { icon: UsersRound, color: '#0B4D2B', bg: '#EDFAF2', label: 'Professional Associations', description: 'Trade unions and professional bodies supporting members' },
}

const STATS = [
  { label: 'Total Groups', value: '150+', icon: Users },
  { label: 'Total Raised', value: 'GHS 8.2M', icon: TrendingUp },
  { label: 'Active Campaigns', value: '320+', icon: CheckCircle },
  { label: 'Members Reached', value: '500K+', icon: Building2 },
]

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filteredGroups = () => {
    let all = []
    if (activeTab === 'all') {
      all = [...GROUPS.alumni, ...GROUPS.churches, ...GROUPS.associations]
    } else {
      all = GROUPS[activeTab] || []
    }
    if (search) {
      all = all.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.location.toLowerCase().includes(search.toLowerCase()))
    }
    return all
  }

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0B4D2B] to-[#1E3A5F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
              <Users size={16} />
              <span className="text-sm font-medium">Strategic Partners</span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">
              Alumni, Churches & Associations
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Communities across Ghana are using Nkabom Fund to raise funds for their members, causes, and shared visions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {STATS.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <Icon size={20} className="mx-auto mb-2 text-[#F6A800]" />
                    <p className="font-bold text-xl">{stat.value}</p>
                    <p className="text-xs text-white/70">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups by name or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#0B4D2B] focus:ring-2 focus:ring-[#0B4D2B]/20 outline-none"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'all' 
                ? 'bg-[#0B4D2B] text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Groups
          </button>
          {Object.entries(GROUP_TYPE_CONFIG).map(([key, config]) => {
            const Icon = config.icon
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === key 
                    ? 'bg-[#0B4D2B] text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon size={18} />
                {config.label}
              </button>
            )
          })}
        </div>

        {/* Description for selected tab */}
        {activeTab !== 'all' && (
          <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-warm">
            <div className="flex items-center gap-4">
              {(() => { const Icon = GROUP_TYPE_CONFIG[activeTab].icon; return <Icon size={32} className="text-[#0B4D2B]" /> })()}
              <div>
                <h3 className="font-bold text-lg text-gray-900">{GROUP_TYPE_CONFIG[activeTab].label}</h3>
                <p className="text-sm text-gray-500">{GROUP_TYPE_CONFIG[activeTab].description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups().map(group => (
            <div 
              key={group.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <ImageWithFallback 
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    {group.type === 'Alumni' && <GraduationCap size={12} />}
                    {group.type === 'Church' && <Church size={12} />}
                    {group.type === 'Association' && <UsersRound size={12} />}
                    {group.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold leading-tight line-clamp-2">{group.name}</h3>
                  <p className="text-white/80 text-xs mt-1 flex items-center gap-1">
                    <Building2 size={12} /> {group.location}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-xl">
                    <p className="font-bold text-gray-900 text-sm">{group.members}</p>
                    <p className="text-[10px] text-gray-500">Members</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-xl">
                    <p className="font-bold text-[#0B4D2B] text-sm">{group.campaigns}</p>
                    <p className="text-[10px] text-gray-500">Campaigns</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-xl">
                    <p className="font-bold text-[#F6A800] text-xs">{group.raised}</p>
                    <p className="text-[10px] text-gray-500">Raised</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#0B4D2B] hover:bg-[#065F46] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
                    View Campaigns <ChevronRight size={14} />
                  </button>
                  <button className="px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Heart size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups().length === 0 && (
          <div className="text-center py-16">
            <Users size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="font-bold text-lg text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#0B4D2B] to-[#1E3A5F] rounded-3xl p-8 sm:p-12 text-center text-white">
          <h2 className="font-display font-bold text-2xl sm:text-3xl mb-4">
            Is your organization raising funds?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            Join hundreds of alumni associations, churches, and professional groups using Nkabom Fund to support their communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/register"
              className="inline-flex items-center gap-2 bg-[#F6A800] hover:bg-[#D48E00] text-[#3D2A00] font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <Plus size={18} /> Register Your Group
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
