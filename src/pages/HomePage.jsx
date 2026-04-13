import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, TrendingUp, Heart, Users, Target, Play, ChevronRight, Star, ChevronLeft, ShieldCheck, Lock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampaignCard from '../components/CampaignCard'
import DonationModal from '../components/DonationModal'
import { useData } from '../context/DataContext' 
import { useAuth } from '../context/AuthContext'
import { formatGHS, CATEGORIES, BLOG_POSTS } from '../data/seed'

const STATS_CONFIG = [
  { label: 'Total Raised', getValue: s => formatGHS(s.totalRaised) },
  { label: 'Active Campaigns', getValue: s => s.activeCampaigns },
  { label: 'Donors Nationwide', getValue: s => s.totalDonors.toLocaleString() },
  { label: 'Success Rate', getValue: s => `${s.successRate}%` },
  { label: 'Communities Reached', getValue: () => '45+' },
  { label: 'Avg Donation', getValue: s => formatGHS(s.avgDonation) },
  { label: 'Monthly Growth', getValue: s => `+${s.monthlyGrowth}%` },
]

const HERO_SLIDES = [
  {
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097110/slide5_pndb9r.jpg',
    title: "United for a Better Ghana",
    subtitle: "Every donation brings hope to a family in need across the nation."
  },
  {
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097120/slide2_e1m7pp.jpg',
    title: "Emergency Medical Relief",
    subtitle: "Providing critical care and surgery funds for those in need."
  },
  {
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097707/slide1_lmjqg2.jpg',
    title: "Support Education in Rural Ghana",
    subtitle: "Help us put tablets in the hands of 500 students this year."
  },
  {
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097719/slide3_npuvnt.jpg',
    title: "Small Business, Big Dreams",
    subtitle: "Empowering local artisans and traders to expand their reach."
  },
  {
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097721/slide4_yukxzd.jpg',
    title: "Community Growth Initiatives",
    subtitle: "Building sustainable infrastructure for a brighter tomorrow."
  }
]

export default function HomePage() {
  const { campaigns, stats, notifications } = useData()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [donateTarget, setDonateTarget] = useState(null)
  const [liveNotif, setLiveNotif] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const featured = campaigns.filter(c => c.status === 'approved' && c.featured).slice(0, 6)
  const urgent = campaigns.filter(c => c.status === 'approved' && c.daysLeft <= 14).slice(0, 8)
  const newsItems = BLOG_POSTS.slice(0, 3)
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  // Show live notification banner
  useEffect(() => {
    if (notifications.length > 0) {
      setLiveNotif(notifications[0])
      const t = setTimeout(() => setLiveNotif(null), 4000)
      return () => clearTimeout(t)
    }
  }, [notifications])

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Live activity banner */}
      {liveNotif && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 anim-fade-up">
          <div className="bg-[#0B4D2B] text-white px-5 py-3 rounded-2xl shadow-warm-lg flex items-center gap-3 text-sm max-w-sm">
            <span className="text-[#F6A800]">❤️</span>
            <p className="font-medium">{liveNotif.text}</p>
          </div>
        </div>
      )}

      {/* MODERN SLIDER HERO */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide.image} className="w-full h-full object-cover opacity-60" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl px-6 text-center text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-sm font-bold mb-6 border border-white/30">
                  <span className="w-2 h-2 rounded-full bg-[#02a95c] animate-pulse" />
                  {stats.activeCampaigns} active campaigns
                </div>
                <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 tracking-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl lg:text-2xl mb-10 text-gray-100 max-w-2xl mx-auto font-medium drop-shadow-md">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => navigate(user ? '/explore' : '/login')} className="bg-[#02a95c] hover:bg-[#029350] text-white text-lg font-bold px-10 py-4 rounded-xl transition-all shadow-xl hover:scale-105">
                    Start Fundraising
                  </button>
                  <Link to="/explore" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-lg font-bold px-10 py-4 rounded-xl border border-white/30 transition-all">
                    Donate Now
                  </Link>
                </div>

                {/* TRUST & PAYMENT BAR */}
                <div className="mt-10 flex flex-col items-center gap-4 anim-fade-in" style={{ animationDelay: '400ms' }}>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white/70 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                    <ShieldCheck size={14} className="text-[#02a95c]" />
                    Secure 256-bit encrypted transactions
                  </div>
                  <div className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Accepting</span>
                    <div className="flex items-center gap-4 text-xs font-bold text-white">
                      <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085018/newmo_vwzw4r.png" className="h-4 w-auto object-contain" alt="MTN MoMo" />
                      <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085086/tele_1_wfgluk.png" className="h-4 w-auto object-contain" alt="Telecel Cash" />
                      <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085165/download_1_jclht6.jpg" className="h-4 w-auto object-contain" alt="AirtelTigo" />
                      <span className="h-3 w-px bg-white/20 mx-1" />
                      <svg className="h-5 w-auto" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="60" height="20" rx="3" fill="#1A1F71"/>
                        <text x="30" y="14" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">VISA</text>
                      </svg>
                      <svg className="h-5 w-auto" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="25" rx="4" fill="#F5F5F5"/>
                        <circle cx="15" cy="12.5" r="8" fill="#EB001B"/>
                        <circle cx="25" cy="12.5" r="8" fill="#F79E1B"/>
                        <path d="M20 6.5C21.5 7.9 22.5 9.9 22.5 12.5C22.5 15.1 21.5 17.1 20 18.5C18.5 17.1 17.5 15.1 17.5 12.5C17.5 9.9 18.5 7.9 20 6.5Z" fill="#FF5F00"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-20">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-20">
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all rounded-full ${idx === currentSlide ? 'w-8 bg-[#02a95c]' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </section>

        {/* IMPACT STATS — Innovative Slow Scroller */}
        <div className="relative bg-white border-t border-gray-100 shadow-sm overflow-hidden py-10">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes statsMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-stats-slow {
              display: flex;
              width: max-content;
              animation: statsMarquee 60s linear infinite;
            }
          `}} />
          
          <div className="animate-stats-slow flex items-center">
            {/* Duplicate the array to ensure seamless looping */}
            {[...STATS_CONFIG, ...STATS_CONFIG].map(({ label, getValue }, idx) => (
              <div key={`${label}-${idx}`} className="flex flex-col items-center justify-center px-16 border-r border-gray-100 min-w-[300px]">
                <p className="text-4xl font-display font-black text-gray-900 mb-2">
                  {getValue(stats)}
                </p>
                <p className="text-[11px] font-bold text-[#02a95c] uppercase tracking-[0.3em] whitespace-nowrap">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776100750/1776084234275_mzdnqt.jpg" 
                  alt="Ghana community coming together" 
                  className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#02a95c]/10 rounded-full -z-0" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#F6A800]/10 rounded-full -z-0" />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 left-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 z-20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#02a95c] rounded-xl flex items-center justify-center text-white text-2xl">
                    🇬🇭
                  </div>
                  <div>
                    <p className="font-display font-black text-2xl text-gray-900">45+</p>
                    <p className="text-sm text-gray-500">Communities Reached</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 bg-[#02a95c]/10 px-4 py-2 rounded-full text-sm font-bold text-[#02a95c] mb-6">
                <span className="w-2 h-2 bg-[#02a95c] rounded-full animate-pulse" />
                About Nkabom Fund
              </div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-900 mb-6 leading-tight">
                Together, We Build<br />
                <span className="text-[#02a95c]">Stronger Communities</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Nkabom Fund was born from a simple belief: when Ghanaians come together, no challenge is too big. 
                We are Ghana's most trusted crowdfunding platform, connecting those in need with those who care.
              </p>
              
              <div className="space-y-6 mb-8">
                {[
                  { icon: '🎯', title: 'Verified Trust', desc: 'Every campaign is identity-verified for your peace of mind' },
                  { icon: '💚', title: 'Direct Impact', desc: '100% of funds go directly to beneficiaries via MoMo' },
                  { icon: '🌍', title: 'Pan-Ghana Reach', desc: 'Supporting communities from Accra to Tamale, Kumasi to Cape Coast' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F9F6EF] rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/start"
                className="inline-flex items-center gap-2 bg-[#0B4D2B] hover:bg-[#065F46] text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Learn More About Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-gray-900">Browse by Category</h2>
          <Link to="/explore" className="text-sm font-semibold text-[#0B4D2B] flex items-center gap-1 hover:underline">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/explore?cat=${cat.id}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 bg-white rounded-2xl px-5 py-4 border border-[#F0EDE4] shadow-warm hover:shadow-warm-md hover:-translate-y-1 transition-all"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs font-semibold text-gray-700">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED CAMPAIGNS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-gray-900">Featured Campaigns</h2>
            <p className="text-sm text-gray-400 mt-1">Verified and actively raising funds</p>
          </div>
          <Link to="/explore" className="text-sm font-semibold text-[#0B4D2B] flex items-center gap-1 hover:underline">
            See all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((c, i) => (
            <CampaignCard key={c.id} campaign={c} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* URGENT */}
      {urgent.length > 0 && (
        <section className="bg-[#FEF2F2] border-y border-red-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⚡</span>
              <div>
                <h2 className="font-display font-bold text-2xl text-gray-900">Ending Soon</h2>
                <p className="text-sm text-red-500 font-medium">Less than 14 days remaining</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {urgent.map((c, i) => (
                <CampaignCard key={c.id} campaign={c} delay={i * 60} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWS & STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-3xl text-gray-900">Nkabom Fund Stories & News</h2>
            <p className="text-gray-500 text-lg mt-2 max-w-xl">
              Inspiring stories, fundraising tips, and platform updates from the heart of Ghana.
            </p>
          </div>
          <Link to="#" className="text-sm font-semibold text-[#02a95c] flex items-center gap-1 hover:underline">
            View all articles <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((post, i) => (
            <Link key={post.id} to={post.link} className="block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md anim-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{post.category} · {post.date}</p>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INNOVATIVE SCROLLING LISTINGS */}
      <section className="py-16 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#02a95c] animate-ping" />
            <span className="text-[#02a95c] text-xs font-black uppercase tracking-widest">Live Activity</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-gray-900">Trending Fundraisers</h2>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 50s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="relative flex overflow-hidden">
          <div className="animate-marquee gap-6 px-4">
            {[...campaigns.filter(c => c.status === 'approved'), ...campaigns.filter(c => c.status === 'approved')].map((c, i) => (
              <Link key={`${c.id}-${i}`} to={`/campaign/${c.id}`} className="w-72 flex-shrink-0 group">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm group-hover:shadow-md group-hover:border-gray-200 transition-all duration-300">
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                    <img src={c.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={c.title} />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-gray-900 uppercase">
                      {CATEGORIES.find(cat => cat.id === c.category)?.emoji} {c.category}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-1">{c.title}</h3>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[#02a95c]" style={{ width: `${(c.raised/c.target)*100}%` }} />
                  </div>
                  <p className="text-xs font-black text-gray-900">{formatGHS(c.raised)} <span className="text-gray-400 font-medium">raised</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-3">How Nkabom Fund Works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Simple, transparent, and made for Ghana.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Create Your Campaign', desc: 'Share your story with photos, your goal, and why people should care.', icon: '📝', time: '5 mins' },
            { step: '02', title: 'Verify Your Identity', desc: 'Submit Ghana Card or passport for quick ID verification by our team.', icon: '🪪', time: '1 day' },
            { step: '03', title: 'Share & Spread the Word', desc: 'Share on WhatsApp, Facebook, and by word of mouth. Our platform amplifies your reach.', icon: '📢', time: 'Ongoing' },
            { step: '04', title: 'Receive Funds via MoMo', desc: 'Donations come in via MTN MoMo, Telecel Cash, AirtelTigo, or card.', icon: '📱', time: 'Instant' },
          ].map((item, i) => (
            <div key={item.step} className="relative anim-fade-up bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#02a95c]/20 transition-all duration-300" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="absolute -top-3 left-6 bg-[#02a95c] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                {item.step}
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#EDFAF2] to-[#D0F0DF] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl mt-2">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2 text-center">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed text-center mb-4">{item.desc}</p>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#02a95c] bg-[#EDFAF2] px-3 py-1.5 rounded-full w-fit mx-auto">
                <span className="w-1.5 h-1.5 bg-[#02a95c] rounded-full animate-pulse" />
                {item.time}
              </div>
            </div>
          ))}
        </div>
        
        {/* ID Verification Callout */}
        <div className="mt-10 bg-gradient-to-r from-[#0B4D2B] to-[#065F46] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">
              🪪
            </div>
            <div>
              <h3 className="font-display font-bold text-xl mb-1">Why We Verify IDs</h3>
              <p className="text-green-200 text-sm max-w-lg">Your trust matters. Every fundraiser is verified using Ghana Card or valid passport to protect donors and ensure funds reach the right people.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <span>✅</span> Ghana Card
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <span>✅</span> Passport
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <span>✅</span> Driver License
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - TESTIMONIALS */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#02a95c]/10 px-4 py-2 rounded-full text-sm font-bold text-[#02a95c] mb-4">
              <span className="text-yellow-400">★★★★★</span> Trusted by thousands across Ghana
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">What People Are Saying</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Real stories from real Ghanaians who have raised funds and made a difference.</p>
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes testimonialScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .testimonial-track {
              animation: testimonialScroll 40s linear infinite;
            }
            .testimonial-track:hover {
              animation-play-state: paused;
            }
          `}} />
          
          {/* Scrolling Reviews - Single Line */}
          <div className="relative -mx-4 sm:mx-0 overflow-hidden">
            <div className="testimonial-track flex gap-4 px-4">
              {[
                { name: 'Akua K.', location: 'Accra', role: 'Medical Campaign', quote: 'Nkabom Fund helped me raise GHS 32,000 for my mother\'s surgery in just 2 weeks!', rating: 5, avatar: 'AK', color: '#02a95c', bg: '#EDFAF2', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face' },
                { name: 'Emmanuel M.', location: 'Kumasi', role: 'Business Owner', quote: 'I now employ 5 more women thanks to the funds raised. Incredible platform!', rating: 5, avatar: 'EM', color: '#7C3AED', bg: '#F5F3FF', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
                { name: 'Sarah A.', location: 'Takoradi', role: 'University Student', quote: 'I can finally pay my university fees. The verification made donors trust me.', rating: 5, avatar: 'SA', color: '#0B4D2B', bg: '#EDFAF2', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
                { name: 'Pastor K.', location: 'Cape Coast', role: 'Community Leader', quote: 'We raised GHS 80,000 to rebuild our school. Diaspora loved it!', rating: 5, avatar: 'PK', color: '#065F46', bg: '#ECFDF5', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
                { name: 'Abena S.', location: 'Tamale', role: 'NGO Director', quote: 'Our verified NGO status helped us raise 40% more than before!', rating: 5, avatar: 'AS', color: '#F59E0B', bg: '#FFFBEB', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
                { name: 'Yaw A.', location: 'Ho', role: 'Freelancer', quote: 'AI storytelling feature is amazing! Reached my goal in 10 days!', rating: 5, avatar: 'YA', color: '#DC2626', bg: '#FEF2F2', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
              ].concat([
                { name: 'Akua K.', location: 'Accra', role: 'Medical Campaign', quote: 'Nkabom Fund helped me raise GHS 32,000 for my mother\'s surgery in just 2 weeks!', rating: 5, avatar: 'AK', color: '#02a95c', bg: '#EDFAF2', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face' },
                { name: 'Emmanuel M.', location: 'Kumasi', role: 'Business Owner', quote: 'I now employ 5 more women thanks to the funds raised. Incredible platform!', rating: 5, avatar: 'EM', color: '#7C3AED', bg: '#F5F3FF', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
                { name: 'Sarah A.', location: 'Takoradi', role: 'University Student', quote: 'I can finally pay my university fees. The verification made donors trust me.', rating: 5, avatar: 'SA', color: '#0B4D2B', bg: '#EDFAF2', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
                { name: 'Pastor K.', location: 'Cape Coast', role: 'Community Leader', quote: 'We raised GHS 80,000 to rebuild our school. Diaspora loved it!', rating: 5, avatar: 'PK', color: '#065F46', bg: '#ECFDF5', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
                { name: 'Abena S.', location: 'Tamale', role: 'NGO Director', quote: 'Our verified NGO status helped us raise 40% more than before!', rating: 5, avatar: 'AS', color: '#F59E0B', bg: '#FFFBEB', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
                { name: 'Yaw A.', location: 'Ho', role: 'Freelancer', quote: 'AI storytelling feature is amazing! Reached my goal in 10 days!', rating: 5, avatar: 'YA', color: '#DC2626', bg: '#FEF2F2', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
              ]).map((t, i) => (
                <div key={i} className="flex-shrink-0 w-[340px] bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#02a95c]/30 transition-all duration-300">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role} · {t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS STYLE SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#F9F6EF] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-bold text-gray-800">4.9</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">(2,847 reviews)</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">Why Ghanaians Trust Us</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Join thousands of verified fundraisers and donors who have made a real difference.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review Card 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#02a95c]/20 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">"Nkabom Fund changed my life. Within 2 weeks of launching my campaign for my mother's surgery, I had raised the full amount. The ID verification gave my donors confidence, and the MoMo payments were seamless."</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-[#02a95c] to-[#0B4D2B] rounded-full flex items-center justify-center text-white font-bold text-lg">AK</div>
                <div>
                  <p className="font-bold text-gray-900">Akua Korkor</p>
                  <p className="text-sm text-gray-500">Accra · Medical Campaign</p>
                  <p className="text-xs text-[#02a95c] font-semibold">Raised GHS 32,000</p>
                </div>
              </div>
            </div>
            
            {/* Review Card 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#02a95c]/20 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">"As a small NGO, raising funds was always a challenge. Nkabom Fund's verified badge helped us raise 40% more than our previous campaigns. The platform is intuitive and the support team is incredible."</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-full flex items-center justify-center text-white font-bold text-lg">EM</div>
                <div>
                  <p className="font-bold text-gray-900">Emmanuel Mensah</p>
                  <p className="text-sm text-gray-500">Tamale · NGO Director</p>
                  <p className="text-xs text-[#7C3AED] font-semibold">Raised GHS 156,000</p>
                </div>
              </div>
            </div>
            
            {/* Review Card 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#02a95c]/20 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">"I was skeptical about online fundraising, but the AI storytelling feature helped me craft a compelling campaign. I exceeded my GHS 15,000 goal in just 10 days! The diaspora community was especially generous."</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full flex items-center justify-center text-white font-bold text-lg">YA</div>
                <div>
                  <p className="font-bold text-gray-900">Yaw Antwi</p>
                  <p className="text-sm text-gray-500">Kumasi · Education Campaign</p>
                  <p className="text-xs text-[#F59E0B] font-semibold">Raised GHS 18,500</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6">
            {[
              { icon: '✓', text: 'SOCAN Award 2024' },
              { icon: '✓', text: 'Verified NGO Platform' },
              { icon: '✓', text: 'Data Protection Compliant' },
              { icon: '✓', text: 'Bank of Ghana Registered' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-[#02a95c] font-bold">{badge.icon}</span>
                <span className="text-sm font-medium text-gray-700">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-[#0B4D2B] rounded-3xl px-8 py-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 kente-bar opacity-60" />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #F6A800 0, #F6A800 1px, transparent 0, transparent 30%)", backgroundSize: '16px 16px' }}
          />
          <div className="relative">
            <p className="text-[#F6A800] font-bold text-sm uppercase tracking-wider mb-3">Ready to start?</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Your community is ready<br />to support you.
            </h2>
            <p className="text-green-200 mb-8 max-w-md mx-auto">
              Thousands of Ghanaians have already raised funds for medical bills, school fees, funerals, and businesses. You can too.
            </p>
            <Link
              to={user ? '/explore' : '/login'}
              className="inline-flex items-center gap-2 bg-[#F6A800] hover:bg-[#D48E00] text-[#3D2A00] font-bold px-8 py-4 rounded-2xl transition-colors shadow-gold text-base"
            >
              Start a Campaign Today <ArrowRight size={18} />
            </Link>

            {/* TRUST INDICATORS UNDER CTA */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-green-200">
                <Lock size={14} className="text-[#F6A800]" />
                End-to-end Secure Payments
              </div>
              <div className="flex items-center gap-3 grayscale opacity-70">
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Powered by</span>
                <div className="flex gap-3 text-[10px] font-black items-center">
                  <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085018/newmo_vwzw4r.png" className="h-4 w-auto brightness-0 invert" alt="MTN MoMo" />
                  <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085086/tele_1_wfgluk.png" className="h-4 w-auto brightness-0 invert" alt="Telecel" />
                  <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085165/download_1_jclht6.jpg" className="h-4 w-auto brightness-0 invert" alt="AirtelTigo" />
                  <svg className="h-5 w-auto" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="20" rx="3" fill="white"/>
                    <text x="30" y="14" textAnchor="middle" fill="#1A1F71" fontSize="8" fontWeight="bold" fontFamily="Arial">VISA</text>
                  </svg>
                  <svg className="h-5 w-auto" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="25" rx="4" fill="white"/>
                    <circle cx="15" cy="12.5" r="8" fill="#EB001B"/>
                    <circle cx="25" cy="12.5" r="8" fill="#F79E1B"/>
                    <path d="M20 6.5C21.5 7.9 22.5 9.9 22.5 12.5C22.5 15.1 21.5 17.1 20 18.5C18.5 17.1 17.5 15.1 17.5 12.5C17.5 9.9 18.5 7.9 20 6.5Z" fill="#FF5F00"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {donateTarget && (
        <DonationModal campaign={donateTarget} onClose={() => setDonateTarget(null)} />
      )}
    </div>
  )
}
