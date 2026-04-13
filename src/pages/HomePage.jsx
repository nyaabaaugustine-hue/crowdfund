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
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070',
    title: "Support Education in Rural Ghana",
    subtitle: "Help us put tablets in the hands of 500 students this year."
  },
  {
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2089',
    title: "Emergency Medical Relief",
    subtitle: "Providing critical care and surgery funds for those in need."
  },
  {
    image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=2070',
    title: "Small Business, Big Dreams",
    subtitle: "Empowering local artisans and traders to expand their reach."
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
                      <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085269/Visa-Logo-2006_vrk179.png" className="h-4 w-auto object-contain" alt="Visa" />
                      <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085228/mastr_sotqfd.jpg" className="h-4 w-auto object-contain" alt="Mastercard" />
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
            <h2 className="font-display font-bold text-3xl text-gray-900">GhCrowd Stories & News</h2>
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
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-3">How GhCrowd Works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Simple, transparent, and made for Ghana.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Create Your Campaign', desc: 'Share your story with photos, your goal, and why people should care. Takes 5 minutes.', icon: '📝' },
            { step: '02', title: 'Share & Spread the Word', desc: 'Share on WhatsApp, Facebook, and by word of mouth. Our platform amplifies your reach.', icon: '📢' },
            { step: '03', title: 'Receive Funds via MoMo', desc: 'Donations come in via MTN MoMo, Vodafone Cash, or card. Funds are transferred directly.', icon: '📱' },
          ].map((item, i) => (
            <div key={item.step} className="text-center anim-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 bg-[#EDFAF2] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                {item.icon}
              </div>
              <div className="text-xs font-bold text-[#0B4D2B] uppercase tracking-widest mb-2">{item.step}</div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
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
                  <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085269/Visa-Logo-2006_vrk179.png" className="h-4 w-auto brightness-0 invert" alt="Visa" />
                  <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085228/mastr_sotqfd.jpg" className="h-4 w-auto brightness-0 invert" alt="Mastercard" />
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
