import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck, Heart, HelpCircle, ArrowRight, Lock, Star,
  CheckCircle, MessageCircle, CreditCard, Globe, RefreshCw, Eye
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const GUARANTEE_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'The Giving Guarantee',
    desc: 'If a campaign is found to be fraudulent, we will refund your donation in full — no questions asked.',
    color: '#0B4D2B',
    bg: '#EDFAF2',
  },
  {
    icon: Eye,
    title: 'Campaign Transparency',
    desc: 'Every approved campaign publishes full disbursement reports. You can see exactly where your money went.',
    color: '#3B82F6',
    bg: '#EFF6FF',
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Updates',
    desc: 'Campaign organisers are required to post regular updates. You get notified every time there is progress.',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    desc: 'All transactions are encrypted end-to-end. We never store your card details or MoMo PIN.',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
]

const FAQ = [
  {
    q: 'How do I know a fundraiser is legitimate?',
    a: 'Every campaign organiser is identity-verified using a Ghana Card, Passport, or Driver License. A "Verified" badge on the campaign means our team has confirmed the organiser\'s identity. We also review campaign stories for consistency and authenticity before approval.',
  },
  {
    q: 'Can I donate from outside Ghana?',
    a: 'Absolutely. International donors can use Visa or Mastercard from anywhere in the world. Your donation is converted to GHS and delivered directly to the campaign via Mobile Money or bank transfer.',
  },
  {
    q: 'How do I get a receipt for my donation?',
    a: 'A digital receipt is automatically sent to your email address immediately after your donation is processed. It includes a transaction reference number, campaign name, and amount. Keep this for your records.',
  },
  {
    q: 'What happens if a campaign doesn\'t reach its goal?',
    a: 'Nkabom Fund uses a flexible funding model. All donations received are still sent to the campaign organiser, even if the full goal isn\'t reached. The organiser uses what\'s available and may continue raising funds if needed.',
  },
  {
    q: 'Can I donate anonymously?',
    a: 'Yes. During the donation process, you can tick "Donate anonymously" and your name will appear as "Anonymous" on the public donor list. Your identity is still recorded internally for security and fraud prevention purposes.',
  },
  {
    q: 'How quickly does the campaign organiser receive the funds?',
    a: 'Once a campaign is approved for disbursement, funds are transferred within 24 hours via Mobile Money or bank transfer. Emergency relief campaigns are prioritised and may be processed same-day.',
  },
]

const PAYMENT_METHODS = [
  { name: 'MTN MoMo', logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085018/newmo_vwzw4r.png', desc: 'Instant donation via MTN Mobile Money' },
  { name: 'Telecel Cash', logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085086/tele_1_wfgluk.png', desc: 'Telecel Cash donations' },
  { name: 'AirtelTigo', logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085165/download_1_jclht6.jpg', desc: 'AirtelTigo Money donations' },
]

export default function SupporterSpacePage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#EDFAF2] text-[#0B4D2B] px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Heart size={15} /> Supporter Space
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
              Your complete guide<br />
              <span className="text-[#0B4D2B]">to giving safely.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl mb-8">
              Everything you need to donate with confidence. Your trust is our most valuable asset —
              here is exactly how we protect it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/explore" className="inline-flex items-center gap-2 bg-[#0B4D2B] hover:bg-[#065F46] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                Find a Campaign to Support <ArrowRight size={16} />
              </Link>
              <a href="#faq" className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                Read FAQs <HelpCircle size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-2">How We Protect Your Donation</h2>
          <p className="text-gray-500 max-w-xl">Four pillars that ensure your generosity reaches the right people.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {GUARANTEE_FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-all flex gap-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                <Icon size={24} style={{ color }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment methods */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-4">
                Donate with what you already use.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                We support every major payment method Ghanaians use every day.
                Mobile Money donations land in seconds. Card payments are protected by Visa and Mastercard security standards.
              </p>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((pm) => (
                  <div key={pm.name} className="flex items-center gap-4 bg-[#F9F6EF] rounded-xl p-4 border border-gray-100">
                    <img src={pm.logo} alt={pm.name} className="h-8 w-auto object-contain" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{pm.name}</p>
                      <p className="text-xs text-gray-500">{pm.desc}</p>
                    </div>
                    <CheckCircle size={16} className="text-[#0B4D2B] ml-auto" />
                  </div>
                ))}
                <div className="flex items-center gap-4 bg-[#F9F6EF] rounded-xl p-4 border border-gray-100">
                  <div className="flex gap-2">
                    <svg className="h-8 w-auto" viewBox="0 0 60 24" fill="none"><rect width="60" height="24" rx="4" fill="#1A1F71"/><text x="30" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">VISA</text></svg>
                    <svg className="h-8 w-auto" viewBox="0 0 48 30" fill="none"><rect width="48" height="30" rx="5" fill="#F5F5F5"/><circle cx="18" cy="15" r="10" fill="#EB001B"/><circle cx="30" cy="15" r="10" fill="#F79E1B"/><path d="M24 7.8C25.8 9.5 27 12 27 15s-1.2 5.5-3 7.2C20.2 20.5 19 18 19 15s1.2-5.5 5-7.2Z" fill="#FF5F00"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Visa & Mastercard</p>
                    <p className="text-xs text-gray-500">International card donations accepted</p>
                  </div>
                  <CheckCircle size={16} className="text-[#0B4D2B] ml-auto" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0B4D2B] to-[#065F46] rounded-3xl p-8 text-white">
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} className="text-[#F6A800] fill-current" />)}
                <span className="text-green-200 text-sm ml-2">4.9 · 2,847 reviews</span>
              </div>
              <blockquote className="text-green-50 text-lg leading-relaxed mb-6 italic">
                "I donated to a medical campaign from London using my Visa card. The process was seamless,
                I got a receipt immediately, and the family updated the campaign two days later. Incredible platform."
              </blockquote>
              <div className="flex items-center gap-3 pt-5 border-t border-white/20">
                <div className="w-10 h-10 bg-[#F6A800] rounded-full flex items-center justify-center font-black text-[#3D2A00]">SK</div>
                <div>
                  <p className="font-bold text-sm">Samuel K.</p>
                  <p className="text-green-300 text-xs">London, UK · Verified Donor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F0EDE4] px-4 py-2 rounded-full text-sm font-bold text-gray-600 mb-4">
            <HelpCircle size={15} /> Frequently Asked Questions
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900">Got questions? We have answers.</h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 pr-4">{item.q}</span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-lg transition-transform ${openFaq === i ? 'rotate-45 bg-[#0B4D2B] text-white' : 'bg-gray-100 text-gray-500'}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 anim-fade-in">
                  <div className="h-px bg-gray-100 mb-4" />
                  <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Still need help */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-[#F0EDE4] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#0B4D2B] rounded-2xl flex items-center justify-center flex-shrink-0">
              <MessageCircle size={26} className="text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Still have questions?</h3>
              <p className="text-gray-500 text-sm">Our support team responds within 2 hours, 7 days a week.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:hello@nkabomfund.com.gh" className="inline-flex items-center gap-2 bg-[#0B4D2B] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#065F46] transition-colors text-sm">
              Email Support <ArrowRight size={16} />
            </a>
            <Link to="/explore" className="inline-flex items-center gap-2 border-2 border-[#0B4D2B] text-[#0B4D2B] font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors text-sm">
              Browse Campaigns
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
