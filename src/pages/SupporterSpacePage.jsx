import React from 'react'
import { Heart, ShieldCheck, HelpCircle, MessageSquare } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function SupporterSpacePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl text-gray-900 mb-6">
            Your guide to giving on GhCrowd
          </h1>
          <p className="text-gray-500 text-xl leading-relaxed">
            Everything you need to know about staying safe, finding inspiration, and making a difference.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-[#02a95c]" size={28} />
              <h2 className="font-display font-bold text-2xl">The GhCrowd Giving Guarantee</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your trust is our most valuable asset. Our Giving Guarantee protects your donation from fraud. In the rare event that something isn't right, we will work with you to ensure your funds reach the intended cause or provide a refund.
            </p>
            <button className="text-[#02a95c] font-bold text-sm hover:underline">Learn more about safety →</button>
          </section>

          <section className="bg-gray-50 rounded-3xl p-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <HelpCircle className="text-gray-400 mb-4" size={24} />
              <h3 className="font-bold text-lg mb-2">Common Questions</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>• How do I know if a fundraiser is legitimate?</li>
                <li>• Can I donate from outside of Ghana?</li>
                <li>• How do I get a receipt for my donation?</li>
              </ul>
            </div>
            <div>
              <MessageSquare className="text-gray-400 mb-4" size={24} />
              <h3 className="font-bold text-lg mb-2">Get Inspiration</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Follow our blog for stories of communities coming together to change lives across every region of Ghana.
              </p>
            </div>
          </section>

          <div className="text-center py-10">
            <Heart className="text-red-500 mx-auto mb-4 animate-pulse" size={32} />
            <p className="font-display font-bold text-xl text-gray-900">Ready to make an impact?</p>
            <p className="text-gray-400 mt-2 mb-8">Join over 1,900 donors making a difference today.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}