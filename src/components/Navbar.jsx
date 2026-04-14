import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Bell, ChevronDown, LogOut, LayoutDashboard, Search, Share2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

const LOGO_URL = 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png'

const ROLE_DASH = { user: '/dashboard', agent: '/agent', company: '/company', admin: '/admin' }
const ROLE_COLORS = { user: '#0B4D2B', agent: '#7C3AED', company: '#065F46', admin: '#1E3A5F' }
const ROLE_LABELS = { user: 'User', agent: 'Agent', company: 'Company', admin: 'Admin' }

export default function Navbar() {
  const { user, logout, switchRole } = useAuth()
  const { notifications } = useData()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [donateDropOpen, setDonateDropOpen] = useState(false)
  const [fundraiseDropOpen, setFundraiseDropOpen] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const logoRef = useRef(null)

  useEffect(() => {
    if (logoRef.current?.complete) {
      setLogoLoaded(true)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
    setDropOpen(false)
    setDonateDropOpen(false)
    setFundraiseDropOpen(false)
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-[#F0EDE4] shadow-warm">
      <div className="kente-bar" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo with animation */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className={`absolute inset-0 bg-[#02a95c]/20 rounded-lg animate-logo-ping opacity-0 ${logoLoaded ? 'opacity-100' : ''}`} />
            <img 
              ref={logoRef}
              src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png" 
              alt="Nkabom Fund Logo" 
              className={`relative w-8 h-8 object-contain transition-all duration-500 ${logoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
              onLoad={() => setLogoLoaded(true)}
            />
          </div>
          <span className={`font-display font-bold text-gray-900 text-xl transition-all duration-300 ${logoLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
            Nkabom Fund
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 ml-8">
          <Link to="/explore" className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-[#02a95c] transition-colors">
            <Search size={18} /> Search
          </Link>
          
          {/* Donate Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setDonateDropOpen(!donateDropOpen); setFundraiseDropOpen(false); setDropOpen(false); setNotifOpen(false); }}
              className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-[#02a95c] transition-colors"
            >
              Donate <ChevronDown size={14} className={`transition-transform duration-200 ${donateDropOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {donateDropOpen && (
              <div className="absolute left-0 mt-4 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 z-50 anim-fade-in">
                <Link to="/explore" onClick={() => setDonateDropOpen(false)} className="block font-black text-gray-900 text-lg mb-6 hover:text-[#02a95c] transition-colors">
                  Discover fundraisers to support
                </Link>
                <div className="space-y-5">
                  {[
                    { title: 'Categories', desc: 'Browse fundraisers by category', link: '/categories' },
                    { title: 'Crisis relief', desc: 'Donate to verified relief', link: '/crisis-relief' },
                    { title: 'Social Impact Funds', desc: 'Direct support for urgent needs', link: '/social-impact' },
                    { title: 'Supporter Space', desc: 'Inspiration, FAQs, and where to give', link: '/supporter-space' },
                  ].map((item, idx) => (
                    <Link key={idx} to={item.link} onClick={() => setDonateDropOpen(false)} className="group/item block">
                      <p className="text-sm font-bold text-gray-900 group-hover/item:text-[#02a95c] transition-colors">{item.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Fundraise Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setFundraiseDropOpen(!fundraiseDropOpen); setDonateDropOpen(false); setDropOpen(false); setNotifOpen(false); }}
              className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-[#02a95c] transition-colors"
            >
              Fundraise <ChevronDown size={14} className={`transition-transform duration-200 ${fundraiseDropOpen ? 'rotate-180' : ''}`} />
            </button>

            {fundraiseDropOpen && (
              <div className="absolute left-0 mt-4 w-[500px] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 z-50 anim-fade-in">
                <Link to={user ? ROLE_DASH[user.role] : "/login"} onClick={() => setFundraiseDropOpen(false)} className="block font-black text-gray-900 text-lg mb-6 hover:text-[#02a95c] transition-colors">
                  Start fundraising, tips, and resources
                </Link>
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                  {[
                    { title: 'How to start a fundraiser', desc: 'Step-by-step help, examples, and more', link: '/start' },
                    { title: 'Fundraising categories', desc: 'Find the right category for you', link: '/categories' },
                    { title: 'Team fundraising', desc: 'Fundraise together with a team', link: '/team-fundraising' },
                    { title: 'Fundraising Blog', desc: 'Resources, tips, and more', link: '/blog' },
                    { title: 'Fundraising tips', desc: 'The ultimate fundraising tips guide', link: '/tips' },
                    { title: 'Fundraising ideas', desc: 'Ideas to spark your creativity', link: '/tips#ideas' },
                    { title: 'Charity fundraising', desc: 'Fundraise for a charity', link: '/charity' },
                    { title: 'Sign up as a nonprofit', desc: 'Claim your nonprofit', link: '/charity#signup' },
                  ].map((item, idx) => (
                    <Link key={idx} to={item.link} onClick={() => setFundraiseDropOpen(false)} className="group/item block">
                      <p className="text-sm font-bold text-gray-900 group-hover/item:text-[#02a95c] transition-colors">{item.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link to="/about" className="hidden md:block text-sm font-bold text-gray-700 hover:text-[#02a95c] transition-colors">About</Link>
          <Link to="/groups" className="hidden md:block text-sm font-bold text-gray-700 hover:text-[#02a95c] transition-colors">Groups</Link>
          
          {user ? (
            <>
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => { setNotifOpen(!notifOpen); setDropOpen(false); setDonateDropOpen(false); setFundraiseDropOpen(false); }}
                  className="relative p-2 rounded-xl hover:bg-[#F0EDE4] transition-colors"
                >
                  <Bell size={18} className="text-gray-600" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-warm-md border border-[#F0EDE4] overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#F0EDE4]">
                      <p className="text-sm font-bold text-gray-800">Live Activity</p>
                    </div>
                    {notifications.length === 0 ? (
                      <p className="px-4 py-6 text-sm text-gray-400 text-center">No new activity yet</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="px-4 py-3 border-b border-[#F9F6EF] last:border-0">
                          <p className="text-xs text-gray-700">{n.text}</p>
                          <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setDropOpen(!dropOpen); setNotifOpen(false); setDonateDropOpen(false); setFundraiseDropOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F0EDE4] transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: ROLE_COLORS[user.role] }}
                  >
                    {user.avatar}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-gray-800 leading-none">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-gray-400 capitalize">{ROLE_LABELS[user.role]}</p>
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                {dropOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-warm-md border border-[#F0EDE4] overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#F0EDE4]">
                      <p className="text-sm font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to={ROLE_DASH[user.role]}
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-[#EDFAF2] hover:text-[#0B4D2B] transition-colors"
                      >
                        <LayoutDashboard size={15} /> My Dashboard
                      </Link>
                      {/* Switch role */}
                      <div className="px-3 py-2">
                        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Switch Role</p>
                        {['user','agent','company','admin'].filter(r => r !== user.role).map(r => (
                          <button
                            key={r}
                            onClick={() => { switchRole(r); setDropOpen(false); navigate(ROLE_DASH[r]) }}
                            className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-[#F0EDE4] capitalize transition-colors"
                          >
                            {ROLE_LABELS[r]}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-bold text-gray-700 hover:text-[#02a95c] transition-colors"
            >
              Sign in
            </Link>
          )}

          <Link
            to={user ? ROLE_DASH[user.role] : "/login"}
            className="hidden sm:block border-2 border-[#02a95c] text-[#02a95c] hover:bg-[#02a95c] hover:text-white transition-all font-bold px-5 py-2 rounded-xl text-sm whitespace-nowrap"
          >
            Start a Fundraiser
          </Link>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-[#F0EDE4]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#F0EDE4] px-4 py-4 flex flex-col gap-3 anim-fade-in">
          <Link to="/explore" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-700 py-2 flex items-center gap-2"><Search size={16}/> Search</Link>
          <Link to="/explore" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-700 py-2">Donate</Link>
          <Link to="/groups" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-700 py-2">Groups</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-700 py-2">About</Link>
          {!user && (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-700 py-2">Sign in</Link>
          )}
          <Link to={user ? ROLE_DASH[user.role] : "/login"} onClick={() => setMenuOpen(false)} className="bg-[#02a95c] text-white text-sm font-bold px-4 py-3 rounded-xl text-center mt-2">Start a Fundraiser</Link>
        </div>
      )}
    </nav>
  )
}
