import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TrendingUp, Users, DollarSign, PlusCircle, CheckCircle, Clock, Award, Menu, X } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CampaignCard from '../../components/CampaignCard'
import DashboardSidebar from '../../components/DashboardSidebar'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { formatGHS, getProgressPercent } from '../../data/seed'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const MONTHLY = [
  { month:'Oct', raised:12400, comm:620 },
  { month:'Nov', raised:18900, comm:945 },
  { month:'Dec', raised:22100, comm:1105 },
  { month:'Jan', raised:31500, comm:1575 },
  { month:'Feb', raised:28700, comm:1435 },
]

export default function AgentDashboard() {
  const { user, logout } = useAuth()
  const { campaigns, createCampaign } = useData()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [createData, setCreateData] = useState({ title:'', shortDesc:'', category:'medical', target:'', location:'', story:'', beneficiary:'' })

  const myCampaigns = campaigns.filter(c => c.creatorId === 'agent-001')
  const totalRaised = myCampaigns.reduce((s,c) => s+c.raised, 0)
  const commission = Math.round(totalRaised * 0.05)

  const handleCreate = () => {
    if (!createData.title || !createData.target) return
    createCampaign({ ...createData, target:Number(createData.target), image:'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085806/breast_tumyjm.jpg', creatorId:'agent-001' })
    setShowCreate(false)
    setCreateData({ title:'', shortDesc:'', category:'medical', target:'', location:'', story:'', beneficiary:'' })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#F9F6EF] flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 bg-[#7C3AED] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#6D28D9] transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Sidebar */}
        <DashboardSidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4C1D95] to-[#7C3AED] rounded-3xl p-6 sm:p-8 text-white mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage:'radial-gradient(circle at 80% 50%,rgba(255,255,255,0.3) 0%,transparent 60%)' }} />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-display font-bold text-xl">
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-purple-200 text-xs font-semibold uppercase tracking-wider">Certified Platform Agent</p>
                  <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-bold">Lvl 2 Verified</span>
                </div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl">{user.name}</h1>
                <p className="text-purple-100 text-sm mt-1">{user.location} · Partner since {user.joinedAt}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 text-yellow-300 mb-1">
                  <Award size={18} />
                  <span className="text-xl font-bold text-white">{user.successRate}%</span>
                </div>
                <p className="text-[10px] text-purple-200 uppercase font-bold">Success Rate</p>
              </div>
            </div>
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
              <div><p className="text-xl font-bold">{myCampaigns.length}</p><p className="text-xs text-purple-200">Campaigns</p></div>
              <div><p className="text-xl font-bold">{formatGHS(totalRaised)}</p><p className="text-xs text-purple-200">Total Raised</p></div>
              <div><p className="text-xl font-bold">{formatGHS(commission)}</p><p className="text-xs text-purple-200">Commission (5%)</p></div>
              <div><p className="text-xl font-bold">{myCampaigns.filter(c=>c.status==='approved').length}</p><p className="text-xs text-purple-200">Active</p></div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 bg-white rounded-2xl p-1 border border-[#F0EDE4] mb-6 shadow-warm">
            {[['overview','Overview'],['campaigns','Campaigns'],['earnings','Earnings']].map(([id,label]) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab===id ? 'bg-[#7C3AED] text-white' : 'text-gray-500 hover:bg-[#F0EDE4]'}`}
              >{label}</button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 anim-fade-in">
              <div className="bg-white rounded-2xl p-6 border border-[#F0EDE4] shadow-warm">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display font-bold text-lg text-gray-900">Monthly Performance</h2>
                  <span className="badge-trust text-xs">Last 5 months</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={MONTHLY} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE4" />
                    <XAxis dataKey="month" tick={{ fontSize:12, fill:'#9CA3AF' }} />
                    <YAxis tick={{ fontSize:12, fill:'#9CA3AF' }} tickFormatter={v => `₵${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v, n) => [formatGHS(v), n==='raised'?'Raised':'Commission']} />
                    <Bar dataKey="raised" fill="#7C3AED" radius={[6,6,0,0]} />
                    <Bar dataKey="comm" fill="#F6A800" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl border border-[#F0EDE4] shadow-warm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F0EDE4] flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg text-gray-900">Campaign Performance</h2>
                  <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-[#7C3AED] text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-[#6D28D9] transition-colors">
                    <PlusCircle size={14} /> New Campaign
                  </button>
                </div>
                <table className="w-full gh-table">
                  <thead><tr><th>Campaign</th><th>Status</th><th>Raised</th><th>% Goal</th><th>Commission</th></tr></thead>
                  <tbody>
                    {myCampaigns.map(c => (
                      <tr key={c.id}>
                        <td><Link to={`/campaign/${c.id}`} className="font-medium text-gray-800 hover:text-[#7C3AED] hover:underline max-w-[200px] block truncate">{c.title}</Link></td>
                        <td>
                          <span className={c.status==='approved' ? 'badge-verified' : c.status==='pending' ? 'badge-pending' : 'badge-rejected'}>
                            {c.status}
                          </span>
                        </td>
                        <td className="font-bold text-[#0B4D2B]">{formatGHS(c.raised)}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[#F0EDE4] rounded-full overflow-hidden">
                              <div className="h-full bg-[#7C3AED] rounded-full" style={{ width:`${getProgressPercent(c.raised,c.target)}%` }} />
                            </div>
                            <span className="text-xs text-gray-500">{getProgressPercent(c.raised,c.target)}%</span>
                          </div>
                        </td>
                        <td className="font-semibold text-[#F6A800]">{formatGHS(Math.round(c.raised*0.05))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Campaigns tab */}
          {activeTab === 'campaigns' && (
            <div className="anim-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-xl text-gray-900">Managed Campaigns ({myCampaigns.length})</h2>
                <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-[#7C3AED] text-white font-bold px-4 py-2.5 rounded-xl text-sm">
                  <PlusCircle size={15} /> New
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {myCampaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
              </div>
            </div>
          )}

          {/* earnings tab */}
          {activeTab === 'earnings' && (
            <div className="anim-fade-in space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { label:'Total Earnings', value: formatGHS(commission), icon: DollarSign, color:'#7C3AED' },
                  { label:'Pending Payout', value: formatGHS(Math.round(commission * 0.3)), icon: Clock, color:'#F59E0B' },
                  { label:'Paid Out', value: formatGHS(Math.round(commission * 0.7)), icon: CheckCircle, color:'#0B4D2B' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="stat-card flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor:`${color}15` }}>
                      <Icon size={22} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-2xl text-gray-900">{value}</p>
                      <p className="text-xs text-gray-400">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#F0EDE4] shadow-warm">
                <h3 className="font-display font-bold text-lg text-gray-900 mb-4">Earnings Breakdown</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={MONTHLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE4" />
                    <XAxis dataKey="month" tick={{ fontSize:12, fill:'#9CA3AF' }} />
                    <YAxis tick={{ fontSize:12, fill:'#9CA3AF' }} tickFormatter={v => `₵${v}`} />
                    <Tooltip formatter={v => [formatGHS(v), 'Commission']} />
                    <Bar dataKey="comm" fill="#F6A800" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay">
          <div className="modal-box max-w-lg" style={{ borderRadius:'24px', alignSelf:'center' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-2xl text-gray-900">Create Campaign for Client</h2>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              <input className="gh-input" placeholder="Campaign title" value={createData.title} onChange={e=>setCreateData({...createData,title:e.target.value})} />
              <input className="gh-input" placeholder="Beneficiary name" value={createData.beneficiary} onChange={e=>setCreateData({...createData,beneficiary:e.target.value})} />
              <input className="gh-input" placeholder="Short description" value={createData.shortDesc} onChange={e=>setCreateData({...createData,shortDesc:e.target.value})} />
              <select className="gh-input" value={createData.category} onChange={e=>setCreateData({...createData,category:e.target.value})}>
                {['medical','funeral','education','business','emergency','community'].map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
              </select>
              <input className="gh-input" placeholder="Target (₵)" type="number" value={createData.target} onChange={e=>setCreateData({...createData,target:e.target.value})} />
              <input className="gh-input" placeholder="Location" value={createData.location} onChange={e=>setCreateData({...createData,location:e.target.value})} />
              <textarea className="gh-input" rows={3} placeholder="Campaign story..." value={createData.story} onChange={e=>setCreateData({...createData,story:e.target.value})} />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setShowCreate(false)} className="flex-1 border-2 border-[#E5DFD3] text-gray-700 font-bold py-3 rounded-2xl">Cancel</button>
              <button onClick={handleCreate} className="flex-1 bg-[#7C3AED] text-white font-bold py-3 rounded-2xl hover:bg-[#6D28D9] transition-colors">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
