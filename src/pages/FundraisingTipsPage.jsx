import React from 'react'
import { Sparkles, Lightbulb, Share2, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FundraisingTipsPage() {
  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-3xl mb-16">
          <h1 className="font-display font-black text-5xl text-gray-900 mb-6">The ultimate fundraising tips guide</h1>
          <p className="text-gray-500 text-xl leading-relaxed">How to turn a good cause into a great movement. Learn from the most successful organizers on GhCrowd.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4 text-[#02a95c]">
                <Sparkles size={24} />
                <h3 className="font-bold text-xl">Power of the update</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Campaigns that post weekly updates raise 3x more. Donors love to see progress, even if it is small. Share a photo of the beneficiary or a quick thank you note.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4 text-[#02a95c]">
                <Share2 size={24} />
                <h3 className="font-bold text-xl">The WhatsApp Strategy</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">In Ghana, WhatsApp is your strongest tool. Send personalized messages to your closest 10 friends before posting on social media. Momentum is key.</p>
            </div>
          </div>
          <div className="bg-[#02a95c] rounded-3xl p-10 text-white flex flex-col justify-center">
            <ShieldCheck size={48} className="mb-6 opacity-50" />
            <h2 className="font-display font-bold text-3xl mb-4 text-white">The Trust Factor</h2>
            <p className="text-green-50 leading-relaxed">Transparency builds trust. Be clear about how funds will be used. If you are raising money for a surgery, mention the hospital. If for a school, mention the village. Verified campaigns see higher donation volumes.</p>
          </div>
        </div>

        <div id="ideas" className="pt-16 border-t border-gray-200">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-8">Ideas to spark your creativity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Birthday Fundraisers', desc: 'Ask friends to donate to your favorite cause instead of buying you a gift.' },
              { title: 'Community Events', desc: 'Organize a local football match or a clean-up exercise to raise awareness.' },
              { title: 'Skills for Good', desc: 'Offer a service (like tutoring or hair braiding) and have the payment go to your campaign.' },
              { title: 'Challenge Yourself', desc: 'Walk or cycle a certain distance and ask people to sponsor your effort.' },
              { title: 'Memorial Giving', desc: 'Honor the memory of a loved one by raising funds for a cause they cared about.' },
              { title: 'Classroom Needs', desc: 'Partner with local teachers to fund specific supplies or building repairs.' }
            ].map((idea, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#02a95c] transition-colors">
                <Lightbulb className="text-yellow-500 mb-4" size={20} />
                <h4 className="font-bold text-gray-900 mb-2">{idea.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{idea.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}