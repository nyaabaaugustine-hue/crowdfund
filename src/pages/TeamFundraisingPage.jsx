import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Target, Heart, ArrowRight, CheckCircle, TrendingUp, Zap, UserPlus, Share2, Trophy, ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const BENEFITS = [
  {
    icon: Users,
    title: 'Reach 5× More People',
    desc: 'When five people share a campaign, you reach five different circles of friends, family, and colleagues. Team campaigns consistently raise more.',
    stat: '5×',
    statLabel: 'avg. reach multiplier',
    color: '#3B82F6',
    bg: '#EFF6FF',
  },
  {
    icon: Target,
    title: 'Divide and Conquer',
    desc: 'Assign roles inside your team. One person writes updates, another handles social media, another manages offline outreach. Less work for everyone.',
    stat: '40%',
    statLabel: 'faster to goal',
    color: '#0B4D2B',
    bg: '#EDFAF2',
  },
  {
    icon: Trophy,
    title: 'Friendly Leaderboard',
    desc: "Each team member gets a personal fundraising page. See who's bringing in the most donors — the healthy competition is surprisingly effective.",
    stat: '3×',
    statLabel: 'more donors average',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
  {
    icon: Zap,
    title: 'Shared Momentum',
    desc: 'When one team member gets a donation, everyone sees it. The energy keeps the whole team motivated through the full campaign duration.',
    stat: '87%',
    statLabel: 'completion rate',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
]

const TEAM_TYPES = [
  { emoji: '⛪', label: 'Churches', desc: 'Congregation-led campaigns for community members in need' },
  { emoji: '🏫', label: 'Schools', desc: 'Student and alumni fundraisers for facilities and scholarships' },
  { emoji: '⚽', label: 'Sports Teams', desc: 'Equipment, travel, and tournament fundraising' },
  { emoji: '👨‍👩‍👧', label: 'Families', desc: 'Extended family pooling resources for medical or funeral costs' },
  { emoji: '🏢', label: 'Workplaces', desc: 'Colleagues supporting a coworker in need' },
  { emoji: '🎓', label: 'Alumni Groups', desc: 'Old students giving back to their school or a classmate' },
  { emoji: '🤲', label: 'NGOs', desc: 'Coordinated multi-team fundraising for your organisation' },
  { emoji: '🕌', label: 'Mosques', desc: 'Community fundraising through faith networks' },
]

const HOW_IT_WORKS = [
  { icon: UserPlus, step: '01', title: 'Create your team campaign', desc: 'One person sets up the campaign, adds a team name, and sets the shared goal. Takes 5 minutes.' },
  { icon: Share2, step: '02', title: 'Invite your teammates', desc: 'Share a private link with each team member. They get their own personal fundraising page linked to the main campaign.' },
  { icon: TrendingUp, step: '03', title: 'Track progress together', desc: 'Everyone can see the team leaderboard, total raised, and individual contributions in real-time.' },
  { icon: Heart, step: '04', title: 'Hit the goal together', desc: 'All donations flow into the single campaign. Once the goal is reached, funds are disbursed to the beneficiary.' },
]

const TESTIMONIAL = {
  quote: "Our church raised GHS 48,000 in 12 days for Brother Yaw's surgery. The team feature meant that 8 different families were each sharing the link to their own circles. We had no idea it would work so well.",
  name: 'Pastor Emmanuel A.',
  church: 'Emmanuel Baptist Church, Kumasi',
  raised: '₵48,000',
  days: 12,
}

export default function TeamFundraisingPage() {
  const [activeType, setActiveType] = useState(null)

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Users size={15} /> Team Fundraising
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[3.25rem] text-gray-900 mb-6 leading-tight">
                Raise more,<br />
                together.
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                Team campaigns on Nkabom Fund consistently raise 3× more than solo campaigns.
                Invite your church, family, school, or workplace and watch what happens when a community
                rallies behind a single cause.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/login" className="inline-flex items-center gap-2 bg-[#0B4D2B] hover:bg-[#065F46] text-white font-black px-8 py-4 rounded-xl transition-all shadow-md text-base">
                  Start a Team Campaign <ArrowRight size={18} />
                </Link>
                <a href="#how-it-works" className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all text-base">
                  See How It Works <ChevronDown size={18} />
                </a>
              </div>
            </div>

            {/* Visual stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '3×', label: 'more raised vs solo', color: '#0B4D2B', bg: '#EDFAF2' },
                { value: '48h', label: 'avg. time to first donation', color: '#3B82F6', bg: '#EFF6FF' },
                { value: '87%', label: 'team campaigns hit goal', color: '#F59E0B', bg: '#FFFBEB' },
                { value: '1,200+', label: 'team campaigns launched', color: '#7C3AED', bg: '#F5F3FF' },
              ].map((stat, i) => (
                <div key={i} className="rounded-3xl p-6 border-2 border-transparent hover:border-gray-200 transition-all" style={{ backgroundColor: stat.bg }}>
                  <p className="font-display font-black text-3xl sm:text-4xl mb-1" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs font-semibold text-gray-500 leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-3">Why team fundraising works</h2>
          <p className="text-gray-500 max-w-lg mx-auto">The math is simple: more people sharing = more people donating.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {BENEFITS.map(({ icon: Icon, title, desc, stat, statLabel, color, bg }) => (
            <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-all flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: bg }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div className="text-center">
                  <p className="font-display font-black text-xl" style={{ color }}>{stat}</p>
                  <p className="text-[10px] text-gray-400 leading-tight whitespace-nowrap">{statLabel}</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-3">Set up your team in minutes</h2>
            <p className="text-gray-500 max-w-md mx-auto">Four simple steps from idea to your first team donation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }, i) => (
              <div key={step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute top-6 left-[calc(50%+28px)] right-[-50%] h-px bg-dashed border-t-2 border-dashed border-gray-200 hidden lg:block" />
                )}
                <div className="bg-[#F9F6EF] rounded-2xl p-6 relative">
                  <div className="w-12 h-12 bg-[#0B4D2B] text-white rounded-xl flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <span className="absolute top-4 right-4 text-xs font-black text-gray-300">{step}</span>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-3">Who uses team fundraising?</h2>
          <p className="text-gray-500">Everyone from churches to sports clubs. Click to learn more.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
          {TEAM_TYPES.map(({ emoji, label, desc }) => (
            <button
              key={label}
              onClick={() => setActiveType(activeType === label ? null : label)}
              className={`rounded-2xl p-5 text-left border-2 transition-all ${
                activeType === label
                  ? 'border-[#0B4D2B] bg-[#EDFAF2] shadow-md'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <span className="text-3xl block mb-3">{emoji}</span>
              <p className={`font-bold text-sm ${activeType === label ? 'text-[#0B4D2B]' : 'text-gray-900'}`}>{label}</p>
            </button>
          ))}
        </div>
        {activeType && (
          <div className="bg-[#EDFAF2] border border-[#9ADDB8] rounded-2xl p-5 flex items-center gap-4 anim-fade-in">
            <span className="text-3xl">{TEAM_TYPES.find(t => t.label === activeType)?.emoji}</span>
            <div>
              <p className="font-bold text-[#0B4D2B]">{activeType}</p>
              <p className="text-sm text-gray-600">{TEAM_TYPES.find(t => t.label === activeType)?.desc}</p>
            </div>
            <Link to="/login" className="ml-auto flex items-center gap-1.5 bg-[#0B4D2B] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex-shrink-0">
              Start Campaign <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </section>

      {/* Testimonial */}
      <section className="bg-gradient-to-br from-[#0B4D2B] to-[#065F46] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[1,2,3,4,5].map(i => <span key={i} className="text-[#F6A800] text-xl">★</span>)}
          </div>
          <blockquote className="font-display text-2xl sm:text-3xl font-bold text-white leading-relaxed mb-8 italic">
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-[#F6A800] rounded-full flex items-center justify-center font-black text-[#3D2A00] text-sm">EA</div>
            <div className="text-left">
              <p className="font-bold text-white">{TESTIMONIAL.name}</p>
              <p className="text-green-300 text-sm">{TESTIMONIAL.church}</p>
            </div>
            <div className="ml-8 text-center hidden sm:block">
              <p className="font-display font-black text-2xl text-[#F6A800]">{TESTIMONIAL.raised}</p>
              <p className="text-green-300 text-xs">raised in {TESTIMONIAL.days} days</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">Ready to rally your people?</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Create your team campaign in under 5 minutes. No technical skills required.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/login" className="inline-flex items-center gap-2 bg-[#0B4D2B] hover:bg-[#065F46] text-white font-black px-10 py-4 rounded-xl transition-all shadow-md text-base">
              Start Your Team Campaign <ArrowRight size={18} />
            </Link>
            <Link to="/start" className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all text-base">
              Learn More First
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">Free to create · No monthly fees · 3% platform fee on successful campaigns</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
