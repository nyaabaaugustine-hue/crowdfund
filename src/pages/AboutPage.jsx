import { Link } from 'react-router-dom'
import { Heart, ArrowRight, Users, Shield, Zap, Globe, Award, CheckCircle, Star } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TEAM = [
  { name: 'Kojo Mensah', role: 'Founder & CEO', avatar: 'KM', color: '#0B4D2B', desc: 'Former fintech executive with 15 years in payments across Africa.' },
  { name: 'Efua Osei', role: 'Head of Operations', avatar: 'EO', color: '#7C3AED', desc: '10 years experience in NGO operations and community development.' },
  { name: 'Kwame Asante', role: 'Head of Technology', avatar: 'KA', color: '#F59E0B', desc: 'Software engineer who previously built payment systems at Interswitch.' },
  { name: 'Ama Boateng', role: 'Head of Trust & Safety', avatar: 'AB', color: '#DC2626', desc: 'Former fraud investigator from Ghana Commercial Bank.' },
]

const VALUES = [
  { icon: Shield, title: 'Trust & Verification', desc: 'Every campaign is identity-verified. We protect donors and beneficiaries alike.', color: '#0B4D2B' },
  { icon: Heart, title: '100% Transparency', desc: 'Real-time progress tracking, regular updates, and full financial visibility.', color: '#DC2626' },
  { icon: Globe, title: 'Pan-Ghana Reach', desc: 'From Accra to Tamale, we connect donors with causes across all 16 regions.', color: '#7C3AED' },
  { icon: Zap, title: 'Instant Disbursement', desc: 'Funds reach beneficiaries directly via Mobile Money within 24 hours of withdrawal.', color: '#F59E0B' },
]

const MILESTONES = [
  { year: '2022', event: 'Founded', desc: 'Nkabom Fund launched with 50 campaigns and 1,000 donors.' },
  { year: '2023', event: 'SOCAN Award', desc: 'Recognized for Innovation in Digital Finance at Ghana Tech Awards.' },
  { year: '2024', event: '10,000+ Campaigns', desc: 'Crossed GHS 5 million disbursed to verified campaigns.' },
  { year: '2025', event: 'NGO Partnership', desc: 'Partnership with Ghana Social Security Bank for instant payouts.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B4D2B] to-[#065F46] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="mb-6">
            <img 
              src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png" 
              alt="Nkabom Fund Logo" 
              className="w-20 h-20 mx-auto object-contain rounded-2xl shadow-2xl"
            />
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="w-2 h-2 bg-[#F6A800] rounded-full animate-pulse" />
            Our Story
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            Built in Ghana,<br />
            <span className="text-[#F6A800]">For Ghana.</span>
          </h1>
          <p className="text-green-100 text-xl leading-relaxed max-w-2xl mx-auto">
            Nkabom Fund was created to solve a simple problem: talented Ghanaians with legitimate needs 
            couldn't access the support they deserved. We built the platform to change that.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#02a95c]/10 px-4 py-2 rounded-full text-sm font-bold text-[#02a95c] mb-4">
                <CheckCircle size={16} /> Our Mission
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-6">
                Democratizing Access to<br />
                <span className="text-[#02a95c]">Crowdfunding in Ghana</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe every Ghanaian deserves a fair chance. Whether you're raising funds for medical bills, 
                education, a funeral, or a small business — you deserve a platform that works for you, 
                not against you.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                That's why we built Nkabom Fund: low fees, direct Mobile Money payouts, ID verification for trust, 
                and support in both English and local languages.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'GHS 5M+', label: 'Disbursed' },
                  { value: '10,000+', label: 'Campaigns' },
                  { value: '45+', label: 'Communities' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center bg-white rounded-2xl p-4 border border-gray-100">
                    <p className="font-display font-black text-2xl text-[#0B4D2B]">{stat.value}</p>
                    <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776100750/1776084234275_mzdnqt.jpg" 
                alt="Ghana community" 
                className="w-full h-[450px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#02a95c] rounded-xl flex items-center justify-center text-white text-xl">🇬🇭</div>
                  <div>
                    <p className="font-bold text-gray-900">Made in Ghana</p>
                    <p className="text-sm text-gray-500">By Ghanaians, for Ghanaians</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Our values aren't just words on a wall — they guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${value.color}15` }}>
                    <Icon size={24} style={{ color: value.color }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A small team with a big mission to transform crowdfunding in Ghana.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-all">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: member.color }}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-[#02a95c] font-semibold mb-3">{member.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From a small idea to Ghana's fastest-growing crowdfunding platform.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className={`flex flex-col md:flex-row items-center gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 inline-block">
                      <p className="text-[#02a95c] font-bold text-lg">{m.year}</p>
                      <h3 className="font-bold text-gray-900 mb-1">{m.event}</h3>
                      <p className="text-sm text-gray-500">{m.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#02a95c] rounded-full border-4 border-white shadow z-10 flex-shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-4">Trusted by Thousands</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Award, text: 'SOCAN Award 2024' },
              { icon: Shield, text: 'Bank of Ghana Verified' },
              { icon: CheckCircle, text: 'Data Protection Compliant' },
              { icon: Star, text: '4.9/5 User Rating' },
            ].map((badge) => {
              const Icon = badge.icon
              return (
                <div key={badge.text} className="flex items-center gap-3 bg-[#F9F6EF] rounded-xl px-4 py-3">
                  <Icon size={20} className="text-[#02a95c]" />
                  <span className="text-sm font-medium text-gray-700">{badge.text}</span>
                </div>
              )
            })}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/explore"
              className="inline-flex items-center justify-center gap-2 bg-[#02a95c] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#029350] transition-colors"
            >
              Explore Campaigns <ArrowRight size={18} />
            </Link>
            <Link 
              to="/start"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#E5DFD3] text-gray-700 font-bold px-8 py-4 rounded-xl hover:bg-[#F0EDE4] transition-colors"
            >
              Start a Campaign <Heart size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
