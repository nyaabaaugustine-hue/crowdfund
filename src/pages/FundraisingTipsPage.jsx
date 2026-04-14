import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, Lightbulb, Share2, ShieldCheck, TrendingUp, Clock,
  ArrowRight, CheckCircle, MessageCircle, Camera, RefreshCw, Target, Users
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CORE_TIPS = [
  {
    icon: Share2,
    title: 'Start with WhatsApp',
    badge: '#1 tip',
    desc: 'In Ghana, WhatsApp is your most powerful tool — not Facebook, not Instagram. Send a personal message to your closest 10 contacts before posting anywhere publicly. Personal outreach converts at 4× the rate of public posts.',
    stat: '4×',
    statDesc: 'higher conversion vs public posts',
    color: '#25D366',
    bg: '#F0FFF4',
  },
  {
    icon: RefreshCw,
    title: 'Post weekly updates',
    badge: 'Highest impact',
    desc: 'Campaigns that post at least one update per week raise 3× more than silent campaigns. Updates don\'t need to be long — a single photo with two sentences showing progress is enough to re-engage past donors and attract new ones.',
    stat: '3×',
    statDesc: 'more raised with weekly updates',
    color: '#0B4D2B',
    bg: '#EDFAF2',
  },
  {
    icon: Camera,
    title: 'Real photos win',
    badge: 'Trust builder',
    desc: 'Campaigns with real, personal photos raise 58% more than those without photos. The photo doesn\'t need to be professional — a clear, genuine image of the beneficiary or situation creates immediate emotional connection.',
    stat: '58%',
    statDesc: 'more raised with real photos',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    icon: Target,
    title: 'Be specific about the goal',
    badge: 'Transparency',
    desc: 'Donors are more likely to give when they understand exactly where their money goes. Instead of "Help me raise GHS 10,000," say "GHS 3,200 covers Cycle 2 of chemo · GHS 6,400 covers cycles 3-4." Specificity builds trust.',
    stat: '47%',
    statDesc: 'more trust with itemised goals',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
  {
    icon: Users,
    title: 'Thank donors by name',
    badge: 'Retention',
    desc: 'Naming donors in your campaign updates ("Thank you Kwame, Abena, and Joseph for your generosity") makes them feel seen and dramatically increases the chance they\'ll donate again and share the campaign.',
    stat: '2.1×',
    statDesc: 'repeat donation rate',
    color: '#0891B2',
    bg: '#ECFEFF',
  },
  {
    icon: Clock,
    title: 'Create urgency',
    badge: 'Momentum',
    desc: 'Campaigns with clear deadlines outperform open-ended ones. "The surgery is scheduled for March 15" or "Fees must be paid by Friday" give donors a concrete reason to act now rather than later.',
    stat: '39%',
    statDesc: 'faster to goal with deadlines',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
]

const IDEAS = [
  { emoji: '🎂', title: 'Birthday Fundraiser', desc: 'Ask friends to donate to your cause instead of buying a gift. Works exceptionally well on Facebook and WhatsApp.' },
  { emoji: '⚽', title: 'Charity Match', desc: 'Organise a local football match. Admission fees, pledges per goal, or team entry fees all contribute to the campaign.' },
  { emoji: '✂️', title: 'Skills for Good', desc: 'Offer a skill (tutoring, hair styling, catering, driving) with proceeds going to the campaign. Builds community support.' },
  { emoji: '🚶', title: 'Walkathon', desc: 'Walk or cycle a set distance and ask people to sponsor you per kilometre. Popular at schools and workplaces.' },
  { emoji: '🕯️', title: 'Memorial Giving', desc: 'Honour a loved one\'s memory by raising funds for a cause they cared about. Often drives large diaspora donations.' },
  { emoji: '🏫', title: 'Classroom Drive', desc: 'Partner with a teacher to raise funds for specific supplies, repairs, or a library. Community rallies behind schools.' },
  { emoji: '🍽️', title: 'Community Dinner', desc: 'Sell tickets for a community meal. Works well for churches, alumni groups, and neighbourhoods.' },
  { emoji: '🎤', title: 'Talent Show', desc: 'Charge entry and voting fees at a local talent competition. Entertainment makes giving fun.' },
  { emoji: '👗', title: 'Clothes Drive', desc: 'Collect and sell second-hand clothing with proceeds to the campaign. Zero upfront cost.' },
]

const COMMON_MISTAKES = [
  { mistake: 'Launching without a personal message', fix: 'Message your closest 5 people before making the campaign public. Cold launches underperform by 60%.' },
  { mistake: 'A title that\'s too vague', fix: '"Help Akua fight breast cancer" beats "Medical support needed". Names and specifics create emotional connection.' },
  { mistake: 'No photo or a bad photo', fix: 'Use a clear, real, recent photo of the beneficiary. Avoid stock images or blurry phone shots.' },
  { mistake: 'No updates after launch', fix: 'Post at least once a week, even if it\'s just "We are at 60% — thank you! Here\'s what your money is doing."' },
  { mistake: 'Asking for too much at once', fix: 'Break your goal into phases if it\'s large. "Phase 1: GHS 8,000 for the first surgery" is more approachable.' },
]

export default function FundraisingTipsPage() {
  const [openMistake, setOpenMistake] = useState(null)

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-18">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FFFBEB] text-[#92400E] px-4 py-2 rounded-full text-sm font-bold mb-5">
              <Lightbulb size={15} className="text-[#F59E0B]" /> The Ultimate Fundraising Guide
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-gray-900 mb-5 leading-tight">
              Turn your cause into<br />
              <span className="text-[#0B4D2B]">a movement.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl mb-8">
              Data-backed tips from 5,000+ campaigns on Nkabom Fund. Learn exactly what separates
              the campaigns that fly from the ones that stall.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {['6 core tips', '9 campaign ideas', '5 mistakes to avoid'].map(item => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-[#0B4D2B]" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Core tips */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-2">6 tips that actually move the needle</h2>
            <p className="text-gray-500">Based on analysis of the top 500 campaigns on Nkabom Fund.</p>
          </div>
          <div className="space-y-4">
            {CORE_TIPS.map(({ icon: Icon, title, badge, desc, stat, statDesc, color, bg }, i) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all flex gap-6">
                {/* Number */}
                <div className="flex-shrink-0 text-right hidden sm:block w-6">
                  <span className="font-display font-black text-2xl text-gray-200">{i + 1}</span>
                </div>
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                  <Icon size={22} style={{ color }} />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: bg, color }}>{badge}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
                {/* Stat */}
                <div className="flex-shrink-0 text-right hidden md:block">
                  <p className="font-display font-black text-2xl" style={{ color }}>{stat}</p>
                  <p className="text-[10px] text-gray-400 max-w-[90px] leading-tight">{statDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Trust section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#0B4D2B] to-[#065F46] rounded-3xl p-8 sm:p-10 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-5">
                  <ShieldCheck size={26} className="text-[#F6A800]" />
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl mb-4">The Trust Factor</h2>
                <p className="text-green-100 leading-relaxed mb-4">
                  Transparency isn't just nice to have — it's the single biggest driver of donations. Our data shows that campaigns with verified organisers and detailed expense breakdowns raise 2.8× more than opaque campaigns.
                </p>
                <p className="text-green-200 text-sm leading-relaxed">
                  If you're raising for surgery: name the hospital. If for school fees: name the institution and share the invoice. If for a funeral: share the quotes you've received. Specificity is proof.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Verified organiser', boost: '+140% donations' },
                  { label: 'Real photos', boost: '+58% donations' },
                  { label: 'Itemised budget', boost: '+47% donations' },
                  { label: 'Weekly updates', boost: '+210% donations' },
                ].map(({ label, boost }) => (
                  <div key={label} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-sm font-black text-[#F6A800]">{boost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ideas */}
        <section id="ideas" className="mb-16">
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-2">9 Creative Fundraising Ideas</h2>
            <p className="text-gray-500">Beyond just posting a link. These approaches have worked for Ghanaian campaigns.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IDEAS.map((idea) => (
              <div key={idea.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#0B4D2B]/20 hover:shadow-md transition-all">
                <span className="text-3xl block mb-3">{idea.emoji}</span>
                <h4 className="font-bold text-gray-900 mb-2">{idea.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{idea.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-2">5 Mistakes That Kill Campaigns</h2>
            <p className="text-gray-500">Avoid these — they're the reason most campaigns stall at 20%.</p>
          </div>
          <div className="space-y-3">
            {COMMON_MISTAKES.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenMistake(openMistake === i ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-xs font-black flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-bold text-gray-900 flex-1">{item.mistake}</span>
                  <span className={`flex-shrink-0 text-lg transition-transform ${openMistake === i ? 'rotate-45' : ''}`} style={{ color: openMistake === i ? '#0B4D2B' : '#9CA3AF' }}>+</span>
                </button>
                {openMistake === i && (
                  <div className="px-6 pb-5 anim-fade-in">
                    <div className="h-px bg-gray-100 mb-4" />
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[#0B4D2B] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-sm leading-relaxed"><span className="font-bold text-gray-800">Fix: </span>{item.fix}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-[#F0EDE4] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Ready to put these tips to work?</h3>
              <p className="text-gray-500 text-sm">Start your campaign with the confidence to succeed.</p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link to="/login" className="inline-flex items-center gap-2 bg-[#0B4D2B] hover:bg-[#065F46] text-white font-black px-7 py-3.5 rounded-xl transition-all text-sm">
                Start a Campaign <ArrowRight size={16} />
              </Link>
              <Link to="/start" className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-7 py-3.5 rounded-xl hover:bg-white transition-all text-sm">
                Step-by-Step Guide
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
