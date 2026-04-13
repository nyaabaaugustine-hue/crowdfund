import { Link } from 'react-router-dom'
import { X, LayoutDashboard, Target, Heart, Settings, LogOut, ChevronRight, Home, Search, Menu, BarChart3, Users, DollarSign, Shield, FileText, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { formatGHS } from '../data/seed'

const MENU_ITEMS = {
  user: [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'campaigns', label: 'My Campaigns', icon: Target, path: '/dashboard' },
    { id: 'donations', label: 'Donations', icon: Heart, path: '/dashboard' },
  ],
  agent: [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/agent' },
    { id: 'campaigns', label: 'My Campaigns', icon: Target, path: '/agent' },
    { id: 'earnings', label: 'Earnings', icon: DollarSign, path: '/agent' },
  ],
  company: [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/company' },
    { id: 'campaigns', label: 'Campaigns', icon: Target, path: '/company' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/company' },
    { id: 'donors', label: 'Donors', icon: Users, path: '/company' },
  ],
  admin: [
    { id: 'campaigns', label: 'Campaigns', icon: Shield, path: '/admin' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin' },
    { id: 'transactions', label: 'Transactions', icon: FileText, path: '/admin' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin' },
    { id: 'payouts', label: 'Payouts', icon: DollarSign, path: '/admin' },
  ],
}

export default function DashboardSidebar({ isOpen, onClose, activeTab, onTabChange, onLogout }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const items = MENU_ITEMS[user?.role] || MENU_ITEMS.user

  const getRoleColor = () => {
    const colors = {
      user: '#0B4D2B',
      agent: '#7C3AED',
      company: '#065F46',
      admin: '#1E3A5F',
    }
    return colors[user?.role] || colors.user
  }

  const getRoleBg = () => {
    const bgs = {
      user: '#EDFAF2',
      agent: '#F5F3FF',
      company: '#ECFDF5',
      admin: '#EFF6FF',
    }
    return bgs[user?.role] || bgs.user
  }

  const handleNavigate = (item) => {
    onTabChange(item.id)
    if (item.path !== window.location.pathname) {
      navigate(item.path)
    }
    onClose()
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[300px] bg-white border-r border-gray-100
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col shadow-xl lg:shadow-none
      `}>
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0B4D2B] to-[#065F46] p-5 text-white">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <div className="flex items-center gap-2">
              <img 
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png" 
                alt="Nkabom Fund"
                className="w-8 h-8 rounded-lg bg-white/20 p-1"
              />
              <span className="font-bold text-sm">Menu</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              {user?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{user?.name}</p>
              <p className="text-xs text-green-200 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-white/10 rounded-lg p-2.5 text-center">
              <p className="font-bold text-sm">
                {user?.role === 'user' && `₵${(user?.totalRaised || 8500).toLocaleString()}`}
                {user?.role === 'agent' && `${user?.successRate || 87}%`}
                {user?.role === 'company' && `${(user?.donorCount || 1847).toLocaleString()}`}
                {user?.role === 'admin' && `${(user?.campaignsManaged?.length || 5)}`}
              </p>
              <p className="text-[10px] text-green-200">
                {user?.role === 'user' && 'Raised'}
                {user?.role === 'agent' && 'Success Rate'}
                {user?.role === 'company' && 'Donors'}
                {user?.role === 'admin' && 'Campaigns'}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-2.5 text-center">
              <p className="font-bold text-sm">
                {user?.role === 'user' && `₵${(user?.totalDonated || 1420).toLocaleString()}`}
                {user?.role === 'agent' && `₵${(user?.totalCommission || 2340).toLocaleString()}`}
                {user?.role === 'company' && `₵${((user?.totalRaised || 142500) / 1000).toFixed(0)}k`}
                {user?.role === 'admin' && '2,847'}
              </p>
              <p className="text-[10px] text-green-200">
                {user?.role === 'user' && 'Donated'}
                {user?.role === 'agent' && 'Commission'}
                {user?.role === 'company' && 'Raised'}
                {user?.role === 'admin' && 'Reviews'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="mb-2 px-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Navigation</span>
          </div>

          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                    transition-all duration-150 group
                    ${isActive 
                      ? 'bg-[#0B4D2B] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className={`
                    w-9 h-9 rounded-lg flex items-center justify-center
                    ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'}
                    transition-colors
                  `}>
                    <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500'} />
                  </div>
                  <span className={`font-semibold text-sm flex-1 ${isActive ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <ChevronRight size={16} className="text-white/60" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-100" />

          {/* Quick Links */}
          <div className="space-y-1">
            <Link 
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Home size={18} className="text-gray-500" />
              </div>
              <span className="font-semibold text-sm">Home</span>
            </Link>
            <Link 
              to="/explore"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Search size={18} className="text-gray-500" />
              </div>
              <span className="font-semibold text-sm">Explore</span>
            </Link>
            <Link 
              to="/notifications"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center relative">
                <Bell size={18} className="text-gray-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">3</span>
              </div>
              <span className="font-semibold text-sm">Notifications</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors mb-2"
          >
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
              <LogOut size={18} />
            </div>
            <span className="font-semibold text-sm">Sign Out</span>
          </button>
          
          {/* Branding */}
          <div className="mt-2 pt-2 border-t border-gray-100 text-center">
            <div className="flex items-center justify-center gap-2">
              <img 
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png" 
                alt="Nkabom Fund"
                className="w-6 h-6"
              />
              <span className="text-xs font-semibold text-gray-500">Nkabom Fund</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">Dashboard v1.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}
