import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Target, PlusCircle, CheckCircle, Menu, X } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CampaignCard from '../../components/CampaignCard'
import DonationModal from '../../components/DonationModal'
import DashboardSidebar from '../../components/DashboardSidebar'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { formatGHS } from '../../data/seed'

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const { campaigns, transactions, stats, createCampaign } = useData()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [donateTarget, setDonateTarget] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [createData, setCreateData] = useState({ title:'', shortDesc:'', category:'medical', target:'', location:'', story:'' })

  const myCampaigns = campaigns.filter(c => c.creatorId === 'user-001')
  const myDonations = transactions.slice(0, 8)

  const handleCreate = () => {
    if (!createData.title || !createData.target) return
    createCampaign({ ...createData, target: Number(createData.target), image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776083653/cvb_touqa8.jpg', creatorId: 'user-001' })
    setShowCreate(false)
    setCreateData({ title:'', shortDesc:'', category:'medical', target:'', location:'', story:'' })
    setActiveTab('campaigns')
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
          className="fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 bg-[#02a95c] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#029350] transition-colors"
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 mb-8">
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden absolute top-0 right-0 p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Menu size={20} className="text-gray-500" />
              </button>
              <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-[#02a95c] flex items-center justify-center text-[#02a95c] font-display font-bold text-2xl">
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-display font-bold text-2xl sm:text-3xl">{user.name}</h1>
                  <span className="bg-[#02a95c15] text-[#02a95c] text-[10px] px-2 py-0.5 rounded-full font-black uppercase">Verified User</span>
                </div>
                <p className="text-gray-500 text-sm font-medium">{user.location} · Member since {user.joinedAt}</p>
              </div>
              <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 bg-[#02a95c] text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#029350] transition-all shadow-sm"
              >
                <PlusCircle size={16} /> New Campaign
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-100">
              <div><p className="text-2xl font-black text-gray-900">{formatGHS(user.totalRaised || 8500)}</p><p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Raised</p></div>
              <div><p className="text-2xl font-black text-gray-900">{formatGHS(user.totalDonated || 1420)}</p><p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Donated</p></div>
              <div><p className="text-2xl font-black text-gray-900">{myCampaigns.length}</p><p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Campaigns</p></div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 bg-white rounded-2xl p-1 border border-[#F0EDE4] mb-6 shadow-warm">
            {[['overview','Overview'],['campaigns','My Campaigns'],['donations','Donations']].map(([id,label]) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab===id ? 'bg-[#0B4D2B] text-white' : 'text-gray-500 hover:bg-[#F0EDE4]'}`}
              >{label}</button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 anim-fade-in">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-lg text-gray-900">My Campaigns</h2>
                  <button onClick={() => setActiveTab('campaigns')} className="text-sm text-[#0B4D2B] font-semibold hover:underline">View all</button>
                </div>
                {myCampaigns.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-[#F0EDE4]">
                    <Target size={32} className="mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500 text-sm mb-3">You haven't created any campaigns yet</p>
                    <button onClick={() => setShowCreate(true)} className="text-sm font-bold text-[#0B4D2B] hover:underline">Start your first campaign →</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {myCampaigns.slice(0,3).map(c => <CampaignCard key={c.id} campaign={c} />)}
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-display font-bold text-lg text-gray-900 mb-4">Recent Donations</h2>
                <div className="bg-white rounded-2xl border border-[#F0EDE4] shadow-warm overflow-hidden">
                  <table className="w-full gh-table">
                    <thead><tr><th>Campaign</th><th>Amount</th><th>Method</th><th>Date</th></tr></thead>
                    <tbody>
                      {myDonations.slice(0,5).map(t => (
                        <tr key={t.id}>
                          <td className="font-medium text-gray-800 max-w-[180px] truncate">{campaigns.find(c=>c.id===t.campaignId)?.title || '—'}</td>
                          <td className="font-bold text-[#0B4D2B]">{formatGHS(t.amount)}</td>
                          <td><span className="badge-trust">{t.method}</span></td>
                          <td className="text-gray-400">{t.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* My Campaigns tab */}
          {activeTab === 'campaigns' && (
            <div className="anim-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-xl text-gray-900">My Campaigns ({myCampaigns.length})</h2>
                <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-[#0B4D2B] text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-[#0F6035] transition-colors">
                  <PlusCircle size={15} /> New Campaign
                </button>
              </div>
              {myCampaigns.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#F0EDE4]">
                  <Target size={40} className="mx-auto mb-4 text-gray-200" />
                  <h3 className="font-display font-bold text-xl text-gray-700 mb-2">No campaigns yet</h3>
                  <p className="text-gray-400 text-sm mb-5">Create your first campaign to start raising funds</p>
                  <button onClick={() => setShowCreate(true)} className="bg-[#0B4D2B] text-white font-bold px-6 py-3 rounded-xl text-sm">Start Campaign</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {myCampaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
                </div>
              )}
            </div>
          )}

          {/* Donations tab */}
          {activeTab === 'donations' && (
            <div className="anim-fade-in">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-5">Donation History</h2>
              <div className="bg-white rounded-2xl border border-[#F0EDE4] shadow-warm overflow-hidden">
                <table className="w-full gh-table">
                  <thead><tr><th>Campaign</th><th>Donor</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {myDonations.map(t => (
                      <tr key={t.id}>
                        <td className="font-medium text-gray-800 max-w-[160px]">
                          <Link to={`/campaign/${t.campaignId}`} className="hover:text-[#0B4D2B] hover:underline truncate block">{campaigns.find(c=>c.id===t.campaignId)?.title.slice(0,30)+'...' || '—'}</Link>
                        </td>
                        <td className="text-gray-600">{t.donor}</td>
                        <td className="font-bold text-[#0B4D2B]">{formatGHS(t.amount)}</td>
                        <td><span className="badge-trust">{t.method}</span></td>
                        <td><span className="badge-verified"><CheckCircle size={10} /> {t.status}</span></td>
                        <td className="text-gray-400">{t.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="modal-overlay">
          <div className="modal-box max-w-lg" style={{ borderRadius: '24px', alignSelf:'center' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-2xl text-gray-900">Create Campaign</h2>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              <input className="gh-input" placeholder="Campaign title" value={createData.title} onChange={e => setCreateData({...createData, title:e.target.value})} />
              <input className="gh-input" placeholder="Short description" value={createData.shortDesc} onChange={e => setCreateData({...createData, shortDesc:e.target.value})} />
              <select className="gh-input" value={createData.category} onChange={e => setCreateData({...createData, category:e.target.value})}>
                {['medical','funeral','education','business','emergency','community'].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
              </select>
              <input className="gh-input" placeholder="Target amount (₵)" type="number" value={createData.target} onChange={e => setCreateData({...createData, target:e.target.value})} />
              <input className="gh-input" placeholder="Location" value={createData.location} onChange={e => setCreateData({...createData, location:e.target.value})} />
              <textarea className="gh-input" rows={4} placeholder="Tell your story..." value={createData.story} onChange={e => setCreateData({...createData, story:e.target.value})} />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowCreate(false)} className="flex-1 border-2 border-[#E5DFD3] text-gray-700 font-bold py-3 rounded-2xl hover:bg-[#F0EDE4] transition-colors">Cancel</button>
              <button onClick={handleCreate} className="flex-1 bg-[#0B4D2B] text-white font-bold py-3 rounded-2xl hover:bg-[#0F6035] transition-colors">Submit Campaign</button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">Campaign will be reviewed and approved by the admin team.</p>
          </div>
        </div>
      )}
    </div>
  )
}
