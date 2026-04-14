import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, CheckCircle, XCircle, Flag, Users, TrendingUp, Eye, DollarSign, AlertTriangle, Search, Menu, X, UserCircle } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import DashboardSidebar from '../../components/DashboardSidebar'
import UserDetailModal from '../../components/UserDetailModal'
import CampaignDetailModal from '../../components/CampaignDetailModal'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { formatGHS, getProgressPercent, USERS, MONTHLY_DATA, CATEGORIES, PLATFORM_STATS } from '../../data/seed'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { campaigns, transactions, stats, approveCampaign, rejectCampaign, flagCampaign, resetData } = useData()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('campaigns')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [payoutCamp, setPayoutCamp] = useState(null)
  const [payoutDone, setPayoutDone] = useState(new Set())
  const [actionMsg, setActionMsg] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const doAction = (fn, id, msg) => {
    fn(id)
    setActionMsg(msg)
    setTimeout(() => setActionMsg(''), 2800)
  }

  const filteredCamps = campaigns.filter(c => {
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const simulatePayout = (campId) => {
    setPayoutDone(prev => new Set([...prev, campId]))
    setPayoutCamp(null)
    setActionMsg('✅ Payout simulated successfully! Funds transferred via bank transfer.')
    setTimeout(() => setActionMsg(''), 3500)
  }

  const categoryStats = useMemo(() => {
    const totals = campaigns.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + c.raised;
      return acc;
    }, {});
    const totalAmount = Object.values(totals).reduce((a, b) => a + b, 0);

    return CATEGORIES.map(cat => {
      const amount = totals[cat.id] || 0;
      const pctValue = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0;
      return { name: cat.label, pct: `${pctValue}%`, color: cat.color };
    }).sort((a, b) => parseInt(b.pct) - parseInt(a.pct));
  }, [campaigns]);

  const paymentStats = useMemo(() => {
    const totals = transactions.reduce((acc, t) => {
      const method = t.method === 'Card' ? 'Card (Visa/MC)' : t.method;
      acc[method] = (acc[method] || 0) + t.amount;
      return acc;
    }, {});
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const config = [
      { name: 'MTN MoMo', color: '#FFC107' },
      { name: 'Card (Visa/MC)', color: '#1E3A5F' },
      { name: 'Telecel Cash', color: '#E60000' },
      { name: 'AirtelTigo Money', color: '#FF6600' },
      { name: 'Bank Transfer', color: '#0B4D2B' }
    ];
    return config.map(m => {
      const amount = totals[m.name] || 0;
      const pctValue = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0;
      return { ...m, pct: `${pctValue}%` };
    }).sort((a, b) => parseInt(b.pct) - parseInt(a.pct));
  }, [transactions]);

  const statusCounts = {
    all: campaigns.length,
    approved: campaigns.filter(c=>c.status==='approved').length,
    pending: campaigns.filter(c=>c.status==='pending').length,
    rejected: campaigns.filter(c=>c.status==='rejected').length,
    flagged: campaigns.filter(c=>c.status==='flagged').length,
  }

  const getCreatorName = (id) => {
    const u = USERS.find(u => u.id === id);
    return u ? u.name : 'Unknown';
  };

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#F9F6EF] flex flex-col">
      <Navbar />

      {/* Action toast */}
      {actionMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 anim-fade-up">
          <div className="bg-[#1E3A5F] text-white px-6 py-3 rounded-2xl shadow-warm-lg text-sm font-medium">{actionMsg}</div>
        </div>
      )}

      <div className="flex flex-1">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 bg-[#1E3A5F] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#2D5A8B] transition-colors"
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
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8B] rounded-3xl p-6 sm:p-8 text-white mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage:"repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0,rgba(255,255,255,0.5) 1px,transparent 0,transparent 50%)", backgroundSize:'18px 18px' }} />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Shield size={26} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Platform Administration</p>
                <h1 className="font-display font-bold text-2xl">Admin Control Center</h1>
                <p className="text-blue-200 text-sm">Logged in as {user.name}</p>
              </div>
              <button 
                onClick={resetData}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                🔄 Sync & Reset Platform Data
              </button>
            </div>
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
              <div><p className="text-xl font-bold">{formatGHS(stats.totalRaised)}</p><p className="text-xs text-blue-200">Total Raised</p></div>
              <div><p className="text-xl font-bold">{stats.activeCampaigns}</p><p className="text-xs text-blue-200">Active Campaigns</p></div>
              <div><p className="text-xl font-bold">{stats.pendingCampaigns}</p><p className="text-xs text-blue-200">Pending Review</p></div>
              <div><p className="text-xl font-bold">{stats.totalDonors.toLocaleString()}</p><p className="text-xs text-blue-200">Total Donors</p></div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 bg-white rounded-2xl p-1 border border-[#F0EDE4] mb-6 shadow-warm flex-wrap">
            {[['campaigns','Campaigns'],['users','Users'],['transactions','Transactions'],['analytics','Analytics'],['payouts','Payouts']].map(([id,label]) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${activeTab===id ? 'bg-[#1E3A5F] text-white' : 'text-gray-500 hover:bg-[#F0EDE4]'}`}
              >{label}</button>
            ))}
          </div>

          {/* CAMPAIGNS TAB */}
          {activeTab === 'campaigns' && (
            <div className="anim-fade-in space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2 overflow-x-auto">
                  {(['all','approved','pending','rejected','flagged']).map(s => (
                    <button key={s} onClick={() => setStatusFilter(s)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${statusFilter===s ? 'bg-[#1E3A5F] text-white' : 'bg-white border border-[#E5DFD3] text-gray-600'}`}
                      >
                      {s.charAt(0).toUpperCase()+s.slice(1)}
                      <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] ${statusFilter===s ? 'bg-white/20' : 'bg-[#F0EDE4]'}`}>{statusCounts[s]}</span>
                    </button>
                  ))}
                </div>
                <div className="relative flex-1 sm:max-w-xs">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="gh-input pl-9 text-xs py-2.5" placeholder="Search campaigns..." value={search} onChange={e=>setSearch(e.target.value)} />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#F0EDE4] shadow-warm overflow-x-auto">
                <table className="w-full gh-table min-w-[700px]">
                  <thead><tr><th>Campaign</th><th>Creator</th><th>Category</th><th>Raised</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredCamps.map(c => (
                      <tr key={c.id}>
                        <td>
                          <button 
                            onClick={() => setSelectedCampaign(c)}
                            className="font-medium text-gray-800 hover:text-[#1E3A5F] hover:underline max-w-[180px] block truncate text-left"
                          >
                            {c.title}
                          </button>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5"><span>📍</span>{c.location}</p>
                        </td>
                        <td>
                          <button 
                            onClick={() => {
                              const creator = USERS.find(u => u.id === c.creatorId)
                              if (creator) setSelectedUser(creator)
                            }}
                            className="text-gray-600 text-sm hover:text-[#1E3A5F] hover:underline"
                          >
                            {getCreatorName(c.creatorId)}
                          </button>
                        </td>
                        <td><span className="cat-pill text-xs bg-[#F0EDE4] text-gray-600 capitalize">{c.category}</span></td>
                        <td>
                          <p className="font-bold text-[#0B4D2B] text-sm">{formatGHS(c.raised)}</p>
                          <p className="text-[11px] text-gray-400">{getProgressPercent(c.raised,c.target)}% of {formatGHS(c.target)}</p>
                        </td>
                        <td>
                          <span className={c.status==='approved'?'badge-verified':c.status==='pending'?'badge-pending':c.status==='flagged'?'badge-trust':'badge-rejected'}>
                            {c.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <Link to={`/campaign/${c.id}`} className="p-1.5 rounded-lg text-gray-400 hover:bg-[#F0EDE4] hover:text-gray-600 transition-colors" title="View">
                              <Eye size={14} />
                            </Link>
                            {c.status !== 'approved' && (
                              <button onClick={() => doAction(approveCampaign, c.id, `✅ "${c.title.slice(0,30)}..." approved.`)} className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors" title="Approve">
                                <CheckCircle size={14} />
                              </button>
                            )}
                            {c.status !== 'rejected' && (
                              <button onClick={() => doAction(rejectCampaign, c.id, `❌ "${c.title.slice(0,30)}..." rejected.`)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Reject">
                                <XCircle size={14} />
                              </button>
                            )}
                            {c.status !== 'flagged' && (
                              <button onClick={() => doAction(flagCampaign, c.id, `🚩 "${c.title.slice(0,30)}..." flagged for review.`)} className="p-1.5 rounded-lg text-yellow-500 hover:bg-yellow-50 transition-colors" title="Flag">
                                <Flag size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="anim-fade-in">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-5">All Users ({USERS.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {USERS.map(u => (
                  <div key={u.id} className="bg-white rounded-2xl p-5 border border-[#F0EDE4] shadow-warm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: u.avatarColor }}>
                      {u.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <button 
                          onClick={() => setSelectedUser(u)}
                          className="font-bold text-gray-900 hover:text-[#1E3A5F] hover:underline text-left"
                        >
                          {u.name}
                        </button>
                        <span className="bg-[#F0EDE4] text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">{u.role}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{u.email}</p>
                      <p className="text-xs text-gray-500">{u.location}</p>
                      {u.role === 'agent' && <p className="text-xs text-[#7C3AED] font-semibold mt-1">Success Rate: {u.successRate}%</p>}
                      {u.role === 'company' && <p className="text-xs text-[#0B4D2B] font-semibold mt-1">✅ Verified NGO · {u.donorCount?.toLocaleString()} donors</p>}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-xs text-gray-400">Joined</p>
                      <p className="text-xs font-semibold text-gray-700">{u.joinedAt}</p>
                      <button 
                        onClick={() => setSelectedUser(u)}
                        className="flex items-center gap-1 text-[10px] font-semibold text-[#1E3A5F] hover:bg-[#EFF6FF] px-2 py-1 rounded-lg transition-colors"
                      >
                        <UserCircle size={12} /> View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRANSACTIONS TAB */}
          {activeTab === 'transactions' && (
            <div className="anim-fade-in">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-5">All Transactions ({transactions.length})</h2>
              <div className="bg-white rounded-2xl border border-[#F0EDE4] shadow-warm overflow-x-auto">
                <table className="w-full gh-table min-w-[600px]">
                  <thead><tr><th>ID</th><th>Campaign</th><th>Donor</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {transactions.map(t => (
                      <tr key={t.id}>
                        <td className="font-mono text-xs text-gray-400">{t.id}</td>
                        <td className="max-w-[140px]">
                          <button 
                            onClick={() => {
                              const camp = campaigns.find(c=>c.id===t.campaignId)
                              if (camp) setSelectedCampaign(camp)
                            }}
                            className="text-sm font-medium text-gray-800 hover:text-[#1E3A5F] hover:underline truncate block text-left"
                          >
                            {campaigns.find(c=>c.id===t.campaignId)?.title.slice(0,25)+'...' || '—'}
                          </button>
                        </td>
                        <td className="text-gray-700">{t.donor}</td>
                        <td className="font-bold text-[#0B4D2B]">{formatGHS(t.amount)}</td>
                        <td><span className="badge-trust">{t.method}</span></td>
                        <td><span className="badge-verified">{t.status}</span></td>
                        <td className="text-gray-400 text-xs">{t.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div className="anim-fade-in space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label:'Avg Donation', value: formatGHS(stats.avgDonation), color:'#1E3A5F' },
                  { label:'Monthly Growth', value: `+${stats.monthlyGrowth}%`, color:'#0B4D2B' },
                  { label:'Success Rate', value: `${stats.successRate}%`, color:'#F59E0B' },
                  { label:'Total Transactions', value: transactions.length, color:'#7C3AED' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="stat-card text-center">
                    <p className="font-display font-bold text-2xl" style={{ color }}>{value}</p>
                    <p className="text-xs text-gray-400 mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#F0EDE4] shadow-warm">
                <h3 className="font-bold text-gray-800 mb-5">Monthly Funds Raised (GHS)</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={MONTHLY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE4" />
                    <XAxis dataKey="month" tick={{ fontSize:12, fill:'#9CA3AF' }} />
                    <YAxis tick={{ fontSize:12, fill:'#9CA3AF' }} tickFormatter={v=>`₵${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={v=>[formatGHS(v),'Raised']} />
                    <Bar dataKey="raised" fill="#1E3A5F" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-6 border border-[#F0EDE4] shadow-warm">
                  <h3 className="font-bold text-gray-800 mb-3">Category Breakdown</h3>
                  <div className="space-y-3">
                    {categoryStats.map(stat => (
                      <div key={stat.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{stat.name}</span>
                          <span className="font-bold text-gray-800">{stat.pct}</span>
                        </div>
                        <div className="h-1.5 bg-[#F0EDE4] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: stat.pct, backgroundColor: stat.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-[#F0EDE4] shadow-warm">
                  <h3 className="font-bold text-gray-800 mb-3">Payment Methods</h3>
                  <div className="space-y-3">
                    {paymentStats.map(stat => (
                      <div key={stat.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{stat.name}</span>
                          <span className="font-bold text-gray-800">{stat.pct}</span>
                        </div>
                        <div className="h-1.5 bg-[#F0EDE4] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: stat.pct, backgroundColor: stat.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAYOUTS TAB */}
          {activeTab === 'payouts' && (
            <div className="anim-fade-in">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 mb-5">
                <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800 mb-0.5">Simulated Payouts</p>
                  <p className="text-xs text-amber-700">In production, payouts would be processed via bank transfer or Mobile Money to verified campaign creators. This is a demo.</p>
                </div>
              </div>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-5">Approved Campaigns — Payout Status</h2>
              <div className="bg-white rounded-2xl border border-[#F0EDE4] shadow-warm overflow-x-auto">
                <table className="w-full gh-table min-w-[600px]">
                  <thead><tr><th>Campaign</th><th>Raised</th><th>Platform Fee (3%)</th><th>Net Payout</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {campaigns.filter(c=>c.status==='approved').map(c => {
                      const net = Math.round(c.raised * 0.97)
                      const fee = c.raised - net
                      const paid = payoutDone.has(c.id)
                      return (
                        <tr key={c.id}>
                          <td><p className="font-medium text-gray-800 max-w-[180px] truncate">{c.title}</p></td>
                          <td className="font-bold text-[#0B4D2B]">{formatGHS(c.raised)}</td>
                          <td className="text-gray-500">{formatGHS(fee)}</td>
                          <td className="font-bold text-gray-800">{formatGHS(net)}</td>
                          <td>
                            {paid
                              ? <span className="badge-verified">Paid Out</span>
                              : <span className="badge-pending">Pending</span>
                            }
                          </td>
                          <td>
                            {!paid ? (
                              <button
                                onClick={() => setPayoutCamp(c)}
                                className="flex items-center gap-1.5 bg-[#1E3A5F] hover:bg-[#2D5A8B] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                              >
                                <DollarSign size={13} /> Process
                              </button>
                            ) : (
                              <span className="text-xs text-green-600 font-semibold">✅ Done</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)}
          transactions={transactions}
          campaigns={campaigns}
        />
      )}

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <CampaignDetailModal 
          campaign={selectedCampaign} 
          onClose={() => setSelectedCampaign(null)}
          transactions={transactions}
        />
      )}

      {/* Payout confirmation modal */}
      {payoutCamp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}>
          <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '448px', marginTop: '20px', marginBottom: '20px', padding: '32px 24px 40px', animation: 'fadeUp 0.3s ease-out', position: 'relative' }}>
            <DollarSign size={32} className="text-[#1E3A5F] mx-auto mb-4" />
            <h2 className="font-display font-bold text-xl text-gray-900 text-center mb-2">Confirm Payout</h2>
            <p className="text-sm text-gray-500 text-center mb-5">Simulate transferring funds for:</p>
            <div className="bg-[#F9F6EF] rounded-2xl p-5 mb-5 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Campaign</span><span className="font-semibold text-gray-800 text-right max-w-[55%] text-xs">{payoutCamp.title}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Total Raised</span><span className="font-bold text-[#0B4D2B]">{formatGHS(payoutCamp.raised)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Platform Fee (3%)</span><span className="text-gray-600">−{formatGHS(Math.round(payoutCamp.raised*0.03))}</span></div>
              <div className="flex justify-between text-sm border-t border-[#E5DFD3] pt-2"><span className="font-bold text-gray-700">Net to Creator</span><span className="font-bold text-lg text-[#1E3A5F]">{formatGHS(Math.round(payoutCamp.raised*0.97))}</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setPayoutCamp(null)} className="flex-1 border-2 border-[#E5DFD3] text-gray-700 font-bold py-3 rounded-2xl">Cancel</button>
              <button onClick={()=>simulatePayout(payoutCamp.id)} className="flex-1 bg-[#1E3A5F] text-white font-bold py-3 rounded-2xl hover:bg-[#2D5A8B] transition-colors">Confirm Payout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
