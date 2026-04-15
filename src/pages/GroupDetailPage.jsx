import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Church, UsersRound, Building2, ChevronLeft, Users, Calendar, MapPin, CheckCircle, Heart, TrendingUp, ExternalLink, Mail, Phone, Globe } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampaignCard from '../components/CampaignCard'
import ImageWithFallback from '../components/ImageWithFallback'
import { useData } from '../context/DataContext'

const GROUP_TYPE_CONFIG = {
  alumni: { icon: GraduationCap, color: '#1E3A5F', bg: '#EFF6FF', label: 'School Alumni' },
  churches: { icon: Church, color: '#7C3AED', bg: '#F5F3FF', label: 'Church Group' },
  associations: { icon: UsersRound, color: '#0B4D2B', bg: '#EDFAF2', label: 'Professional Association' },
}

const ALL_GROUPS = {
  'alumni-1': { id: 'alumni-1', name: 'Mfantsipim Old Boys Association', type: 'alumni', location: 'National', members: '2,400+', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', campaigns: 12, raised: 'GHS 145,000', description: 'Supporting the development of Mfantsipim School and its alumni across Ghana. We fund scholarships, infrastructure improvements, and emergency assistance for members in need.', founded: '1995', email: 'mfantsipimoba@gmail.com', website: 'mfantsipimoba.org' },
  'alumni-2': { id: 'alumni-2', name: 'Presbyterian Boys Secondary School Alumni', type: 'alumni', location: 'Greater Accra', members: '3,100+', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', campaigns: 8, raised: 'GHS 89,000', description: 'Uniting Presbyterian Boys Secondary School graduates to give back to our alma mater and support educational initiatives in Ghana.', founded: '1998', email: 'presec.alumni@gmail.com', website: 'presec-alumni.org' },
  'alumni-3': { id: 'alumni-3', name: 'Achimota School Alumni Network', type: 'alumni', location: 'National', members: '5,200+', image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800', campaigns: 15, raised: 'GHS 210,000', description: 'The global network of Achimota School alumni dedicated to advancing education and community development across Ghana.', founded: '1990', email: 'achimotaalumni@gmail.com', website: 'achimotaalumni.org' },
  'alumni-4': { id: 'alumni-4', name: 'Holy Child Old Girls Association', type: 'alumni', location: 'Central', members: '1,800+', image: 'https://images.unsplash.com/photo-1529390079861-591f5a8a1f8b?w=800', campaigns: 6, raised: 'GHS 67,000', description: 'Empowering Holy Child alumnae to support education and women\'s development initiatives.', founded: '2000', email: 'holychildoga@gmail.com', website: 'holychildoga.org' },
  'alumni-5': { id: 'alumni-5', name: "St. Augustine's College Old Boys", type: 'alumni', location: 'Cape Coast', members: '2,000+', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', campaigns: 10, raised: 'GHS 120,000', description: 'Supporting St. Augustine\'s College and its students through scholarships and infrastructure development.', founded: '1992', email: 'auguscooba@gmail.com', website: 'auguscooba.org' },
  'alumni-6': { id: 'alumni-6', name: 'Aburi Girls Secondary School Alumni', type: 'alumni', location: 'Eastern', members: '1,500+', image: 'https://images.unsplash.com/photo-1577017040065-650ee4d43339?w=800', campaigns: 7, raised: 'GHS 55,000', description: 'Supporting the education and empowerment of young women through our alma mater.', founded: '2001', email: 'aburigirlsalumni@gmail.com', website: 'aburigirlsalumni.org' },
  'alumni-7': { id: 'alumni-7', name: 'Opoku Ware School Alumni', type: 'alumni', location: 'Ashanti', members: '3,800+', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', campaigns: 11, raised: 'GHS 98,000', description: 'Uniting Opoku Ware School graduates to support education and community development.', founded: '1996', email: 'owassalumni@gmail.com', website: 'owassalumni.org' },
  'alumni-8': { id: 'alumni-8', name: 'Wesley Girls High School Alumni', type: 'alumni', location: 'Central', members: '2,200+', image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800', campaigns: 9, raised: 'GHS 76,000', description: 'Supporting Wesley Girls High School through scholarships and infrastructure development.', founded: '1999', email: 'wesleygirlsalumni@gmail.com', website: 'wesleygirlsalumni.org' },
  'alumni-9': { id: 'alumni-9', name: 'Prempeh College Old Boys', type: 'alumni', location: 'Ashanti', members: '4,100+', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', campaigns: 14, raised: 'GHS 165,000', description: 'Supporting Prempeh College and its students through various educational initiatives.', founded: '1991', email: 'prempehcollegeoba@gmail.com', website: 'prempehoba.org' },
  'church-1': { id: 'church-1', name: 'EPC Pentecost Church', type: 'churches', location: 'Accra', members: '8,000+', image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800', campaigns: 24, raised: 'GHS 320,000', description: 'EPC Pentecost Church - A vibrant community of faith serving the people of Accra through outreach programs, education support, and community development.', founded: '1985', email: 'info@epcpentecost.org', website: 'epcpentecost.org' },
  'church-2': { id: 'church-2', name: 'The Church of Pentecost Ghana', type: 'churches', location: 'National', members: '50,000+', image: 'https://images.unsplash.com/photo-1540555016288-9832208c4a56?w=800', campaigns: 45, raised: 'GHS 890,000', description: 'The Church of Pentecost Ghana - A nationwide fellowship dedicated to spreading the gospel and supporting communities across Ghana.', founded: '1958', email: 'info@copghana.org', website: 'copghana.org' },
  'church-3': { id: 'church-3', name: 'Moses Centre Ministries', type: 'churches', location: 'Kumasi', members: '5,000+', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', campaigns: 18, raised: 'GHS 180,000', description: 'Moses Centre Ministries - Serving the Kumasi community through charitable works, education support, and spiritual development.', founded: '1998', email: 'mosescentre@gmail.com', website: 'mosescentre.org' },
  'church-4': { id: 'church-4', name: "Living Faith Church (Winner's Chapel)", type: 'churches', location: 'National', members: '35,000+', image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800', campaigns: 32, raised: 'GHS 450,000', description: "Living Faith Church Worldwide - A dynamic church fellowship supporting communities across Ghana through various outreach programs.", founded: '1993', email: 'info@winnerschapelghana.org', website: 'winnerschapelghana.org' },
  'church-5': { id: 'church-5', name: 'Presbyterian Church of Ghana', type: 'churches', location: 'National', members: '75,000+', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', campaigns: 52, raised: 'GHS 720,000', description: 'The Presbyterian Church of Ghana - One of the oldest and largest Christian denominations in Ghana, serving communities nationwide.', founded: '1828', email: 'info@presbychurchgh.org', website: 'presbychurchgh.org' },
  'church-6': { id: 'church-6', name: 'Charismatic Evangelicals Fellowship', type: 'churches', location: 'Accra', members: '3,200+', image: 'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=800', campaigns: 14, raised: 'GHS 156,000', description: 'CEF Ghana - A fellowship of charismatic churches united in spreading the gospel and serving communities.', founded: '1985', email: 'cefghana@gmail.com', website: 'cefghana.org' },
  'church-7': { id: 'church-7', name: 'Assemblies of God Ghana', type: 'churches', location: 'National', members: '60,000+', image: 'https://images.unsplash.com/photo-1519834089822-321a4968a5a8?w=800', campaigns: 48, raised: 'GHS 680,000', description: 'Assemblies of God Ghana - A vibrant Pentecostal church fellowship with presence across all 16 regions of Ghana.', founded: '1936', email: 'info@aogghana.org', website: 'aogghana.org' },
  'church-8': { id: 'church-8', name: 'Catholic Archdiocese of Accra', type: 'churches', location: 'Greater Accra', members: '40,000+', image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800', campaigns: 35, raised: 'GHS 520,000', description: 'Catholic Archdiocese of Accra - Serving the Catholic community through education, healthcare, and social outreach programs.', founded: '1950', email: 'info@catholicaccra.org', website: 'catholicaccra.org' },
  'assoc-1': { id: 'assoc-1', name: 'Ghana Medical Association', type: 'associations', location: 'National', members: '4,500+', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800', campaigns: 28, raised: 'GHS 540,000', description: 'Supporting healthcare professionals and medical causes across Ghana through fundraising and advocacy.', founded: '1957', email: 'ghana.medical.assoc@gmail.com', website: 'gma-gh.org' },
  'assoc-2': { id: 'assoc-2', name: 'Ghana Police Officers Union', type: 'associations', location: 'National', members: '25,000+', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800', campaigns: 19, raised: 'GHS 280,000', description: 'Supporting police officers and their families through welfare programs and emergency assistance.', founded: '1960', email: 'gpou.ghana@gmail.com', website: 'gpou.org' },
  'assoc-3': { id: 'assoc-3', name: 'National Teachers Association', type: 'associations', location: 'National', members: '180,000+', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', campaigns: 35, raised: 'GHS 620,000', description: 'Supporting teachers and education across Ghana through scholarships, training, and welfare programs.', founded: '1962', email: 'nta.ghana@gmail.com', website: 'ntaghana.org' },
  'assoc-4': { id: 'assoc-4', name: 'Ghana Journalists Association', type: 'associations', location: 'National', members: '3,800+', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800', campaigns: 11, raised: 'GHS 145,000', description: 'Supporting media professionals and press freedom in Ghana through advocacy and welfare programs.', founded: '1949', email: 'gja.ghana@gmail.com', website: 'gja.org.gh' },
  'assoc-5': { id: 'assoc-5', name: 'Ghana Bar Association', type: 'associations', location: 'National', members: '12,000+', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', campaigns: 16, raised: 'GHS 390,000', description: 'Supporting legal professionals and access to justice across Ghana.', founded: '1951', email: 'ghanabar@gmail.com', website: 'ghanabar.org' },
  'assoc-6': { id: 'assoc-6', name: 'Ghana Nurses Association', type: 'associations', location: 'National', members: '45,000+', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800', campaigns: 22, raised: 'GHS 310,000', description: 'Supporting nurses and healthcare workers across Ghana through training and welfare programs.', founded: '1965', email: 'ghananurses@gmail.com', website: 'gna-ghana.org' },
  'assoc-7': { id: 'assoc-7', name: 'Ghana Engineers Association', type: 'associations', location: 'National', members: '8,500+', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800', campaigns: 17, raised: 'GHS 245,000', description: 'Supporting engineering professionals and infrastructure development across Ghana.', founded: '1955', email: 'engineers.ghana@gmail.com', website: 'giec-gh.org' },
  'assoc-8': { id: 'assoc-8', name: 'Ghana Pharmacists Association', type: 'associations', location: 'National', members: '6,200+', image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800', campaigns: 13, raised: 'GHS 178,000', description: 'Supporting pharmacists and healthcare delivery across Ghana.', founded: '1968', email: 'pharmacists.ghana@gmail.com', website: 'gpha.org.gh' },
}

export default function GroupDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { campaigns } = useData()
  const [activeTab, setActiveTab] = useState('campaigns')
  
  const group = ALL_GROUPS[id]
  
  if (!group) {
    return (
      <div className="min-h-screen bg-[#F9F6EF] flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h2 className="font-display font-bold text-2xl text-gray-800 mb-2">Group not found</h2>
          <Link to="/groups" className="text-[#0B4D2B] font-semibold hover:underline">Back to Groups</Link>
        </div>
      </div>
    )
  }

  const typeConfig = GROUP_TYPE_CONFIG[group.type] || GROUP_TYPE_CONFIG.alumni
  const TypeIcon = typeConfig.icon
  const groupCampaigns = campaigns.filter(c => c.creatorId === `creator-${id}` || c.category === group.type).slice(0, 6)

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <ImageWithFallback 
          src={group.image} 
          alt={group.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back button */}
        <button 
          onClick={() => navigate('/groups')}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={18} /> Back to Groups
        </button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: typeConfig.color, color: 'white' }}
              >
                <TypeIcon size={12} />
                {typeConfig.label}
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-4xl text-white mb-2">{group.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1"><MapPin size={14} /> {group.location}</span>
              <span className="flex items-center gap-1"><Users size={14} /> {group.members} members</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> Founded {group.founded}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 p-1 bg-white rounded-xl w-fit">
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'campaigns' ? 'bg-[#0B4D2B] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Campaigns ({group.campaigns})
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'about' ? 'bg-[#0B4D2B] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                About
              </button>
            </div>

            {/* Campaigns Tab */}
            {activeTab === 'campaigns' && (
              <div className="space-y-4">
                {groupCampaigns.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {groupCampaigns.map(c => (
                      <CampaignCard key={c.id} campaign={c} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                    <p className="text-gray-500 mb-4">No active campaigns yet</p>
                    <Link to="/start" className="inline-flex items-center gap-2 bg-[#0B4D2B] text-white font-semibold px-5 py-2.5 rounded-xl">
                      Start a Campaign
                    </Link>
                  </div>
                )}
                <div className="text-center pt-4">
                  <Link to="/explore" className="text-[#0B4D2B] font-semibold hover:underline inline-flex items-center gap-1">
                    View all campaigns <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-display font-bold text-xl text-gray-900 mb-4">About {group.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{group.description}</p>
                
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-bold text-gray-900 mb-4">Mission & Values</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: Heart, label: 'Community Support', desc: 'Supporting members and communities' },
                      { icon: GraduationCap, label: 'Education', desc: 'Investing in the next generation' },
                      { icon: TrendingUp, label: 'Development', desc: 'Driving positive change' },
                      { icon: CheckCircle, label: 'Transparency', desc: 'Accountable to our members' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 rounded-xl bg-[#EDFAF2] flex items-center justify-center flex-shrink-0">
                          <item.icon size={18} className="text-[#0B4D2B]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Impact Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#EDFAF2] rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-[#0B4D2B]" />
                    <span className="text-sm font-medium text-gray-700">Members</span>
                  </div>
                  <span className="font-bold text-[#0B4D2B]">{group.members}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#FFF2C2] rounded-xl">
                  <div className="flex items-center gap-3">
                    <TrendingUp size={20} className="text-[#B45309]" />
                    <span className="text-sm font-medium text-gray-700">Total Raised</span>
                  </div>
                  <span className="font-bold text-[#B45309]">{group.raised}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#EFF6FF] rounded-xl">
                  <div className="flex items-center gap-3">
                    <Heart size={20} className="text-[#1E3A5F]" />
                    <span className="text-sm font-medium text-gray-700">Campaigns</span>
                  </div>
                  <span className="font-bold text-[#1E3A5F]">{group.campaigns}</span>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                {group.email && (
                  <a href={`mailto:${group.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0B4D2B] transition-colors">
                    <Mail size={16} className="text-gray-400" />
                    {group.email}
                  </a>
                )}
                {group.website && (
                  <a href={`https://${group.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0B4D2B] transition-colors">
                    <Globe size={16} className="text-gray-400" />
                    {group.website}
                  </a>
                )}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#0B4D2B] to-[#1E3A5F] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Support This Group</h3>
              <p className="text-white/80 text-sm mb-4">Help {group.name.split(' ')[0]} achieve their mission.</p>
              <Link to="/explore" className="block w-full bg-[#F6A800] hover:bg-[#D48E00] text-[#3D2A00] font-bold py-3 rounded-xl text-center transition-colors">
                Browse Campaigns
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
