import React from 'react'
import { Users, Target, Heart, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TeamFundraisingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h1 className="font-display font-black text-5xl text-gray-900 mb-6 leading-tight">Fundraise together with a team</h1>
            <p className="text-gray-500 text-xl leading-relaxed mb-8">Harness the power of your community. Team fundraising allows multiple people to manage a campaign, share the work, and reach more donors.</p>
            <button className="bg-[#02a95c] hover:bg-[#029350] text-white font-black px-10 py-4 rounded-xl text-lg transition-all">Start a team campaign</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="aspect-square bg-blue-50 rounded-[40px] flex items-center justify-center text-4xl">👥</div>
             <div className="aspect-square bg-green-50 rounded-[40px] translate-y-8 flex items-center justify-center text-4xl">🚀</div>
             <div className="aspect-square bg-yellow-50 rounded-[40px] -translate-y-8 flex items-center justify-center text-4xl">🤝</div>
             <div className="aspect-square bg-purple-50 rounded-[40px] flex items-center justify-center text-4xl">🏆</div>
          </div>
        </div>

        <div className="border-y border-gray-100 py-20">
           <h2 className="font-display font-bold text-3xl text-gray-900 text-center mb-16">Why fundraise as a team?</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                 <Users className="mx-auto mb-4 text-[#02a95c]" />
                 <h3 className="font-bold text-lg mb-2">Wider Network</h3>
                 <p className="text-gray-500 text-sm">When five people share a campaign instead of one, you reach five different circles of friends and family.</p>
              </div>
              <div className="text-center">
                 <Target className="mx-auto mb-4 text-[#02a95c]" />
                 <h3 className="font-bold text-lg mb-2">Shared Responsibility</h3>
                 <p className="text-gray-500 text-sm">Divide the tasks. One person writes the updates, another shares on social media, another manages the donors.</p>
              </div>
              <div className="text-center">
                 <Heart className="mx-auto mb-4 text-[#02a95c]" />
                 <h3 className="font-bold text-lg mb-2">Friendly Competition</h3>
                 <p className="text-gray-500 text-sm">Team members can see who brings in the most donations, creating a fun and motivated atmosphere.</p>
              </div>
           </div>
        </div>

        <div className="mt-24 text-center">
           <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Common Team Types</p>
           <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-600">
              {['Churches', 'Schools', 'Sport Teams', 'Families', 'Workplaces', 'Alumni Groups'].map(tag => (
                <span key={tag} className="px-6 py-3 bg-gray-50 rounded-full border border-gray-100">{tag}</span>
              ))}
           </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}