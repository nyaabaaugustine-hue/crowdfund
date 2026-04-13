import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Users, Target, Award, PlusCircle, Globe, BarChart2, CheckCircle } from 'lucide-react'
import Navbar from '../../components/Navbar'
import CampaignCard from '../../components/CampaignCard'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { formatGHS, getProgressPercent } from '../../data/seed'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts'

const DONOR_TREND = [
  { month:'Aug', donors:89 },{ month:'Sep', donors:134 },{ month:'Oct', donors:201 },
  { month:'Nov', donors:276 },{ month:'Dec', donors:398 },{ month:'Jan', donors:512 },{ month:'Feb', donors:634 },
]

export default function CompanyDashboard() {
  const { user } = useAuth()
  const { campaigns, createCampaign, transactions } = useData()
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreate, setShowCreate] = useState(false)
  const [createData, setCreateData] = useState({ title:'', shortDesc:'', category:'community', target:'', location:'', story:'' })

  const myCampaigns = campaigns.filter(c => c.creatorId === 'company-001')
  const totalRaised = myCampaigns.reduce((s,c)=>s+c.raised, 0)
  const totalDonors = myCampaigns.reduce((s,c)=>s+c.donorCount, 0)

  const handleCreate = () => {
    if (!createData.title || !createData.target) return
    createCampaign({ ...createData, target:Number(createData.target), image:'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', creatorId:'company-001', verified:true })
    setShowCreate(false)
    setCreateData({ title:'', shortDesc:'', category:'community', target:'', location:'', story:'' })
  }

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#065F46] to-[#0B4D2B] rounded-3xl p-6 sm:p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(255,255,255,0.1) 20px,rgba(255,255,255,0.1) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(255,255,255,0.1) 20px,rgba(255,255,255,0.1) 21px)" }} />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#F6A800] flex items-center justify-center font-display font-bold text-2xl text-[#065F46]">
              {user.avatar}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <p className="text-green-300 text-xs font-bold uppercase tracking-widest">Registered Organisation</p>
                <span className="bg-[#F6A800] text-[#3D2A00] text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow-sm"><CheckCircle size={10} /> VERIFIED NGO</span>
              </div>
              <h1 className="font-display font-bold text-3xl mb-1">{user.name}</h1>
              <p className="text-green-200 text-sm">{user.description}</p>
            </div>
            <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-[#F6A800] text-[#3D2A00] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#D48E00] transition-colors">
              <PlusCircle size={16} /> New Campaign
            </button>
          </div>
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
            <div><p className="text-xl font-bold">{formatGHS(totalRaised)}</p><p className="text-xs text-green-300">Total Raised</p></div>
            <div><p className="text-xl font-bold">{totalDonors.toLocaleString()}</p><p className="text-xs text-green-300">Total Donors</p></div>
            <div><p className="text-xl font-bold">{myCampaigns.length}</p><p className="text-xs text-green-300">Campaigns</p></div>
            <div><p className="text-xl font-bold">{myCampaigns.filter(c=>c.status==='approved').length}</p><p className="text-xs text-green-300">Active</p></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 border border-[#F0EDE4] mb-6 shadow-warm">
          {[['overview','Overview'],['campaigns','Campaigns'],['analytics','Analytics'],['donors','Donors']].map(([id,label]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab===id ? 'bg-[#0B4D2B] text-white' : 'text-gray-500 hover:bg-[#F0EDE4]'}`}
            >{label}</button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 anim-fade-in">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label:'Funds Disbursed', value:formatGHS(Math.round(totalRaised*0.78)), color:'#0B4D2B', icon:Target },
                { label:'Avg Donation', value:formatGHS(Math.round(totalRaised/Math.max(totalDonors,1))), color:'#F59E0B', icon:TrendingUp },
                { label:'Lives Impacted', value:'2,840+', color:'#7C3AED', icon:Users },
                { label:'Global Donors', value:'14 countries', color:'#065F46', icon:Globe },
              ].map(({ label, value, color, icon:Icon }) => (
                <div key={label} className="stat-card">
                  <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ backgroundColor:`${color}15` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p className="font-display font-bold text-xl text-gray-900">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Donor trend */}
            <div className="bg-white rounded-2xl p-6 border border-[#F0EDE4] shadow-warm">
              <h2 className="font-display font-bold text-lg text-gray-900 mb-5">Donor Growth</h2>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={DONOR_TREND}>
                  <defs>
                    <linearGradient id="dGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0B4D2B" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#0B4D2B" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE4" />
                  <XAxis dataKey="month" tick={{ fontSize:12, fill:'#9CA3AF' }} />
                  <YAxis tick={{ fontSize:12, fill:'#9CA3AF' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="donors" stroke="#0B4D2B" fill="url(#dGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Campaigns */}
            <div>
              <h2 className="font-display font-bold text-lg text-gray-900 mb-4">Our Campaigns</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {myCampaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
              </div>
            </div>
          </div>
        )}

        {/* Campaigns tab */}
        {activeTab === 'campaigns' && (
          <div className="anim-fade-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-xl text-gray-900">Campaigns ({myCampaigns.length})</h2>
              <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-[#0B4D2B] text-white font-bold px-4 py-2.5 rounded-xl text-sm">
                <PlusCircle size={15} /> New Campaign
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-[#F0EDE4] shadow-warm overflow-x-auto">
              <table className="w-full gh-table">
                <thead><tr><th>Campaign</th><th>Status</th><th>Raised</th><th>Target</th><th>%</th><th>Donors</th><th>Days Left</th></tr></thead>
                <tbody>
                  {myCampaigns.map(c => (
                    <tr key={c.id}>
                      <td><Link to={`/campaign/${c.id}`} className="font-medium text-gray-800 hover:text-[#0B4D2B] hover:underline max-w-[180px] block truncate">{c.title}</Link></td>
                      <td><span className={c.status==='approved'?'badge-verified':c.status==='pending'?'badge-pending':'badge-rejected'}>{c.status}</span></td>
                      <td className="font-bold text-[#0B4D2B]">{formatGHS(c.raised)}</td>
                      <td className="text-gray-500">{formatGHS(c.target)}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <div className="w-12 h-1.5 bg-[#F0EDE4] rounded-full"><div className="h-full bg-[#0B4D2B] rounded-full" style={{ width:`${getProgressPercent(c.raised,c.target)}%` }} /></div>
                          <span className="text-xs text-gray-500">{getProgressPercent(c.raised,c.target)}%</span>
                        </div>
                      </td>
                      <td className="text-gray-600">{c.donorCount}</td>
                      <td className="text-gray-500">{c.daysLeft}d</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics tab */}
        {activeTab === 'analytics' && (
          <div className="anim-fade-in space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-6 border border-[#F0EDE4] shadow-warm">
                <h3 className="font-bold text-gray-800 mb-4">Donor Growth</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={DONOR_TREND}>
                    <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0B4D2B" stopOpacity={0.2}/><stop offset="100%" stopColor="#0B4D2B" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE4" />
                    <XAxis dataKey="month" tick={{ fontSize:11, fill:'#9CA3AF' }} />
                    <YAxis tick={{ fontSize:11, fill:'#9CA3AF' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="donors" stroke="#0B4D2B" fill="url(#ag)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#F0EDE4] shadow-warm">
                <h3 className="font-bold text-gray-800 mb-3">Campaign Performance</h3>
                <div className="space-y-3">
                  {myCampaigns.map(c => (
                    <div key={c.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 truncate max-w-[60%]">{c.title.slice(0,30)}...</span>
                        <span className="font-bold text-[#0B4D2B]">{getProgressPercent(c.raised,c.target)}%</span>
                      </div>
                      <div className="h-2 bg-[#F0EDE4] rounded-full overflow-hidden">
                        <div className="progress-fill h-full" style={{ width:`${getProgressPercent(c.raised,c.target)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#F0EDE4] shadow-warm">
              <h3 className="font-bold text-gray-800 mb-3">Top Donor Regions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[['Greater Accra','42%'],['Ashanti','21%'],['Diaspora (UK/US)','18%'],['Other','19%']].map(([r,p]) => (
                  <div key={r} className="bg-[#F9F6EF] rounded-xl p-4 text-center">
                    <p className="font-display font-bold text-2xl text-[#0B4D2B]">{p}</p>
                    <p className="text-xs text-gray-500 mt-1">{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Donors tab */}
        {activeTab === 'donors' && (
          <div className="anim-fade-in">
            <h2 className="font-display font-bold text-xl text-gray-900 mb-5">Donor Activity</h2>
            <div className="bg-white rounded-2xl border border-[#F0EDE4] shadow-warm overflow-hidden">
              <table className="w-full gh-table">
                <thead><tr><th>Donor</th><th>Campaign</th><th>Amount</th><th>Method</th><th>Date</th></tr></thead>
                <tbody>
                  {myCampaigns.flatMap(c => c.donors.slice(0,3).map(d => ({ ...d, campaignTitle:c.title }))).map((d,i) => (
                    <tr key={i}>
                      <td className="font-medium text-gray-800">{d.name}</td>
                      <td className="text-gray-500 max-w-[160px] truncate">{d.campaignTitle}</td>
                      <td className="font-bold text-[#0B4D2B]">{formatGHS(d.amount)}</td>
                      <td><span className="badge-trust text-[11px]">MoMo / Card</span></td>
                      <td className="text-gray-400">{d.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay">
          <div className="modal-box max-w-lg" style={{ borderRadius:'24px', alignSelf:'center' }}>
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-5">Create Organisation Campaign</h2>
            <div className="space-y-3">
              <input className="gh-input" placeholder="Campaign title" value={createData.title} onChange={e=>setCreateData({...createData,title:e.target.value})} />
              <input className="gh-input" placeholder="Short description" value={createData.shortDesc} onChange={e=>setCreateData({...createData,shortDesc:e.target.value})} />
              <select className="gh-input" value={createData.category} onChange={e=>setCreateData({...createData,category:e.target.value})}>
                {['community','medical','education','emergency'].map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
              </select>
              <input className="gh-input" placeholder="Fundraising target (₵)" type="number" value={createData.target} onChange={e=>setCreateData({...createData,target:e.target.value})} />
              <input className="gh-input" placeholder="Location" value={createData.location} onChange={e=>setCreateData({...createData,location:e.target.value})} />
              <textarea className="gh-input" rows={4} placeholder="Campaign story..." value={createData.story} onChange={e=>setCreateData({...createData,story:e.target.value})} />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setShowCreate(false)} className="flex-1 border-2 border-[#E5DFD3] text-gray-700 font-bold py-3 rounded-2xl">Cancel</button>
              <button onClick={handleCreate} className="flex-1 bg-[#0B4D2B] text-white font-bold py-3 rounded-2xl hover:bg-[#0F6035] transition-colors">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
