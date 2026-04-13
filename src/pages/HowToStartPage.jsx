import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Play, ArrowRight, Shield, Clock, Users, CreditCard, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const STEPS = [
  { step: '1', title: 'Start with the basics', desc: 'Create your account and enter your name, location, and the category that best fits your cause. Whether it is medical, education, funeral, or a community project, being specific helps donors find you.', icon: '📝' },
  { step: '2', title: 'Verify your identity', desc: 'Submit your Ghana Card, Passport, or Driver License for verification. This protects both you and your donors, building trust that your campaign is legitimate.', icon: '🪪', badge: 'Required' },
  { step: '3', title: 'Tell your compelling story', desc: 'This is the most important part. Explain who you are raising money for and why it matters. Use real photos and even a short video. Our AI-assisted storytelling on Nkabom Fund can help you refine your message for maximum impact.', icon: '📖' },
  { step: '4', title: 'Set your fundraising goal', desc: 'Calculate exactly how much you need and break it down if helpful. Be transparent about the costs involved. You can always increase your goal later if the need grows.', icon: '🎯' },
  { step: '5', title: 'Submit for review', desc: 'Our team reviews your campaign within 24 hours to ensure all details are accurate and meet our guidelines. Once approved, your campaign goes live!', icon: '✅', badge: '24hr review' },
  { step: '6', title: 'Share with your network', desc: 'Share your campaign link via WhatsApp, Facebook, Twitter, and Instagram. Personal messages to friends and family often bring the first crucial donations.', icon: '📢' },
  { step: '7', title: 'Receive funds via MoMo', desc: 'Donations come in via MTN MoMo, Telecel Cash, AirtelTigo, or card. Funds are transferred directly to your Mobile Money wallet or bank account.', icon: '💰' },
]

const ID_OPTIONS = [
  { icon: '🪪', title: 'Ghana Card', desc: 'National ID card (most preferred)', verified: true },
  { icon: '🛂', title: 'Passport', desc: 'Valid Ghanaian passport', verified: true },
  { icon: '🚗', title: 'Driver License', desc: 'Valid Ghanaian driver license', verified: true },
]

const WHY_VERIFY = [
  { icon: Shield, title: 'Builds Trust', desc: 'Verified campaigns raise 3x more than unverified ones' },
  { icon: Clock, title: 'Fast Processing', desc: 'ID verification takes just 1 business day' },
  { icon: Users, title: 'Protects Everyone', desc: 'Safeguards donors and beneficiaries alike' },
  { icon: CreditCard, title: 'Enables Disbursement', desc: 'Required to receive funds securely' },
]

export default function HowToStartPage() {
  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0B4D2B] to-[#065F46] text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-6">
            Start Your Fundraiser
          </h1>
          <p className="text-green-200 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Everything you need to know about setting up a successful fundraiser in Ghana. 
            From identity verification to receiving your first donation.
          </p>
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 bg-[#F6A800] hover:bg-[#D48E00] text-[#3D2A00] font-black px-8 py-4 rounded-2xl transition-all text-lg shadow-lg"
          >
            Get Started Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* ID Verification Section - Priority */}
        <section className="bg-white rounded-3xl p-8 mb-16 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#02a95c] to-[#0B4D2B] rounded-2xl flex items-center justify-center text-2xl">
              🪪
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl text-gray-900">Identity Verification</h2>
              <p className="text-sm text-gray-500">The first step to launching your campaign</p>
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-8">
            At Nkabom Fund, we take trust seriously. Before you can receive donations, we verify your identity 
            using an accepted Ghanaian ID document. This protects your donors and ensures funds reach the 
            right person.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {ID_OPTIONS.map((id) => (
              <div key={id.title} className="bg-[#F9F6EF] rounded-2xl p-5 border border-gray-100">
                <div className="text-3xl mb-3">{id.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{id.title}</h3>
                <p className="text-sm text-gray-500">{id.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-[#EDFAF2] rounded-2xl p-6">
            <h3 className="font-bold text-[#0B4D2B] mb-4">Why we verify IDs:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_VERIFY.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#02a95c]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-[#02a95c]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-16">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-8 text-center">Your Step-by-Step Guide</h2>
          
          <div className="space-y-8">
            {STEPS.map((item, index) => (
              <div key={item.step} className="relative flex flex-col sm:flex-row gap-6 items-start">
                {/* Connector Line */}
                {index < STEPS.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-[calc(100%-2rem)] bg-gradient-to-b from-[#02a95c] to-gray-200 hidden sm:block" />
                )}
                
                <div className="flex sm:flex-col items-center gap-4 sm:gap-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 ${item.badge ? 'bg-[#02a95c] text-white' : 'bg-white border-2 border-[#02a95c] text-[#02a95c]'}`}>
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold text-[#02a95c] bg-[#EDFAF2] px-2 py-1 rounded-full sm:mt-2 whitespace-nowrap">
                      {item.badge}
                    </span>
                  )}
                </div>
                
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                    Step {item.step}: {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="bg-white rounded-3xl p-8 mb-16 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#F6A800] rounded-2xl flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <h2 className="font-display font-bold text-2xl text-gray-900">Tips for Success</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { tip: 'Share personal stories', detail: 'Donors connect with real human stories. Be authentic and vulnerable.' },
              { tip: 'Use real photos', detail: 'Real photos of the beneficiary build trust. Avoid stock images.' },
              { tip: 'Update regularly', detail: 'Post weekly updates showing progress. Thank donors by name.' },
              { tip: 'Leverage WhatsApp', detail: 'Personal messages to close contacts first, then expand to groups.' },
            ].map((t) => (
              <div key={t.tip} className="flex gap-4 p-4 bg-[#F9F6EF] rounded-xl">
                <CheckCircle size={20} className="text-[#02a95c] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">{t.tip}</p>
                  <p className="text-sm text-gray-500">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[#02a95c] to-[#0B4D2B] rounded-3xl p-10 text-white">
            <h2 className="font-display font-bold text-3xl mb-4">Ready to Make a Difference?</h2>
            <p className="text-green-200 mb-8 max-w-md mx-auto">
              Join thousands of Ghanaians who have successfully raised funds for causes that matter.
            </p>
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 bg-white text-[#0B4D2B] font-black px-10 py-4 rounded-2xl text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Start Your Fundraiser <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}